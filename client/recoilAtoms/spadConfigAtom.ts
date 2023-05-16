import getConfig from "next/config";
import { atom } from "recoil";

const { publicRuntimeConfig } = getConfig();

export type SpadConfig = {
  address: string;
  port: string;
  apiKey: string;
  token: string;
};

const defaultValues: SpadConfig = {
  address: publicRuntimeConfig.spadIP,
  port: publicRuntimeConfig.spadPORT,
  apiKey: publicRuntimeConfig.spadApiKey,
  token: "",
};

const spadConfigAtom = atom({
  key: "spadConfig",
  default: defaultValues,
});

export { spadConfigAtom };
