import { Device } from "../scripts/SPADConnect";

const atrDevice: Device = {
  DeviceID: "{f1a4b5cc-b5ca-41dd-bb6a-7c5a65d9d7b4}",
  Name: "Virtual ATR Cockpit",
  PID: "VATR",
  AuthorID: "3870169da23f7cc86823120e6063521a",
  Version: "0.2",
  InstanceID: 1,
  SUBSCRIBE: ["22,LVAR:MSATR_FGCP_SRC2"],
  OUTPUT: [
    "1,D_1,DISPLAY,SPAD_DISPLAY,LENGTH=1,ROWS=1,WIDTH=20,HEIGHT=30,DEFAULT=0",
    "1,L_AP_CPT,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
    "2,L_AP_FO,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
  ],
  INPUT: [
    "1,HDG,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "2,NAV,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "3,APP,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "4,BC,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "5,STBY,PUSHBUTTON,SPAD_SIMPLEBUTTON",
  ],
};

export { atrDevice };
