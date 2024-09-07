import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { RiShareBoxFill } from "react-icons/ri";

import CopyCredit from "@/src/components/ModalComponents/CopyCredit";
import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

import CreatorInfoSNS from "./SNS";

type CreatorInfoType = {
  creatorsObj: CreatorDetailsType;
  lang: LanguageType;
  isFocusedMode: boolean;
};

const CreatorInfo = ({ creatorsObj, lang, isFocusedMode }: CreatorInfoType) => {
  const { t } = useTranslation(lang, "main");

  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorSlug = creatorsObj.slug ? creatorsObj.slug : "PlaceHolder";
  const handleGotoFilter = () => {
    newRouterPush(
      lang,
      [
        { key: "creator", value: creatorsObj.slug },
        { key: "focusedMode", value: "off" },
      ],
      searchParams,
      router,
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <h2 className="flex gap-2 text-3xl font-bold">
          {creatorsObj.slug !== "" && (
            <div className="h-[30px] w-[30px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
                width={30}
                height={30}
                alt={creatorsObj.name[lang as LanguageType]}
                className="rounded-md"
              />
            </div>
          )}
          <span>{creatorsObj.name[lang as LanguageType]}</span>
        </h2>
        <CopyCredit lang={lang} creatorsObj={creatorsObj} />
      </div>
      <div className="text-xl">
        {creatorsObj.description[lang as LanguageType]}
      </div>
      <CreatorInfoSNS creatorsObj={creatorsObj} />
      {isFocusedMode && (
        <div
          className="mt-4 flex select-none items-center gap-2 sm:mt-8"
          onClick={handleGotoFilter}
        >
          <div className="cursor-pointer text-base">
            {t("creatorInfo.seeMoreModels")}
          </div>
          <RiShareBoxFill className="text-xl text-blue-600 dark:text-blue-400 sm:text-2xl" />
        </div>
      )}
    </div>
  );
};

export default CreatorInfo;
