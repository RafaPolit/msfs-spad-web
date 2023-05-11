/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";

interface HeadProps {
  children: string;
}

const HeadWrapper = ({ children }: HeadProps) => {
  return (
    <Head>
      <title>{children}</title>
      <meta name="description" content="MSFS SPAD Web" />
      <link rel="icon" href="/favicon.ico" />
      <script src="js/jquery.min.js" />
      <script src="js/ss-utils.js" />
    </Head>
  );
};

export { HeadWrapper as Head };
