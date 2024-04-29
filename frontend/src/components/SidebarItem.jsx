const SidebarItem = ({ icon, title, bgColor }) => {
  return (
    <div className="sidebar-item p-5 border-b-[1px] border-gray-300 hover:bg-[#f3f4f6] hover:border-l-4 ">
      <div className="flex flex-row items-center gap-4 sm:gap-2">
        <span
          className={`${bgColor} text-white flex justify-center items-center md:text-lg p-2 rounded-full`}
        >
          {icon}
        </span>
        <span className="text-sm font-bold">{title}</span>
      </div>
    </div>
  );
};
export default SidebarItem;
