import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { successResponse, failureResponse } from '../middlewares/response';
import { BadRequestError, NotFoundError } from '../middlewares/errorhandler';
import { fileUploader, saveFilesToDB } from '../middlewares/fileUploader';
import { Order_status } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { fields, uploadedFiles } = await fileUploader(req);
      // console.log(uploadedFiles, 'Files uploadd successfully');

      console.log(fields);
      const data = JSON.parse(fields.data[0]);

      const {
        name,
        orderType,
        topic,
        description,
        subject,
        pages,
        words,
        clientDeadline,
        writerDeadline,
        writerFee,
        amountReceived,
        educationLevel,
        orderStatus,
        userId,
        writerId,
        assignedById,
        clientId,
        citationStyle,
        sources,
        spacing,
      } = data;

      const requiredFields = [
        'name',
        'orderType',
        'topic',
        'subject',
        'pages',
        'words',
        'clientDeadline',
        'educationLevel',
        'userId',
        'citationStyle',
        'sources',
        'spacing',
      ];

      const fieldDisplayNames: any = {
        name: 'Name',
        orderType: 'Order Type',
        topic: 'Topic',
        subject: 'Subject',
        pages: 'Pages',
        words: 'Words',
        clientDeadline: 'Client Deadline',
        educationLevel: 'Education Level',
        userId: 'User Id',
        clientId: 'Client Id',
        citationStyle: 'Citation Style',
        sources: 'Sources',
        spacing: 'Spacing',
      };

      const missingFields = requiredFields.filter((field) => !data[field]);

      if (missingFields.length > 0) {
        const errorMessage =
          missingFields.length === 1
            ? `${fieldDisplayNames[missingFields[0]]} is required`
            : `${missingFields
                .map((field) => fieldDisplayNames[field])
                .join(', ')} are required`;
        throw new BadRequestError(errorMessage);
      }
      const status :any = !!writerId ? "INPROGRESS" :  !!assignedById  ? "AVAILABLE" :  "NEW";
      const order: any = await prisma.order.create({
        data: {
          name: name,
          orderType: orderType.toUpperCase(),
          topic,
          description,
          subject: subject.toUpperCase(),
          pages: parseInt(pages),
          words,
          clientDeadline: new Date(clientDeadline).toISOString(),
          writerDeadline: new Date(writerDeadline).toISOString(),
          writerFee,
          amountReceived,
          educationLevel: educationLevel.toUpperCase(),
          orderStatus: status.toUpperCase(),
          writerId,
          userId,
          assignedById: writerId ? userId : null,
          clientId,
          citationStyle,
          sources,
          spacing,
        },
      });

      if (!order) {
        throw new NotFoundError('Order not created');
      }
      const savedFiles = await saveFilesToDB(uploadedFiles, order.id);

      const savedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          File: {
            connect: savedFiles.map((file) => ({ id: file.id })),
          },
        },
        include: {
          File: true,
        },
      });

      successResponse(res, savedOrder, 201);
    } catch (error: any) {
      console.log(error);
      failureResponse(res, error.message);
    }
  }
  if (req.method === 'GET') {
    try {
      const isArchived = req?.query.isArchived == 'true' ? true : false;
      const orders = await prisma.order.findMany({ where: { isArchived } });
      if (!orders) {
        throw new NotFoundError('Order not found');
      }
      successResponse(res, orders, 200);
    } catch (error: any) {
      failureResponse(res, error.message);
    }
  }
}
