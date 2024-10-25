import { Dispatch, SetStateAction, useEffect } from "react";

import SnsLinksForShareThisSite from "@/src/components/ModalComponents/SnsLinksForShareThisSite";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ShareModalWhenListType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
  isFocusedMode: boolean;
};

const ShareModalWhenList = ({
  lang,
  setModalOpen,
  modalOpen,
  isFocusedMode,
}: ShareModalWhenListType) => {
  const { t } = useTranslation(lang, "main");

  useEffect(() => {
    if (isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.shareThisPage}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
    >
      <h2 className="text-2xl font-bold sm:text-3xl">{t("share.title")}</h2>
      <SnsLinksForShareThisSite lang={lang} />
    </ModalWrapper>
  );
};

export default ShareModalWhenList;
