"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import FlagComponent from "./FlagComponent";

type LanguagePopupType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  text: string;
};

const LanguageFlag = ({ lang, setModalOpen, text }: LanguagePopupType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const cleanedPathname = pathname.replace(/(\/ja|\/en)/g, "");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
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
