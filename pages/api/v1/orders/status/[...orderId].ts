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
      const orderId = req.url?.split('status/')[1];
      if (orderId) {
        const { status } = req.body;
        if (!status) throw new BadRequestError('Status is missing');
        const order = await prisma.order.findUnique({
          where: {
            id: orderId,
          },
        });

        if (!order) throw new NotFoundError('Order not found');

        if (
          order?.orderStatus.toLocaleLowerCase() === status.toLocaleLowerCase()
        ) {
          throw new BadRequestError(`Order already in ${status} status`);
        }

        const updatedOrder = await prisma.order.update({
          where: {
            id: orderId,
          },
          data:
            status !== 'available'
              ? {
                  orderStatus: status,
                }
              : {
                  orderStatus: status,
                  writer: {
                    disconnect: true,
                  },
                },
        });
      }
      successResponse(res, 'Order status updated successfully');
    } else {
      throw new BadRequestError('Invalid request');
    }
  } catch (error: any) {
    failureResponse(res, error.message);
  }
}
