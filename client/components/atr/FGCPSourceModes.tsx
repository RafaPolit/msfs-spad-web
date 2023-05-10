import React from "react";
import { ATRImage } from "./ATRImage";

type FGCPSourceModesProps = {
  src1: string;
  src2: string;
};

const FGCPSourceModes = ({ src1, src2 }: FGCPSourceModesProps) => {
  return (
    <>
      <div className=" absolute w-[37px] h-[38px] left-[157px] top-[33px]">
        <ATRImage filename={`FGCP_SRC1_${src1}`} w={37} h={38} />
      </div>
      <div className=" absolute w-[43px] h-[43px] left-[582px] top-[33px]">
        <ATRImage filename={`FGCP_SRC2_${src2}`} w={43} h={43} />
      </div>
    </>
  );
};

const memoedFGCPSourceModes = React.memo(FGCPSourceModes);

export { memoedFGCPSourceModes as FGCPSourceModes };
