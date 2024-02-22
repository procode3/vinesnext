import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'


export const options: NextAuthOptions = {

    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({

            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {



                //find user in db

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                })
                if (!user) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(credentials?.password as string, user?.password as string);


                if (isPasswordValid) {

                    return user
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/signin',
        //     signOut: '/auth/signout',
        //     error: '/auth/error', // Error code passed in query string as ?error=
        //     verifyRequest: '/auth/verify-request', // (used for check email message)
        //     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    secret: "L9ck37e4ppVxZEwCESP7wp2NYEhzlpgZ9EMG/zAImAw=",
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, user }) {
            if (user) {
                return { ...token, id: user?.id, userType: user?.userType }
            }
            return token
        },
        async session({ session, token, user }) {
            return {
                ...session, user: {
                    ...session.user,
                    id: token.id,
                    userType: token.userType
                }
            };


        }
    }
}