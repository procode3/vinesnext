import { NextApiRequest, NextApiResponse } from "next";
import {successResponse, failureResponse} from '../middlewares/response';
import { BadRequestError, NotFoundError } from '../middlewares/errorhandler';
import { prisma } from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
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
              amountReceived,
              educationLevel,
              status,
              userId,
              assignedById,
              clientId
          } = req.body;
  
          console.log(req.body);
  
  
          if(!name || !orderType || !topic || !description || !subject || !pages || !words || !clientDeadline || !writerDeadline || !educationLevel || !status || !userId || !assignedById || !clientId){
              throw new Error('All fields are required');
          }
  
        
          const order: any= await prisma.order.create({
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
                  amountReceived,
                  educationLevel,
                  status,
                  userId,
                  assignedById,
                  clientId
              }});
  
          if(!order){
              throw new NotFoundError('Order not created');
          }
          successResponse(res, order, 201);
  
      } catch (error: any) {
          failureResponse(res, error.message);
      }
    }
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