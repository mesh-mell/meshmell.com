import { Dispatch, SetStateAction } from "react";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type AboutType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const About = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: AboutType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      about: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.about}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="z-100 mx-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">{t("about.title")}</h1>
          <div className="mt-2 text-base">
            <p>{t("about.description")}</p>
          </div>
        </div>
        <div>
          <h2 className="mb-1 text-xl font-semibold">
            {t("about.articleAboutMeshmell")}
          </h2>
          <a
            href={`https://yurimell.com/${lang}/diary/detail/3`}
            className="text-blue-500 hover:underline"
          >
            {`https://yurimell.com/${lang}/diary/detail/3`}
          </a>
        </div>
        <div>
          <h2 className="mb-1 text-xl font-semibold">
            {t("about.articleAboutMeshmellTechnology")}
          </h2>
          <a
            href={`https://yurimell.com/${lang}/diary/detail/4`}
            className="text-blue-500 hover:underline"
          >
            {`https://yurimell.com/${lang}/diary/detail/4`}
          </a>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default About;
