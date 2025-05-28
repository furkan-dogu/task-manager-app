import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { addThousandsSeperator } from "../../helpers/addThousandsSeperator";
import InfoCard from "../../components/Cards/InfoCard";
import useTaskCalls from "../../hooks/useTaskCalls";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import TaskListTable from "../../components/TaskListTable";
import Loading from "../../components/Loading";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import { filterOptions } from "../../helpers/filterOptions";

const COLORS = ["#8D51FF", "#00B8D8", "#7BCE00"];

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { adminDashboardDatas, loading } = useSelector((state) => state.task);
  const { getAdminDashboardDatas } = useTaskCalls();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Hepsi");

  useEffect(() => {
    getAdminDashboardDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adminDashboardDatas) {
      setDashboardData(adminDashboardDatas);
      prepareChartData(adminDashboardDatas?.charts || null);
    }
  }, [adminDashboardDatas]);

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Bekleyen", count: taskDistribution?.Pending || 0 },
      { status: "Devam Eden", count: taskDistribution?.InProgress || 0 },
      { status: "Tamamlanan", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { priority: "Düşük", count: taskPriorityLevels?.Low || 0 },
      { priority: "Orta", count: taskPriorityLevels?.Medium || 0 },
      { priority: "Yüksek", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(priorityLevelData);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <DashboardLayout activeMenu="Kontrol Paneli">
        <div className="max-w-[1920px] mx-auto">
          <div className="card my-5">
            <div>
              <h2 className="text-xl md:text-2xl text-black dark:text-white">
                Merhaba {user.name}
              </h2>
              <p className="text-xs md:text-sm text-gray-400 dark:text-gray-300 mt-1.5">
                {new Date().toLocaleDateString("tr-TR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
              <InfoCard
                label="Toplam"
                value={addThousandsSeperator(
                  dashboardData?.charts?.taskDistribution?.All || 0
                )}
                color="bg-primary"
              />
              <InfoCard
                label="Bekleyen"
                value={addThousandsSeperator(
                  dashboardData?.charts?.taskDistribution?.Pending || 0
                )}
                color="bg-violet-500"
              />
              <InfoCard
                label="Devam Eden"
                value={addThousandsSeperator(
                  dashboardData?.charts?.taskDistribution?.InProgress || 0
                )}
                color="bg-cyan-500"
              />
              <InfoCard
                label="Tamamlanan"
                value={addThousandsSeperator(
                  dashboardData?.charts?.taskDistribution?.Completed || 0
                )}
                color="bg-lime-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
            <div className="card">
              <h5 className="font-medium text-black dark:text-white">
                Görev Dağılımı
              </h5>
              <CustomPieChart data={pieChartData} colors={COLORS} />
            </div>
            <div className="card">
              <h5 className="font-medium text-black dark:text-white">
                Görev Öncelik Seviyeleri
              </h5>
              <CustomBarChart data={barChartData} />
            </div>
            <div className="md:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h5 className="text-lg text-black dark:text-white">
                    Güncel Görevler
                  </h5>
                  <div className="flex justify-end mb-4 sm:max-w-56 max-w-none w-full ml-auto">
                    <SelectDropdown
                      options={filterOptions}
                      value={selectedFilter}
                      onChange={setSelectedFilter}
                      placeholder="Görevleri filtrele"
                    />
                  </div>
                </div>

                <TaskListTable
                  tableData={dashboardData?.recentTasks || []}
                  selectedFilter={selectedFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
};

export default AdminDashboard;
