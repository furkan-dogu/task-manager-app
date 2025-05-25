import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";

const TaskCard = ({ item, onClick }) => {
  const {
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    assignedTo,
    attachments,
    completedTodoCount,
    todoChecklist,
  } = item;

  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
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
    <div
      className="bg-white dark:bg-gray-500/60 rounded-xl py-4 shadow-md shadow-gray-100 dark:shadow-gray-600 border border-gray-200/50 cursor-pointer dark:border-gray-200/20 overflow-x-hidden"
      onClick={onClick}
    >
      <div className="flex items-start xs:flex-row flex-col gap-3 px-4">
        <div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
          {translateStatus(status)}
        </div>
        <div className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded`}>
          {translatePriority(priority)} Öncelikli
        </div>
      </div>

      <div
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}
      >
        <p className="xs:text-sm text-xs font-medium text-gray-800 dark:text-gray-300 mt-4 line-clamp-2">
          {title}
        </p>
        <p className="xs:text-xs text-[10px] text-gray-500 dark:text-gray-200/90 mt-1.5 line-clamp-2 leading-[18px] whitespace-pre-line">
          {description}
        </p>
        <p className="xs:text-[13px] text-xs text-gray-700/80 dark:text-gray-300/80 font-medium my-2 leading-[18px]">
          Görev Yapıldı:{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {completedTodoCount} / {todoChecklist?.length || 0}
          </span>
        </p>
        <Progress progress={progress} status={status} />
      </div>

      <div className="px-4">
        <div className="flex xs:items-center items-start justify-between xs:flex-row flex-col">
          <div className="flex xs:flex-col flex-row justify-between xs:flex-nowrap flex-wrap w-full xs:w-auto mt-3 mb-2">
            <label className="text-xs text-gray-500 dark:text-gray-200">Başlangıç Tarihi</label>
            <p className="xs:text-[13px] text-xs font-medium text-gray-900 dark:text-gray-400">
              {new Date(createdAt).toLocaleDateString("tr-TR")}
            </p>
          </div>
          <div className="flex xs:flex-col flex-row justify-between xs:flex-nowrap flex-wrap w-full xs:w-auto mt-3 mb-2">
            <label className="text-xs text-gray-500 dark:text-gray-200">Son Tarih</label>
            <p className="xs:text-[13px] text-xs font-medium text-gray-900 dark:text-gray-400">
              {new Date(dueDate).toLocaleDateString("tr-TR")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <AvatarGroup avatars={assignedTo?.map((item) => item.profileImageUrl) || []} />
          {attachments?.length > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
              <LuPaperclip className="text-primary" />
              <span className="text-xs text-gray-900">{attachments.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
