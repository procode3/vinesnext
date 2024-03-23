import { NextApiRequest, NextApiResponse } from 'next';
import { successResponse, failureResponse } from '../../middlewares/response';
import { BadRequestError, NotFoundError } from '../../middlewares/errorhandler';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const orderId = req.url?.split('confirm/')[1];

      const { writerId, confirm } = req.body;

      if (orderId) {
        if (confirm === true) {
          const order = await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              orderStatus: 'INPROGRESS',
              writer: {
                connect: {
                  id: writerId,
                },
              },
            },
          });
          if (!order) {
            throw new NotFoundError('Order not found');
          }
        } else if (confirm !== true) {
          const order = await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              orderStatus: 'NEW',
            },
          });
          if (!order) {
            throw new NotFoundError('Order not found');
          }
        }
        successResponse(res, {}, 200);
      }
    } else if (req.method === 'PUT') {
      const orderId = req.url?.split('orders/')[1];

      if (orderId) {
        const order = await prisma.order.findUnique({
          where: {
            id: orderId,
          },
        });
        if (!order) {
          throw new NotFoundError('Order not found');
        }

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

        const updatedOrder = await prisma.order.update({
          where: {
            id: orderId,
          },
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
            userId,
            assignedById,
            clientId,
            citationStyle,
            sources,
            spacing,
          },
        });

        successResponse(res, updatedOrder, 200);
      }
    } else if (req.method === 'DELETE') {
      const orderId = req.url?.split('orders/')[1];
      if (orderId) {
        const order = await prisma.order.findUnique({
          where: {
            id: orderId,
          },
        });
        if (!order) {
          throw new NotFoundError('Order not found');
        }
        const deletedOrder = await prisma.order.delete({
          where: {
            id: orderId,
          },
        });
        successResponse(res, deletedOrder, 204);
      }
    } else {
      throw new BadRequestError('Invalid request');
    }
  } catch (error: any) {
    failureResponse(res, error.message);
  }
}