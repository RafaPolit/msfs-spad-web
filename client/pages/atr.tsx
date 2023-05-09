import { useState } from "react";
import type { NextPage } from "next";

import { Layout } from "../components/PageLayout";
import { Settings } from "../components/Settings";
import { Tabs } from "../components/atr/Tabs";
import { Efis } from "../components/atr/Efis";

const ATRMain: NextPage = () => {
  const [pane, setPane] = useState("efis");

  return (
    <Layout title="ATR 42-600 / 72-600">
      <Tabs pane={pane} setPane={setPane} />
      {pane === "settings" && <Settings module="ATR" />}
      {pane === "efis" && <Efis />}
    </Layout>
  );
};

export default ATRMain;
