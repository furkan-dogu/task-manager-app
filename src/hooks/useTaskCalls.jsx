import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { 
    fetchFail, 
    fetchStart,
    getAdminDashboardDatasSuccess,
    getAllTasksSuccess,
    getTaskDetailsByIdSuccess,
    clearTaskDetails,
    getUserDashboardDatasSuccess 
} from "../features/taskSlice"
import toast from "react-hot-toast"

const useTaskCalls = () => {
    const dispatch = useDispatch()
    const { axiosWithToken } = useAxios()

    const getAdminDashboardDatas = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get("/api/tasks/dashboard-data")
            dispatch(getAdminDashboardDatasSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }

    const getAllTasks = async (filterStatus) => {
        dispatch(fetchStart())
        try {
            const statusParam = filterStatus === "All" ? "" : filterStatus;

            const { data } = await axiosWithToken.get("/api/tasks", { params: { status: statusParam } })
            dispatch(getAllTasksSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }

    const createTask = async (info) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.post("/api/tasks", info)
            toast.success("Görev oluşturuldu")
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`)
        }
    }

    const getTaskDetailsById = async (id) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get(`/api/tasks/${id}`)
            dispatch(getTaskDetailsByIdSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }

    const updateTask = async (info) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.put(`/api/tasks/${info._id}`, info)
            dispatch(clearTaskDetails())
            toast.success("Görev güncellendi")
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`)
        }
    }

    const deleteTask = async (id) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.delete(`/api/tasks/${id}`)
            dispatch(clearTaskDetails())
            toast.success("Görev silindi")
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`)
        }
    }

    const getUserDashboardDatas = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get("/api/tasks/user-dashboard-data")
            dispatch(getUserDashboardDatasSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }

    const updateTodoChecklist = async (id, info) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.put(`/api/tasks/${id}/todo`, info)
            getTaskDetailsById(id)
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }

    return { 
        getAdminDashboardDatas, 
        getAllTasks, 
        createTask,
        getTaskDetailsById,
        updateTask,
        deleteTask,
        getUserDashboardDatas,
        updateTodoChecklist 
    }
}

export default useTaskCalls