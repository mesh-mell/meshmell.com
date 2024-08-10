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
          className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.creatorInfoInNotFocused ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
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
              "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"
            }
          >
            <button className="text-base sm:text-xl font-bold">
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
