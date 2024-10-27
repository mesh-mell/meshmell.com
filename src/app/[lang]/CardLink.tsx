import Link from "next/link";

type CardLinkProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const CardLink = ({ href, title, description, icon }: CardLinkProps) => (
  <Link href={href}>
    <div className="m-2 flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="text-primary text-6xl">{icon}</div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default CardLink;
