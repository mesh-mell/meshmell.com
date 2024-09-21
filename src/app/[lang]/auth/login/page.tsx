import LoginForm from "@/src/components/Auth/Form/LoginForm";

import { ThemeSwitch } from "@/src/components/Header/ThemeSwitch";

const LoginPage = async () => {
  return (
    <div className="mt-8 flex flex-col">
      <ThemeSwitch />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
