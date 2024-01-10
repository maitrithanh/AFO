import { LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import {
  IoAnalyticsSharp,
} from "react-icons/io5";
import { MdOutlineInventory } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaHeart } from "react-icons/fa6";

export const  menu = [
    {
        text: 'Tổng quan',
        icon: LuLayoutDashboard,
        pathname: '/admin'
    },
    {
        text: 'Phân tích',
        icon: IoAnalyticsSharp,
        pathname: '/admin/statistics'
    },
    {
        text: 'Người dùng',
        icon: LuUser2,
        pathname: '/admin/users'
    },
    {
        text: 'Điểm danh',
        icon: MdOutlineInventory,
        pathname: '/admin/attendance'
    },
    ,
    {
        text: 'Sức Khoẻ',
        icon: FaHeart,
        pathname: '/admin/health'
    },
    {
        text: 'Giáo viên',
        icon: PiChalkboardTeacherDuotone,
        pathname: '/admin/teachers'
    },
    {
        text: 'Học phí',
        icon: CiMoneyBill,
        pathname: '/admin/schoolfee'
    },
    {
        text: 'Lớp học',
        icon: GiTeacher,
        pathname: '/admin/class'
    }
]