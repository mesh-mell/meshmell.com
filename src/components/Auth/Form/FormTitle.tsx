type FormTitleProps = {
  title: string;
};

const FormTitle = ({ title }: FormTitleProps) => {
  return <div className="mb-6 text-2xl font-bold">{title}</div>;
};

export default FormTitle;
