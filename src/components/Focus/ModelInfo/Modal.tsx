import Image from "next/image";
import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { MdUpdate } from "react-icons/md";
import { RiShareBoxFill } from "react-icons/ri";

import SourceUrl from "@/src/components/Focus/ModelInfo/ModelSourceUrl";
import CC0 from "@/src/components/ModalComponents/CC0";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { dateFormat } from "@/src/utils/dateFormat";

type ModelInfoModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenTypeForExhibition;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  focusedModelsObj: ModelDetailsType;
  focusedModelsCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const ModelInfoModal = ({
  lang,
  setModalOpen,
  focusedModelsObj,
  focusedModelsCreatorsObj,
  modalOpen,
  isFocusedMode,
}: ModelInfoModalType) => {
  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const openCreatorModal = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      creatorInfo: true,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      modelInfo: false,
    }));
  };

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      modelInfo: false,
    }));
  };

  const creatorSlug = focusedModelsCreatorsObj.slug
    ? focusedModelsCreatorsObj.slug
    : "PlaceHolder";

  return (
    <>
      {modalOpen.modelInfo && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] left-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.modelInfo ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:-translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
      >
        <div className="mb-4 flex justify-start">
          <div
            onClick={handleClickClose}
            className={
              "flex h-12 w-12 items-center justify-center rounded-full border-[2.2px] border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-[3px]"
            }
          >
            <button className="text-xl font-bold">
              <ImCross />
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold">
          {focusedModelsObj.name[lang as LanguageType]}
        </h2>
        <div className="flex flex-col gap-2 text-xl">
          {focusedModelsObj.description[lang as LanguageType] && (
            <div className={"my-2 italic"}>
              {focusedModelsObj.description[lang as LanguageType]}
            </div>
          )}
          <div className="flex">
            <span className="w-8">
              {focusedModelsCreatorsObj.slug !== "" && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
                  width={30}
                  height={30}
                  alt={focusedModelsCreatorsObj.name[lang as LanguageType]}
                  className="rounded-md"
                />
              )}
            </span>
            <span className="ml-1 sm:ml-2">
              {focusedModelsCreatorsObj.name[lang as LanguageType]}
            </span>
            <span
              className="ml-1 mt-[6px] text-blue-600 dark:text-blue-400 sm:ml-2 sm:mt-[5px]"
              onClick={openCreatorModal}
            >
              <RiShareBoxFill />
            </span>
          </div>
          <div className="flex">
            <span className="w-8">
              <MdUpdate className="mt-[5px] text-2xl" />
            </span>
            <span className="ml-1 sm:ml-2">
              {/^\d{4}-\d{2}-\d{2}$/.test(focusedModelsObj.updated)
                ? dateFormat(new Date(focusedModelsObj.updated), lang)
                : "2024-01-01"}
            </span>
          </div>
          <CC0 lang={lang} />
          <SourceUrl lang={lang} sourceUrl={focusedModelsObj.credit} />
        </div>
      </div>
    </>
  );
};

export default ModelInfoModal;
