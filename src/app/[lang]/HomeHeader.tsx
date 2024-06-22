import LightDarkThemeSwitchButton from "@/src/components/Header/LightDarkTheme/Button";
import Logo from "@/src/components/Logo";
import { LanguageType } from "@/src/types/language";

type HomeHeaderType = {
  lang: LanguageType;
  modalOpen: any;
};

const HomeHeader = ({ lang, modalOpen }: HomeHeaderType) => {
  return (
    <div className='absolute top-0 left-0 w-full h-20 flex justify-between items-center px-4'>
      <Logo lang={lang} canBeClicked={false} />
      <LightDarkThemeSwitchButton
        lang={lang}
        modalOpen={modalOpen}
        isIn3D={false}
      />
    </div>
  );
};

export default HomeHeader;
