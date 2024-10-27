"use client";

import { Canvas } from "@react-three/fiber";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import CreatorInfoButton from "@/src/components/Focus/CreatorInfo/Button";
import CreatorInfoModal from "@/src/components/Focus/CreatorInfo/Modal";
import ModelInfoButton from "@/src/components/Focus/ModelInfo/Button";
import ModelInfoModal from "@/src/components/Focus/ModelInfo/Modal";
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
import ShareButton from "@/src/components/RightBottom/Share/Button";
import Sponsors from "@/src/components/RightBottom/Sponsors/Modal";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";
import { defaultModelDetails } from "@/src/utils/defaultData/models";

import SingleModel from "./SingleModelScene";

interface ModalProps {
  lang: LanguageType;
  userId: string;
  modelId: string;
}

const SingleModelThreeApp = ({ lang, userId, modelId }: ModalProps) => {
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
    modelInfo: false,
    creatorInfo: false,
    actionsSwitch: false,
  });

  const creators = [defaultCreatorDetails];

  const [isWireFrame, setIsWireFrame] = useState<boolean>(false);
  const [focusedModelsObj, setFocusedModelsObj] =
    useState<ModelDetailsType>(defaultModelDetails);

  useEffect(() => {
    const modelObj = setFocusedModelsObj({
      ...defaultModelDetails,
      slug: modelId,
    });
  }, [modelId]);

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsWireFrame(searchParams.get("wireFrame") === "on" ? true : false);
  }, [searchParams.get("wireFrame")]);

  return (
    <div className={"h-[100vh] w-[100vw]"}>
      <Header lang={lang} modalOpen={modalOpen} />

      <div className="fixed bottom-[10px] left-[10px] z-[70] rounded-xl p-1">
        <ShareButton setModalOpen={setModalOpen} modalOpen={modalOpen} />
        <ModelInfoButton setModalOpen={setModalOpen} modalOpen={modalOpen} />
        <CreatorInfoButton
          lang={lang}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          focusedModelsSlug={focusedModelsObj.slug}
          models={models}
          creators={creators}
        />
      </div>

      <ModelInfoModal lang={lang} setModalOpen={setModalOpen} />

      <CreatorInfoModal
        lang={lang}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        focusedModelsObj={focusedModelsObj}
        focusedModelsCreatorsObj={focusedModelsCreatorsObj}
        isFocusedMode={isFocusedMode}
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

      <Canvas shadows>
        <Suspense fallback={null}>
          <SingleModel userId={userId} modelId={modelId} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SingleModelThreeApp;
