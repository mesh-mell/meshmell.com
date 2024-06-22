import { ImCross } from "react-icons/im";

import Logo from "@/src/components/Logo";
import SnsLinksForMeshmell from "@/src/components/ModalComponents/SnsLinksForMeshmell";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
} from "@/src/types/modals";

type FooterType<T> = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: T;
  setHoverOnModal?: (hoverOnModal: boolean) => void;
};

const Footer = <T extends ModalOpenTypeForHome | ModalOpenTypeForExhibition>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: FooterType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: any) => {
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
          className='fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen'
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.footer ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className='flex justify-end mb-4'>
          <div
            onClick={handleClickClose}
            className={
              "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"
            }
          >
            <button className='text-base sm:text-xl font-bold'>
              <ImCross />
            </button>
          </div>
        </div>
        <div className='flex flex-col justify-around h-full'>
          <div className='flex justify-start'>
            <Logo lang={lang} isInFooter canBeClicked={false} />
          </div>
          <div className='flex flex-col gap-8'>
            <div className='text-base font-semibold'>
              <div
                className='hover:underline cursor-pointer bg-transparent outline-current appearance-none w-36'
                onClick={setAboutModalOpen}
              >
                <div>{t("about.footer")}</div>
              </div>
              <div
                className='hover:underline cursor-pointer bg-transparent outline-current appearance-none w-36'
                onClick={setContactModalOpen}
              >
                <div>{t("contact.footer")}</div>
              </div>
              <div
                className='hover:underline cursor-pointer bg-transparent outline-current appearance-none w-36'
                onClick={setWhoModalOpen}
              >
                <div>{t("who.footer")}</div>
              </div>
            </div>
            <ul>
              <li className='cursor-pointer' onClick={setTermsModalOpen}>
                <div className='hover:underline'>{t("terms.footer")}</div>
              </li>
              <li className='cursor-pointer ' onClick={setPrivacyModalOpen}>
                <div className='hover:underline'>
                  {t("privacyPolicy.footer")}
                </div>
              </li>
              <li className='cursor-pointer' onClick={setCopyRightModalOpen}>
                <div className='hover:underline'>{t("copyRight.footer")}</div>
              </li>
              <li
                className='cursor-pointer'
                onClick={setForDevelopersModalOpen}
              >
                <div className='hover:underline'>
                  {t("forDevelopers.footer")}
                </div>
              </li>
              <li className='cursor-pointer' onClick={setForSponsorsModalOpen}>
                <div className='hover:underline'>{t("forSponsors.footer")}</div>
              </li>
            </ul>
            <SnsLinksForMeshmell lang={lang} />
            <div className='text-xs'>
              <div>© Meshmell 2023. All rights reserved</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
