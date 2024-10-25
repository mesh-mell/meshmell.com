"use client";

import { get, ref } from "firebase/database";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import ModalWrapper from "@/src/components/ModalWrapper";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";
import { SponsorInfoType } from "@/src/types/sponsors";
import { defaultSponsorInfo } from "@/src/utils/defaultData/sponsors";
import { database } from "@/src/utils/firebase/firebase.config";

import EachSponsor from "./EachSponsor";

type SponsorsType<T> = {
  lang: LanguageType;
  modalOpen: T;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Sponsors = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
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
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      sponsors: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.sponsors}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="600"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
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
    </ModalWrapper>
  );
};

export default Sponsors;
