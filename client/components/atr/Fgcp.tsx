import getConfig from "next/config";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { SpadConfig, spadConfigState } from "../../atoms/spadConfig";
import { clickButton } from "../../scripts/clickButton";
import { increaseEncoder, decreaseEncoder } from "../../scripts/encoder";
import { timeout } from "../../scripts/timeout";
import { DataGet } from "../../spadAPI/dataGet";
import { FGCPSourceModes } from "./FGCPSourceModes";
import { decreaseSelector, increaseSelector } from "../../scripts/selectors";
import { SPADConnect } from "../../scripts/SPADConnect";
import { atrDevice } from "../../config/atr";

const { publicRuntimeConfig } = getConfig();

const mainButton = "absolute w-[57px] h-[40px]";
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
  const [src1, setSrc1] = useState("0");
  const [src2, setSrc2] = useState("0");

  // console.log("Public:", publicRuntimeConfig);

  // let pollingTimerID = useRef({} as ReturnType<typeof setTimeout>);

  // useEffect(() => {
  //   console.log("Mount!");
  //   const pollingService = {
  //     intervalID: {} as ReturnType<typeof setTimeout>,
  //     async poll() {
  //       console.log("Polling");
  //       await updateValue(spadConfig, "LVAR:MSATR_FGCP_SRC1", setSrc1);
  //       await updateValue(spadConfig, "LVAR:MSATR_FGCP_SRC2", setSrc2);
  //     },

  //     setup() {
  //       this.intervalID = setInterval(async () => {
  //         await this.poll();
  //       }, 50);
  //       pollingTimerID.current = this.intervalID;
  //     },
  //   };

  //   pollingService.setup();
  // }, [spadConfig]);

  // useEffect(
  //   () => () => {
  //     clearInterval(pollingTimerID.current);
  //   },
  //   []
  // );

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
          className={`${encoder} top-[10px] left-[130px]`}
          onClick={async () =>
            await decreaseSelector(
              spadConfig,
              "LVAR:MSATR_FGCP_SRC1",
              deviceDisplayUpdate["1"],
              0
            )
          }
        />
        <button
          className={`${encoder} top-[10px] left-[180px]`}
          onClick={async () =>
            await increaseSelector(
              spadConfig,
              "LVAR:MSATR_FGCP_SRC1",
              deviceDisplayUpdate["1"],
              3
            )
          }
        />
      </div>
    </div>
  );
};

export { Fgcp };
