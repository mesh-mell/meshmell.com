import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

import ModalWrapper from "@/src/components/ModalWrapper";
import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { languagesList } from "@/src/utils/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

type CreatorFilterModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  creatorFiltersSlug: string;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  creators: CreatorDetailsType[];
};

const CreatorFilterModal = ({
  lang,
  setModalOpen,
  creatorFiltersSlug,
  setHoverOnModal,
  modalOpen,
  creators,
}: CreatorFilterModalType) => {
  const { t } = useTranslation(lang, "main");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const filteredCreators = creators.filter((creator) => {
    if (creator.slug === "") return false;

    if (searchTerm === "") return true;

    return languagesList.some(
      (language) =>
        creator.name[language] &&
        creator.name[language].toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  const handleClick = (paramValue: string) => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorFilter: false,
    }));
    newRouterPush(
      lang,
      [
        { key: "creator", value: paramValue },
        { key: "focusedMode", value: "off" },
      ],
      searchParams,
      router,
    );
  };

  const handleClickClose = () => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorFilter: false,
    }));
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  const allButton = (
    <div className={"select-none rounded-md"} onClick={() => handleClick("")}>
      <div className="flex gap-4">
        <div
          className={`flex rounded-md px-2 py-1 ${creatorFiltersSlug === "" ? "bg-emerald-500 text-white dark:text-black" : "border-2 hover:text-blue-700 dark:hover:text-blue-300"}`}
        >
          <div className="text-3xl">
            <BsFillPersonFill />
          </div>
          <div className="text-xl">{t("creatorFilter.searchAll")}</div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalWrapper
      isVisible={modalOpen.creatorFilter}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      title={t("creatorFilter.filterByCreator")}
    >
      {allButton}
      <div className="flex items-center gap-2">
        <input
          onKeyDown={handleKeyPress}
          type="text"
          placeholder={t("creatorFilter.searchCreators")}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-[150px] rounded border border-gray-300 p-2 sm:w-auto"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="rounded bg-blue-500 px-2 py-1 text-white"
        >
          {t("creatorFilter.clear")}
        </button>
      </div>
      <div className="flex max-h-[70%] flex-col gap-2 overflow-y-auto sm:gap-6">
        {filteredCreators.map(({ name, slug }) => {
          const creatorsPath = slug ? slug : "placeHolder";

          return (
            <div
              key={slug}
              className={`select-none rounded-md ${creatorFiltersSlug === slug ? "bg-emerald-500 text-white dark:text-black" : "hover:text-blue-700 dark:hover:text-blue-300"}`}
              onClick={() => handleClick(slug)}
            >
              <div className="flex gap-4 px-1 py-2">
                <div>
                  {slug === "all" ? (
                    <div className="text-3xl">
                      <BsFillPersonFill />
                    </div>
                  ) : (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorsPath}/img.webp`}
                      width={30}
                      height={30}
                      alt={name[lang as LanguageType]}
                      className="rounded-md"
                    />
                  )}
                </div>
                <div>{name[lang as LanguageType]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </ModalWrapper>
  );
};

export default CreatorFilterModal;
