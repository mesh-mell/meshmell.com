import { Dispatch, SetStateAction } from "react";
import { FaShareSquare } from "react-icons/fa";

import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Button from "../../Button";

type ShareModalButtonWhenListType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: ModalOpenTypeForExhibition;
};

const ShareModalButtonWhenList = ({
  setModalOpen,
  modalOpen,
}: ShareModalButtonWhenListType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      shareThisPageInList: !prevState.shareThisPageInList,
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
    <div className="fixed bottom-[18px] left-[10px]">
      <Button
        handleClick={handleClick}
        isActive={modalOpen.shareThisPageInList}
      >
        <FaShareSquare />
      </Button>
    </div>
  );
};

export default ShareModalButtonWhenList;
