import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

export type ResponseData = {
  message: string;
  results?: { remoteHost: string | null; apiKey: string | null };
};

const redis = new Redis();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  console.log(req.body);
  if (req.method === "POST") {
    try {
      if (req.body.remoteHost) {
        await redis.set("SPAD_remoteHost", req.body.remoteHost);
      }
      if (req.body.sessionId) {
        await redis.set("SPAD_sessionId", req.body.sessionId);
      }
      if (req.body.apiKey) {
        await redis.set("SPAD_apiKey", req.body.apiKey);
      }
      res.status(200).json({ message: "Success!" });
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ message: "Error!  Possible DB problem" });
    }
  } else {
    try {
      const [remoteHost, apiKey] = await redis.mget(
        "SPAD_remoteHost",
        "SPAD_apiKey"
      );
      res
        .status(200)
        .json({ message: "Success!", results: { remoteHost, apiKey } });
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ message: "Error!  Possible DB problem" });
    }
  }
};

export default handler;
