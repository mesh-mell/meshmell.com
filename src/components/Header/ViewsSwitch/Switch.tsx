import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";

import HorizontalViewIcon from "@/src/components/Svg/Views/HorizontalViewIcon";
import PerspectiveViewIcon from "@/src/components/Svg/Views/PerspectiveViewIcon";
import VerticalViewIcon from "@/src/components/Svg/Views/VerticalViewIcon";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { viewTypes } from "@/src/types/views";
import { newRouterPush } from "@/src/utils/newRouterPush";
import { views } from "@/src/utils/views";

import ModalWrapper from "../../ModalWrapper";

type ViewsSwitchModalType = {
  lang: string;
  modalOpen: ModalOpenTypeForExhibition;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  view: viewTypes;
};

const ViewsSwitchModal = ({
  lang,
  setModalOpen,
  setHoverOnModal,
  view,
  modalOpen,
}: ViewsSwitchModalType) => {
  const { theme } = useTheme();

  const { t } = useTranslation(lang, "main");
  const router = useRouter();

  const searchParams = useSearchParams();
  const handleClick = (paramValue: string) => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      viewsSwitch: false,
    }));
    newRouterPush(
      lang,
      [
        { key: "view", value: paramValue },
        { key: "focusedMode", value: "off" },
      ],
      searchParams,
      router,
    );
  };

  const handleClickClose = () => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      viewsSwitch: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.viewsSwitch}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="flex w-[180px] flex-col gap-8">
        <h2 className="text-2xl font-bold">{t("viewsSwitch.switchView")}</h2>
        {views.map(
          ({
            slug,
            name,
          }: {
            slug: string;
            name: { en: string; ja: string };
          }) => {
            const borderColor =
              slug === view
                ? theme === "light"
                  ? "border-white"
                  : "border-black"
                : theme === "light"
                  ? "border-black group-hover:border-blue-700"
                  : "border-white group-hover:border-blue-300";

            return (
              <div
                key={slug}
                className={`group select-none rounded-md p-2 ${slug === view ? "bg-emerald-500 fill-white text-white dark:fill-black dark:text-black" : "fill-black hover:fill-blue-700 hover:text-blue-700 dark:fill-white dark:hover:fill-blue-300 dark:hover:text-blue-300"} ${slug === "horizontal" ? "hidden sm:block" : "block md:block"}`}
                onClick={() => handleClick(slug)}
              >
                <div className="flex flex-col">
                  <div className="mb-[6px] text-xl font-semibold">
                    {name[lang as LanguageType]}
                  </div>
                  <div
                    className={`relative h-[100px] w-[100px] border-[4px] p-[4px] ${borderColor} rounded-lg`}
                  >
                    {slug === "perspective" ? (
                      <PerspectiveViewIcon />
                    ) : slug === "vertical" ? (
                      <VerticalViewIcon />
                    ) : (
                      <HorizontalViewIcon />
                    )}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </ModalWrapper>
  );
};

export default ViewsSwitchModal;
