interface ButtonProps {
  label: string;
  onClick: (event: any) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="p-2 mt-4 bg-neon hover:bg-darkneon shadow-md font-semibold border-1 rounded-md self-end mr-4"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
