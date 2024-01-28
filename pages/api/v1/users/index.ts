import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { successResponse, failureResponse } from '../middlewares/response';
import { BadRequestError, NotFoundError } from '../middlewares/errorhandler';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, email, password, image, phone, userType } = req.body;
      const requiredFields = ['name', 'phone', 'userType', 'email', 'password'];

      const fieldDisplayNames: any = {
        name: 'Name',
        email: 'Email',
        password: 'Password',
        userType: 'User type',
        phone: 'Phone number',
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
      const hashedPassword = await bcrypt.hash(password, 10);

      const user: any = await prisma.user.create({
        data: { name, email, password: hashedPassword, image, phone, userType },
      });
      if (!user) throw new NotFoundError('User not created.');
      successResponse(res, user, 201);
    } catch (error: any) {
      failureResponse(res, error.message);
    }
  }
  if (req.method === 'GET') {
    try {
      const isArchived = req?.query.isArchived == 'true' ? true : false;
      const users = await prisma.user.findMany({ where: { isArchived } });
      if (!users) {
        throw new NotFoundError('No user found');
      }
      successResponse(res, users, 200);
    } catch (error: any) {
      failureResponse(res, error.message);
    }
  }
}
