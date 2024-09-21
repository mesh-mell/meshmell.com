type CardHeaderProps = {
  children: React.ReactNode;
};

const AuthCardHeader = ({ children }: CardHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">{children}</div>
  );
};

export default AuthCardHeader;
