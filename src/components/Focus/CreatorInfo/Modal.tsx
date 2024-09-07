import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";

import Contents from "./Contents";

type CreatorInfoModal = {
  lang: LanguageType;
  modalOpen: ModalOpenTypeForExhibition;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
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
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      creatorInfo: false,
    }));
  };

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      creatorInfo: false,
    }));
  };

  return (
    <>
      {modalOpen.creatorInfo && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] left-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.creatorInfo ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:-translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
      >
        <div>
          <div className="mb-4 flex justify-start">
            <div
              onClick={handleClickClose}
              className={
                "flex h-12 w-12 items-center justify-center rounded-full border-[2.2px] border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-[3px]"
              }
            >
              <button className="text-xl font-bold">
                <ImCross />
              </button>
            </div>
          </div>
          <Contents
            lang={lang}
            creatorsObj={focusedModelsCreatorsObj}
            isFocusedMode={isFocusedMode}
          />
        </div>
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
      </div>
    </>
  );
};

export default CreatorInfoModal;
