import { Dispatch, SetStateAction } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { ModalOpenTypeForExhibition } from "@/src/types/modals";

import Button from "../../Button";

type FooterButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenTypeForExhibition>>;
};

const FooterButton = ({ setModalOpen }: FooterButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenTypeForExhibition) => ({
      ...prevState,
      footer: !prevState.footer,
    }));
  };

  return (
    <Button handleClick={handleClick}>
      <div className="text-3xl sm:text-4xl">
        <GiHamburgerMenu />
      </div>
    </Button>
  );
};

export default FooterButton;
