import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

type AboutType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const About = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: AboutType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      about: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      about: false,
    }));
  };

  return (
    <>
      {modalOpen.about && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[450px] ${modalOpen.about ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className="mb-4 flex justify-end">
          <div
            onClick={handleClickClose}
            className={
              "flex h-12 w-12 items-center justify-center rounded-full border-[2.2px] border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-[3px]"
            }
          >
            <button className="text-base font-bold sm:text-xl">
              <ImCross />
            </button>
          </div>
        </div>
        <div className="z-100 mx-6 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">{t("about.title")}</h1>
            <div className="mt-2 text-base">
              <p>{t("about.description")}</p>
            </div>
          </div>
          <div>
            <h2 className="mb-1 text-xl font-semibold">
              {t("about.articleAboutMeshmell")}
            </h2>
            <a
              href={`https://yurimell.com/${lang}/diary/detail/3`}
              className="text-blue-500 hover:underline"
            >
              {`https://yurimell.com/${lang}/diary/detail/3`}
            </a>
          </div>
          <div>
            <h2 className="mb-1 text-xl font-semibold">
              {t("about.articleAboutMeshmellTechnology")}
            </h2>
            <a
              href={`https://yurimell.com/${lang}/diary/detail/4`}
              className="text-blue-500 hover:underline"
            >
              {`https://yurimell.com/${lang}/diary/detail/4`}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
