import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

type TermsType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Terms = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: TermsType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleGoToContact = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      contact: true,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      terms: false,
    }));
  };

  const contentInfo = {
    en: "Terms",
    ja: "利用規約",
  };

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      terms: false,
    }));
  };

  return (
    <>
      {modalOpen.terms && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[450px] ${modalOpen.terms ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
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
              "flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-4"
            }
          >
            <button className="text-base font-bold sm:text-xl">
              <ImCross />
            </button>
          </div>
        </div>
        <div className="max-h-[90%] overflow-y-auto">
          <div className="mx-4">
            <h1 className="mb-6 text-2xl font-bold">{t("terms.h1")}</h1>
            <p className="mb-4">{t("terms.lastUpdated")}</p>

            <section className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">
                1. {t("terms.acceptanceOfTerms.h2")}
              </h2>
              <p>{t("terms.acceptanceOfTerms.p-1")}</p>
            </section>

            <section className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">
                2. {t("terms.changesToTerms.h2")}
              </h2>
              <p>{t("terms.changesToTerms.p-1")}</p>
            </section>

            <section className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">
                3. {t("terms.limitationsOfLiability.h2")}
              </h2>
              <p>{t("terms.limitationsOfLiability.p-1")}</p>
            </section>
            <section className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">
                4. {t("terms.governingLaw.h2")}
              </h2>
              <p>{t("terms.governingLaw.p-1")}</p>
            </section>
            <ContactUsParagraph
              lang={lang}
              handleGoToContact={handleGoToContact}
              content={contentInfo}
              num={5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
