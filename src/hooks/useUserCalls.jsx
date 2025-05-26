import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { 
    fetchFail, 
    fetchStart,
    getAllUsersSuccess
} from "../features/userSlice"
import toast from "react-hot-toast"

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

    const deleteUser = async (id) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.delete(`/api/users/${id}`)
            toast.success("Kullanıcı silindi")
            getAllUsers()
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`)
        }
    }

    const updateIsActive = async (id, info) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.put(`/api/users/${id}`, { isActive: info })
            if (info) {
                toast.success("Kullanıcı aktif edildi")
            } else {
                toast.success("Kullanıcı banlandı")
            }
            getAllUsers()
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`)
        }
    }

    return { getAllUsers, deleteUser, updateIsActive }
}

export default useUserCalls