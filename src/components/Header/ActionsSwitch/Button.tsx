"use client";

import { Dispatch, SetStateAction } from "react";
import { FaWalking } from "react-icons/fa";

import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Button from "../../Button";

type ActionsSwitchButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  modalOpen: ModalOpenTypeForExhibition;
};

const ActionsSwitchButton = ({
  setModalOpen,
  modalOpen,
}: ActionsSwitchButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      actionsSwitch: !prevState.actionsSwitch,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      footer: false,
      language: false,
      categoryFilter: false,
      creatorFilter: false,
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
    }));
  };

  return (
    <Button handleClick={handleClick} isActive={modalOpen.actionsSwitch}>
      <FaWalking />
    </Button>
  );
};

export default ActionsSwitchButton;
