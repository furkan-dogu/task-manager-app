import NoUser from "../../assets/images/user.png";
import { LuTrash2 } from "react-icons/lu";
import Modal from "../Modal";
import DeleteAlert from "../DeleteAlert";
import { useState } from "react";
import { FaUserCheck, FaUserSlash } from "react-icons/fa";

const UserCard = ({ user, handleDelete, updateIsActive }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openIsActiveModal, setOpenIsActiveModal] = useState(false);

  const handleIsActive = (userId, isActiveStatus) => {
    updateIsActive(userId, isActiveStatus);
    setOpenIsActiveModal(false);
  }

  return (
    <>
      <div className="user-card p-2">
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
        <div className="mt-3 flex items-center justify-start flex-wrap gap-2">
          <button
            className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
            onClick={() => setOpenDeleteAlert(true)}
          >
            <LuTrash2 className="text-base" /> Sil
          </button>
          {user?.isActive ? (
            <button
              className="flex items-center gap-1.5 text-[13px] font-medium text-violet-500 bg-violet-50 rounded px-2 py-1 border border-violet-100 hover:border-violet-300 cursor-pointer"
              onClick={() => setOpenIsActiveModal(true)}
            >
              <FaUserSlash className="text-base" /> Banla
            </button>
          ) : (
            <button
              className="flex items-center gap-1.5 text-[13px] font-medium text-green-500 bg-green-50 rounded px-2 py-1 border border-green-100 hover:border-green-300 cursor-pointer"
              onClick={() => setOpenIsActiveModal(true)}
            >
              <FaUserCheck className="text-base" /> Aktif Yap
            </button>
          )}
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Kullanıcıyı Sil"
      >
        <DeleteAlert
          content={`${user?.name} isimli kullanıyı silmek istediğinizden emin misiniz?`}
          onDelete={() => {
            handleDelete(user._id);
            setOpenDeleteAlert(false);
          }}
        />
      </Modal>
      <Modal
        isOpen={openIsActiveModal}
        onClose={() => setOpenIsActiveModal(false)}
        title="Kullanıcı Durumu"
      >
        <div>
          <p className="text-sm text-black dark:text-white">
            {user?.isActive
              ? `${user?.name} isimli kullanıcıyı banlayacak mısınız?`
              : `${user?.name} isimli kullanıcıyı aktif yapacak mısınız?`}
          </p>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className={`flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium whitespace-nowrap border rounded-lg px-4 py-2 cursor-pointer ${
                user?.isActive 
                  ? "text-rose-500 bg-rose-50 border-rose-100" 
                  : "text-green-500 bg-green-50 border-green-100"
              }`}
              onClick={() => handleIsActive(user._id, !user?.isActive)}
            >
              {user?.isActive ? "Banla" : "Aktif Yap"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserCard;
