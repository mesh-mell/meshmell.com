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

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
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
    <>
      {modalOpen.privacy && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[450px] ${modalOpen.privacy ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
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
      </div>
    </>
  );
};

export default PrivacyPolicy;
