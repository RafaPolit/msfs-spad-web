import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { SpadConfig, spadConfigState } from "../../atoms/spadConfig";
import { DataGet } from "../../spadAPI/dataGet";
import { FGCPSourceModes } from "./FGCPSourceModes";
import { SPADConnect } from "../../scripts/SPADConnect";
import { atrDevice } from "../../config/atr";

const mainButton =
  "absolute w-[51px] h-[36px] rounded-lg bg-red-700 opacity-30";
const roundButton = "absolute w-[40px] h-[40px] rounded-full";
const arrowButtonHor = "absolute w-[58px] h-[24px]";
const arrowButtonVer = "absolute w-[24px] h-[58px]";
const encoder = "absolute w-[40px] h-[65px] rounded-lg bg-red-700 opacity-30";

const updateValue = async (
  spadConfig: SpadConfig,
  name: string,
  setter: React.Dispatch<React.SetStateAction<string>>
) => {
  const results = await DataGet({
    url: `${spadConfig.address}:${spadConfig.port}`,
    apikey: spadConfig.apiKey,
    name,
  });
  setter(results.Result.Value);
};

let count = 0;

const Fgcp = () => {
  const spadConfig = useRecoilValue(spadConfigState);
  const [deviceData, setDeviceData] = useState({ "22": "0" } as {
    [key: string]: string;
  });
  const [deviceLedUpdate, setDeviceLedUpdate] = useState(
    {} as {
      [key: string]: string;
    }
  );
  const [deviceDisplayUpdate, setDeviceDisplayUpdate] = useState({
    "1": "0",
  } as {
    [key: string]: string;
  });

  const atrEventHandler = useMemo(
    () =>
      new SPADConnect(spadConfig, atrDevice, [
        setDeviceData,
        setDeviceLedUpdate,
        setDeviceDisplayUpdate,
      ]),
    [spadConfig]
  );

  useEffect(() => {
    count += 1;
    console.log("Enterded: ", count);
    if (count === 2) {
      atrEventHandler.ConnectEventSource();
    }
  }, [atrEventHandler]);

  useEffect(
    () => () => {
      console.log("Exited: ", count);
      if (count === 2) {
        console.log("About to call disconnect?");
        atrEventHandler.DisconnectSerial();
      }
    },
    [atrEventHandler]
  );

  return (
    <div className=" flex flex-col gap-2 place-content-center w-full">
      <div className="relative w-[780px] h-[212px] mt-20 mx-auto">
        <Image
          src="/atr/FGCP.png"
          alt="ATR FGCP"
          layout="fill"
          priority={true}
        />
        <FGCPSourceModes
          src1={deviceDisplayUpdate["1"]}
          src2={deviceData["22"]}
        />
        <button
          className={`${mainButton} top-[7px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,1,1;8,1,0;")}
        ></button>
        <button
          className={`${mainButton} top-[47px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,2,1;8,2,0;")}
        ></button>
        <button
          className={`${mainButton} top-[87px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,3,1;8,3,0;")}
        ></button>
        <button
          className={`${mainButton} top-[127px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,4,1;8,4,0;")}
        ></button>
        <button
          className={`${mainButton} top-[167px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,5,1;8,5,0;")}
        ></button>
        <button
          className={`${encoder} top-[10px] left-[130px]`}
          onClick={() => atrEventHandler.SendEvent("8,61,1;8,61,0;")}
        />
        <button
          className={`${encoder} top-[10px] left-[180px]`}
          onClick={() => atrEventHandler.SendEvent("8,62,1;8,62,0;")}
        />
      </div>
    </div>
  );
};

export { Fgcp };
