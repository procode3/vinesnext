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
      const orderId = req.url?.split('take/')[1];
      if (orderId) {
        const { userId } = req.body;
        if (!userId) throw new BadRequestError('UserID is missing');
        const orderPromise = prisma.order.findUnique({
          where: {
            id: orderId,
          },
        });
        const userPromise = prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        const [order, user] = await Promise.all([orderPromise, userPromise]);

        if (!order) throw new NotFoundError('Order not found');

        if (order?.writerId) {
          throw new BadRequestError('Order already taken');
        }

        if (!user) throw new NotFoundError('User not found');
        const updatedOrder = await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            writerId: user?.id,
          },
        });
      }
      successResponse(res, { msg: 'Order taken successfully' });
    } else {
      throw new BadRequestError('Invalid request');
    }
  } catch (error: any) {
    failureResponse(res, error.message);
  }
}
