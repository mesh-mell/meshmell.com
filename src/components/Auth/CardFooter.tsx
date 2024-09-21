type CardFooterProps = {
  children: React.ReactNode;
};

const CardFooter = ({ children }: CardFooterProps) => {
  return <div className="mt-4">{children}</div>;
};

export default CardFooter;
