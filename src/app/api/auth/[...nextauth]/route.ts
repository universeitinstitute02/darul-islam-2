import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    // 1. GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // 2. EMAIL/PHONE & PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email/Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Send credentials to your Node.js backend
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials?.identifier,
              password: credentials?.password,
            },
          );

          if (res.data && res.data.token) {
            return res.data; // Returns user data + backend JWT
          }
          return null;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    // This runs immediately after a successful login
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Send Google user data to your Node.js backend to sync the DB
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              name: user.name,
              email: user.email,
            },
          );

          // Attach the backend data to the NextAuth session
          user.token = res.data.token;
          user.role = res.data.role;
          user._id = res.data._id;
          return true;
        } catch (error) {
          return false;
        }
      }
      return true; // Email/Password already has the data
    },
    // Move data into the secure token
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.id = user._id;
      }
      return token;
    },
    // Expose data to your React frontend
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirects unauthenticated users here
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
