import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { priorityDatas } from "../../helpers/data";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import useTaskCalls from "../../hooks/useTaskCalls";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });
  const [error, setError] = useState("");

  const { createTask, updateTask, getTaskDetailsById, deleteTask } =
    useTaskCalls();

  const { taskDetails } = useSelector((state) => state.task);

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setData({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById(taskId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  useEffect(() => {
    if (taskDetails && taskId) {
      setCurrentTask(taskDetails);
      setData({
        title: taskDetails.title,
        description: taskDetails.description,
        priority: taskDetails.priority,
        dueDate: new Date(taskDetails.dueDate).toISOString().split("T")[0],
        assignedTo: taskDetails?.assignedTo?.map((item) => item._id) || [],
        todoChecklist: taskDetails.todoChecklist.map((item) => item.text) || [],
        attachments: taskDetails?.attachments || [],
      });
    }
  }, [taskDetails, taskId]);

  const handleSubmit = () => {
    setError(null);

    if (!data.title.trim()) {
      setError("Başlık zorunludur.");
      return;
    }

    if (!data.description.trim()) {
      setError("Açıklama zorunludur.");
      return;
    }

    if (!data.dueDate || data.dueDate === "") {
      setError("Son tarih zorunludur.");
      return;
    }

    if (data.assignedTo.length === 0) {
      setError("Görev herhangi bir üyeye atanmamıştır.");
      return;
    }

    if (data.todoChecklist.length === 0) {
      setError("En az bir yapılacak görev ekleyin.");
      return;
    }

    if (taskId) {
      const todoList = data.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find(
          (task) => task.text === item
        );

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const info = {
        ...data,
        _id: taskId,
        dueDate: new Date(data.dueDate).toISOString(),
        todoChecklist: todoList,
      };
      updateTask(info);
      navigate("/admin/tasks", { replace: true, state: null });
      clearData();
      return;
    } else {
      const todoList = data.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }));

      const info = {
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
        todoChecklist: todoList,
      };

      createTask(info);
      clearData();
    }
  };

  const handleDelete = () => {
    deleteTask(taskId);
    setOpenDeleteAlert(false);
    navigate("/admin/tasks", { replace: true, state: null });
    clearData();
  };

  const handleCancel = () => {
    navigate("/admin/tasks", { replace: true, state: null });
    clearData();
  };

  return (
    <DashboardLayout activeMenu="Görev Oluştur">
      <div className="my-9">
        <div className="form-card">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-medium text-black dark:text-white">
              {taskId ? "Görev Güncelle" : "Görev Oluştur"}
            </h2>
            {taskId && (
              <button
                className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                onClick={() => setOpenDeleteAlert(true)}
              >
                <LuTrash2 className="text-base" /> Sil
              </button>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Görev Başlığı
            </label>
            <input
              placeholder="Başlığı yazın"
              className="form-input"
              value={data.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              type="text"
            />
          </div>
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Açıklama
            </label>
            <textarea
              placeholder="Görevi tanımlayın"
              className="form-input resize-none"
              rows={4}
              value={data.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="lg:col-span-4 sm:col-span-6 col-span-full">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Öncelik
              </label>
              <SelectDropdown
                options={priorityDatas}
                value={data.priority}
                onChange={(value) => handleChange("priority", value)}
                placeholder="Öncelik Seçin"
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-full">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Son Tarih
              </label>
              <input
                placeholder="Create App UI"
                className="form-input"
                value={data.dueDate || ""}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                type="date"
              />
            </div>
            <div className="lg:col-span-4 col-span-full">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Atanacak Kişi
              </label>
              <SelectUsers
                selectedUsers={data.assignedTo}
                setSelectedUsers={(value) => handleChange("assignedTo", value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              TODO Kontrol Listesi
            </label>
            <TodoListInput
              todoList={data?.todoChecklist}
              setTodoList={(value) => handleChange("todoChecklist", value)}
            />
          </div>
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Ek Bağlantı Ekle
            </label>
            <AddAttachmentsInput
              attachments={data?.attachments}
              setAttachments={(value) => handleChange("attachments", value)}
            />
          </div>
          {error && (
            <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
          )}
          <div className="flex justify-start flex-wrap-reverse xs:flex-nowrap mt-7 gap-3">
            {taskId && (
              <button className="cancel-btn" onClick={handleCancel}>
                İPTAL
              </button>
            )}

            <button className="add-btn" onClick={handleSubmit}>
              {taskId ? "GÖREVİ GÜNCELLE" : "GÖREV OLUŞTUR"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Görevi Sil"
      >
        <DeleteAlert
          content="Bu görevi silmek istediğinizden emin misiniz?"
          onDelete={handleDelete}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
