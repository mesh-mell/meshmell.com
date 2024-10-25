"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { newRouterPush } from "@/src/utils/newRouterPush";

import Button from "../../Button";

type LightDarkThemeSwitchButtonType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  isIn3D?: boolean;
};

const LightDarkThemeSwitchButton = ({
  lang,
  modalOpen,
  isIn3D,
}: LightDarkThemeSwitchButtonType) => {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isLight = resolvedTheme === "light";

  const handleClick = () => {
    setTheme(isLight ? "dark" : "light");

    if (!isIn3D) return;

    newRouterPush(
      lang,
      [
        {
          key: "lightAndDarkTheme",
          value: resolvedTheme === "light" ? "dark" : "light",
        },
      ],
      searchParams,
      router,
    );
  };

  return (
    <>
      <Button handleClick={handleClick} isActive={modalOpen.lightAndDarkTheme}>
        {isLight ? (
          <MdLightMode className={"text-3xl text-amber-500 sm:text-4xl"} />
        ) : (
          <MdDarkMode className={"text-3xl text-blue-600 sm:text-4xl"} />
        )}
      </Button>
    </>
  );
};

export default LightDarkThemeSwitchButton;
