// handler.ts
import { NextApiRequest, NextApiResponse } from "next";
import { processUploads } from "../middlewares/upload";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await processUploads(req, res);

    return res.json(results);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Error handling file upload",
      error: error.message,
    });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
