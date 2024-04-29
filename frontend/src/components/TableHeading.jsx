const TableHeading = ({ value }) => {
  return (
    <th
      scope="col"
      className="px-6 py-5 text-start text-xs font-medium text-gray-500 uppercase"
    >
      {value}
    </th>
  );
};
export default TableHeading;
