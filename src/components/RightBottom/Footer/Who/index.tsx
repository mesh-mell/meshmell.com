import { Dispatch, SetStateAction } from "react";

import ModalWrapper from "@/src/components/ModalWrapper";
import SNSLinksForYuri from "@/src/components/RightBottom/Footer/Who/SnsLinks/YuriNakansihi";
import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

type WhoType<T> = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
  creators: CreatorDetailsType[];
};

const Who = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
  creators,
}: WhoType<T>) => {
  const { t } = useTranslation(lang, "main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      who: false,
    }));
  };

  const developersInfo = creators.filter((creator) =>
    creator.roles.includes("developer"),
  );

  return (
    <ModalWrapper
      isVisible={modalOpen.who}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="mx-4">
        <section className="mb-8 flex min-h-screen w-full flex-col">
          <h1 className={"mb-6 text-2xl font-bold"}>{t("who.developers")}</h1>
          {developersInfo.map((developer: CreatorDetailsType) => (
            <div key={developer.slug} className="mb-4">
              <div className="text-xl">
                {developer.name[lang as LanguageType]}
              </div>
              <div className="mb-2 text-base">
                {developer.description[lang as LanguageType]}
              </div>
              <SNSLinksForYuri />
            </div>
          ))}
        </section>
        <div>{t("who.contributorWanted")}</div>
      </div>
    </ModalWrapper>
  );
};

export default Who;
