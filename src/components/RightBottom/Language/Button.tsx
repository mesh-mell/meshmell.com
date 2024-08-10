"use client";

import { Dispatch, SetStateAction } from "react";

import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Button from "../../Button";

import FlagComponent from "./FlagComponent";

type ChangeLanguageType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
};

const ChangeLanguage = ({ lang, setModalOpen }: ChangeLanguageType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      language: !prevState.language,
      footer: false,
    }));
  };

  return (
    <Button handleClick={handleClick}>
      <div className="h-[28px] w-[28px] sm:h-8 sm:w-8 flex justify-center items-center">
        <div className="shadow-md w-[28px] sm:w-8">
          <FlagComponent lang={lang} />
        </div>
      </div>
    </Button>
  );
};

export default ChangeLanguage;
