import React, { useContext } from "react";
import { UserContext } from "../context/users/UserContext";

const DropDown = ({ value, updateValue, optionList }) => {
  const context = useContext(UserContext);
  const { isAdmin } = context;
  const onChange = (e) => {
    updateValue(e.target.value);
  };
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        id="value"
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
      >
        {isAdmin ? (
          <option
            defaultValue="Select &#9662;"
            className=" text-gray-500 font-bold"
          >
            Select &#9662;
          </option>
        ) : (
          <option defaultValue={value} className=" text-gray-500 font-bold">
            {value}
          </option>
        )}
        {optionList.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};
export default DropDown;
