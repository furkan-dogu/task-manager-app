import { useEffect, useState } from "react";
import ProfilePhotoSelector from "./Inputs/ProfilePhotoSelector";
import useAuthCalls from "../hooks/useAuthCalls";
import { useSelector } from "react-redux";

const ProfileInfoForm = () => {
  const { getUserInfo, updateUserInfo } = useAuthCalls();
  const { userInfo } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    name: "",
    email: "",
    profileImage: null,
  });

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInfo) {
      setData((prev) => ({
        ...prev,
        name: userInfo.name || "",
        email: userInfo.email || "",
        previewUrl: userInfo.profileImageUrl || null,
      }));
    }
  }, [userInfo]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.profileImage instanceof File) {
      formData.append("profileImageUrl", data.profileImage);
    } else if (!data.profileImage && !data.previewUrl) {
      formData.append("profileImageUrl", "null");
    }

    updateUserInfo(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto my-4">
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

      <button type="submit" className="btn-primary">
        Güncelle
      </button>
    </form>
  );
};

export default ProfileInfoForm;
