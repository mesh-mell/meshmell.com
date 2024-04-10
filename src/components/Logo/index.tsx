import { useRouter } from "next/navigation"

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type LogoType = {
  lang: LanguageType;
  isInFooter?: boolean;
}

const Logo = ({ lang, isInFooter }: LogoType) => {

  const { t } = useTranslation(lang, "main");

  const router = useRouter();
  const handleResetCamera = () => {
    router.push(`/${lang}/`)
  };

  let baseClass = "font-bold text-black dark:text-white sm:-mt-[20px] sm:ml-1";

  if (isInFooter) {
    baseClass += "text-[1.25rem] -mt-[20px]";
  } else {
    baseClass += "-mt-[14px]";
    switch (lang) {
      case "en":
        baseClass += " text-[0.875rem] ml-[1px]";
        break;
      case "ja":
        baseClass += " text-[0.75rem] ml-[2px]";
        break;
      default:
        baseClass += "";
        break;
    }
  }

  return (
    <div className={"cursor-pointer mb-1 sm:mb-0"} onClick={handleResetCamera}>
      <div className={`${lang === "en" ? "-tracking-[.04em] font-sans leading-[1.4] sm:leading-[1.4]" : "-tracking-[7px] sm:-tracking-[8px] font-sans leading-[1.6] sm:leading-[1.6]"} bg-clip-text text-transparent bg-gradient-to-l from-[#ffaa00] to-[#b300ff] font-bold mt-[-10px] ${isInFooter ? "text-[3rem]" : "text-[1.875rem] select-none"} sm:text-[3rem]`}>{t("logo.logo")}</div>
      <div className={baseClass}>
        {t("logo.description")}
      </div>
    </div >
  )
}

export default Logo