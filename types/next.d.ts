import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    files?: any[]; // Add the files property to the NextApiRequest
  }
}
