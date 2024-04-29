import {
  MdTaskAlt,
  MdOutlineArticle,
  MdOutlinePendingActions,
  MdLogout,
} from "react-icons/md";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/users/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isAdmin } = context;
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className=" overflow-hidden relative h-screen bg-white w-64 border-r-[1px]">
      <div className="py-5 px-4 flex gap-4 items-center border-b-[1px] bg-[#007dfe] text-white">
        <MdTaskAlt className="text-3xl" />
        <h1 className="font-bold font-sans text-2xl">TaskMan</h1>
      </div>
      <Link to="/">
        <SidebarItem
          icon={<MdOutlineArticle />}
          title="All tasks"
          bgColor="bg-[#007dfe]"
        />
      </Link>
      {isAdmin && (
        <Link to="/tasks/pending">
          <SidebarItem
            icon={<MdOutlinePendingActions />}
            title="Pending tasks"
            bgColor="bg-[#34b759]"
          />
        </Link>
      )}

      <div className="border-t-[1px] border-gray-300 absolute bottom-0 hover:bg-red-200 hover:border-l-4 hover:border-l-red-600 w-full">
        <button
          className="p-5 flex flex-row gap-4 items-center font-bold"
          onClick={handleLogout}
        >
          <span className="bg-red-500 text-white flex justify-center items-center text-lg p-2 rounded-full">
            <MdLogout />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
