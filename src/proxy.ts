import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        if (pathname === "/auth-dashboard/login" || pathname === "/auth-dashboard/register") {
          return true;
        }
        
        // Protect private routes: user must have a token
        return !!token;
      },
    },
    pages: {
      signIn: "/auth-dashboard/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/student-profile/:path*",
    "/settings/:path*",
    "/auth-dashboard/login",
    "/auth-dashboard/register",
  ],
};