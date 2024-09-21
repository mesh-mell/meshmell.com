import Link from "next/link";

type BackButtonProps = {
  href: string;
  label: string;
};

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <button className="w-full font-normal">
      <Link href={href}>{label}</Link>
    </button>
  );
};

export default BackButton;
