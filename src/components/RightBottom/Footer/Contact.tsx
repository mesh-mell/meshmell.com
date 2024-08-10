import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

import CopyEmail from "@/src/components/ModalComponents/CopyEmail";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

type ContactType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Contact = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ContactType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      contact: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      contact: false,
    }));
  };

  return (
    <>
      {modalOpen.contact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.contact ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className="flex justify-end mb-4">
          <div
            onClick={handleClickClose}
            className={
              "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"
            }
          >
            <button className="text-base sm:text-xl font-bold">
              <ImCross />
            </button>
          </div>
        </div>
        <div className="z-1">
          <h1 className={"text-2xl mb-4 font-bold"}>{t("contact.contact")}</h1>
          <p className="mt-12 text-base">{t("contact.email")}</p>
          <CopyEmail lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Contact;
