import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className="w-full flex items-center gap-5 bg-white dark:bg-slate-800 border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 fixed top-0 z-50">
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

      <h2 className="xs:text-lg text-sm font-medium text-black dark:text-white">
        Görev Yönetimi
      </h2>
    </div>
  );
};

export default Navbar;
