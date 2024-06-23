import { LanguageType } from "@/src/types/language";

import SingleModelScene from "./SingleModelThreeApp";

const App = ({
  params,
}: {
  params: { lang: LanguageType; userId: string; modelId: string };
}) => {
  return (
    <>
      <SingleModelScene
        lang={params.lang}
        userId={params.userId}
        modelId={params.modelId}
      />
    </>
  );
};

export default App;
