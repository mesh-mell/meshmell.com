import { useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  type?: string;
  placeholder: string;
  error: FieldError | undefined;
  disabled?: boolean;
};

const Input = <T extends FieldValues>({
  register,
  name,
  type = "text",
  placeholder,
  error,
  disabled,
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <input
        {...register(name)}
        className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:dark:ring-slate-600"
        placeholder={placeholder}
        type={type === "password" && !showPassword ? "password" : "text"}
        disabled={disabled}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="mt-2 flex w-full justify-end text-xl text-gray-500"
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      )}
      {error && <p className="mt-1 text-red-500">{error.message}</p>}
    </div>
  );
};

export default Input;
