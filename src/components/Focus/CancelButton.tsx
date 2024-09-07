import { useRouter, useSearchParams } from "next/navigation";
import { ImCross } from "react-icons/im";

import { LanguageType } from "@/src/types/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

type CancelButtonType = {
  lang: LanguageType;
};

const CancelButton = ({ lang }: CancelButtonType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleUnFocus = () => {
    newRouterPush(
      lang,
      [
        { key: "focusedMode", value: "off" },
        { key: "action", value: "none" },
        { key: "wireFrame", value: "off" },
      ],
      searchParams,
      router,
    );
  };

  return (
    <button
      className="mt-4 cursor-pointer rounded-full border-[1.5px] border-black bg-neutral-100 p-6 text-3xl shadow-lg dark:border-white dark:bg-neutral-950 sm:border-[3px]"
      onClick={handleUnFocus}
    >
      <ImCross />
    </button>
  );
};

export default CancelButton;
