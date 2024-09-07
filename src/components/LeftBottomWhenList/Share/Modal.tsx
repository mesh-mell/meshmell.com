import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { ImCross } from "react-icons/im";

import SnsLinksForShareThisSite from "@/src/components/ModalComponents/SnsLinksForShareThisSite";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

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

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      shareThisPageInList: false,
    }));
  };

  return (
    <>
      {modalOpen.shareThisPageInList && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] left-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.shareThisPageInList ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:-translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
      >
        <div className="mb-4 flex justify-start">
          <div
            onClick={handleClickClose}
            className={
              "flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-4"
            }
          >
            <button className="text-base font-bold sm:text-xl">
              <ImCross />
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold sm:text-3xl">{t("share.title")}</h2>
        <SnsLinksForShareThisSite lang={lang} />
      </div>
    </>
  );
};

export default ShareModalWhenList;
