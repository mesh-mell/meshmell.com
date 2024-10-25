import { Dispatch, SetStateAction, useEffect } from "react";

import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";

import ModalWrapper from "../../ModalWrapper";

import Contents from "./Contents";

type CreatorInfoModal = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  focusedModelsObj: ModelDetailsType;
  focusedModelsCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const CreatorInfoModal = ({
  lang,
  setModalOpen,
  focusedModelsCreatorsObj,
  focusedModelsObj,
  modalOpen,
  isFocusedMode,
}: CreatorInfoModal) => {
  const { t } = useTranslation(lang, "main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: false,
    }));
  };

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  return (
    <ModalWrapper
      isVisible={modalOpen.creatorInfo}
      handleClose={handleClickClose}
      leftRight="left"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
    >
      <Contents
        lang={lang}
        creatorsObj={focusedModelsCreatorsObj}
        isFocusedMode={isFocusedMode}
      />
      {focusedModelsObj.source ? (
        <div className="mt-4 flex justify-center">
          <div> {t("creatorInfo.sourceCreator")} </div>
          <a
            href={focusedModelsObj.source.sourceSite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-blue-500 dark:text-blue-400"
          >
            {t("creatorInfo.source")}
          </a>
        </div>
      ) : null}
    </ModalWrapper>
  );
};

export default CreatorInfoModal;
