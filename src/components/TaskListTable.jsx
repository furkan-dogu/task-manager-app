import { useEffect, useRef, useState } from "react";
import { translatePriority, translateStatus } from "../helpers/data";
import Pagination from "./Pagination";
import { FaChevronDown } from "react-icons/fa";

const TaskListTable = ({ tableData, selectedFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, tasksPerPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-500 border border-green-200";
      case "Pending":
        return "bg-purple-100 text-purple-500 border border-purple-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-500 border border-cyan-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-500 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-500 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-500 border border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const filteredTasks = [...tableData].filter((task) => {
    switch (selectedFilter) {
      case "Durum - Bekliyor":
        return task.status === "Pending";
      case "Durum - Devam Ediyor":
        return task.status === "In Progress";
      case "Durum - Tamamlandı":
        return task.status === "Completed";
      case "Öncelik - Yüksek":
        return task.priority === "High";
      case "Öncelik - Orta":
        return task.priority === "Medium";
      case "Öncelik - Düşük":
        return task.priority === "Low";
      default:
        return true;
    }
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    switch (selectedFilter) {
      case "Oluşturulma - Artan":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "Oluşturulma - Azalan":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "Son Tarih - Artan":
        return new Date(a.dueDate) - new Date(b.dueDate);
      case "Son Tarih - Azalan":
        return new Date(b.dueDate) - new Date(a.dueDate);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px] flex-1/2 min-w-60">
              İsim
            </th>
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px] flex-1/6">
              Durum
            </th>
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px] flex-1/6">
              Öncelik
            </th>
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px] flex-1/6">
              Oluşturulma
            </th>
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px] flex-1/6">
              Son Tarih
            </th>
          </tr>
        </thead>

        <tbody>
          {currentTasks.map((task) => (
            <tr key={task._id} className="border-t border-gray-200">
              <td className="my-3 mx-4 text-gray-700 dark:text-gray-200 text-[13px] line-clamp-1 overflow-hidden">
                {task.title}
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(
                    task.status
                  )}`}
                >
                  {translateStatus(task.status)}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(
                    task.priority
                  )}`}
                >
                  {translatePriority(task.priority)}
                </span>
              </td>
              <td className="p-4 text-gray-700 dark:text-gray-200 text-[13px] text-nowrap">
                {new Date(task.createdAt).toLocaleDateString("tr-TR")}
              </td>
              <td className="p-4 text-gray-700 dark:text-gray-200 text-[13px] text-nowrap">
                {new Date(task.dueDate).toLocaleDateString("tr-TR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center md:flex-row flex-col my-4 gap-5 relative">
        <div className="relative max-w-40 w-full" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full text-sm text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-400 px-3 py-2 rounded flex justify-between items-center cursor-pointer"
          >
            {tasksPerPage} Görev
            <FaChevronDown
              className={`ml-2 transition ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute mb-1 bottom-full w-full bg-white dark:bg-gray-400 border border-gray-300 dark:border-gray-400 rounded shadow-md z-50 overflow-y-auto max-h-40">
              {[5, 10, 25, 50].map((count) => (
                <div
                  key={count}
                  onClick={() => {
                    setTasksPerPage(count);
                    setDropdownOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white ${
                    tasksPerPage === count
                      ? "bg-gray-100 dark:bg-gray-600 font-semibold"
                      : ""
                  }`}
                >
                  {count} Görev
                </div>
              ))}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default TaskListTable;
