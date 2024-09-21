type ButtonComponentProps = {
  label: string;
  disabled?: boolean;
};

const ButtonComponent = ({ label, disabled }: ButtonComponentProps) => {
  return (
    <button
      type="submit"
      className="custom-bg-gray-inactive-button w-full rounded-md border-gray-100 py-2 transition duration-200 dark:border-gray-700"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
