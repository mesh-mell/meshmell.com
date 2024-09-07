import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { ImCross } from "react-icons/im";

import CreatorInfo from "@/src/components/Focus/CreatorInfo/Contents";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";

type CreatorInfoModalInNotFocusedType = {
  lang: LanguageType;
  modalOpen: ModalOpenTypeForExhibition;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  filteredCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const CreatorInfoModalInNotFocused = ({
  lang,
  setModalOpen,
  filteredCreatorsObj,
  modalOpen,
  setHoverOnModal,
  isFocusedMode,
}: CreatorInfoModalInNotFocusedType) => {
  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      creatorInfoInNotFocused: false,
    }));
  };

  useEffect(() => {
    if (isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      creatorInfoInNotFocused: false,
    }));
  };

  return (
    <>
      {modalOpen.creatorInfoInNotFocused && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.creatorInfoInNotFocused ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className="flex justify-end">
          <div
            onClick={handleClickClose}
            className={
              "flex h-12 w-12 items-center justify-center rounded-full border-[2.2px] border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-[3px]"
            }
          >
            <button className="text-base font-bold sm:text-xl">
              <ImCross />
            </button>
          </div>
        </div>
        <CreatorInfo
          lang={lang}
          creatorsObj={filteredCreatorsObj}
          isFocusedMode={isFocusedMode}
        />
      </div>
    </>
  );
};

export default CreatorInfoModalInNotFocused;
