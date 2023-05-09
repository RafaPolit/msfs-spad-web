import React from "react";
import {
  AiOutlineCaretUp,
  AiOutlineCaretDown,
  AiOutlineDown,
} from "react-icons/ai";
import { Button } from "../UI/Button";

const Efis = () => {
  return (
    <div className="m-4">
      <div className="mb-8">
        <Button
          icon={<AiOutlineCaretUp />}
          iconOnly
          name="LVAR:MSATR_EFIS_PROC_UP_1"
          value="1"
        >
          Up
        </Button>
      </div>
      <div className="mb-8">
        <Button
          icon={<AiOutlineCaretDown />}
          iconOnly
          name="LVAR:MSATR_EFIS_PROC_DN_1"
          value="1"
        >
          Down
        </Button>
      </div>
      <div>
        <Button
          icon={<AiOutlineDown />}
          iconOnly
          name="LVAR:MSATR_EFIS_PROC_VAL_1"
          value="1"
        >
          Validate
        </Button>
      </div>
    </div>
  );
};

export { Efis };
