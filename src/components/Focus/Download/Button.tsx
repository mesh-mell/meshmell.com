import { Dispatch, SetStateAction } from "react";
import { BiSolidDownload } from "react-icons/bi";

import LoadingForButton from "@/src/components/ModalComponents/LoadingForButton";
import { DateItem } from "@/src/types/downloadCountData";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { getDownloadSum } from "@/src/utils/getDownloadSum";

import Button from "../../Button";

type DownloadButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: ModalOpenTypeForExhibition;
  getFirebaseDataLoading: boolean;
  focusedModelsDownloadData: Record<string, DateItem>;
};

const DownloadButton = ({
  setModalOpen,
  modalOpen,
  getFirebaseDataLoading,
  focusedModelsDownloadData,
}: DownloadButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      download: !prevState.download,
      modelInfo: false,
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
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  };

  return (
    <Button handleClick={handleClick} isActive={modalOpen.download}>
      <div className="mx-auto text-3xl sm:text-4xl">
        <BiSolidDownload />
      </div>
      <div className="text-center select-none">
        {getFirebaseDataLoading ? (
          <LoadingForButton height="20" width="20" />
        ) : (
          getDownloadSum(focusedModelsDownloadData)
        )}
      </div>
    </Button>
  );
};

export default DownloadButton;
