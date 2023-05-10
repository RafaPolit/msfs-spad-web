import { SpadConfig } from "../atoms/spadConfig";
import { DataSet } from "../spadAPI/dataSet";

const increaseSelector = async (
  spadConfig: SpadConfig,
  name: string,
  currentValue: string,
  maxValue: number
) => {
  await DataSet({
    url: `${spadConfig.address}:${spadConfig.port}`,
    apikey: spadConfig.apiKey,
    name,
    value: Math.min(parseInt(currentValue) + 1, maxValue).toString(),
  });
};

const decreaseSelector = async (
  spadConfig: SpadConfig,
  name: string,
  currentValue: string,
  minValue: number
) => {
  await DataSet({
    url: `${spadConfig.address}:${spadConfig.port}`,
    apikey: spadConfig.apiKey,
    name,
    value: Math.max(parseInt(currentValue) - 1, minValue).toString(),
  });
};

export { increaseSelector, decreaseSelector };
