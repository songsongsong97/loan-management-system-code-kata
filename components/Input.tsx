interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  options?: string[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  options,
  onChange,
  disabled,
}) => {
  return (
    <div className="flex flex-col justify-center p-2 gap-2">
      <label htmlFor={name} className="font-medium text-gray-800">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          className="text-sm border-2 rounded-md border-gray-400 py-1 pl-1 text-gray-800"
          onChange={onChange}
        >
          {options?.map((option, id) => (
            <option key={id} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          className="text-sm border-2 rounded-md border-gray-400 py-1 pl-1 text-gray-800"
          placeholder={label}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Input;
