import { DataSet } from "../spadAPI/dataSet";
import { timeout } from "./timeout";
import { RemoteSpadConfig } from "./getSpadServerSideProps";

const clickButton = async (spadConfig: RemoteSpadConfig, name: string) => {
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

export { clickButton };
