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

type PrivacyPolicyType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const PrivacyPolicy = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: PrivacyPolicyType<T>) => {
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
      privacy: false,
    }));
  };

  const contentInfo = {
    en: "Privacy Policy",
    ja: "プライバシーポリシー",
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.privacy}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="max-h-[90%] overflow-y-auto">
        <h1 className="mb-6 text-2xl font-bold">{t("privacyPolicy.h1")}</h1>

        <p className="mb-4">{t("privacyPolicy.lastUpdated")}</p>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">
            1. {t("privacyPolicy.informationWeCollect.h2")}
          </h2>
          <p>{t("privacyPolicy.informationWeCollect.p-1")}</p>
          <p>{t("privacyPolicy.informationWeCollect.p-2")}</p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">
            2. {t("privacyPolicy.changesToThisPrivacyPolicy.h2")}
          </h2>
          <p>{t("privacyPolicy.changesToThisPrivacyPolicy.p-1")}</p>
        </section>

        {/* <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {t("privacyPolicy.thirdPartyAdvertisements.h2")}
            </h2>
            <p>
              {t("privacyPolicy.thirdPartyAdvertisements.p-1")}
            </p>
          </section> */}

        <ContactUsParagraph
          lang={lang}
          handleGoToContact={handleGoToContact}
          content={contentInfo}
          num={3}
        />
      </div>
    </ModalWrapper>
  );
};

export default PrivacyPolicy;
