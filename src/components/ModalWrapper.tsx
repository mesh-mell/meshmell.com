import { Dispatch, MouseEvent, ReactNode, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

type ModalWrapperProps = {
  isVisible: boolean;
  handleClose: () => void;
  children: ReactNode;
  leftRight: "left" | "right";
  widthWhenLargeDevice: string;
  heightWhenSmallDevice: string;
  title?: string;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const ModalWrapper = ({
  isVisible,
  handleClose,
  children,
  leftRight,
  widthWhenLargeDevice,
  heightWhenSmallDevice,
  title,
  setHoverOnModal,
}: ModalWrapperProps) => {
  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const leftRightClass = leftRight === "left" ? "left-0" : "right-0";
  const isVisibleClass =
    leftRight === "left"
      ? isVisible
        ? "sm:translate-x-0"
        : "sm:-translate-x-full"
      : isVisible
        ? "sm:translate-x-0"
        : "sm:translate-x-full";

  const widthWhenLargeDeviceClass = `sm:w-[${widthWhenLargeDevice}px]`;
  const heightWhenSmallDeviceClass = `h-[${heightWhenSmallDevice}px]`;

  const crossMarkContainerClass =
    leftRight === "left" ? "justify-start" : "justify-end";

  const handleClickClose = () => {
    handleClose();
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickClose}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] z-[100] flex w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen ${isVisible ? "visible translate-x-0 translate-y-0 ease-in sm:translate-y-0" : "invisible translate-y-full sm:translate-y-[0px]"} ${leftRightClass} ${isVisibleClass} ${widthWhenLargeDeviceClass} ${heightWhenSmallDeviceClass}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className={`mb-4 flex ${crossMarkContainerClass}`}>
          <div
            onClick={handleClickClose}
            className="flex h-12 w-12 items-center justify-center rounded-full border-[2.2px] border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-[3px]"
          >
            <button className="text-base font-bold sm:text-xl">
              <ImCross />
            </button>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </>
  );
};

export default ModalWrapper;
