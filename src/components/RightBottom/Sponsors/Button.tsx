"use client";

import { Dispatch, SetStateAction } from "react";
import { FaPeopleGroup } from "react-icons/fa6";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Button from "../../Button";

type SponsorsButtonType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
};

const SponsorButton = ({ lang, setModalOpen }: SponsorsButtonType) => {
  const { t } = useTranslation(lang, "main");

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      sponsors: !prevState.sponsors,
    }));
  };

  let classNameForButton = "select-none -mt-2" + " ";

  switch (lang) {
    case "en":
      classNameForButton += "text-sm";
      break;
    case "ja":
      classNameForButton += "text-[10px]";
      break;
    default:
      classNameForButton += "text-sm";
      break;
  }

  return (
    <Button handleClick={handleClick}>
      <div className="flex flex-col justify-center p-1">
        <FaPeopleGroup className="mx-auto text-3xl sm:text-4xl" />
        <div className={classNameForButton}>{t("sponsors.title")}</div>
      </div>
    </Button>
  );
};

export default SponsorButton;
