"use client";
import Link from "next/link";
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
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForHome } from "@/src/types/modals";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";

import HomeHeader from "./HomeHeader";

const Home = ({ lang }: { lang: LanguageType }) => {
  const userId = "1";
  const { t } = useTranslation(lang, "main");

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

      <div className='w-screen h-screen'>
        <div className='flex items-center justify-center flex-col h-full gap-4'>
          <div className='flex items-center justify-center text-5xl font-bold'>
            {t("home.title")}
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col md:flex-row justify-center items-center'>
              <Link href={`/${lang}/exhibition`}>
                <div className='h-[300px] p-4 w-[500px] rounded-lg border border-gray-200 shadow-md bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 m-2 flex flex-col items-center justify-center gap-4'>
                  <div className='font-bold text-center text-2xl'>
                    {t("exhibition.description")}
                  </div>
                  <div>{t("share.noLoginRequired")}</div>
                </div>
              </Link>
              <Link href={`/${lang}/share/${userId}`}>
                <div className='h-[300px] p-4 w-[500px] rounded-lg border border-gray-200 shadow-md bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 m-2 flex flex-col items-center justify-center gap-4'>
                  <div className='font-bold text-center text-2xl'>
                    {t("share.description")}
                  </div>
                  <div>{t("share.loginRequired")}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
