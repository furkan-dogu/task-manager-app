import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { 
    fetchFail, 
    fetchStart,
    getAdminDashboardDatasSuccess,
    getAllTasksSuccess 
} from "../features/taskSlice"

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

    return { getAdminDashboardDatas, getAllTasks }
}

export default useTaskCalls