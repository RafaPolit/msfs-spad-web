import { SpadConfig } from "../atoms/spadConfig";
import { DataSet } from "../spadAPI/dataSet";
import { timeout } from "./timeout";

const clickButton = async (spadConfig: SpadConfig, name: string) => {
  await DataSet({
    url: `${spadConfig.address}:${spadConfig.port}`,
    apikey: spadConfig.apiKey,
    name,
    value: "1",
  });
  await timeout(500);
  await DataSet({
    url: `${spadConfig.address}:${spadConfig.port}`,
    apikey: spadConfig.apiKey,
    name,
    value: "0",
  });
};

export { clickButton };
