import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, failureResponse } from "../middlewares/response";
import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "../middlewares/errorhandler";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query;
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: { id: userId[0].toString() },
        select: { name: true, email: true },
      });
      if (!user) throw new NotFoundError("No user with ID provided");
      successResponse(res, user, 200);
    }
    if (req.method === "UPDATE") {
      const user = await prisma.user.findOne({
        where: { id: userId },
      });
      if (!user) throw new NotFoundError("No user with ID provided");
      const { name, emailVerified, rating, userType, phone, image } = req.body;
      //   const updateFields = ["name", "phone", "userType", "emailVerified", "rating", "image"];
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, emailVerified, rating, userType, phone, image },
      });
      if (!updatedUser) throw new InternalServerError("User not updated");
      successResponse(res, updatedUser, 200);
    }
    if (req.method === "DELETE") {
      const user = await prisma.user.findOne({
        where: { id: userId },
      });
      if (!user) throw new NotFoundError("No user with ID provided");
      const deletedUser = await prisma.user.update({
        where: { id: userId },
        data: { isArchived: true },
      });
      successResponse(res, deletedUser, 204);
    }
  } catch (error: any) {
    failureResponse(res, error.message);
  }
}
