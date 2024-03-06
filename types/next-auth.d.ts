import NextAuth from "next-auth"
import { User_type } from "@prisma/client"
import type { IncomingMessage, ServerResponse } from 'http';

declare module "next-auth" {

  interface Session {
    user: {
        name: string,
        email: string,
        userType: User_type
    }
  }

  export interface NextApiRequestt extends IncomingMessage {
    /**
     * Object of `query` values from url
     */
    query: Partial<{
        [key: string]: string | string[];
    }>;
    /**
     * Object of `cookies` from header
     */
    cookies: Partial<{
        [key: string]: string;
    }>;
    body: any;
    env: Env;
    draftMode?: boolean;
    preview?: boolean;
   files?:any;
   file?:any;
    /**
     * Preview data set on the request, if any
     * */
    previewData?: PreviewData;
}
}