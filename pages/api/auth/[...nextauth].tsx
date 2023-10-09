import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
require('dotenv').config();


const HOST = process.env.HOST || 'DESKTOP-QQAQH05';
export const authOptions: NextAuthOptions = {
  secret: process.env.ADMIN_JWT_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;


        const res = await fetch(`http://${HOST}:5000/api/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            identifier: username,
            password: password,
          }),
        });

        const user = await res.json();


        if (user) {
          user['name'] = user['username']

          return user;
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },


  pages: {
    signIn: `http://${HOST}:3000/login`,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      return `http://${HOST}:3000/`
    }
  },
};


export default NextAuth(authOptions);