import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { LuFileSpreadsheet } from "react-icons/lu";
import useTaskCalls from "../../hooks/useTaskCalls";
import { useSelector } from "react-redux";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

const ManageTasks = () => {
  const [allDatas, setAllDatas] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const navigate = useNavigate();
  const { getAllTasks } = useTaskCalls();
  const { allTasks, loading } = useSelector((state) => state.task);
  const { axiosWithToken } = useAxios();

  useEffect(() => {
    getAllTasks(filterStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allDatas]);

  useEffect(() => {
    if (!allTasks) return;

    setAllDatas(allTasks?.tasks?.length > 0 ? allTasks?.tasks : []);

    const statusSummary = allTasks?.statusSummary || [];

    const statusArray = [
      { label: "All", count: statusSummary.all || 0 },
      { label: "Pending", count: statusSummary.pendingTasks || 0 },
      { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
      { label: "Completed", count: statusSummary.completedTasks || 0 },
    ];

    setTabs(statusArray);
  }, [allTasks]);

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    try {
      const res = await axiosWithToken.get("/api/reports/export/tasks", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "gorev-detaylari.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error("Görev detayları indirilemedi. Lütfen tekrar deneyin.");
    }
  };

  const totalPages = Math.ceil(allDatas.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = allDatas.slice(startIndex, endIndex);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <DashboardLayout activeMenu="Görevleri Yönet">
        <div className="my-5 max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-xl font-medium text-black dark:text-white">
                Görevleri Yönet
              </h2>
              <button
                className="flex lg:hidden download-btn"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Raporu İndir
              </button>
            </div>

            {tabs?.[0]?.count > 0 && (
              <div className="flex items-center gap-3">
                <TaskStatusTabs
                  tabs={tabs}
                  activeTab={filterStatus}
                  setActiveTab={setFilterStatus}
                />

                <button
                  className="hidden lg:flex download-btn"
                  onClick={handleDownloadReport}
                >
                  <LuFileSpreadsheet className="text-lg" />
                  Raporu İndir
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {currentTasks?.map((item) => (
              <TaskCard
                key={item._id}
                item={item}
                onClick={() => handleClick(item)}
              />
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

export default ManageTasks;
