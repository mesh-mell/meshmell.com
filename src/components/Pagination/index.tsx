"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModelDetailsType } from "@/src/types/models";
import { getFilteredModels } from "@/src/utils/getFilteredModels";
import { newRouterPush } from "@/src/utils/newRouterPush";

import PaginationArrowButton from "./PaginationArrowButton";

type getPageRangeType = {
  lang: LanguageType;
  currentPage: number;
  filteredCategoriesObj: CategoryDetailsType;
  filteredCreatorsObj: CreatorDetailsType;
  searchWord: string;
  models: ModelDetailsType[];
};
const Pagination = ({
  lang,
  currentPage,
  filteredCategoriesObj,
  filteredCreatorsObj,
  searchWord,
  models,
}: getPageRangeType) => {
  const filteredModels = getFilteredModels(
    models,
    filteredCategoriesObj,
    filteredCreatorsObj,
    searchWord,
  );

  const numOfModel = Number(
    process.env.NEXT_PUBLIC_NUM_OF_MODEL_BY_PAGE || "5",
  );
  const totalPages = Math.ceil(filteredModels.length / numOfModel);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  const getPageRange = () => {
    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      let range = [
        1,
        2,
        3,
        4,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

      if (currentPage > 4 && currentPage < totalPages - 3) {
        range = [1, 2, "...", currentPage, "...", totalPages - 1, totalPages];
      }

      return range;
    }
  };

  const goToPage = (page: any) => {
    newRouterPush(
      lang,
      [{ key: "page", value: page.toString() }],
      searchParams,
      router,
    );
  };

  const goToPreviousPage = () => {
    newRouterPush(
      lang,
      [{ key: "page", value: (currentPage - 1).toString() }],
      searchParams,
      router,
    );
  };

  const goToNextPage = () => {
    newRouterPush(
      lang,
      [{ key: "page", value: (currentPage + 1).toString() }],
      searchParams,
      router,
    );
  };

  return (
    <>
      <div className="fixed bottom-10 left-0 z-50 w-full bg-transparent text-3xl">
        <div className="absolute bottom-1 left-2/4 -translate-x-2/4">
          <div className="flex select-none justify-center gap-1">
            <PaginationArrowButton
              isVisible={currentPage > 1}
              direction="left"
              onClick={goToPreviousPage}
            />
            <div className="flex gap-1">
              {getPageRange().map((page, index) => {
                const buttonClass =
                  page === currentPage
                    ? theme === "light"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500"
                    : theme === "light"
                      ? "bg-white"
                      : "bg-black";

                if (page === "...") {
                  return (
                    <span key={index} className="xs:py-1 px-[10px] py-0.5">
                      ...
                    </span>
                  );
                }

                return (
                  <div
                    key={index}
                    className={`font-bold ${buttonClass} pagination-button`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </div>
                );
              })}
            </div>
            <PaginationArrowButton
              isVisible={currentPage < totalPages}
              direction="right"
              onClick={goToNextPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
