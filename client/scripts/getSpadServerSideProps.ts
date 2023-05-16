import Redis from "ioredis";
import { GetServerSideProps } from "next";

export type RemoteSpadConfig = {
  remoteHost: string | null;
  apiKey: string | null;
  sessionId: string | null;
};

const getSpadServerSideProps: GetServerSideProps<{
  data: RemoteSpadConfig;
}> = async (context) => {
  const redis = new Redis();
  const [remoteHost, apiKey, sessionId] = await redis.mget(
    "SPAD_remoteHost",
    "SPAD_apiKey",
    "SPAD_sessionId"
  );

  if (!context.req.url?.includes("spad-config") && (!remoteHost || !apiKey)) {
    return { redirect: { destination: "/spad-config", permanent: false } };
  }

  const data = { remoteHost, apiKey, sessionId };

  return { props: { data } };
};

export { getSpadServerSideProps };
