import { Dispatch, SetStateAction } from "react";
import { RiShareBoxFill } from "react-icons/ri";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type CopyRightType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const CopyRight = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: CopyRightType<T>) => {
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
      copyRight: false,
    }));
  };

  const contentInfo = {
    en: "CopyRight",
    ja: "著作権ポリシー",
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.copyRight}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="flex max-h-[90%] flex-col gap-12 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold">{t("copyRight.h1")}</h1>
          <p className="mt-2">{t("copyRight.lastUpdated")}</p>
        </div>
        <section className="flex flex-col gap-8">
          <div>
            <h2 className="mb-1 text-xl font-semibold">
              1. {t("copyRight.licenseOfEachModel.h2")}
            </h2>
            <p>{t("copyRight.licenseOfEachModel.p-1")}</p>
            <div className="flex cursor-pointer text-base text-blue-600 dark:text-blue-400">
              <span>{t("copyRight.cc0")}</span>
              <span className="ml-1 mt-[6px] sm:mt-[5px]">
                <a href="https://creativecommons.org/publicdomain/zero/1.0/">
                  <RiShareBoxFill />
                </a>
              </span>
            </div>
            <p className="mt-2">{t("copyRight.licenseOfEachModel.p-2")}</p>
          </div>
          <div>
            <h2 className="mb-1 text-xl font-semibold">
              2. {t("copyRight.licenseOfSoftware.h2")}
            </h2>
            <p>{t("copyRight.licenseOfSoftware.p-1")}</p>
            <p>
              {t("copyRight.licenseOfSoftware.p-2")}
              <a
                href={`${process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}`}
                className="text-blue-500 hover:underline"
              >
                {process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}
              </a>
            </p>
          </div>
          <div>
            <h2 className="mb-1 text-xl font-semibold">
              3. {t("copyRight.changesToThisCopyrightPolicy.h2")}
            </h2>
            <p>{t("copyRight.changesToThisCopyrightPolicy.p-1")}</p>
          </div>
        </section>
        <ContactUsParagraph
          lang={lang}
          handleGoToContact={handleGoToContact}
          content={contentInfo}
          num={4}
        />
      </div>
    </ModalWrapper>
  );
};

export default CopyRight;
