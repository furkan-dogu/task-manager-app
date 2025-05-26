import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { 
    fetchFail, 
    fetchStart, 
    loginSuccess,
    registerSuccess,
    logoutSuccess,
    getUserInfoSuccess 
} from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const useAuthCalls = () => {
    const dispatch = useDispatch()
    const { axiosPublic, axiosWithToken } = useAxios()
    const navigate = useNavigate()

    const login = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic.post("/api/auth/login", userInfo);
            dispatch(loginSuccess(data))
            toast.success(`Hoşgeldin ${data.name}`)

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
            toast.error(`${error.response.data.message || error.message}`)
        }
    }

    const register = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic.post("/api/auth/register", userInfo);
            dispatch(registerSuccess(data))
            toast.success(`Kayıt başarılı. Hoşgeldin ${data.name}`)

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
            toast.error(`${error.response.data.message || error.message}`)
        }
    }

    const logout = async () => {
        dispatch(fetchStart());
        try {
            await axiosWithToken.get("/api/auth/logout");
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`);
        }
    }

    const getUserInfo = async () => {
        dispatch(fetchStart());
        try {
            const { data } = await axiosWithToken.get("/api/auth/profile");
            dispatch(getUserInfoSuccess(data));
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`);
        }
    }

    const updateUserInfo = async (info) => {
        dispatch(fetchStart());
        try {
            await axiosWithToken.put("/api/auth/profile", info);
            getUserInfo();
            toast.success("Bilgileriniz güncellendi");
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`);
        }
    }

    const updateUserPassword = async (info) => {
        dispatch(fetchStart());
        try {
            await axiosWithToken.put("/api/auth/profile", { password: info });
            toast.success("Şifreniz güncellendi");
        } catch (error) {
            dispatch(fetchFail());
            console.log(error);
            toast.error(`${error.response.data.message || error.message}`);
        }
    }

    return { login, register, logout, getUserInfo, updateUserInfo, updateUserPassword };
}

export default useAuthCalls