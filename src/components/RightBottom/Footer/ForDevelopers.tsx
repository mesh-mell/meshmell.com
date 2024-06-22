import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
} from "@/src/types/modals";

type ForDevelopersType<T> = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: T;
  setHoverOnModal?: (hoverOnModal: boolean) => void;
};

const ForDevelopers = <
  T extends ModalOpenTypeForHome | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ForDevelopersType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      forDevelopers: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      forDevelopers: false,
    }));
  };

  return (
    <>
      {modalOpen.forDevelopers && (
        <div
          className='fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen'
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.forDevelopers ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className='flex justify-end mb-4'>
          <div
            onClick={handleClickClose}
            className={
              "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"
            }
          >
            <button className='text-base sm:text-xl font-bold'>
              <ImCross />
            </button>
          </div>
        </div>
        <div className='z-100 mx-6'>
          <h1 className='text-2xl font-bold mb-6'>
            {t("forDevelopers.title")}
          </h1>
          <div className='flex flex-col text-base gap-2 mt-6 max-w-xl mx-auto'>
            <p>
              {t("forDevelopers.sourceCode")}
              <a
                href={` ${process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}`}
                className='text-blue-500 hover:underline'
              >
                {process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}
              </a>
            </p>
            <p>{t("forDevelopers.recruit")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForDevelopers;
