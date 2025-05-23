import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const useAuthCalls = () => {
    const dispatch = useDispatch()
    const { axiosPublic } = useAxios()
    const navigate = useNavigate()

    const login = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic.post("/api/auth/login", userInfo);
            dispatch(loginSuccess(data))
            toast.success(`Login successful. Welcome, ${data.name}`)

            if (data.role === "admin") {
                navigate("/admin")
            } else if (data.role === "member") {
                navigate("/user")
            } else {
                navigate("/")
            }
        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
            toast.error(`Login failed: ${error.response.data.message}`)
        }
    }

    return { login };
}

export default useAuthCalls