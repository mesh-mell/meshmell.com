"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { newRouterPush } from "@/src/utils/newRouterPush";

type SearchModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenTypeForExhibition;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
};

const SearchModal = ({
  lang,
  setModalOpen,
  searchWord,
  setSearchWord,
  modalOpen,
}: SearchModalType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation(lang, "main");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchWord) {
      newRouterPush(
        lang,
        [
          { key: "searchWord", value: searchWord },
          { key: "focusedMode", value: "off" },
        ],
        searchParams,
        router,
      );
    } else {
      newRouterPush(lang, [], searchParams, router);
    }
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      search: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      search: false,
    }));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();

    if (searchWord !== "") {
      setSearchWord("");
      setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
        ...prevState,
        search: false,
      }));
      newRouterPush(
        lang,
        [{ key: "searchWord", value: "" }],
        searchParams,
        router,
      );
    }
  };

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      search: false,
    }));
  };

  return (
    <>
      {modalOpen.search && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] left-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.search ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:-translate-x-full sm:translate-y-[0px]"}`}
        onClick={handleClickInside}
      >
        <div className="mb-4 flex justify-start">
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
        <form onSubmit={handleSubmit} className="mb-12 mt-8">
          <div className="flex w-full">
            <div className="h-10">
              <input
                name="searchValue"
                className="h-[40px] w-36 rounded-l-lg border border-solid border-black p-2 text-xl focus:border-2 focus:border-blue-500 focus:outline-none dark:border-white md:w-56 lg:w-56 xl:w-72"
                placeholder={`${t("search.search")}...`}
                value={searchWord}
                onChange={handleInputChange}
              />
            </div>
            <button
              aria-label="Search"
              type="submit"
              className="flex h-[40px] w-[40px] items-center justify-center rounded-r-lg border-y border-r border-black bg-neutral-100 p-0 text-black dark:border-white dark:bg-neutral-950 dark:text-white"
            >
              <FaSearch size="2rem" />
            </button>
          </div>
          <div className="flex justify-start">
            <button
              onClick={handleReset}
              className="mt-4 rounded bg-red-500 p-2 text-white"
            >
              {t("search.reset")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchModal;
