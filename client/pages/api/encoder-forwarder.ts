import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const encoderMapping = {
  // 1: { encoder: "2000", button: "20" },
  1: { encoder: "3000", button: null },
};

type ResponseData = {
  message: string;
};

const redis = new Redis();

const spadFetch = async (
  [remoteHost, sessionId, apiKey]: (string | null)[],
  msg: string
) => {
  return fetch(`${remoteHost}serialapi/${sessionId}/event?apikey=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: `Message=${encodeURIComponent(msg)}`,
  });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "POST") {
    const spadSession = await redis.mget(
      "SPAD_remoteHost",
      "SPAD_sessionId",
      "SPAD_apiKey"
    );

    const index = req.body.index as keyof typeof encoderMapping;
    const value = req.body.value as string;

    let results = {} as any;

    switch (value) {
      case "press":
        if (encoderMapping[index].button) {
          results = await spadFetch(
            spadSession,
            `8,${encoderMapping[index].button},1;`
          );
        }
        break;
      case "release":
      case "longRelease":
        if (encoderMapping[index].button) {
          results = await spadFetch(
            spadSession,
            `8,${encoderMapping[index].button},0;`
          );
        }
        break;
      default:
        results = await spadFetch(
          spadSession,
          `8,${encoderMapping[index].encoder},${value};`
        );
    }

    res.status(200).json(results);
  } else {
    res.status(403).json({ message: "Error!  Only POST method allowed" });
  }
};

export default handler;
