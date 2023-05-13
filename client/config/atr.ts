import { Device } from "../scripts/SPADConnect";

const atrDevice: Device = {
  DeviceID: "{f1a4b5cc-b5ca-41dd-bb6a-7c5a65d9d7b4}",
  Name: "Virtual ATR Cockpit",
  PID: "VATR",
  AuthorID: "3870169da23f7cc86823120e6063521a",
  Version: "0.2",
  InstanceID: 1,
  SUBSCRIBE: [],
  OUTPUT: [
    "1,D_1,DISPLAY,SPAD_DISPLAY,LENGTH=1,ROWS=1,WIDTH=20,HEIGHT=30,DEFAULT=0",
    "2,D_2,DISPLAY,SPAD_DISPLAY,LENGTH=1,ROWS=1,WIDTH=20,HEIGHT=30,DEFAULT=0",
    "1,L_AP_CPT,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
    "2,L_AP_FO,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
    "3,L_YD_CPT,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
    "4,L_YD_FO,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
    "5,L_CPL_CPT,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
    "6,L_CPL_FO,LED,SPAD_LED,UI_FACE=3,IMG_ON=_PanelImages//LED_green.png,IMG_OFF=_PanelImages//LED_off.png,COL_0=LightGray,COL_1=Green",
  ],
  INPUT: [
    "1,HDG,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "2,NAV,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "3,APP,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "4,BC,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "5,STBY,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "6,N_DWN,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "7,N_UP,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "8,IAS,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "9,VS,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "10,VNAV,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "11,ALT,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "12,AP,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "13,YD,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "14,SPD_HLD,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "15,CPL,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "16,FD1,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "17,FD2,PUSHBUTTON,SPAD_SIMPLEBUTTON",
    "2000,E_HDG,ENCODER,SPAD_ENCODER",
    "20,I_HDG_PUSH,PUSHBUTTON,SPAD_PUSHBUTTON,HIDDEN=1,ROUTETO=E_HDG",
    "21,I_HDG_DEC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "22,I_HDG_INC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "3000,E_ALT,ENCODER,SPAD_ENCODER",
    "31,I_ALT_DEC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "32,I_ALT_INC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "4000,E_CRS1,ENCODER,SPAD_ENCODER",
    "41,I_CRS1_DEC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "42,I_CRS2_INC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "5000,E_CRS2,ENCODER,SPAD_ENCODER",
    "51,I_CRS2_DEC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "52,I_CRS2_INC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "61,I_SRC1_DEC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "62,I_SRC1_INC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "71,I_SRC2_DEC,PUSHBUTTON,SPAD_PUSHBUTTON",
    "72,I_SRC2_INC,PUSHBUTTON,SPAD_PUSHBUTTON",
  ],
};

export { atrDevice };
