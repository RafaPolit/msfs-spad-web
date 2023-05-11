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
// import { SPADConnect } from "../../scripts/SPADConnect";
// import { atrDevice } from "../../config/atr";

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

const Fgcp = () => {
  const spadConfig = useRecoilValue(spadConfigState);
  const [src1, setSrc1] = useState("0");
  const [src2, setSrc2] = useState("0");

  console.log("Public:", publicRuntimeConfig);

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

  // const atrEventHandler = useMemo(
  //   () => new SPADConnect(spadConfig, atrDevice),
  //   [spadConfig]
  // );

  // useEffect(() => {
  //   atrEventHandler.ConnectEventSource();
  // }, [atrEventHandler]);

  // useEffect(
  //   () => () => {
  //     console.log("About to call disconnect?");
  //     atrEventHandler.DisconnectSerial();
  //   },
  //   [atrEventHandler]
  // );

  useEffect(() => {
    console.log("Here!");
    var DeviceID = "{DD7E3826-E439-4484-B186-A1443F3BC531}";
    var AuthorID = "3870169da23f7cc86823120e6063521a";
    var Version = "1.0";
    var InstanceID = 1;

    var remoteHost = "http://192.168.0.7:28001/";

    var sessionId = "";
    var apiKey = "75rU7ZjZzc_Cs7QjlVINZ78Fxz4eLEni";

    var onError = function (e: any) {
      console.log(e);
      if (e.responseJSON && e.responseJSON.responseStatus)
        ($ as any).ss.handlers["announce"](
          e.responseJSON.responseStatus.message
        );
    };

    let curStack = "";

    function SPAD_Push(msg: string) {
      curStack = curStack + msg;
    }

    function SPAD_SendEvent(msg: string) {
      $.post(
        remoteHost + "serialapi/" + sessionId + "/event?apikey=" + apiKey,
        { Message: curStack + msg },
        function () {}
      ).fail(onError);
      curStack = "";
    }

    function SPAD_ConnectSerial() {
      $.post(
        remoteHost + "serialapi/" + sessionId + "/connect?apikey=" + apiKey,
        { DeviceID: DeviceID, InstanceID: InstanceID },
        function () {}
      ).fail(onError);
    }

    function SPAD_DisconnectSerial() {
      $.post(
        remoteHost + "serialapi/" + sessionId + "/disconnect?apikey=" + apiKey,
        { DeviceID: DeviceID, InstanceID: InstanceID },
        function () {}
      ).fail(onError);
    }

    function SPAD_ConnectEventSource() {
      // Authenticate to SPAD
      var source = new EventSource(
        remoteHost + "event-stream?apikey=" + apiKey
      );
      ($(source) as any).handleServerEvents({
        handlers: {
          onConnect: function (subscription: any) {
            console.log("connected!");
            sessionId = subscription.id;
            SPAD_ConnectSerial();
          },
          onHeartbeat: function (msg: string, e: any) {
            //console.log("onHeartbeat", msg, e);
          },
          onError: function () {
            console.log("error");
            ($ as any).ss.eventSourceStop = true;
          },
          onStop: function () {
            console.log("stop");
            ($ as any).ss.eventSourceStop = true;
          },
        },
        receivers: {
          spad: {
            debug: function (msg: string) {
              console.log("DEBUG: ", msg);
            },
            ChannelJoin: function (msg: any) {
              console.log("Joined", msg.Channel);
            },
            ChannelLeave: function (msg: any) {
              console.log("Left", msg.Channel);
            },
            SerialMsg: function (spadmessage: string) {
              const parts = spadmessage.split(";")[0].split(",");
              console.log(parts);
              if (parts[1] == "INIT") {
                SPAD_SendEvent(
                  "0,SPAD," +
                    DeviceID +
                    ",Remote Api Demo,2," +
                    Version +
                    ",AUTHOR=" +
                    AuthorID +
                    ",PID=Demo,ALLOWLOCAL=2;"
                );
              }
              if (parts[1] == "CONFIG") {
                console.log("CFG");
                SPAD_Push(
                  "0,OPTION,ISGENERIC=1,PAGESUPPORT=0,CMD_COOLDOWN=50,DATA_COOLDOWN=100,VPSUPPORT=0,NOECHO=1;"
                );
                SPAD_Push("1,ADD,20,DataOut,S32,RW,Data Output;");
                SPAD_Push(
                  "1,SUBSCRIBE,21,SIMCONNECT:AIRSPEED INDICATED,Knots,1.1;"
                );
                SPAD_Push(
                  "0,OUTPUT,1,L_ONE,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=Green,COL_1=Red,BEHAVIOR=ONOFF;"
                );
                SPAD_Push("0,INPUT,2000,E_TUNER,ENCODER,SPAD_DOUBLE_ENCODER;");
                SPAD_Push(
                  "0,INPUT,5,I_APPR,PUSHBUTTON,SPAD_SIMPLEBUTTON,ROUTETO=E_TUNER,HIDDEN=1,_ROUTETO.PRESS=PUSH;"
                );
                SPAD_SendEvent("0,CONFIG;");
              }
              if (parts[1] == "SCANSTATE") {
                SPAD_SendEvent("0,STATESCAN;");
              }
            },
          },
        },
      });
    }

    if (apiKey == "") {
      console.log("Challenging SPAD");
      $.post(remoteHost + "challenge", {}, function () {}).fail(onError);
      let challResponse = prompt("Enter Challenge Key", "");
      console.log("You entered", challResponse);
      $.post(
        remoteHost + "challenge/accept?format=json",
        { Token: challResponse },
        function (data) {
          if (data.Success) {
            apiKey = data.Result.ApiKey;
            SPAD_ConnectEventSource();
          } else {
            alert("Challenge failed!");
          }
        }
      ).fail(onError);
    }

    console.log("Connecting:");
    SPAD_ConnectEventSource();
  }, []);

  return (
    <div className=" flex flex-col gap-2 place-content-center w-full">
      <div className="relative w-[780px] h-[212px] mt-20 mx-auto">
        <Image
          src="/atr/FGCP.png"
          alt="ATR FGCP"
          layout="fill"
          priority={true}
        />
        <FGCPSourceModes src1={src1} src2={src2} />
        <button
          className={`${encoder} top-[10px] left-[130px]`}
          onClick={async () =>
            await decreaseSelector(spadConfig, "LVAR:MSATR_FGCP_SRC1", src1, 0)
          }
        />
        <button
          className={`${encoder} top-[10px] left-[180px]`}
          onClick={async () =>
            await increaseSelector(spadConfig, "LVAR:MSATR_FGCP_SRC1", src1, 3)
          }
        />
      </div>
    </div>
  );
};

export { Fgcp };
