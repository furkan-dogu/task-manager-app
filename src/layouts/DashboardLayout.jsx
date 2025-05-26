import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setOpenSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSidebar]);

  return (
    <div className="overflow-x-hidden">
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      {user && (
        <div className="flex h-full">
          <div
            ref={sidebarRef}
            className={`${!openSidebar && "max-[1080px]:hidden"}`}
          >
            <Sidebar activeMenu={activeMenu} />
          </div>
          <div className="grow mr-5 mt-16 max-[1080px]:ml-5 ml-[276px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
