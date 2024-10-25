import { Dispatch, SetStateAction } from "react";

import FooterButton from "@/src/components/RightBottom/Footer/Button";
import LanguageSwitchButton from "@/src/components/RightBottom/Language/Button";
import SponsorButton from "@/src/components/RightBottom/Sponsors/Button";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

import Logo from "../Logo";

import ShareButton from "./Share/Button";

type RightBottomButtonsType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  isIn3D?: boolean;
};

const RightBottomButtons = ({
  lang,
  setModalOpen,
  isIn3D,
}: RightBottomButtonsType) => {
  return (
    <>
      {isIn3D && (
        <div className="fixed bottom-[10px] right-32 z-[70] hidden cursor-pointer xl:block">
          <Logo lang={lang} />
        </div>
      )}
      <div className="fixed bottom-[18px] right-5 z-[70] cursor-pointer">
        <div className="vertical-buttons-container">
          <ShareButton setModalOpen={setModalOpen} />
          <LanguageSwitchButton lang={lang} setModalOpen={setModalOpen} />
          <FooterButton setModalOpen={setModalOpen} />
          <SponsorButton setModalOpen={setModalOpen} />
        </div>
      </div>
    </>
  );
};

export default RightBottomButtons;
