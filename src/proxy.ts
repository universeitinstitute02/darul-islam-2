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

  // Redirect teachers and admins away from the student profile layout
  if (
    pathname.startsWith("/student-profile") &&
    (role === "teacher" || role === "admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
  }

  // 5. Role-Based Protection: Restrict students from accessing any dashboard paths
  if (pathname.startsWith("/dashboard") && role === "student") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Admin only routes
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 6. Admin Route Protection: Block non-admins from specific administrative pathways
  const isAdminPath =
    pathname.includes("/dashboard/admin/my-course") ||
    pathname.includes("/dashboard/admin/add-course") ||
    pathname.includes("/dashboard/admin/batch-assign") ||
    pathname.includes("/dashboard/admin/manage-batch") ||
    pathname.includes("/dashboard/admin/categories") ||
    pathname.includes("/dashboard/admin/students-list") ||
    pathname.includes("/dashboard/admin/products-management") ||
    pathname.includes("/dashboard/admin/order-management") ||
    pathname.includes("/dashboard/admin/product-delivey") ||
    pathname.includes("/dashboard/admin/donations") ||
    pathname.includes("/dashboard/admin/donate-post") ||
    pathname.includes("/dashboard/admin/admin-notice") ||
    pathname.includes("/dashboard/admin/gallery") ||
    pathname.includes("/dashboard/admin/testimonial") ||
    pathname.includes("/dashboard/admin/content-control") ||
    pathname.includes("/dashboard/admin/profile");

  if (isAdminPath && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
  }

  // Teacher routes protection
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    if (role === "teacher") {
      return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    pathname.startsWith("/dashboard/teacher") &&
    role !== "teacher" &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
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
