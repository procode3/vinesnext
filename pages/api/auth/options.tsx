import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/utils";
import jwt from "jsonwebtoken"


export const options: NextAuthOptions = {

    adapter: PrismaAdapter(prisma) as any,
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
                    where: { email: credentials?.username }
                })
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }



                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    //create a session and return the user
                    const res = await prisma.session.create({
                        data: {
                            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            sessionToken: jwt.sign({ id: user.id }, "newtoken", { expiresIn: "1d" }),
                            user: {
                                connect: {
                                    email: user.email
                                }

                            }
                        }
                    })

                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
}