import { NextApiResponse } from "next";

//success response middleware for nextjs api routes
export const successResponse = (res: NextApiResponse, data: any, code = 200) => {
    return res.status(code).json({ success: true, data });
}

//failure response middleware for nextjs api routes
export const failureResponse = (res: NextApiResponse, message: string, code = 500) => {
    return res.status(code).send({ success: false, message });
}