import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, failureResponse } from "../middlewares/response";
import { BadRequestError, NotFoundError } from "../middlewares/errorhandler";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

      console.log(req.body);

      if (
        !name ||
        !orderType ||
        !topic ||
        !description ||
        !subject ||
        !pages ||
        !words ||
        !clientDeadline ||
        !writerDeadline ||
        !educationLevel ||
        !orderStatus ||
        !userId ||
        !assignedById ||
        !clientId
      ) {
        throw new Error("All fields are required");
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
        throw new NotFoundError("Order not created");
      }
      successResponse(res, order, 201);
    } catch (error: any) {
      failureResponse(res, error.message);
    }
  }
  if (req.method === "GET") {
    try {
      // const {id} = params;
      // const id = "10";
      const orders = await prisma.order.findMany();
      if (!orders) {
        throw new NotFoundError("Order not found");
      }
      successResponse(res, orders, 200);
    } catch (error: any) {
      failureResponse(res, error.message);
    }
  }
}
