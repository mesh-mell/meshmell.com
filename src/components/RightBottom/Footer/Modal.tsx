import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

import Logo from "@/src/components/Logo";
import SnsLinksForMeshmell from "@/src/components/ModalComponents/SnsLinksForMeshmell";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

type FooterType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Footer = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: FooterType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      footer: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      footer: false,
    }));
  };

  const setAboutModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      about: true,
    }));
  };

  const setContactModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      contact: true,
    }));
  };

  const setWhoModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      who: true,
    }));
  };

  const setTermsModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      terms: true,
    }));
  };

  const setPrivacyModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      privacy: true,
    }));
  };

  const setCopyRightModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      copyRight: true,
    }));
  };

  const setForDevelopersModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      forDevelopers: true,
    }));
  };

  const setForSponsorsModalOpen = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      forSponsors: true,
    }));
  };

  return (
    <>
      {modalOpen.footer && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[450px] ${modalOpen.footer ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
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
        <div className="flex h-full flex-col justify-around">
          <div className="flex justify-start">
            <Logo lang={lang} isInFooter canBeClicked={false} />
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-base font-semibold">
              <div
                className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
                onClick={setAboutModalOpen}
              >
                <div>{t("about.footer")}</div>
              </div>
              <div
                className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
                onClick={setContactModalOpen}
              >
                <div>{t("contact.footer")}</div>
              </div>
              <div
                className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
                onClick={setWhoModalOpen}
              >
                <div>{t("who.footer")}</div>
              </div>
            </div>
            <ul>
              <li className="cursor-pointer" onClick={setTermsModalOpen}>
                <div className="hover:underline">{t("terms.footer")}</div>
              </li>
              <li className="cursor-pointer" onClick={setPrivacyModalOpen}>
                <div className="hover:underline">
                  {t("privacyPolicy.footer")}
                </div>
              </li>
              <li className="cursor-pointer" onClick={setCopyRightModalOpen}>
                <div className="hover:underline">{t("copyRight.footer")}</div>
              </li>
              <li
                className="cursor-pointer"
                onClick={setForDevelopersModalOpen}
              >
                <div className="hover:underline">
                  {t("forDevelopers.footer")}
                </div>
              </li>
              <li className="cursor-pointer" onClick={setForSponsorsModalOpen}>
                <div className="hover:underline">{t("forSponsors.footer")}</div>
              </li>
            </ul>
            <SnsLinksForMeshmell lang={lang} />
            <div className="text-xs">
              <div>© Meshmell 2023. All rights reserved</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
