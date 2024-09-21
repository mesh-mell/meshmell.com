import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  size = "md",
  variant = "solid",
  className,
  onClick,
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center rounded-md focus:outline-none";
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const variantStyles = {
    solid: "custom-bg-gray-normal-button",
    outline:
      "border border-gray-100 dark:border-gray-700 custom-bg-gray-normal-button",
  };

  const buttonClassNames = classNames(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className,
  );

  return (
    <button className={buttonClassNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
