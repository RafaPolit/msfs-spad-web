import { SpadConfig } from "../atoms/spadConfig";

export interface Device {
  DeviceID: string;
  Name: string;
  PID: string;
  AuthorID: string;
  Version: string;
  InstanceID: number;
  SUBSCRIBE: string[];
  OUTPUT: string[];
  INPUT: string[];
}

type SetState = React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
type SetStateArray = SetState[];

class SPADConnect {
  Device: Device;
  DeviceID: Device["DeviceID"];
  Name: Device["Name"];
  PID: Device["PID"];
  AuthorID: Device["AuthorID"];
  Version: Device["Version"];
  InstanceID: Device["InstanceID"];
  remoteHost: string;
  apiKey: string;
  sessionId = "";
  curStack = "";
  setDeviceData: SetState;
  setDeviceLedUpdate: SetState;
  setDeviceDisplayUpdate: SetState;

  constructor(
    spadConfig: SpadConfig,
    device: Device,
    [setDeviceData, setDeviceLedUpdate, setDeviceDisplayUpdate]: SetStateArray
  ) {
    this.remoteHost = `${spadConfig.address}:${spadConfig.port}/`;
    this.apiKey = spadConfig.apiKey;
    this.Device = device;
    this.DeviceID = device.DeviceID;
    this.Name = device.Name;
    this.PID = device.PID;
    this.AuthorID = device.AuthorID;
    this.Version = device.Version;
    this.InstanceID = device.InstanceID;
    this.setDeviceData = setDeviceData;
    this.setDeviceLedUpdate = setDeviceLedUpdate;
    this.setDeviceDisplayUpdate = setDeviceDisplayUpdate;
  }

  onError(e: any) {
    console.log(e);
    if (e.responseJSON && e.responseJSON.responseStatus)
      ($ as any).ss.handlers["announce"](e.responseJSON.responseStatus.message);
  }

  ConnectSerial() {
    $.post(
      this.remoteHost +
        "serialapi/" +
        this.sessionId +
        "/connect?apikey=" +
        this.apiKey,
      { DeviceID: this.DeviceID, InstanceID: this.InstanceID },
      function () {}
    ).fail(this.onError);
  }

  DisconnectSerial() {
    $.post(
      this.remoteHost +
        "serialapi/" +
        this.sessionId +
        "/disconnect?apikey=" +
        this.apiKey,
      { DeviceID: this.DeviceID, InstanceID: this.InstanceID },
      () => {}
    ).fail(this.onError);
  }

  Push(msg: string) {
    this.curStack = this.curStack + msg;
  }

  SendEvent(msg: string) {
    $.post(
      this.remoteHost +
        "serialapi/" +
        this.sessionId +
        "/event?apikey=" +
        this.apiKey,
      { Message: this.curStack + msg },
      function () {}
    ).fail(this.onError);
    this.curStack = "";
  }

  ConnectEventSource() {
    console.log("Beginning connect with:", this.remoteHost);
    const source = new EventSource(
      this.remoteHost + "event-stream?apikey=" + this.apiKey
    );

    ($(source) as any).handleServerEvents({
      handlers: {
        onConnect: (subscription: any) => {
          console.log("Connected to SPAD! received:", subscription);
          this.sessionId = subscription.id;
          this.ConnectSerial();
        },

        onHeartbeat: (msg: string, e: any) => {
          // console.log("onHeartbeat", msg, e);
        },

        onError: () => {
          console.log("error");
          ($ as any).ss.eventSourceStop = true;
        },

        onStop: () => {
          console.log("stop");
          ($ as any).ss.eventSourceStop = true;
        },
      },

      receivers: {
        spad: {
          debug: (msg: any) => {
            console.log("DEBUG: ", msg);
          },

          ChannelJoin: (msg: any) => {
            console.log("Joined", msg.Channel);
          },

          ChannelLeave: (msg: any) => {
            console.log("Left", msg.Channel);
          },

          SerialMsg: (spadmessage: string) => {
            const parts = spadmessage.split(";")[0].split(",");
            console.log("SerialMsg: ", parts);

            if (parts[1] == "INIT") {
              this.SendEvent(
                `0,SPAD,${this.DeviceID},${this.Name},2,${this.Version};`
              );
            }
            if (parts[1] == "CONFIG") {
              console.log("CFG");
              this.Push(
                "0,OPTION,ISGENERIC=1,PAGESUPPORT=0,CMD_COOLDOWN=50,DATA_COOLDOWN=100,VPSUPPORT=0,NOECHO=1,UI_TYPE=2;"
              );
              // Not sure what this is yet https://docs.spadnext.com/extending-and-apis/serial-connection/command-1#examples
              this.Push("1,ADD,20,DataOut,S32,RW,Data Output;");
              this.Device.SUBSCRIBE?.forEach((val) => {
                this.Push(`1,SUBSCRIBE,${val};`);
              });
              this.Device.OUTPUT?.forEach((val) => {
                this.Push(`0,OUTPUT,${val};`);
              });
              this.Device.INPUT?.forEach((val) => {
                this.Push(`0,INPUT,${val};`);
              });
              this.SendEvent("0,CONFIG;");
            }
            if (parts[1] == "SCANSTATE") {
              this.SendEvent("0,STATESCAN;");
            }

            if (parts[0] === "5") {
              // Device Data
              this.setDeviceData((prev) => ({ ...prev, [parts[1]]: parts[2] }));
            }

            if (parts[0] === "7" && parts[3] === "2") {
              // Display Update
              this.setDeviceDisplayUpdate((prev) => ({
                ...prev,
                [parts[1]]: parts[4],
              }));
            }
          },

          DataUpdate: (msg: any) => {
            // A databag with data update pairs has been received
            console.log("Data update");
            for (var i in msg.Data) {
              console.log(i, "=>", msg.Data[i]);
            }
          },
        },
      },
    });
  }
}

export { SPADConnect };
