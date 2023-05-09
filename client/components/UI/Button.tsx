import React from "react";
import { useRecoilValue } from "recoil";
import { spadConfigState } from "../../atoms/spadConfig";
import { timeout } from "../../scripts/timeout";
import { DataSet } from "../../spadAPI/dataSet";

type TextProps = {
  children: string;
};

const Text = ({ children }: TextProps) => {
  return <span className="text-xl ml-4">{children}</span>;
};

type ButtonProps = {
  icon: JSX.Element;
  name: string;
  value: string;
  iconOnly?: boolean;
  children?: string;
  keybind?: string;
};

const button =
  "flex relative items-center bg-gray-700 rounded-lg outline outline-1 outline-offset-8 outline-gray-400 px-6 py-3";
const buttonOnlyIcon =
  "flex relative items-center bg-gray-700 rounded-lg outline outline-1 outline-offset-8 outline-gray-400 px-6 py-3";

const Button = ({
  icon,
  iconOnly = false,
  name,
  value,
  children,
  keybind,
}: ButtonProps) => {
  const spadConfig = useRecoilValue(spadConfigState);

  const click = async () => {
    await DataSet({
      url: `${spadConfig.address}:${spadConfig.port}`,
      apikey: spadConfig.apiKey,
      name,
      value,
    });
    await timeout(500);
    await DataSet({
      url: `${spadConfig.address}:${spadConfig.port}`,
      apikey: spadConfig.apiKey,
      name,
      value: "0",
    });
  };

  const Icon = React.cloneElement(icon, { className: "text-4xl" });
  return (
    <button
      className={iconOnly ? buttonOnlyIcon : button}
      onClick={async () => await click()}
    >
      {Icon}
      {!iconOnly && (
        <>
          <Text>{children || ""}</Text>
          <span className="absolute top-0 right-2 opacity-50">{keybind}</span>
        </>
      )}
    </button>
  );
};

export { Button };
