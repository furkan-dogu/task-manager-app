import { useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTaskCalls from "../../hooks/useTaskCalls";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import AvatarGroup from "../../components/AvatarGroup";
import { translatePriority, translateStatus } from "../../helpers/data";

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className="text-xs font-medium text-slate-500 dark:text-slate-300">
        {label}
      </label>
      <p className="text-xs font-medium text-gray-700 dark:text-white mt-0.5 whitespace-pre-line">
        {value}
      </p>
    </>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="size-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
      />

      <p className="text-[13px] text-gray-800 dark:text-gray-200">{text}</p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  return (
    <div
      className="flex justify-between bg-gray-50 dark:bg-gray-400 border border-gray-100 dark:border-gray-400 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-3">
        <span className="text-xs text-gray-400 dark:text-gray-600 font-semibold w-5">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <p className="text-xs text-black dark:text-white">{link}</p>
      </div>
      <LuSquareArrowOutUpRight className="text-gray-400 dark:text-gray-600" />
    </div>
  );
};

const TaskDetail = () => {
  const { id } = useParams();
  const { taskDetails } = useSelector((state) => state.task);
  const { getTaskDetailsById, updateTodoChecklist } = useTaskCalls();

  useEffect(() => {
    if (id) {
      getTaskDetailsById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const handleChecklistToggle = (index) => {
    if (!taskDetails) return;

    const newChecklist = taskDetails.todoChecklist.map((item, idx) =>
      idx === index ? { ...item, completed: !item.completed } : item
    );

    updateTodoChecklist(taskDetails._id, { todoChecklist: newChecklist });
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  return (
    <DashboardLayout activeMenu="Görevlerim">
      <div className="mt-5">
        {taskDetails && (
          <div className="mt-4 max-w-5xl mx-auto">
            <div className="form-card">
              <div className="flex sm:items-center items-start gap-2 justify-between sm:flex-row flex-col-reverse">
                <h2 className="text-sm md:text-xl font-medium text-black dark:text-white">
                  {taskDetails?.title}
                </h2>
                <div
                  className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(
                    taskDetails?.status
                  )} px-4 py-0.5 rounded`}
                >
                  {translateStatus(taskDetails?.status)}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Açıklama" value={taskDetails?.description} />
              </div>

              <div className="grid grid-cols-12 sm:gap-4 gap-3 mt-4">
                <div className="col-span-full xs:col-span-6 md:col-span-4">
                  <InfoBox
                    label="Öncelik"
                    value={translatePriority(taskDetails?.priority)}
                  />
                </div>
                <div className="col-span-full xs:col-span-6 md:col-span-4">
                  <InfoBox
                    label="Son Tarih"
                    value={
                      taskDetails?.priority
                        ? new Date(taskDetails.createdAt).toLocaleDateString(
                            "tr-TR",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Belirsiz"
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-300">
                    Atanan Kişiler
                  </label>
                  <AvatarGroup
                    avatars={
                      taskDetails?.assignedTo?.map(
                        (user) => user?.profileImageUrl
                      ) || []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-300">
                  Yapılacaklar Kontrol Listesi
                </label>
                {taskDetails?.todoChecklist?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => handleChecklistToggle(index)}
                  />
                ))}
              </div>

              {taskDetails?.attachments?.length > 0 && (
                <div className="mt-4">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-300">
                    Attachments
                  </label>
                  {taskDetails.attachments.map((link, index) => (
                    <Attachment
                      key={`attach_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TaskDetail;
