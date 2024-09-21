import { Dispatch, SetStateAction } from "react";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

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

  return (
    <ModalWrapper
      isVisible={modalOpen.terms}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
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
    </ModalWrapper>
  );
};

export default Terms;
