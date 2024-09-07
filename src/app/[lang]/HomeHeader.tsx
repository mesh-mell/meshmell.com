import { Dispatch, SetStateAction } from "react";

import LightDarkThemeSwitchButton from "@/src/components/Header/LightDarkTheme/Button";
import WireFrameSwitchButton from "@/src/components/Header/WireFrameSwitch/Button";
import Logo from "@/src/components/Logo";
import { LanguageType } from "@/src/types/language";

type HomeHeaderType = {
  lang: LanguageType;
  modalOpen: any;
  isWireFrame: boolean;
  setIsWireFrame: Dispatch<SetStateAction<boolean>>;
};

const HomeHeader = ({
  lang,
  modalOpen,
  isWireFrame,
  setIsWireFrame,
}: HomeHeaderType) => {
  return (
    <div className="absolute left-0 top-0 flex h-20 w-full items-center justify-between px-4">
      <Logo lang={lang} canBeClicked={false} />
      <WireFrameSwitchButton
        lang={lang}
        setIsWireFrame={setIsWireFrame}
        isWireFrame={isWireFrame}
      />
      <LightDarkThemeSwitchButton
        lang={lang}
        modalOpen={modalOpen}
        isIn3D={false}
      />
    </div>
  );
};

export default HomeHeader;
