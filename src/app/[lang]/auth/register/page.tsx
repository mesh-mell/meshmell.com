import RegisterForm from "@/src/components/Auth/Form/RegisterForm";

import { ThemeSwitch } from "@/src/components/Header/ThemeSwitch";

const RegisterPage = async () => {
  return (
    <div className="mt-8 flex flex-col">
      <ThemeSwitch />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
