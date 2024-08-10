type ButtonProps = {
  handleClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  hasTwoIcons?: boolean;
};

const Button = ({
  handleClick,
  isActive,
  children,
  hasTwoIcons,
}: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={
        "mt-[6px] sm:mt-[10px] relative rounded-[10px] sm:rounded-[18px] flex justify-center shadow-md"
      }
    >
      <div
        className={`${
          isActive
            ? "custom-bg-gray-active-button"
            : "custom-bg-gray-inactive-button"
        } ${hasTwoIcons ? "px-[4px] sm:px-[8px]" : "w-12 sm:w-14"}
        flex justify-center items-center h-12 sm:h-14 rounded-[10px] sm:rounded-[18px]`}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
