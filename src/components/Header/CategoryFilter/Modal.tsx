import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { CategoryDetailsType } from "@/src/types/categories";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { defaultCategoryDetails } from "@/src/utils/defaultData/categories";
import { languagesList } from "@/src/utils/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

type CategoryFilterModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenTypeForExhibition;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  categoryFiltersSlug: string;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  categories: CategoryDetailsType[];
};

const CategoryFilterModal = ({
  lang,
  setModalOpen,
  categoryFiltersSlug,
  setHoverOnModal,
  modalOpen,
  categories,
}: CategoryFilterModalType) => {
  const { t } = useTranslation(lang, "main");

  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const filteredCategories = categories.filter((category) => {
    if (category.slug === "") return false;

    if (searchTerm === "") return true;

    return languagesList.some(
      (language) =>
        category.name[language] &&
        category.name[language]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
  });

  const categoryFiltersSlugData =
    categories.find(
      (category: CategoryDetailsType) => category.slug === categoryFiltersSlug,
    ) || defaultCategoryDetails;

  const router = useRouter();

  const handleClick = (paramValue: string) => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      categoryFilter: false,
    }));
    newRouterPush(
      lang,
      [
        { key: "category", value: paramValue },
        { key: "focusedMode", value: "off" },
      ],
      searchParams,
      router,
    );
  };

  const handleClickClose = () => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      categoryFilter: false,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      categoryFilter: false,
    }));
  };

  const allButton = (
    <div
      className={"select-none rounded-md"}
      onClick={() => handleClick("all")}
    >
      <div className="flex">
        <div
          className={`flex rounded-md px-2 py-1 ${categoryFiltersSlug === "all" ? "bg-emerald-500 text-white dark:text-black" : "border-2 hover:text-blue-700 dark:hover:text-blue-300"}`}
        >
          <div className="text-3xl">
            {
              categories.find(
                (category: CategoryDetailsType) => category.slug === "all",
              )?.icon
            }
          </div>
          <div className="mt-[6px] text-xl">
            {t("categoryFilter.searchAll")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {modalOpen.categoryFilter && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] right-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.categoryFilter ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className="mb-4 flex justify-end">
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
        <h2 className="mb-4 text-2xl font-bold">
          {t("categoryFilter.filterByCategory")}
        </h2>
        {allButton}
        <div className="mt-2 flex items-center gap-2 sm:mt-4">
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder={t("categoryFilter.searchCategories")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-[150px] rounded border border-gray-300 p-2 sm:w-auto"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="rounded bg-blue-500 px-2 py-1 text-white"
          >
            {t("categoryFilter.clear")}
          </button>
        </div>
        <div className="mt-4 grid max-h-[60%] grid-cols-2 gap-2 overflow-y-auto sm:gap-6">
          {filteredCategories.map(({ slug, color, name, icon }) => (
            <div
              key={slug}
              className={`select-none rounded-md px-2 py-1 ${categoryFiltersSlugData.slug === slug ? `${color} bg-emerald-500 text-white dark:text-black` : "hover:text-blue-700 dark:hover:text-blue-300"}`}
              onClick={() => handleClick(slug)}
            >
              {name[lang as LanguageType]}
              <div className="text-3xl">{icon}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryFilterModal;
