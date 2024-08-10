import { Dispatch, SetStateAction } from "react";
import { FaShareSquare } from "react-icons/fa";

import {
  ModalOpenTypeForExhibition,
  ModalOpenTypeForHome,
  ModalOpenTypeForShare,
} from "@/src/types/modals";

import Button from "../../Button";

type ShareModalButtonType<T> = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: T;
};

const ShareModalButton = <
  T extends
    | ModalOpenTypeForHome
    | ModalOpenTypeForShare
    | ModalOpenTypeForExhibition,
>({
  setModalOpen,
  modalOpen,
}: ShareModalButtonType<T>) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      shareThisPage: !prevState.shareThisPage,
      download: false,
      downloadCredit: false,
      creator: false,
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
      modelInfo: false,
    }));
  };

  return (
    <Button handleClick={handleClick} isActive={modalOpen.shareThisPage}>
      <div className="text-3xl sm:text-4xl">
        <FaShareSquare />
      </div>
    </Button>
  );
};

export default ShareModalButton;
