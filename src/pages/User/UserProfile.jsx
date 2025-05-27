import DashboardLayout from "../../layouts/DashboardLayout";
import ProfileTabs from "../../components/ProfileTabs";
import ProfileInfoForm from "../../components/ProfileInfoForm";
import ChangePasswordForm from "../../components/ChangePasswordForm";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname.includes("change-password")
    ? "password"
    : "info";

  const handleTabChange = (tab) => {
    if (tab === "info") {
      navigate("/user/profile");
    } else if (tab === "password") {
      navigate("/user/profile/change-password");
    }
  };

  return (
    <DashboardLayout activeMenu="Profil">
      <div className="my-9 max-w-[1920px] mx-auto">
        <div className="form-card">
          <h2 className="text-xl font-medium text-black dark:text-white">
            Profil
          </h2>
          <ProfileTabs activeTab={activeTab} setActiveTab={handleTabChange} />
          <div className="mt-6">
            {activeTab === "info" && <ProfileInfoForm />}
            {activeTab === "password" && <ChangePasswordForm />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
