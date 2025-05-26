import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut,
    LuUserCog  
} from 'react-icons/lu';

export const adminSidebarMenuItems = [
  {
    id: 1,
    label: "Kontrol Paneli", 
    icon: LuLayoutDashboard,
    path: "/admin",
  },
  {
    id: 2,
    label: "Görevleri Yönet", 
    icon: LuClipboardCheck,
    path: "/admin/tasks",
  },
  {
    id: 3,
    label: "Görev Oluştur", 
    icon: LuSquarePlus,
    path: "/admin/create-task",
  },
  {
    id: 4,
    label: "Ekip Üyeleri", 
    icon: LuUsers,
    path: "/admin/team-members",
  },
  {
    id: 5,
    label: "Profil", 
    icon: LuUserCog ,
    path: "/admin/profile",
  },
  {
    id: 6,
    label: "Çıkış Yap", 
    icon: LuLogOut,
    path: "logout",
  },
];

export const userSidebarMenuItems = [
    {
        id: 1,
        label: "Kontrol Paneli",
        icon: LuLayoutDashboard,
        path: "/user",
    },
    {
        id: 2,
        label: "Görevlerim",
        icon: LuClipboardCheck,
        path: "/user/tasks",
    },
    {
        id: 3,
        label: "Profil",
        icon: LuUserCog  ,
        path: "/user/profile",
    },
    {
        id: 4,
        label: "Çıkış yap",
        icon: LuLogOut,
        path: "logout",
    },
];

export const priorityDatas = [
    { label: "Düşük", value: "Low" }, 
    { label: "Orta", value: "Medium" }, 
    { label: "Yüksek", value: "High" }
];