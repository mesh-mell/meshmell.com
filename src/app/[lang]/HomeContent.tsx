import { FaShare } from "react-icons/fa";
import { GiCubes } from "react-icons/gi";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

import CardLink from "./CardLink";

type HomeHeaderType = {
  lang: LanguageType;
};

const HomeContent = ({ lang }: HomeHeaderType) => {
  const userId = "1";

  const { t } = useTranslation(lang, "main");

  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <CardLink
        href={`/${lang}/exhibition`}
        title={t("exhibition.description")}
        description={t("share.noLoginRequired")}
        icon={<GiCubes />}
      />
      <CardLink
        href={`/${lang}/share/${userId}`}
        title={t("share.description")}
        description={t("share.loginRequired")}
        icon={<FaShare />}
      />
    </div>
  );
};

export default HomeContent;
