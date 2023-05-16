import React from "react";
import Image from "next/image";
import { FGCPSourceModes } from "./FGCPSourceModes";
import { SPADConnect } from "../../scripts/SPADConnect";
import { DeviceState } from "../../config/atr";

const mainButton =
  "absolute w-[51px] h-[36px] rounded-lg bg-red-700 opacity-30";
const encoder = "absolute w-[40px] h-[60px] rounded-lg bg-red-700 opacity-30";
const wheel = "absolute w-[40px] h-[60px] bg-red-700 opacity-30";
const pushEncoder =
  "absolute w-[90px] h-[25px] rounded-lg bg-red-700 opacity-30";

interface FgcpProps {
  atrEventHandler: SPADConnect;
  deviceDisplay: DeviceState;
}

const Fgcp = ({ atrEventHandler, deviceDisplay }: FgcpProps) => {
  return (
    <div className=" flex flex-col gap-2 place-content-center w-full">
      <div className="relative w-[780px] h-[40px] mt-14 mx-auto">
        <div className="absolute w-16 top-3 left-32 outline outline-8 outline-[#3c4a50] border-2 border-gray-500 px-3 rounded-t text-center font-mono">
          {deviceDisplay["4"] || "---"}
        </div>
        <div className="absolute w-20 top-3 right-36 outline outline-8 outline-[#3c4a50] border-2 border-gray-500 px-3 rounded-t text-right font-mono">
          {deviceDisplay["3"] || "-----"}
        </div>
      </div>
      <div className="relative w-[780px] h-[212px] mx-auto">
        <Image
          src="/atr/FGCP.png"
          alt="ATR FGCP"
          layout="fill"
          priority={true}
        />
        <FGCPSourceModes src1={deviceDisplay["1"]} src2={deviceDisplay["2"]} />
        <button
          className={`${mainButton} top-[7px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,1,1;8,1,0;")}
        />
        <button
          className={`${mainButton} top-[47px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,2,1;8,2,0;")}
        />
        <button
          className={`${mainButton} top-[87px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,3,1;8,3,0;")}
        />
        <button
          className={`${mainButton} top-[127px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,4,1;8,4,0;")}
        />
        <button
          className={`${mainButton} top-[165px] left-[240px]`}
          onClick={() => atrEventHandler.SendEvent("8,5,1;8,5,0;")}
        />
        <button
          className={`${wheel} top-[38px] left-[330px]`}
          onClick={() => atrEventHandler.SendEvent("8,6,1;8,6,0;")}
        />
        <button
          className={`${wheel} top-[110px] left-[330px]`}
          onClick={() => atrEventHandler.SendEvent("8,7,1;8,7,0;")}
        />
        <button
          className={`${mainButton} top-[7px] left-[410px]`}
          onClick={() => atrEventHandler.SendEvent("8,8,1;8,8,0;")}
        />
        <button
          className={`${mainButton} top-[47px] left-[410px]`}
          onClick={() => atrEventHandler.SendEvent("8,9,1;8,9,0;")}
        />
        <button
          className={`${mainButton} top-[87px] left-[410px]`}
          onClick={() => atrEventHandler.SendEvent("8,10,1;8,10,0;")}
        />
        <button
          className={`${mainButton} top-[127px] left-[410px]`}
          onClick={() => atrEventHandler.SendEvent("8,11,1;8,11,0;")}
        />
        <button
          className={`${mainButton} top-[7px] left-[483px]`}
          onClick={() => atrEventHandler.SendEvent("8,12,1;8,12,0;")}
        />
        <button
          className={`${mainButton} top-[47px] left-[483px]`}
          onClick={() => atrEventHandler.SendEvent("8,13,1;8,13,0;")}
        />
        <button
          className={`${mainButton} top-[87px] left-[483px]`}
          onClick={() => atrEventHandler.SendEvent("8,14,1;8,14,0;")}
        />
        <button
          className={`${mainButton} top-[165px] left-[483px]`}
          onClick={() => atrEventHandler.SendEvent("8,15,1;8,15,0;")}
        />
        <button
          className={`${mainButton} top-[126px] left-[52px]`}
          onClick={() => atrEventHandler.SendEvent("8,16,1;8,16,0;")}
        />
        <button
          className={`${mainButton} top-[126px] left-[670px]`}
          onClick={() => atrEventHandler.SendEvent("8,17,1;8,17,0;")}
        />
        <button
          className={`${pushEncoder} top-[182px] left-[120px]`}
          onClick={() => atrEventHandler.SendEvent("8,20,1;8,20,0;")}
        />
        <button
          className={`${encoder} top-[120px] left-[120px]`}
          onClick={() => atrEventHandler.SendEvent("8,21,1;8,21,0;")}
        />
        <button
          className={`${encoder} top-[120px] left-[170px]`}
          onClick={() => atrEventHandler.SendEvent("8,22,1;8,22,0;")}
        />
        <button
          className={`${encoder} top-[10px] left-[130px]`}
          onClick={() => atrEventHandler.SendEvent("8,61,1;8,61,0;")}
        />
        <button
          className={`${encoder} top-[10px] left-[180px]`}
          onClick={() => atrEventHandler.SendEvent("8,62,1;8,62,0;")}
        />
      </div>
    </div>
  );
};

export { Fgcp };
