import { Dispatch, SetStateAction, useEffect } from "react";

import SnsLinksForShareThisSite from "@/src/components/ModalComponents/SnsLinksForShareThisSite";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ShareModalWhenListType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: ModalOpenTypeForExhibition;
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
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      shareThisPageInList: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.shareThisPageInList}
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
