import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { successResponse, failureResponse } from '../middlewares/response';
import { BadRequestError, NotFoundError } from '../middlewares/errorhandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
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
        assignedById,
        clientId,
        citationStyle,
        sources,
        spacing,
      } = req.body;

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
        'clientId',
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

      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        const errorMessage =
          missingFields.length === 1
            ? `${fieldDisplayNames[missingFields[0]]} is required`
            : `${missingFields
                .map((field) => fieldDisplayNames[field])
                .join(', ')} are required`;
        throw new BadRequestError(errorMessage);
      }

      const order: any = await prisma.order.create({
        data: {
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
          // userId,
          // assignedById,
          // clientId,
          citationStyle,
          sources,
          spacing,
        },
      });

      if (!order) {
        throw new NotFoundError('Order not created');
      }
      successResponse(res, order, 201);
    } catch (error: any) {
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
