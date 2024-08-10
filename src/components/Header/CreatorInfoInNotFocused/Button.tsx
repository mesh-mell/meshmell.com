import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RiShareBoxFill } from "react-icons/ri";

import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Button from "../../Button";

type CreatorInfoButtonInNotFocusedType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: ModalOpenTypeForExhibition;
  filteredCreatorsObj: CreatorDetailsType;
  lang: LanguageType;
};

const CreatorInfoButtonInNotFocused = ({
  setModalOpen,
  modalOpen,
  filteredCreatorsObj,
  lang,
}: CreatorInfoButtonInNotFocusedType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      creatorInfoInNotFocused: !prevState.creatorInfoInNotFocused,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      footer: false,
      language: false,
      categoryFilter: false,
      creatorFilter: false,
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
      search: false,
    }));
  };

  const creatorSlug = filteredCreatorsObj.slug
    ? filteredCreatorsObj.slug
    : "PlaceHolder";

  return (
    <div className="fixed top-[60px] sm:top-[80px] right-[10px] flex cursor-pointer justify-start items-center z-50">
      <Button
        handleClick={handleClick}
        isActive={modalOpen.creatorInfoInNotFocused}
      >
        <div className="w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
            fill
            alt={filteredCreatorsObj.name[lang as LanguageType]}
            className="rounded-lg"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 5vw"
          />
        </div>
        <span className="mt-[2px] sm:mt-[2px] text-3xl sm:text-4xl">
          <RiShareBoxFill
            className={`${modalOpen.creatorInfoInNotFocused ? "text-white dark-text-white" : "text-black dark:text-white"}`}
          />
        </span>
      </Button>
    </div>
  );
};

export default CreatorInfoButtonInNotFocused;
