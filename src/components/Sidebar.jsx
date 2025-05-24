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
    <div className="w-64 h-[calc(100vh-61px)] bg-white dark:bg-slate-800 border-r border-gray-200/50 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || NoUser}
            alt="Profile Image"
            className="size-20 bg-slate-400 dark:bg-white rounded-full object-cover"
          />
        </div>
        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}
        <h5 className="text-gray-950 dark:text-gray-100 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-xs text-gray-500 dark:text-gray-300">{user?.email || ""}</p>
      </div>

      <div className="h-[calc(100vh-270px)] overflow-y-auto">
        {sidebarData.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 mb-3 cursor-pointer ${
              activeMenu === item.label
                ? "text-primary dark:text-blue-700 bg-linear-to-r from-blue-50/40 to-blue-100/40 dark:bg-gray-300/50 border-r-3"
                : "dark:text-white/70"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
