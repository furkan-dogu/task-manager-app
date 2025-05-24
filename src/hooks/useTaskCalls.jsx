import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { 
    fetchFail, 
    fetchStart,
    getAdminDashboardDatasSuccess 
} from "../features/taskSlice"

const useTaskCalls = () => {
    const dispatch = useDispatch()
    const { axiosWithToken } = useAxios()

    const getAdminDashboardDatas = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get("/api/tasks/dashboard-data")
            // console.log(data);
            dispatch(getAdminDashboardDatasSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }

    return { getAdminDashboardDatas }
}

export default useTaskCalls