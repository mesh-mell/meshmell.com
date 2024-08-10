import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";

import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";
import { defaultModelDetails } from "@/src/utils/defaultData/models";

import Button from "../../Button";

type CreatorInfoButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: ModalOpenTypeForExhibition;
  focusedModelsSlug: string;
  lang: LanguageType;
  models: ModelDetailsType[];
  creators: CreatorDetailsType[];
};

const CreatorInfoButton = ({
  setModalOpen,
  modalOpen,
  focusedModelsSlug,
  lang,
  models,
  creators,
}: CreatorInfoButtonType) => {
  const currentModel =
    models.find(
      (model: ModelDetailsType) => model.slug === focusedModelsSlug,
    ) || defaultModelDetails;
  const focusedModelsSlugsCreator =
    creators.find(
      (creator: CreatorDetailsType) => creator.slug === currentModel.creator,
    ) || defaultCreatorDetails;
  const creatorSlug = focusedModelsSlugsCreator.slug
    ? focusedModelsSlugsCreator.slug
    : "PlaceHolder";

  useEffect(() => {}, [focusedModelsSlug]);

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      creatorInfo: !prevState.creatorInfo,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
      creatorFilter: false,
      categoryFilter: false,
      search: false,
      terms: false,
      privacy: false,
      contact: false,
      about: false,
      who: false,
      forDevelopers: false,
      forSponsors: false,
      lightAndDarkTheme: false,
      copyRight: false,
      viewsSwitch: false,
      sponsors: false,
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  };

  return (
    <Button handleClick={handleClick} isActive={modalOpen.creatorInfo}>
      <Image
        src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
        width={30}
        height={30}
        alt={focusedModelsSlugsCreator.name[lang as LanguageType]}
        className="rounded-md"
      />
    </Button>
  );
};

export default CreatorInfoButton;
