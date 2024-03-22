import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { successResponse, failureResponse } from '../middlewares/response';
import { BadRequestError, NotFoundError } from '../middlewares/errorhandler';
import { processUploads } from '../middlewares/upload';
import { fileUploader, saveFilesToDB } from '../middlewares/fileUploader';
import { FileType, Order_status } from '@prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {      
      const { fields, uploadedFiles } = await fileUploader(req);
      const { orderId, userId }: any = req?.query;
      if (!orderId || !userId) {
        throw new BadRequestError('Order ID and userId are required');
      }

      let files: {
        name: string;
        type: FileType;
        url: string;
      }[] = [];
      for (let i = 0; i < uploadedFiles.length; i++) {
        const { tags, public_id, secure_url } = uploadedFiles[i];
        files.push({
          name: public_id,
          type: tags[0].toUpperCase(),
          url: secure_url,
        });
      }
console.log(files)
      const submissions = await prisma.submission.create({
        data: {
          orderId,
          userId,
          File: {
            create: files,
          },
        },
      });
      console.log(submissions);
      successResponse(res, submissions, 201);
    }
  } catch (error: any) {
    console.log(error)
    failureResponse(res, error.message);
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
