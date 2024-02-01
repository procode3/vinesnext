import { NextApiRequest } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { prisma } from '@/lib/prisma';
import { FileType, File } from '@prisma/client';

import { handleUpload } from '@/lib/cloudinary';

export const fileUploader = async (req: NextApiRequest) => {
  const data = await new Promise((resolve, reject) => {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  const { err, fields, files } = data as any;

  // console.log(files, typeof files);

  const filePromises = files.files.map(async (file: any) => {
    const buffer = fs.readFileSync(file.filepath);
    const b64 = Buffer.from(buffer).toString('base64');
    const dataURI = 'data:' + file.mimetype + ';base64,' + b64;

    const cldRes = await handleUpload(
      dataURI,
      file.originalFilename,
      file.fileType
    );

    return cldRes;
  });

  const uploadedFiles = await Promise.all(filePromises);
  return { fields, uploadedFiles };
};

export const saveFilesToDB = async (results: any, orderId: string) => {
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
  await prisma.file.createMany({ data: files });
  const uploadedFiles = await prisma.file.findMany({
    where: { orderId: orderId },
  });
  return uploadedFiles;
};
