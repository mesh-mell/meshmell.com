import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { newRouterPush } from "@/src/utils/newRouterPush";

import Button from "../../Button";

type SearchButtonType = {
  lang: LanguageType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  searchWord: string;
  modalOpen: ModalOpenTypeForExhibition;
  setSearchWord: Dispatch<SetStateAction<string>>;
};

const SearchButton = ({
  lang,
  setModalOpen,
  searchWord,
  modalOpen,
  setSearchWord,
}: SearchButtonType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSearchWordEmpty = searchWord === "";

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isSearchWordEmpty) {
      setSearchWord("");
      newRouterPush(
        lang,
        [{ key: "searchWord", value: "" }],
        searchParams,
        router,
      );
    }
  };

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      search: !prevState.search,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
      categoryFilter: false,
      creatorFilter: false,
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
    <div className="fixed left-[10px] top-[60px] sm:top-[80px]">
      <Button handleClick={handleClick} isActive={modalOpen.search}>
        <FaSearch className="text-3xl sm:text-4xl" />
      </Button>
      <div>
        <div
          className={` ${searchWord !== "" ? "rounded-l-full" : "rounded-full"} flex items-center justify-center px-1 ${isSearchWordEmpty ? "w-12 sm:w-14" : ""} h-12 sm:h-14`}
          aria-label="Open Search Page"
        >
          <div className="-mt-[3px] text-2xl sm:-mt-[5px] sm:text-3xl">
            {searchWord.substring(0, 5)}
          </div>
        </div>

        {searchWord !== "" && (
          <div
            className={
              "flex h-12 items-center justify-center rounded-r-full pr-1 sm:h-14"
            }
          >
            <div
              onClick={handleReset}
              className={
                "z-60 ml-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black dark:border-white sm:h-10 sm:w-10"
              }
            >
              <button className="text-base dark:text-white sm:text-xl">
                <ImCross />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchButton;
