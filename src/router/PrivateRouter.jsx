import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"


const PrivateRouter = ({ allowRoles }) => {
    const { user } = useSelector(state => state.auth)
    
    const location = useLocation();
    
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    if (!allowRoles.includes(user.role)) {
        return user.role === "admin"
            ? <Navigate to="/admin" replace />
            : <Navigate to="/user" replace />
    }

    return <Outlet />
}

export default PrivateRouter