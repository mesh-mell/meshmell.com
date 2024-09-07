import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

type ForSponsorsType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const ForSponsors = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ForSponsorsType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      forSponsors: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      forSponsors: false,
    }));
  };

  return (
    <>
      {modalOpen.forSponsors && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 overflow-y-auto rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[450px] ${modalOpen.forSponsors ? "translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "-translate-x-[0px] translate-y-full ease-out sm:translate-x-full sm:translate-y-[0px]"}`}
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
        <div className="z-100 mx-6">
          <h1 className="mb-6 text-2xl font-bold">{t("forSponsors.title")}</h1>
          <div className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-base">
            <p>{t("forSponsors.description")}</p>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
              <h3 className="mb-2 text-2xl font-bold">
                {t("forSponsors.donation.oneThousand.title")}
              </h3>
              <ul>
                <li>
                  {t("forSponsors.donation.textSize")}:{" "}
                  {t("forSponsors.donation.oneThousand.textSize")}
                </li>
                <li>
                  {t("forSponsors.donation.contrast")}:{" "}
                  {t("forSponsors.donation.oneThousand.contrast")}
                </li>
                <li>
                  {t("forSponsors.donation.link")}:{" "}
                  {t("forSponsors.donation.oneThousand.link")}
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
              <h3 className="mb-2 text-2xl font-bold">
                {t("forSponsors.donation.fiveHundred.title")}
              </h3>
              <ul>
                <li>
                  {t("forSponsors.donation.textSize")}:{" "}
                  {t("forSponsors.donation.fiveHundred.textSize")}
                </li>
                <li>
                  {t("forSponsors.donation.contrast")}:{" "}
                  {t("forSponsors.donation.fiveHundred.contrast")}
                </li>
                <li>
                  {t("forSponsors.donation.link")}:{" "}
                  {t("forSponsors.donation.fiveHundred.link")}
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
              <h3 className="mb-2 text-2xl font-bold">
                {t("forSponsors.donation.oneHundred.title")}
              </h3>
              <ul>
                <li>
                  {t("forSponsors.donation.textSize")}:{" "}
                  {t("forSponsors.donation.oneHundred.textSize")}{" "}
                </li>
                <li>
                  {t("forSponsors.donation.contrast")}:{" "}
                  {t("forSponsors.donation.oneHundred.contrast")}
                </li>
                <li>
                  {t("forSponsors.donation.link")}:{" "}
                  {t("forSponsors.donation.oneHundred.link")}{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForSponsors;
