import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

type ResponseData = {
  message: string;
};

const redis = new Redis();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  console.log(req.body);
  if (req.method === "POST") {
    try {
      await redis.set("SPAD_remoteHost", req.body.remoteHost);
      await redis.set("SPAD_sessionId", req.body.sessionId);
      await redis.set("SPAD_apiKey", req.body.apiKey);
      res.status(200).json({ message: "Success" });
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ message: "Error!  Possible DB problem" });
    }
  } else {
    res.status(403).json({ message: "Error!  Only POST method allowed" });
  }
};

export default handler;
