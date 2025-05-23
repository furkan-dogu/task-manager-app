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
import AdminSettings from "../pages/Admin/AdminSettings"
import UserSettings from "../pages/User/UserSettings"

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
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* User Routes */}
                <Route path="/user" element={<PrivateRouter allowRoles={["member"]} />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="tasks" element={<MyTasks />} />
                    <Route path="tasks/:id" element={<TaskDetail />} />
                    <Route path="settings" element={<UserSettings />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter