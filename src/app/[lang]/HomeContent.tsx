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
    <div className="h-screen w-screen">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center text-5xl font-bold">
          {t("home.title")}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center md:flex-row">
            <Link href={`/${lang}/exhibition`}>
              <div className="m-2 flex h-[300px] w-[500px] flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800">
                <div className="text-center text-2xl font-bold">
                  {t("exhibition.description")}
                </div>
                <div>{t("share.noLoginRequired")}</div>
              </div>
            </Link>
            <Link href={`/${lang}/share/${userId}`}>
              <div className="m-2 flex h-[300px] w-[500px] flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800">
                <div className="text-center text-2xl font-bold">
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
