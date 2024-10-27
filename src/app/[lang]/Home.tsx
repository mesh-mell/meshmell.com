"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import Header from "@/src/components/Header/Header";
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
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";

import HomeContent from "./HomeContent";
import SingleModelSceneForHome from "./share/[userId]/[modelId]/SingleModelSceneForHome";
import homeDefaultObj from "./share/[userId]/[modelId]/homeDefaultObj";

const Home = ({ lang }: { lang: LanguageType }) => {
  const [isWireFrame, setIsWireFrame] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<ModalOpenType>({
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
    actionsSwitch: false,
    creatorInfo: false,
    modelInfo: false,
  });

  const creators = [defaultCreatorDetails];
  const { t } = useTranslation(lang, "main");

  return (
    <>
      <Header
        lang={lang}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        focusedModelsObj={homeDefaultObj}
        isWireFrame={isWireFrame}
        setIsWireFrame={setIsWireFrame}
        isFocusedMode={true}
        inHome={true}
      />

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
      <div className="flex h-screen flex-col">
        <main className="flex flex-grow items-center justify-center">
          <div className="h-full w-full p-4 sm:p-6">
            <h1 className="mb-4 text-center text-4xl font-bold sm:mb-6">
              {t("home.title")}
            </h1>
            <div className="mx-auto mb-8 h-[70vh] w-[90vw] overflow-hidden rounded-lg border-2 shadow-lg">
              <Canvas shadows>
                <Suspense fallback={null}>
                  <SingleModelSceneForHome
                    isWireFrame={isWireFrame}
                    homeDefaultObj={homeDefaultObj}
                  />
                </Suspense>
              </Canvas>
            </div>
            <HomeContent lang={lang} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
