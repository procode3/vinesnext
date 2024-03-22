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
      const orderId = req.url?.split('assign/')[1];

      const { writer, clientDeadline, writerDeadline } = req.body;

      if (!orderId) {
        throw new BadRequestError('Invalid orderId');
      }

      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          writer: {
            connect: {
              id: writer,
            },
          },
          clientDeadline: new Date(clientDeadline).toISOString(),
          writerDeadline: new Date(writerDeadline).toISOString(),
          orderStatus: 'UNCONFIRMED',
        },
      });
      return successResponse(res, order)
    }
  } catch (err) {
    console.log(err)
    return failureResponse(res, err);
  }
}
