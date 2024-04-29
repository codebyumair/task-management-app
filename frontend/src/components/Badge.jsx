const Badge = ({ title }) => {
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none rounded-full ${
        title === "COMPLETED"
          ? "bg-green-300 text-green-900"
          : title === "IN PROGRESS"
          ? " bg-yellow-200 text-yellow-700"
          : "text-red-100 bg-red-600"
      }`}
    >
      {title}
    </span>
  );
};
export default Badge;
