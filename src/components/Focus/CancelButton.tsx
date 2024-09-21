import { useRouter, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

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
      className="custom-bg-gray-normal-button mt-4 cursor-pointer rounded-full p-3 text-3xl font-bold shadow-lg sm:p-4 sm:text-5xl"
      onClick={handleUnFocus}
    >
      <RxCross2 />
    </button>
  );
};

export default CancelButton;
