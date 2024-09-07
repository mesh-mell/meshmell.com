"use client";

import { Dispatch, SetStateAction } from "react";
import { RiFilter3Fill } from "react-icons/ri";

import { CategoryDetailsType } from "@/src/types/categories";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Button from "../../Button";

type CategoryFilterButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  filteredCategorysObj: CategoryDetailsType;
  modalOpen: ModalOpenTypeForExhibition;
};

const CategoryFilterButton = ({
  setModalOpen,
  filteredCategorysObj,
  modalOpen,
}: CategoryFilterButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      categoryFilter: !prevState.categoryFilter,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
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
      viewsSwitch: false,
      sponsors: false,
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  };

  return (
    <Button
      handleClick={handleClick}
      isActive={modalOpen.categoryFilter}
      hasTwoIcons
    >
      <RiFilter3Fill className="text-3xl sm:text-4xl" />
      <div className="-mt-1 flex h-[28px] w-[28px] items-center justify-center text-3xl sm:h-[30px] sm:w-[30px] sm:text-4xl">
        {filteredCategorysObj.icon}
      </div>
    </Button>
  );
};

export default CategoryFilterButton;
