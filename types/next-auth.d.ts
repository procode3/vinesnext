import NextAuth from "next-auth"
import { User_type } from "@prisma/client"
declare module "next-auth" {

  interface Session {
    user: {
        name: string,
        email: string,
        userType: User_type
    }
  }
}