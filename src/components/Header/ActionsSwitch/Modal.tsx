import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { ActionDetailsType } from "@/src/types/actions";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { defaultActionsDetails } from "@/src/utils/defaultData/actions";
import { newRouterPush } from "@/src/utils/newRouterPush";

type ActionsSwitchModalType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  lang: LanguageType;
  modalOpen: ModalOpenTypeForExhibition;
  focusedModelsObj: ModelDetailsType;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  currentAction: string;
  actions: ActionDetailsType[];
};

const ActionsSwitchModal = ({
  setModalOpen,
  lang,
  modalOpen,
  focusedModelsObj,
  setHoverOnModal,
  currentAction,
  actions,
}: ActionsSwitchModalType) => {
  const { t } = useTranslation(lang, "main");

  const searchParams = useSearchParams();

  const router = useRouter();

  const focusedModelsActionsList = focusedModelsObj.actions?.map(
    (action: string) =>
      actions.find(
        (actionData: ActionDetailsType) => actionData.slug === action,
      ) || defaultActionsDetails,
  );

  const handleClick = (paramValue: string) => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      actionsSwitch: false,
    }));
    newRouterPush(
      lang,
      [{ key: "action", value: paramValue }],
      searchParams,
      router,
    );
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      actionsSwitch: false,
    }));
  };

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      actionsSwitch: false,
    }));
  };

  return (
    <>
      {modalOpen.actionsSwitch && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.actionsSwitch ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className="mb-4 flex justify-end">
          <div
            onClick={handleClickClose}
            className={
              "flex h-12 w-12 items-center justify-center rounded-full border-[2.2px] border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-[3px]"
            }
          >
            <button className="text-base font-bold sm:text-xl">
              <ImCross />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold">{t("actionsSwitch.title")}</h2>
          <div className="flex max-h-[80%] flex-col gap-2 overflow-y-auto">
            <div
              onClick={() => handleClick("none")}
              className={`${currentAction === "none" ? "bg-emerald-500 text-white dark:text-black" : "border-2 hover:text-blue-700 dark:hover:text-blue-300"} flex cursor-pointer items-center justify-between rounded-md px-2 py-1`}
            >
              {t("actionsSwitch.stopAction")}
            </div>
            {focusedModelsActionsList?.map(
              ({ name, icon, slug }: ActionDetailsType) => (
                <div
                  onClick={() => handleClick(slug)}
                  key={slug}
                  className={`${currentAction === slug ? "bg-emerald-500 text-white dark:text-black" : "border-2 hover:text-blue-700 dark:hover:text-blue-300"} flex cursor-pointer items-center justify-between rounded-md px-2 py-1`}
                >
                  <div>{name[lang as LanguageType]}</div>
                  <div className="mb-2 mr-2 w-20 rounded-md">{icon}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionsSwitchModal;
