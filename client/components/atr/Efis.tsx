import React from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { spadConfigState } from "../../atoms/spadConfig";
import { clickButton } from "../../scripts/clickButton";
import { increaseEncoder, decreaseEncoder } from "../../scripts/encoder";

const mainButton = "absolute w-[57px] h-[40px]";
const roundButton = "absolute w-[40px] h-[40px] rounded-full";
const arrowButtonHor = "absolute w-[58px] h-[24px]";
const arrowButtonVer = "absolute w-[24px] h-[58px]";
const encoder = "absolute w-[35px] h-[77px] rounded-lg bg-red-700 opacity-30";

const Efis = () => {
  const spadConfig = useRecoilValue(spadConfigState);

  return (
    <div className=" flex flex-col gap-2 place-content-center w-full">
      <div className="relative w-[495px] h-[180px] ml-[20px]">
        <Image
          src="/atr/MCP-left.png"
          alt="ATR MCP Left"
          layout="fill"
          priority={true}
        />
        <button
          className={`${mainButton} top-[18px] left-[53px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_COM")
          }
        />
        <button
          className={`${mainButton} top-[68px] left-[53px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_NAV")
          }
        />
        <button
          className={`${mainButton} top-[120px] left-[53px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_SURV")
          }
        />
        <button
          className={`${arrowButtonHor} top-[17px] left-[140px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_UP")
          }
        />
        <button
          className={`${arrowButtonHor} top-[97px] left-[140px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_DOWN")
          }
        />
        <button
          className={`${arrowButtonVer} top-[40px] left-[116px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_LEFT")
          }
        />
        <button
          className={`${arrowButtonVer} top-[40px] left-[197px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_RIGHT")
          }
        />
        <button
          className={`${roundButton} top-[50px] left-[149px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_ENTER")
          }
        />
        <button
          className={`${mainButton} top-[121px] left-[202px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_ESC")
          }
        />
        <button
          className={`${roundButton} top-[23px] left-[270px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_1")
          }
        />
        <button
          className={`${roundButton} top-[23px] left-[320px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_2")
          }
        />
        <button
          className={`${roundButton} top-[23px] left-[370px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_3")
          }
        />
        <button
          className={`${roundButton} top-[72px] left-[270px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_4")
          }
        />
        <button
          className={`${roundButton} top-[72px] left-[320px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_5")
          }
        />
        <button
          className={`${roundButton} top-[72px] left-[370px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_6")
          }
        />
        <button
          className={`${roundButton} top-[121px] left-[270px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_7")
          }
        />
        <button
          className={`${roundButton} top-[121px] left-[320px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_8")
          }
        />
        <button
          className={`${roundButton} top-[121px] left-[370px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_9")
          }
        />
        <button
          className={`${roundButton} top-[48px] left-[408px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_0")
          }
        />
        <button
          className={`${roundButton} top-[97px] left-[408px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_MCP1_PERIOD")
          }
        />
      </div>
      <div className="relative w-[780px] h-[222px] ml-[10px]">
        <Image
          src="/atr/EFIS-left.png"
          alt="ATR EFIS Left"
          layout="fill"
          priority={true}
        />
        <button
          className={`${mainButton} top-[21px] left-[60px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_ND_1")
          }
        />
        <button
          className={`${mainButton} top-[66px] left-[59px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PERF_1")
          }
        />
        <button
          className={`${mainButton} top-[111px] left-[57px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_VID_1")
          }
        />
        <button
          className={`${mainButton} top-[21px] left-[126px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_SYS_1")
          }
        />
        <button
          className={`${mainButton} top-[66px] left-[125px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_MISC_1")
          }
        />
        <button
          className={`${mainButton} top-[111px] left-[123px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_MAP_1")
          }
        />
        <button
          className={`${mainButton} top-[34px] left-[210px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_BRG1_1")
          }
        />
        <button
          className={`${mainButton} top-[34px] left-[289px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_BRG2_1")
          }
        />
        <button
          className={`${mainButton} top-[101px] left-[208px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_RNG_INC_1")
          }
        />
        <button
          className={`${mainButton} top-[148px] left-[206px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_RNG_DEC_1")
          }
        />
        <button
          className={`${encoder} top-[101px] left-[272px]`}
          onClick={async () =>
            await increaseEncoder(spadConfig, "LVAR:MSATR_EFIS_FORMAT_1_DELTA")
          }
        />
        <button
          className={`${encoder} top-[101px] left-[312px]`}
          onClick={async () =>
            await decreaseEncoder(spadConfig, "LVAR:MSATR_EFIS_FORMAT_1_DELTA")
          }
        />
        <button
          className={`${mainButton} top-[65px] left-[367px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PROC_UP_1")
          }
        />
        <button
          className={`${mainButton} top-[111px] left-[367px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PROC_DN_1")
          }
        />
        <button
          className={`${mainButton} top-[159px] left-[365px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PROC_VAL_1")
          }
        />
        <button
          className={`${mainButton} top-[66px] left-[555px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_PROC_MENU")
          }
        />
        <button
          className={`${mainButton} top-[156px] left-[555px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_RCL")
          }
        />
        <button
          className={`${mainButton} top-[66px] left-[652px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_MAN_DEL")
          }
        />
        <button
          className={`${mainButton} top-[156px] left-[652px]`}
          onClick={async () =>
            await clickButton(spadConfig, "LVAR:MSATR_EFIS_CLR")
          }
        />
      </div>
    </div>
  );
};

export { Efis };
