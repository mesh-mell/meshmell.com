"use client";

import { Dispatch, SetStateAction } from "react";

import ActionsSwitchButton from "@/src/components/Header/ActionsSwitch/Button";
import CategoryFilterButton from "@/src/components/Header/CategoryFilter/Button";
import CreatorFilterButton from "@/src/components/Header/CreatorFilter/Button";
import CreatorButtonInNotFocused from "@/src/components/Header/CreatorInfoInNotFocused/Button";
import LightDarkThemeSwitchButton from "@/src/components/Header/LightDarkTheme/Button";
import SearchButton from "@/src/components/Header/Search/Button";
import SwitchViewButton from "@/src/components/Header/ViewsSwitch/Button";
import WireFrameSwitchButton from "@/src/components/Header/WireFrameSwitch/Button";
import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { viewTypes } from "@/src/types/views";

type HeaderType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  filteredCreatorsObj: CreatorDetailsType;
  filteredCategorysObj: CategoryDetailsType;
  searchWord: string;
  modalOpen: ModalOpenTypeForExhibition;
  setSearchWord: Dispatch<SetStateAction<string>>;
  focusedModelsObj: ModelDetailsType;
  isWireFrame: boolean;
  setIsWireFrame: Dispatch<SetStateAction<boolean>>;
  isFocusedMode: boolean;
  view: viewTypes;
};

const Header = ({
  focusedModelsObj,
  lang,
  setModalOpen,
  filteredCreatorsObj,
  filteredCategorysObj,
  searchWord,
  modalOpen,
  setSearchWord,
  isWireFrame,
  setIsWireFrame,
  isFocusedMode,
  view,
}: HeaderType) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full bg-transparent">
        <div className="2xs:gap-4 mx-[0.5vw] flex justify-center gap-1 sm:justify-end sm:gap-4">
          {isFocusedMode && focusedModelsObj.actions && (
            <ActionsSwitchButton
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
            />
          )}
          {isFocusedMode && (
            <WireFrameSwitchButton
              lang={lang}
              setIsWireFrame={setIsWireFrame}
              isWireFrame={isWireFrame}
            />
          )}
          <CategoryFilterButton
            setModalOpen={setModalOpen}
            filteredCategorysObj={filteredCategorysObj}
            modalOpen={modalOpen}
          />
          <CreatorFilterButton
            lang={lang}
            setModalOpen={setModalOpen}
            filteredCreatorsObj={filteredCreatorsObj}
            modalOpen={modalOpen}
          />
          {!isFocusedMode && filteredCreatorsObj.slug !== "" && (
            <CreatorButtonInNotFocused
              lang={lang}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
              filteredCreatorsObj={filteredCreatorsObj}
            />
          )}
          <SwitchViewButton
            view={view}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
          />
          <LightDarkThemeSwitchButton
            lang={lang}
            modalOpen={modalOpen}
            isIn3D={true}
          />
        </div>
      </div>
      <SearchButton
        lang={lang}
        setModalOpen={setModalOpen}
        searchWord={searchWord}
        modalOpen={modalOpen}
        setSearchWord={setSearchWord}
      />
    </>
  );
};

export default Header;
