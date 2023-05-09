import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import getConfig from "next/config";
import { RecoilRoot } from "recoil";

import "../styles/globals.css";

const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
