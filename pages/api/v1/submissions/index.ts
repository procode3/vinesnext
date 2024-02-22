import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { successResponse, failureResponse } from '../middlewares/response';
import { BadRequestError, NotFoundError } from '../middlewares/errorhandler';
import { processUploads } from '../middlewares/upload';
import { saveFilesToDB } from '../middlewares/fileUploader';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const results: any = await processUploads(req, res);
      const { orderId, userId }: any = req?.query;
      if (!orderId || !userId) {
        throw new BadRequestError('Order ID and userId are required');
      }
      const uploadedFiles = await saveFilesToDB(results, orderId);
      const submissions = await prisma.submission.create({
        data: {
          orderId,
          userId,
          File: {
            connect: uploadedFiles.map((file) => ({ id: file.id })),
          },
        },
      });
      console.log(submissions);
      successResponse(res, submissions, 201);
    }
  } catch (error: any) {
    failureResponse(res, error.message);
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
