import React from "react";
import Image from "next/image";

type ATRImageProps = {
  filename: string;
  w: number;
  h: number;
  value?: number;
};

const ATRImage = ({ filename, w, h, value = 1 }: ATRImageProps) => {
  return (
    <>
      {value ? (
        <Image
          src={`/atr/${filename}.png`}
          alt=""
          layout="fixed"
          width={w}
          height={h}
        />
      ) : null}
    </>
  );
};

const memoedATRImage = React.memo(ATRImage);

export { memoedATRImage, ATRImage };
