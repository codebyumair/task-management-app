const UserDropdown = ({ assignee, updateValue, optionList }) => {
  const onChange = (e) => {
    updateValue(e.target.value);
  };
  return (
    <div>
      <select
        value={assignee}
        onChange={onChange}
        id="value"
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      >
        <option
          defaultValue="Select &#9662;"
          className=" text-gray-500 font-bold"
        >
          Select &#9662;
        </option>
        {optionList.map((option, index) => {
          return (
            <option key={index} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default UserDropdown;
