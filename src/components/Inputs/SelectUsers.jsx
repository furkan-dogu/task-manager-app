import { useEffect, useState } from "react";
import useUserCalls from "../../hooks/useUserCalls";
import { useSelector } from "react-redux";
import { LuUsers } from "react-icons/lu";
import AvatarGroup from "../AvatarGroup";
import Modal from "../Modal";
import NoUser from "../../assets/images/user.png";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const { getAllUsers } = useUserCalls();
  const { allUsers } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModalOpen(true)}>
          <LuUsers className="text-sm" /> Üye Ekle
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Kullanıcıları Seçin"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers?.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-gray-200"
            >
              <img
                src={user.profileImageUrl || NoUser}
                alt={user.name}
                className="size-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="size-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 p-4">
          <button className="card-btn" onClick={() => setIsModalOpen(false)}>
            İPTAL
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>
            BİTTİ
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
