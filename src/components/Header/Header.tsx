"use client";

import { Dispatch, SetStateAction } from "react";

import ActionsSwitchButton from "@/src/components/Header/ActionsSwitch/Button";
import CategoryFilterButton from "@/src/components/Header/CategoryFilter/Button";
import CreatorFilterButton from "@/src/components/Header/CreatorFilter/Button";
import CreatorButtonInNotFocused from "@/src/components/Header/CreatorInfoInNotFocused/Button";
import LightDarkThemeSwitchButton from "@/src/components/Header/LightDarkTheme/Button";
import SwitchViewButton from "@/src/components/Header/ViewsSwitch/Button";
import WireFrameSwitchButton from "@/src/components/Header/WireFrameSwitch/Button";
import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { viewTypes } from "@/src/types/views";

import SearchButton from "./Search/Button";

type HeaderType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  filteredCreatorsObj?: CreatorDetailsType;
  filteredCategoriesObj?: CategoryDetailsType;
  modalOpen: ModalOpenType;
  focusedModelsObj: ModelDetailsType;
  isWireFrame: boolean;
  setIsWireFrame: Dispatch<SetStateAction<boolean>>;
  isFocusedMode: boolean;
  view?: viewTypes;
  searchWord?: string;
  inHome?: boolean;
};

const Header = ({
  focusedModelsObj,
  lang,
  setModalOpen,
  filteredCreatorsObj,
  filteredCategoriesObj,
  modalOpen,
  isWireFrame,
  setIsWireFrame,
  isFocusedMode,
  view,
  searchWord,
  inHome,
}: HeaderType) => {
  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-transparent">
      <div className="2xs:gap-4 mx-[0.5vw] mt-[6px] flex justify-center gap-1 sm:mt-[10px] sm:justify-end sm:gap-2">
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
        {filteredCategoriesObj && (
          <CategoryFilterButton
            setModalOpen={setModalOpen}
            filteredCategoriesObj={filteredCategoriesObj}
            modalOpen={modalOpen}
          />
        )}
        {filteredCreatorsObj && (
          <>
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
          </>
        )}
        {view && (
          <SwitchViewButton
            view={view}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
          />
        )}
        {!inHome && (
          <SearchButton
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            searchWord={searchWord}
          />
        )}
        <LightDarkThemeSwitchButton
          lang={lang}
          modalOpen={modalOpen}
          isIn3D={true}
        />
      </div>
    </div>
  );
};

export default Header;
