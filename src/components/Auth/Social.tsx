import { FcGoogle } from "react-icons/fc";

import Button from "./Button";

const Social = () => {
  return (
    <div className="mx-auto flex w-1/2 items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          // Handle Google login
        }}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
