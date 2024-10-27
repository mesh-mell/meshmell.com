"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { GiWireframeGlobe, GiStoneSphere } from "react-icons/gi";

import { LanguageType } from "@/src/types/language";

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
  const newParams = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();
  const handleClick = () => {
    setIsWireFrame(!isWireFrame);

    if (isWireFrame) {
      newParams.set("wireFrame", "off");
      router.push(`${pathname}?${newParams.toString()}`);
    } else {
      newParams.set("wireFrame", "on");
      router.push(`${pathname}?${newParams.toString()}`);
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
