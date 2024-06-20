import { LanguageType } from "@/src/types/language";

import UserPage from "./UserPage";

const App = ({
  params,
}: {
  params: { lang: LanguageType; userId: string };
}) => {
  return (
    <>
      <UserPage lang={params.lang} userId={params.userId} />
    </>
  );
};

export default App;
