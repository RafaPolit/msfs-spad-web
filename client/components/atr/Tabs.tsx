import { Tabs, tabClass, tabClassCurrent } from "../Tabs";

type TabsProps = {
  pane: string;
  setPane: (pane: string) => void;
};

const ModuleTabs = ({ pane, setPane }: TabsProps) => {
  return (
    <Tabs module="ATR 42-600 / 72-600" setPane={setPane}>
      <li>
        <button
          className={pane === "fgcp" ? tabClassCurrent : tabClass}
          onClick={() => setPane("fgcp")}
        >
          FGCP (AP)
        </button>
      </li>
      <li>
        <button
          className={pane === "efis" ? tabClassCurrent : tabClass}
          onClick={() => setPane("efis")}
        >
          MCP / EFIS
        </button>
      </li>
    </Tabs>
  );
};

export { ModuleTabs as Tabs };
