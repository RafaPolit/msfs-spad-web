import { DataSet } from "../spadAPI/dataSet";
import { RemoteSpadConfig } from "./getSpadServerSideProps";

const increaseSelector = async (
  spadConfig: RemoteSpadConfig,
  name: string,
  currentValue: string,
  maxValue: number
) => {
  await DataSet({
    url: spadConfig.remoteHost || "",
    apikey: spadConfig.apiKey || "",
    name,
    value: Math.min(parseInt(currentValue) + 1, maxValue).toString(),
  });
};

const decreaseSelector = async (
  spadConfig: RemoteSpadConfig,
  name: string,
  currentValue: string,
  minValue: number
) => {
  await DataSet({
    url: spadConfig.remoteHost || "",
    apikey: spadConfig.apiKey || "",
    name,
    value: Math.max(parseInt(currentValue) - 1, minValue).toString(),
  });
};

export { increaseSelector, decreaseSelector };
