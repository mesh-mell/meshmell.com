import { Dispatch, SetStateAction, useEffect } from "react";

import SnsLinksForShareThisSite from "@/src/components/ModalComponents/SnsLinksForShareThisSite";
import ModalWrapper from "@/src/components/ModalWrapper";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

type ShareModalType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: ModalOpenTypeForExhibition;
  isFocusedMode: boolean;
};

const ShareModal = ({
  lang,
  setModalOpen,
  modalOpen,
  isFocusedMode,
}: ShareModalType) => {
  const { t } = useTranslation(lang, "main");

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      shareThisPage: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.shareThisPage}
      handleClose={handleClickClose}
      leftRight="left"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      title={t("shareThisPage.title")}
    >
      <SnsLinksForShareThisSite lang={lang} />
    </ModalWrapper>
  );
};

export default ShareModal;
