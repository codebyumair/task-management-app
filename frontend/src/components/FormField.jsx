import React from "react";

const FormField = ({
  title,
  inputValue,
  updateValue,
  placeholder,
  type = "text",
}) => {
  const onChange = (e) => {
    updateValue(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor={inputValue}
        className="block text-sm  mb-2 font-medium text-gray-700"
      >
        {title}
      </label>
      <input
        type={type}
        name={inputValue}
        value={inputValue}
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
