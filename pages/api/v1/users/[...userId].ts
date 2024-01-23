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
    const { userId }: any = req.query;
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: { id: userId[0].toString() },
        select: { name: true, email: true },
      });
      if (!user) throw new NotFoundError("No user with ID provided");
      successResponse(res, user, 200);
    }
    if (req.method === "PUT") {
      const user = await prisma.user.findUnique({
        where: { id: userId[0].toString() },
      });
      if (!user) throw new NotFoundError("No user with ID provided");
      const {
        name,
        emailVerified,
        rating,
        userType,
        phone,
        image,
        isArchived,
      } = req.body;
      //   const updateFields = ["name", "phone", "userType", "emailVerified", "rating", "image"];
      const updatedUser = await prisma.user.update({
        where: { id: userId[0].toString() },
        data: {
          name,
          emailVerified,
          rating,
          userType,
          phone,
          image,
          isArchived,
        },
      });
      if (!updatedUser) throw new InternalServerError("User not updated");
      successResponse(res, updatedUser, 200);
    }
    if (req.method === "DELETE") {
      const user = await prisma.user.findUnique({
        where: { id: userId[0].toString() },
      });
      if (!user) throw new NotFoundError("No user with ID provided");
      const deletedUser = await prisma.user.update({
        where: { id: userId[0].toString() },
        data: { isArchived: true },
      });
      successResponse(res, deletedUser, 204);
    }
  } catch (error: any) {
    failureResponse(res, error.message);
  }
}
