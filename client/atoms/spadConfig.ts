import { atom } from "recoil";

type SpadConfig = {
  address: string;
  port: string;
  apiKey: string;
  token: string;
};

const defaultValues: SpadConfig = {
  address: "http://192.168.0.1",
  port: "28001",
  apiKey: "",
  token: "",
};

const spadConfigState = atom({
  key: "spadConfig",
  default: defaultValues,
});

export { spadConfigState };
