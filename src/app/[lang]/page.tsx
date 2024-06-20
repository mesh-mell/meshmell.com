import ConsoleMessage from "@/src/components/Console/Message";
import { LanguageType } from "@/src/types/language";

import Home from "./Home";

const App = ({ params }: { params: { lang: LanguageType } }) => {
  return (
    <>
      <ConsoleMessage />
      <Home lang={params.lang} />
    </>
  );
};

export default App;
