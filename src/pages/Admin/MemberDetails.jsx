import { useEffect, useState } from "react";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import useUserCalls from "../../hooks/useUserCalls";
import Input from "../../components/Inputs/Input";
import { FaUserCheck, FaUserSlash } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const MemberDetails = () => {
  const {
    adminUpdateUserInfo,
    adminUpdateUserPassword,
    deleteUser,
    updateIsActive,
  } = useUserCalls();

  const location = useLocation();
  const user = location.state;

  const [data, setData] = useState({
    name: "",
    email: "",
    profileImage: null,
  });
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [openIsActiveModal, setOpenIsActiveModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        previewUrl: user.profileImageUrl || null,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setImage = (imageFile) => {
    setData((prev) => ({
      ...prev,
      profileImage: imageFile,
      previewUrl: imageFile ? URL.createObjectURL(imageFile) : "",
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.profileImage instanceof File) {
      formData.append("profileImageUrl", data.profileImage);
    } else if (!data.profileImage && !data.previewUrl) {
      formData.append("profileImageUrl", "null");
    }

    adminUpdateUserInfo(user._id, formData);
  };

  const clearInputs = () => {
    setNewPassword("");
    setRepeatPassword("");
  };

  const handlePasswordChange = () => {
    if (!newPassword) {
      setError("Lütfen yeni şifreyi girin");
      return;
    }

    if (!repeatPassword) {
      setError("Lütfen yeni şifreyi tekrar girin");
      return;
    }

    if (newPassword !== repeatPassword) {
      setError("Yeni Şifreler uyuşmuyor");
      return;
    }

    if (newPassword.length < 8 || repeatPassword.length < 8) {
      setError("Şifre en az 8 karakterden oluşmalıdır.");
      return;
    }

    setError(null);

    if (newPassword === repeatPassword) {
      adminUpdateUserPassword(user._id, newPassword);
    }

    clearInputs();
  };

  const handleDelete = (id) => {
    deleteUser(id);
    navigate("/admin/team-members", { replace: true, state: null });
  };

  const handleIsActive = (userId, isActiveStatus) => {
    updateIsActive(userId, isActiveStatus);
    setOpenIsActiveModal(false);

    setData((prev) => ({
      ...prev,
      isActive: isActiveStatus,
    }));

    user.isActive = isActiveStatus;
  };

  return (
    <DashboardLayout activeMenu="Ekip Üyeleri">
      <div className="my-9 max-w-[1920px] mx-auto">
        <div className="form-card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-black dark:text-white">
              <span className="font-semibold text-primary dark:text-blue-400">{user.name}</span> Kullanıcı İşlemleri
            </h2>
            <button className="card-btn" onClick={() => navigate("/admin/team-members")}>
                Geri
            </button>
          </div>
          <div className="space-y-4 max-w-xl mx-auto mb-4 mt-8">
            <p className="text-center pt-4 pb-0.5 text-lg font-medium text-black dark:text-white border-b dark:border-gray-200 border-gray-600">
              Kullanıcı Bilgileri
            </p>
            <ProfilePhotoSelector
              image={data.profileImage || data.previewUrl}
              setImage={setImage}
            />

            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                className="form-input"
                autoComplete="off"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                autoComplete="off"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <button onClick={handleSubmit} className="btn-primary">
              Güncelle
            </button>
          </div>

          <div className="space-y-4 max-w-xl mx-auto my-4">
            <p className="text-center pt-4 pb-0.5 text-lg font-medium text-black dark:text-white border-b dark:border-gray-200 border-gray-600">
              Parola Güncelleme
            </p>
            <Input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              label="Yeni Şifre"
              placeholder="Min 8 Karakter"
              value={newPassword}
            />
            <Input
              type="password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              label="Yeni Şifre (Tekrar)"
              placeholder="Min 8 Karakter"
              value={repeatPassword}
            />
            {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}
            <button onClick={handlePasswordChange} className="btn-primary">
              Şifreyi Güncelle
            </button>
          </div>

          <div className="max-w-xl mx-auto my-4">
            <p className="text-center pt-4 pb-0.5 text-lg font-medium text-black dark:text-white border-b dark:border-gray-200 border-gray-600">
              Diğer İşlemler
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-2.5 border border-rose-100 hover:border-rose-300 cursor-pointer"
                onClick={() => setOpenDeleteAlert(true)}
              >
                <LuTrash2 className="text-base" /> Sil
              </button>
              {user?.isActive ? (
                <button
                  className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-violet-500 bg-violet-50 rounded px-2 py-2.5 border border-violet-100 hover:border-violet-300 cursor-pointer"
                  onClick={() => setOpenIsActiveModal(true)}
                >
                  <FaUserSlash className="text-base" /> Banla
                </button>
              ) : (
                <button
                  className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-green-500 bg-green-50 rounded px-2 py-2.5 border border-green-100 hover:border-green-300 cursor-pointer"
                  onClick={() => setOpenIsActiveModal(true)}
                >
                  <FaUserCheck className="text-base" /> Aktif Yap
                </button>
              )}
            </div>
          </div>
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
    </DashboardLayout>
  );
};

export default MemberDetails;
