import { Dispatch, SetStateAction } from "react";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ForDevelopersType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const ForDevelopers = <
  T extends ModalOpenType | ModalOpenType | ModalOpenType,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ForDevelopersType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      forDevelopers: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.forDevelopers}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="z-100 mx-6">
        <h1 className="mb-6 text-2xl font-bold">{t("forDevelopers.title")}</h1>
        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-base">
          <p>
            {t("forDevelopers.sourceCode")}
            <a
              href={` ${process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}`}
              className="text-blue-500 hover:underline"
            >
              {process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}
            </a>
          </p>
          <p>{t("forDevelopers.recruit")}</p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ForDevelopers;
