import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/Auth/Login"
import SignUp from "../pages/Auth/SignUp"
import PrivateRouter from "./PrivateRouter"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import ManageTasks from "../pages/Admin/ManageTasks"
import CreateTask from "../pages/Admin/CreateTask"
import TeamMembers from "../pages/Admin/TeamMembers"
import UserDashboard from "../pages/User/UserDashboard"
import MyTasks from "../pages/User/MyTasks"
import TaskDetail from "../pages/User/TaskDetail"
import NotFound from "../pages/NotFound"
import AdminProfile from "../pages/Admin/AdminProfile"
import UserProfile from "../pages/User/UserProfile"
import MemberDetails from "../pages/Admin/MemberDetails"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<SignUp />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<PrivateRouter allowRoles={["admin"]} />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="tasks" element={<ManageTasks />} />
                    <Route path="create-task" element={<CreateTask />} />
                    <Route path="team-members" element={<TeamMembers />} />
                    <Route path="team-members/:id" element={<MemberDetails />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="profile/change-password" element={<AdminProfile />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* User Routes */}
                <Route path="/user" element={<PrivateRouter allowRoles={["member"]} />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="tasks" element={<MyTasks />} />
                    <Route path="tasks/:id" element={<TaskDetail />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter