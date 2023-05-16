import { useEffect, useMemo, useState } from "react";
import { InferGetServerSidePropsType } from "next";

import { Layout } from "../components/PageLayout";
import { getSpadServerSideProps } from "../scripts/getSpadServerSideProps";
import { Settings } from "../components/Settings";
import { Tabs } from "../components/atr/Tabs";
import { Efis } from "../components/atr/Efis";
import { Fgcp } from "../components/atr/Fgcp";

import { DeviceState, atrDevice } from "../config/atr";
import { SPADConnect } from "../scripts/SPADConnect";

const getServerSideProps = getSpadServerSideProps;

// Remove for production
let count = 0;

const ATRMain = ({
  data: spadConfig,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [pane, setPane] = useState("fgcp");

  const [deviceData, setDeviceData] = useState({} as DeviceState);
  const [deviceLed, setDeviceLed] = useState({} as DeviceState);
  const [deviceDisplay, setDeviceDisplay] = useState({} as DeviceState);

  const atrEventHandler = useMemo(
    () =>
      new SPADConnect(spadConfig, atrDevice, [
        setDeviceData,
        setDeviceLed,
        setDeviceDisplay,
      ]),
    [spadConfig]
  );

  useEffect(() => {
    count += 1;
    console.log("Enterded: ", count);
    if (count % 2 === 0) {
      atrEventHandler.ConnectEventSource();
    }
  }, [atrEventHandler]);

  useEffect(
    () => () => {
      console.log("Exited: ", count);
      if (count % 2 === 0) {
        console.log("About to call disconnect?");
        atrEventHandler.DisconnectSerial();
      }
    },
    [atrEventHandler]
  );

  return (
    <Layout title="ATR 42-600 / 72-600">
      <Tabs pane={pane} setPane={setPane} />
      {pane === "settings" && <Settings module="ATR" />}
      {pane === "fgcp" && (
        <Fgcp atrEventHandler={atrEventHandler} deviceDisplay={deviceDisplay} />
      )}
      {pane === "efis" && <Efis spadConfig={spadConfig} />}
    </Layout>
  );
};

export default ATRMain;

export { getServerSideProps };
