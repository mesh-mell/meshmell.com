import { Dispatch, SetStateAction } from "react";

import FooterButton from "@/src/components/RightBottom/Footer/Button";
import LanguageSwitchButton from "@/src/components/RightBottom/Language/Button";
import SponsorButton from "@/src/components/RightBottom/Sponsors/Button";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Logo from "../Logo";

type RightBottomButtonsType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
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
        <div className="flex flex-col items-end gap-2">
          <LanguageSwitchButton lang={lang} setModalOpen={setModalOpen} />
          <FooterButton setModalOpen={setModalOpen} />
          <SponsorButton lang={lang} setModalOpen={setModalOpen} />
        </div>
      </div>
    </>
  );
};

export default RightBottomButtons;
