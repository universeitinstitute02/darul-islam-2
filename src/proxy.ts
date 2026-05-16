import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    const role = token?.role as string;

    // Prevent logged-in users from accessing Auth pages
    if (
      (pathname === "/auth/login" || pathname === "/auth/register") &&
      !!token
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Block Students from all dashboard routes
    if (pathname.startsWith("/dashboard") && role === "student") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Admin Route Protection
    const isAdminPath =
      pathname.includes("/dashboard/teacher/teacher-list") ||
      pathname.includes("/dashboard/teacher/all-users");

    if (isAdminPath && role !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard/teacher/teacher-dashboard", req.url),
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Bypass check completely for internal next-auth APIs
        if (pathname.startsWith("/api/auth")) {
          return true;
        }

        // Allow public access to login and register pages
        if (pathname === "/auth/login" || pathname === "/auth/register") {
          return true;
        }

        // Require token for everything else in matcher
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all protected routes except internal Next.js/Next-Auth paths
     */
    "/dashboard/:path*",
    "/profile/:path*",
    "/student-profile/:path*",
    "/settings/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
