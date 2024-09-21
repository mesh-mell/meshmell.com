"use client";

import { Dispatch, SetStateAction } from "react";

import ModalWrapper from "@/src/components/ModalWrapper";
import LanguageFlag from "@/src/components/RightBottom/Language/Flag";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

type LanguageSwitchModalType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
  modalOpen: T;
};

const LanguageSwitchModal = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  setHoverOnModal,
  modalOpen,
}: LanguageSwitchModalType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      language: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.language}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="208"
      heightWhenSmallDevice="500"
      title={t("languageSwitch.switchLanguage")}
      setHoverOnModal={setHoverOnModal}
    >
      <div className="mb-10 mt-10 flex flex-col gap-8">
        <LanguageFlag lang="en" text="English" setModalOpen={setModalOpen} />
        <LanguageFlag lang="ja" text="日本語" setModalOpen={setModalOpen} />
      </div>
    </ModalWrapper>
  );
};

export default LanguageSwitchModal;
