import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { prisma } from '@/lib/prisma';


export const options: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
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

                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }



                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    //create a session and return the user
                    // const res = await prisma.session.create({
                    //     data: {
                    //         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    //         sessionToken: jwt.sign({ id: user.id }, "newtoken", { expiresIn: "1d" }),
                    //         user: {
                    //             connect: {
                    //                 email: user.email
                    //             }

                    //         }
                    //     }
                    // })

                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
        signIn: '/login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}