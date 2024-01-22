import { NextApiRequest, NextApiResponse } from "next";
import {successResponse, failureResponse} from '../middlewares/response';
import { BadRequestError, NotFoundError } from '../middlewares/errorhandler';
import { prisma } from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      try {
        const orderId = req.url?.split('orders/')[1];

        if (orderId) {
            const order = await prisma.order.findUnique({
                where: {
                    id: orderId
                }
            });
            if(!order){
                throw new NotFoundError('Order not found');
            }
            successResponse(res, order, 200);
        }
      } catch (error: any) {
          failureResponse(res, error.message);
      }
    }
  }