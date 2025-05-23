import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut
} from 'react-icons/lu';

export const adminSidebarMenuItems = [
    {
        id: 1,
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin",
    },
    {
        id: 2,
        label: "Manage Tasks",
        icon: LuClipboardCheck,
        path: "/admin/tasks",
    },
    {
        id: 3,
        label: "Create Task",
        icon: LuSquarePlus,
        path: "/admin/create-task",
    },
    {
        id: 4,
        label: "Team Members",
        icon: LuUsers,
        path: "/admin/team-members",
    },
    {
        id: 5,
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];

export const userSidebarMenuItems = [
    {
        id: 1,
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/user",
    },
    {
        id: 2,
        label: "My Tasks",
        icon: LuClipboardCheck,
        path: "/user/tasks",
    },
    {
        id: 3,
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];