import NoUser from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/team-members/${user._id}`, { state: user });
  };

  return (
    <>
      <div className="user-card p-2 cursor-pointer" onClick={handleNavigate}>
        <div className="flex items-center gap-3">
          <img
            src={user?.profileImageUrl || NoUser}
            alt={user?.name}
            className="size-14 object-cover rounded-full border-2 border-white dark:border-gray-300 shrink-0"
          />
          <div>
            <p className="text-sm font-medium text-black dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              {user?.email}
            </p>
            <div
              className={`text-[10px] w-fit font-medium text-white ${
                user?.isActive ? "bg-primary" : "bg-rose-500"
              } px-3 py-0.5 rounded mt-1`}
            >
              {user?.isActive ? "Aktif" : "Banlandı"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mt-5">
          <div className="text-[10px] font-medium text-violet-500 bg-gray-50 dark:bg-gray-700/60 px-4 py-0.5 rounded 2xl:col-span-4 xs:col-span-6 col-span-full">
            <span className="text-xs font-semibold">
              {user?.pendingTasks || 0} <br /> Bekleyen
            </span>
          </div>
          <div className="text-[10px] font-medium text-cyan-500 bg-gray-50 dark:bg-gray-700/60 px-4 py-0.5 rounded 2xl:col-span-4 xs:col-span-6 col-span-full">
            <span className="text-xs font-semibold">
              {user?.inProgressTasks || 0} <br /> Devam Eden
            </span>
          </div>
          <div className="text-[10px] font-medium text-indigo-500 bg-gray-50 dark:bg-gray-700/60 px-4 py-0.5 rounded 2xl:col-span-4 col-span-full">
            <span className="text-xs font-semibold">
              {user?.completedTasks || 0} <br /> Tamamlanan
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
