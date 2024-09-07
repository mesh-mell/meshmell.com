"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type CopyEmailType = {
  lang: LanguageType;
};

const CopyEmail = ({ lang }: CopyEmailType) => {
  const { t } = useTranslation(lang, "main");

  const notify = () => toast(`${t("copied")}`);

  return (
    <div className="mt-4">
      <CopyToClipboard text="info@meshmell.com">
        <div
          className="flex cursor-pointer text-lg sm:text-xl"
          onClick={notify}
        >
          info@meshmell.com
          <span className="ml-1 mt-[6px] text-blue-600 dark:text-blue-400">
            <FiCopy />
          </span>
        </div>
      </CopyToClipboard>
      <Toaster />
    </div>
  );
};

export default CopyEmail;
