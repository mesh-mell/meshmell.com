"use client";

import { useState } from "react";

import RightBottomButtons from "@/src/components/RightBottom/Buttons";
import About from "@/src/components/RightBottom/Footer/About";
import Contact from "@/src/components/RightBottom/Footer/Contact";
import CopyRight from "@/src/components/RightBottom/Footer/CopyRight";
import ForDevelopers from "@/src/components/RightBottom/Footer/ForDevelopers";
import ForSponsors from "@/src/components/RightBottom/Footer/ForSponsors";
import Footer from "@/src/components/RightBottom/Footer/Modal";
import PrivacyPolicy from "@/src/components/RightBottom/Footer/PrivacyPolicy";
import Terms from "@/src/components/RightBottom/Footer/Terms";
import Who from "@/src/components/RightBottom/Footer/Who";
import LanguageSwitchModal from "@/src/components/RightBottom/Language/Modal";
import Sponsors from "@/src/components/RightBottom/Sponsors/Modal";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForHome } from "@/src/types/modals";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";

import HomeContent from "./HomeContent";
import HomeHeader from "./HomeHeader";

const Home = ({ lang }: { lang: LanguageType }) => {
  const [modalOpen, setModalOpen] = useState<ModalOpenTypeForHome>({
    terms: false,
    privacy: false,
    contact: false,
    about: false,
    who: false,
    forDevelopers: false,
    forSponsors: false,
    lightAndDarkTheme: false,
    language: false,
    footer: false,
    sponsors: false,
    shareThisPage: false,
    copyRight: false,
  });

  const creators = [defaultCreatorDetails];

  return (
    <>
      <HomeHeader lang={lang} modalOpen={modalOpen} />

      <RightBottomButtons
        lang={lang}
        setModalOpen={setModalOpen}
        isIn3D={false}
      />

      <LanguageSwitchModal
        setModalOpen={setModalOpen}
        lang={lang}
        modalOpen={modalOpen}
      />

      <Footer lang={lang} setModalOpen={setModalOpen} modalOpen={modalOpen} />

      <Terms lang={lang} setModalOpen={setModalOpen} modalOpen={modalOpen} />

      <PrivacyPolicy
        lang={lang}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />

      <Contact lang={lang} setModalOpen={setModalOpen} modalOpen={modalOpen} />

      <About lang={lang} setModalOpen={setModalOpen} modalOpen={modalOpen} />

      <Who
        lang={lang}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        creators={creators}
      />

      <CopyRight
        lang={lang}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />

      <ForDevelopers
        lang={lang}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <ForSponsors
        lang={lang}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />

      <Sponsors lang={lang} setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <HomeContent lang={lang} />
    </>
  );
};

export default Home;
