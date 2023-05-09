import { atom } from "recoil";

type SpadConfig = {
  address: string;
  port: string;
  token: string;
};

const defaultValues: SpadConfig = {
  address: "192.168.0.1",
  port: "28001",
  token: "",
};

const spadConfigState = atom({
  key: "spadConfig",
  default: defaultValues,
});

export { spadConfigState };
