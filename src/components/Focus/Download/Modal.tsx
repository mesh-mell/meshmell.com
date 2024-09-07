import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BiSolidDownload } from "react-icons/bi";
import { ImCross } from "react-icons/im";

import LoadingForButton from "@/src/components/ModalComponents/LoadingForButton";
import { useTranslation } from "@/src/i18n/client";
import { DateItem } from "@/src/types/downloadCountData";
import { LanguageType } from "@/src/types/language";
import { ModalOpenTypeForExhibition } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { WindowType } from "@/src/types/views";
import { handleDownloadFileFromGCS } from "@/src/utils/downloadFileFromGCS";
import { fileFormats } from "@/src/utils/fileFormats";
import handleIncrementDownloadToFirebase from "@/src/utils/handleIncrementDownloadToFirebase";

import DownloadGraph from "./Graph";

type DownloadModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenTypeForExhibition;
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
  focusedModelsObj: ModelDetailsType;
  setFocusedModelsDownloadData: Dispatch<
    SetStateAction<Record<string, DateItem>>
  >;
  focusedModelsDownloadData: Record<string, DateItem>;
  windowType: WindowType;
  setGetFirebaseDataLoading: Dispatch<SetStateAction<boolean>>;
  isFocusedMode: boolean;
};

const DownloadModal = ({
  lang,
  setModalOpen,
  focusedModelsObj,
  setFocusedModelsDownloadData,
  focusedModelsDownloadData,
  modalOpen,
  windowType,
  setGetFirebaseDataLoading,
  isFocusedMode,
}: DownloadModalType) => {
  const { t } = useTranslation(lang, "main");

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["glb"]);
  const [currentResolution, setCurrentResolution] = useState<string>("");
  const isZipped = true;

  const handleFormatChange = (format: string) => {
    setSelectedFormats((prevFormats) => {
      if (prevFormats.includes(format)) {
        return prevFormats.filter((f) => f !== format);
      } else {
        return [...prevFormats, format];
      }
    });
  };

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  useEffect(() => {
    if (!focusedModelsObj.resolutions) return;

    if (focusedModelsObj.resolutions.length > 0) {
      setCurrentResolution(focusedModelsObj.resolutions[0]);
    }
  }, [focusedModelsObj.resolutions]);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    const resolution = currentResolution ? `${currentResolution}` : "";

    handleDownloadFileFromGCS(focusedModelsObj, resolution, isZipped)
      .then(() => {
        setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
          ...prevState,
          downloadCredit: true,
        }));
        handleIncrementDownloadToFirebase(
          setFocusedModelsDownloadData,
          focusedModelsObj,
          setGetFirebaseDataLoading,
        );
        setIsDownloading(false);
      })
      .catch((error) => {
        setIsDownloading(false);
        setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
          ...prevState,
          downloadError: true,
        }));
        console.error("Download failed", error);
      });
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      download: false,
    }));
  };

  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      download: false,
    }));
  };

  return (
    <>
      {modalOpen.download && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] left-0 z-[100] flex h-[700px] w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen sm:w-[384px] ${modalOpen.download ? "visible translate-x-0 translate-y-0 ease-in sm:translate-x-0 sm:translate-y-0" : "invisible -translate-x-[0px] translate-y-full sm:-translate-x-full sm:translate-y-[0px]"}`}
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
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold">{t("download.download")}</h2>
          {focusedModelsObj.isDownloadable ? (
            <>
              <div className="flex flex-row items-center justify-evenly gap-1">
                {focusedModelsObj.resolutions &&
                  focusedModelsObj.resolutions.length > 0 && (
                    <div className="flex flex-col items-center">
                      {focusedModelsObj.resolutions.map((resolution, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentResolution(resolution);
                          }}
                          className={`my-1 rounded border px-2 py-1 ${
                            currentResolution === resolution
                              ? "bg-blue-500 text-white"
                              : "border-gray-300 bg-neutral-100 dark:bg-neutral-950"
                          }`}
                        >
                          {resolution}
                        </button>
                      ))}
                    </div>
                  )}

                <div className="rounded p-2">
                  {fileFormats
                    .filter((format) =>
                      focusedModelsObj.formats.includes(format.extension),
                    )
                    .map((format, index) => (
                      <div key={index} className="mb-2 flex items-center">
                        <input
                          type="checkbox"
                          id={`format-${format.extension}`}
                          checked={selectedFormats.includes(format.extension)}
                          onChange={() => handleFormatChange(format.extension)}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`format-${format.extension}`}
                          className="cursor-pointer"
                        >
                          {format.name} (.{format.extension})
                        </label>
                      </div>
                    ))}
                </div>
                {/* Download Button */}
                <div
                  className={`${!isDownloading && "border-2 border-black dark:border-white"} flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-1 sm:h-14 sm:w-14`}
                >
                  {isDownloading ? (
                    windowType === "windowWidth_tablet" ||
                    windowType === "windowWidth_pc" ? (
                      <LoadingForButton height="56" width="56" />
                    ) : (
                      <LoadingForButton height="25" width="25" />
                    )
                  ) : (
                    <BiSolidDownload
                      className="text-3xl sm:text-4xl"
                      onClick={handleDownloadClick}
                    />
                  )}
                </div>
              </div>
              <DownloadGraph
                lang={lang}
                focusedModelsDownloadData={focusedModelsDownloadData}
              />
            </>
          ) : (
            <div className="text-center text-lg">
              {t("download.canDownloadFromOriginalSite")}
              <div className="mt-[15px] text-center text-lg">
                <a
                  href={focusedModelsObj.source?.downloadSite}
                  className="font-bold text-blue-500 dark:text-blue-400"
                >
                  {focusedModelsObj.source?.downloadSite}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DownloadModal;
