type CardContentProps = {
  children: React.ReactNode;
};

const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-4">{children}</div>;
};

export default CardContent;
