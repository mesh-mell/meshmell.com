"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { GiWireframeGlobe, GiStoneSphere } from "react-icons/gi";

import { LanguageType } from "@/src/types/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

import Button from "../../Button";

type WireFrameSwitchButtonType = {
  lang: LanguageType;
  setIsWireFrame: Dispatch<SetStateAction<boolean>>;
  isWireFrame: boolean;
};

const WireFrameSwitchButton = ({
  lang,
  setIsWireFrame,
  isWireFrame,
}: WireFrameSwitchButtonType) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    setIsWireFrame(!isWireFrame);

    if (isWireFrame) {
      newRouterPush(
        lang,
        [{ key: "wireFrame", value: "off" }],
        searchParams,
        router,
      );
    } else {
      newRouterPush(
        lang,
        [{ key: "wireFrame", value: "on" }],
        searchParams,
        router,
      );
    }
  };

  return (
    <Button handleClick={handleClick}>
      {isWireFrame ? (
        <GiStoneSphere
          className={"text-3xl text-black dark:text-white sm:text-4xl"}
        />
      ) : (
        <GiWireframeGlobe
          className={"text-3xl text-black dark:text-white sm:text-4xl"}
        />
      )}
    </Button>
  );
};

export default WireFrameSwitchButton;
