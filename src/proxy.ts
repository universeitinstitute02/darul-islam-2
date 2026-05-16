import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Bypass Next-Auth internal API routes immediately to prevent session loops
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 2. Fetch the session token securely using Node.js runtime compatibility
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role as string;

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";

  // 3. Auth Page Protection: Redirect already logged-in users away from login/register pages
  if (isAuthPage && !!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4. Global Protection: Redirect unauthenticated users to the login page
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 5. Role-Based Protection: Restrict students from accessing any dashboard paths
  if (pathname.startsWith("/dashboard") && role === "student") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 6. Admin Route Protection: Block non-admins from specific administrative pathways
  const isAdminPath =
    pathname.includes("/dashboard/teacher/teacher-list") ||
    pathname.includes("/dashboard/teacher/all-users");

  if (isAdminPath && role !== "admin") {
    return NextResponse.redirect(
      new URL("/dashboard/teacher/teacher-dashboard", req.url),
    );
  }

  return NextResponse.next();
}

// Specify which paths should trigger this proxy execution
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/student-profile/:path*",
    "/settings/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
