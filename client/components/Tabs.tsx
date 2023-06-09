import Link from "next/link";
import { GiCommercialAirplane } from "react-icons/gi";
import { GiCog } from "react-icons/gi";
import { bgClass } from "./PageLayout";

type TabsProps = {
  setPane: (pane: string) => void;
  module: string;
  children: JSX.Element | JSX.Element[];
};

const homeClass = "inline-block text-4xl mx-2 px-4 pt-1";
const tabClass =
  "inline-block font-semibold px-6 py-3 rounded-t-lg hover:bg-gray-600";
const tabClassCurrent = `${bgClass} inline-block font-semibold px-6 py-3 rounded-t-lg active`;

const Tabs = ({ setPane, module, children }: TabsProps) => {
  return (
    <div>
      <ul className="flex flex-wrap text-md font-medium text-center text-neutral-200 pt-1 px-2 mb-1 bg-black">
        <li>
          <Link href="/" className={homeClass}>
            <GiCommercialAirplane />
          </Link>
        </li>
        {children}
      </ul>
      <button
        className="absolute items-center flex p-3 top-0 right-0 text-2xl"
        onClick={() => setPane("settings")}
      >
        <span className="text-xl mr-4">{module}</span>
        <GiCog />
      </button>
    </div>
  );
};

export { Tabs, tabClass, tabClassCurrent };
