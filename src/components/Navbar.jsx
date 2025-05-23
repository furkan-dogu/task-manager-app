import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex gap-5 bg-white dark:bg-slate-800 border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black dark:text-white"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        {openSidebar ? (
          <HiOutlineX className="text-2xl cursor-pointer" />
        ) : (
          <HiOutlineMenu className="text-2xl cursor-pointer" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black dark:text-white">Görev Yönetimi</h2>

      {openSidebar && (
        <div className="fixed top-[61px] -ml-7">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
