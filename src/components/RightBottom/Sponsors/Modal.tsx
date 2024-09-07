"use client";

import { get, ref } from "firebase/database";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";
import { SponsorInfoType } from "@/src/types/sponsors";
import { defaultSponsorInfo } from "@/src/utils/defaultData/sponsors";
import { database } from "@/src/utils/firebase/firebase.config";

import EachSponsor from "./EachSponsor";

type SponsorsType<T> = {
  lang: LanguageType;
  modalOpen: T;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Sponsors = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  setHoverOnModal,
  modalOpen,
}: SponsorsType<T>) => {
  const { t } = useTranslation(lang, "main");
  const [sponsors, setSponsors] = useState([defaultSponsorInfo]);

  useEffect(() => {
    let sponsorsData: SponsorInfoType[] = [defaultSponsorInfo];
    const sponsorsRef = ref(database, "exhibition/sponsors");
    get(sponsorsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          sponsorsData = snapshot.val();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSponsors(sponsorsData);
      });
  }, []);

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      sponsors: false,
    }));
  };

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      sponsors: false,
    }));
  };

  return (
    <>
      {modalOpen.sponsors && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[600px] ${modalOpen.sponsors ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
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
            <button className="text-base font-bold text-black dark:text-white sm:text-xl">
              <ImCross />
            </button>
          </div>
        </div>
        <div className="text-white">
          <h2
            className={`font-bold ${lang === "en" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} mb-8 text-center text-black dark:text-white`}
          >
            {t("sponsors.thankTo_1")}
            <br />
            {t("sponsors.thankTo_2")}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-[12px] gap-y-0">
            {sponsors.map((sponsor: SponsorInfoType) => (
              <EachSponsor key={sponsor.id} sponsor={sponsor} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
