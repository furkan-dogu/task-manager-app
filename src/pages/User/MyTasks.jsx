import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import useTaskCalls from "../../hooks/useTaskCalls";
import { useSelector } from "react-redux";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

const MyTasks = () => {
  const [allDatas, setAllDatas] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const navigate = useNavigate();
  const { getAllTasks } = useTaskCalls();
  const { allTasks, loading } = useSelector((state) => state.task);

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

  const handleClick = (item) => {
    navigate(`/user/tasks/${item._id}`);
  };

  const totalPages = Math.ceil(allDatas.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = allDatas.slice(startIndex, endIndex);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <DashboardLayout activeMenu="Görevlerim">
        <div className="my-5 max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <h2 className="text-xl font-medium text-black dark:text-white">
              Görevlerim
            </h2>
            {tabs?.[0]?.count > 0 && (
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
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

export default MyTasks;
