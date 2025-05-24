const TaskListTable = ({ tableData }) => {
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

  const translateStatus = (status) => {
    switch (status) {
      case "Completed":
        return "Tamamlandı";
      case "Pending":
        return "Bekliyor";
      case "In Progress":
        return "Devam Ediyor";
      default:
        return status;
    }
  };

  const translatePriority = (priority) => {
    switch (priority) {
      case "High":
        return "Yüksek";
      case "Medium":
        return "Orta";
      case "Low":
        return "Düşük";
      default:
        return priority;
    }
  };
  
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
          </tr>
        </thead>

        <tbody>
          {tableData.map((task) => (
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
                {new Date(task.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
