import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { 
    fetchFail, 
    fetchStart,
    getAllUsersSuccess
} from "../features/userSlice"

const useUserCalls = () => {
    const dispatch = useDispatch()
    const { axiosWithToken } = useAxios()

    const getAllUsers = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get("/api/users")
            dispatch(getAllUsersSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }

    return { getAllUsers }
}

export default useUserCalls