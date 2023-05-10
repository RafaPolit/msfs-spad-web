import React from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { spadConfigState } from "../../atoms/spadConfig";
import { clickButton } from "../../scripts/clickButton";

const buttonClass = "absolute w-[57px] h-[40px] bg-red-700 opacity-50";

const Efis = () => {
  const spadConfig = useRecoilValue(spadConfigState);

  return (
    <div className=" flex place-content-center w-full py-20">
      <div className="relative w-[780px] h-[222px]">
        <Image
          src="/atr/EFIS-left.png"
          alt="ATR EFIS Left"
          layout="fill"
          priority={true}
        />
        <button
          className={`${buttonClass} top-[65px] left-[367px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PROC_UP_1")
          }
        />
        <button
          className={`${buttonClass} top-[111px] left-[367px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PROC_DN_1")
          }
        />
        <button
          className={`${buttonClass} top-[159px] left-[365px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PROC_VAL_1")
          }
        />
      </div>
    </div>
  );
};

export { Efis };
