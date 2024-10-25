import { Dispatch, SetStateAction } from "react";

import CopyEmail from "@/src/components/ModalComponents/CopyEmail";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ContactType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Contact = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ContactType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      contact: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.contact}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="z-1">
        <h1 className={"mb-4 text-2xl font-bold"}>{t("contact.contact")}</h1>
        <p className="mt-12 text-base">{t("contact.email")}</p>
        <CopyEmail lang={lang} />
      </div>
    </ModalWrapper>
  );
};

export default Contact;
