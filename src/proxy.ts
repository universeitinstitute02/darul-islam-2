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

    // Admin Route Protection: Block non-admins from specific admin-only paths
    const isAdminPath =
      pathname.includes("/dashboard/teacher/teacher-list") ||
      pathname.includes("/dashboard/teacher/all-users");

    if (isAdminPath && role !== "admin") {
      // Redirect teachers to their own dashboard if they try to access admin lists
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
        if (pathname === "/auth/login" || pathname === "/auth/register") {
          return true;
        }
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
    "/dashboard/:path*",
    "/profile/:path*",
    "/student-profile/:path*",
    "/settings/:path*",
    "/auth/login",
    "/auth/register",
  ],
};