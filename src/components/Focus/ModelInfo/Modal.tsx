import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MdUpdate } from "react-icons/md";
import { RiShareBoxFill } from "react-icons/ri";

import SourceUrl from "@/src/components/Focus/ModelInfo/ModelSourceUrl";
import CC0 from "@/src/components/ModalComponents/CC0";
import ModalWrapper from "@/src/components/ModalWrapper";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { dateFormat } from "@/src/utils/dateFormat";

type ModelInfoModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
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
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: true,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      modelInfo: false,
    }));
  };

  const creatorSlug = focusedModelsCreatorsObj.slug
    ? focusedModelsCreatorsObj.slug
    : "PlaceHolder";

  return (
    <ModalWrapper
      isVisible={modalOpen.modelInfo}
      handleClose={handleClickClose}
      leftRight="left"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      title={focusedModelsObj.name[lang as LanguageType]}
    >
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
    </ModalWrapper>
  );
};

export default ModelInfoModal;
