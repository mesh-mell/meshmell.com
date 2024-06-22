"use client";
import Link from "next/link";
import { useState } from "react";

import RightBottomButtons from "@/src/components/RightBottom/Buttons";
import Footer from "@/src/components/RightBottom/Footer/Modal";
import LanguageSwitchModal from "@/src/components/RightBottom/Language/Modal";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForHome } from "@/src/types/modals";

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
  });

  return (
    <>
      <RightBottomButtons lang={lang} setModalOpen={setModalOpen} />
      <Footer lang={lang} setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <LanguageSwitchModal
        setModalOpen={setModalOpen}
        lang={lang}
        modalOpen={modalOpen}
      />
      <div className='w-screen h-screen'>
        <div className='flex items-center justify-center flex-col h-full gap-4'>
          <div className='flex items-center justify-center text-5xl font-bold'>
            {t("home.title")}
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col md:flex-row justify-center items-center'>
              <Link href={`/${lang}/exhibition`}>
                <div className='h-[300px] p-4 w-[500px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 m-2 flex flex-col items-center justify-center gap-4'>
                  <div className='font-bold text-center text-2xl'>
                    {t("exhibition.description")}
                  </div>
                  <div>{t("share.noLoginRequired")}</div>
                </div>
              </Link>
              <Link href={`/${lang}/share/${userId}`}>
                <div className='h-[300px] p-4 w-[500px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 m-2 flex flex-col items-center justify-center gap-4'>
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
