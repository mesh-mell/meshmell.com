import Link from "next/link";

import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import Social from "./Social";

type CardWrapperProps = {
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  children: React.ReactNode;
};

const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="my-[100px] w-[400px] rounded-md border-2 border-neutral-300 p-4 shadow-md shadow-gray-800 dark:border-neutral-600 dark:shadow-gray-100">
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <Link
          href={backButtonHref}
          className="flex justify-center text-blue-400 hover:underline dark:text-blue-600"
        >
          {backButtonLabel}
        </Link>
      </CardFooter>
    </div>
  );
};

export default CardWrapper;
