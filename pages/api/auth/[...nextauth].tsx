import NextAuth, { NextAuthOptions } from 'next-auth';

import { options } from './options';
require('dotenv').config();

// Configure one or more authentication providers
const handler = NextAuth(options)
export { handler as GET, handler as POST }

export default NextAuth(options)

