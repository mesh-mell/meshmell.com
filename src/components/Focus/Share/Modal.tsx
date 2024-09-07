import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { ImCross } from "react-icons/im";

import SnsLinksForShareThisSite from "@/src/components/ModalComponents/SnsLinksForShareThisSite";
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

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      shareThisPage: false,
    }));
  };

  return (
    <>
      {modalOpen.shareThisPage && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] left-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.shareThisPage ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:-translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
      >
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
        <h2 className="text-3xl font-bold">{t("shareThisPage.title")}</h2>
        <SnsLinksForShareThisSite lang={lang} />
      </div>
    </>
  );
};

export default ShareModal;
