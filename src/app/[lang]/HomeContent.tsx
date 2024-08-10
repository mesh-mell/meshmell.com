import Link from "next/link";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type HomeHeaderType = {
  lang: LanguageType;
};

const HomeContent = ({ lang }: HomeHeaderType) => {
  const userId = "1";

  const { t } = useTranslation(lang, "main");

  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center flex-col h-full gap-4">
        <div className="flex items-center justify-center text-5xl font-bold">
          {t("home.title")}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <Link href={`/${lang}/exhibition`}>
              <div className="h-[300px] p-4 w-[500px] rounded-lg border border-gray-200 shadow-md bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 m-2 flex flex-col items-center justify-center gap-4">
                <div className="font-bold text-center text-2xl">
                  {t("exhibition.description")}
                </div>
                <div>{t("share.noLoginRequired")}</div>
              </div>
            </Link>
            <Link href={`/${lang}/share/${userId}`}>
              <div className="h-[300px] p-4 w-[500px] rounded-lg border border-gray-200 shadow-md bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 m-2 flex flex-col items-center justify-center gap-4">
                <div className="font-bold text-center text-2xl">
                  {t("share.description")}
                </div>
                <div>{t("share.loginRequired")}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
