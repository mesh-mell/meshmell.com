"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

import FlagComponent from "./FlagComponent";

type LanguagePopupType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  text: string;
};

const LanguageFlag = ({ lang, setModalOpen, text }: LanguagePopupType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const cleanedPathname = pathname.replace(/(\/ja|\/en)/g, "");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      language: false,
    }));
  };

  return (
    <Link
      href={`/${lang}/${cleanedPathname}/?${searchParams}`}
      onClick={handleClickClose}
    >
      <div className="flex cursor-pointer">
        <div className="h-6 w-8 shadow-md">
          <FlagComponent lang={lang} />
        </div>
        <div className={"ml-2 select-none"}>{text}</div>
      </div>
    </Link>
  );
};

export default LanguageFlag;
