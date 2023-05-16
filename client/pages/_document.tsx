import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="js/ss-utils.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
