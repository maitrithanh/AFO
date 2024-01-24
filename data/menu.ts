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
        text: 'Thống kê',
        icon: LuLayoutDashboard,
        pathname: '/admin',
        img: "analysis.webp"
    },
    {
        text: 'Quản lý tài khoản',
        icon: IoAnalyticsSharp,
        pathname: '/admin/account',
        img: 'user.webp'
    },
    {
        text: 'Lớp học',
        icon: LuUser2,
        pathname: '/admin/classes',
        img: 'blackboard.webp'
    },
    {
        text: 'Lịch học',
        icon: MdOutlineInventory,
        pathname: '/admin/schedule',
        img: 'attendance.webp'
    },
    ,
    {
        text: 'Môn học',
        icon: FaHeart,
        pathname: '/admin/subject',
        img: "heartbeat.webp"
    },
    {
        text: 'Đưa đón',
        icon: PiChalkboardTeacherDuotone,
        pathname: '/admin/bus',
        img: 'bus.webp'
    },
    {
        text: 'Sức khoẻ',
        icon: CiMoneyBill,
        pathname: '/admin/health',
        img: 'heartbeat.webp'
    },
    {
        text: 'Thực đơn',
        icon: GiTeacher,
        pathname: '/admin/menu',
        img: 'menu.webp'
    }
    ,
    {
        text: 'Album',
        icon: GiTeacher,
        pathname: '/admin/album',
        img: 'album.webp'
    }
    ,
    {
        text: 'Học phí',
        icon: GiTeacher,
        pathname: '/admin/schoolfee',
        img: 'cost.webp'
    },
    {
        text: 'Thông báo',
        icon: GiTeacher,
        pathname: '/admin/notification',
        img: 'notification.webp'
    }
    ,
    {
        text: 'Góp ý',
        icon: GiTeacher,
        pathname: '/admin/feedback',
        img: 'feedback.webp'
    }
]