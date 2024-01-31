// uploadMiddleware.ts
import multer from "multer";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { handleUpload } from "@/lib/cloudinary";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const myUploadMiddleware = upload.array("files", 20);

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export async function processUploads(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, myUploadMiddleware);
  if (!req.files) {
    return res.status(400).send("No files to upload.");
  }
  const filePromises = req.files.map(async (file: any) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;

    const cldRes = await handleUpload(
      dataURI,
      file.originalname,
      file.fileType
    );

    return cldRes;
  });

  const results = await Promise.all(filePromises);
  return results;
}
