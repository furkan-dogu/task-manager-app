import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems, userSidebarMenuItems } from "../helpers/data";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import NoUser from "../assets/images/user.png";

const Sidebar = ({ activeMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const [sidebarData, setSidebarData] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (!user) {
      navigate("/");
    }
  };

  const handleClick = (link) => {
    if (link === "logout") {
      handleLogout();
      return;
    }

    navigate(link);
  };

  useEffect(() => {
    if (user) {
      setSidebarData(
        user?.role === "admin" ? adminSidebarMenuItems : userSidebarMenuItems
      );
    }
  }, [user]);

  return (
    <div className="xs:w-64 w-full xs:h-[calc(100vh-61px)] h-[calc(100vh-57px)] bg-white dark:bg-slate-800 border-r border-gray-200/50 fixed xs:top-[61px] top-[57px] z-50">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || NoUser}
            alt="Profile Image"
            className="xs:size-20 size-16 bg-slate-400 dark:bg-white rounded-full object-cover"
          />
        </div>
        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}
        <h5 className="text-gray-950 dark:text-gray-100 font-medium text-sm xs:text-base leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="xs:text-xs text-[10px] text-gray-500 dark:text-gray-300">{user?.email || ""}</p>
      </div>

      <div className="h-[calc(100vh-270px)] overflow-y-auto">
        {sidebarData.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-4 xs:text-[15px] text-xs py-3 px-6 mb-3 cursor-pointer ${
              activeMenu === item.label
                ? "text-primary dark:text-blue-700 bg-linear-to-r from-blue-50/40 to-blue-100/40 dark:bg-gray-300/50 border-r-3"
                : "dark:text-white/70"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="xs:text-xl text-lg shrink-0" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
