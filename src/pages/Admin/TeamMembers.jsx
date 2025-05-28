import { useEffect, useState } from "react";
import useUserCalls from "../../hooks/useUserCalls";
import DashboardLayout from "../../layouts/DashboardLayout";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useSelector } from "react-redux";
import UserCard from "../../components/Cards/UserCard";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

const TeamMembers = () => {
  const { getAllUsers } = useUserCalls();
  const { allUsers, loading } = useSelector((state) => state.user);

  const { axiosWithToken } = useAxios();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleDownloadReport = async () => {
    try {
      const { data } = await axiosWithToken.get("/api/reports/export/users", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "kullanici_detaylari.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error("Kullanıcı detayları indirilemedi. Lütfen tekrar deneyin.");
    }
  };

  const totalPages = Math.ceil((allUsers?.length || 0) / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = allUsers?.slice(startIndex, endIndex);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <DashboardLayout activeMenu="Ekip Üyeleri">
        <div className="mt-5 mb-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-medium text-black dark:text-white">
              Ekip Üyeleri
            </h2>
            <button
              className="flex download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Raporu İndir
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {currentUsers?.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </DashboardLayout>
    );
  }
};

export default TeamMembers;
