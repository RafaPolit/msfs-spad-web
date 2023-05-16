import { DataSet } from "../spadAPI/dataSet";
import { timeout } from "./timeout";
import { RemoteSpadConfig } from "./getSpadServerSideProps";

const increaseEncoder = async (spadConfig: RemoteSpadConfig, name: string) => {
  await DataSet({
    url: spadConfig.remoteHost || "",
    apikey: spadConfig.apiKey || "",
    name,
    value: "1",
  });
  await timeout(500);
  await DataSet({
    url: spadConfig.remoteHost || "",
    apikey: spadConfig.apiKey || "",
    name,
    value: "0",
  });
};

const decreaseEncoder = async (spadConfig: RemoteSpadConfig, name: string) => {
  await DataSet({
    url: spadConfig.remoteHost || "",
    apikey: spadConfig.apiKey || "",
    name,
    value: "-1",
  });
  await timeout(500);
  await DataSet({
    url: spadConfig.remoteHost || "",
    apikey: spadConfig.apiKey || "",
    name,
    value: "0",
  });
};

export { increaseEncoder, decreaseEncoder };
