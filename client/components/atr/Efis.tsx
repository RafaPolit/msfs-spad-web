import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "../UI/Button";

const Efis = () => {
  return (
    <Button icon={<FaMapMarkedAlt />} command="105" keybind="1">
      Down
    </Button>
  );
};

export { Efis };
