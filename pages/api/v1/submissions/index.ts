import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, failureResponse } from "../middlewares/response";
import { BadRequestError, NotFoundError } from "../middlewares/errorhandler";
import { processUploads } from "../middlewares/upload";
import { FileType } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const results: any = await processUploads(req, res);
      const { orderId, userId }: any = req?.query;
      //extract tags, public_id, secure_url from cldRes list
      let files: {
        name: string;
        type: FileType;
        url: string;
        orderId: string;
      }[] = [];
      for (let i = 0; i < results.length; i++) {
        const { tags, public_id, secure_url } = results[i];
        files.push({
          name: public_id,
          type: tags[0].toUpperCase(),
          url: secure_url,
          orderId,
        });
      }
      const fileUploads = await prisma.file.createMany({ data: files });
      const uploadedFiles = await prisma.file.findMany({
        where: { orderId: orderId },
      });
      console.log(fileUploads);
      successResponse(res, uploadedFiles, 201);
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
