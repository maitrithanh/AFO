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
        img: "analysis.png"
    },
    {
        text: 'Quản lý tài khoản',
        icon: IoAnalyticsSharp,
        pathname: '/admin/account',
        img: 'user.png'
    },
    {
        text: 'Lớp học',
        icon: LuUser2,
        pathname: '/admin/classes',
        img: 'blackboard.png'
    },
    {
        text: 'Lịch học',
        icon: MdOutlineInventory,
        pathname: '/admin/schedule',
        img: 'attendance.png'
    },
    ,
    {
        text: 'Môn học',
        icon: FaHeart,
        pathname: '/admin/subject',
        img: "heartbeat.png"
    },
    {
        text: 'Đưa đón',
        icon: PiChalkboardTeacherDuotone,
        pathname: '/admin/bus',
        img: 'bus.png'
    },
    {
        text: 'Sức khoẻ',
        icon: CiMoneyBill,
        pathname: '/admin/health',
        img: 'heartbeat.png'
    },
    {
        text: 'Thực đơn',
        icon: GiTeacher,
        pathname: '/admin/menu',
        img: 'menu.png'
    }
    ,
    {
        text: 'Album',
        icon: GiTeacher,
        pathname: '/admin/album',
        img: 'album.png'
    }
    ,
    {
        text: 'Học phí',
        icon: GiTeacher,
        pathname: '/admin/schoolfee',
        img: 'cost.png'
    },
    {
        text: 'Thông báo',
        icon: GiTeacher,
        pathname: '/admin/notification',
        img: 'notification.png'
    }
    ,
    {
        text: 'Góp ý',
        icon: GiTeacher,
        pathname: '/admin/feedback',
        img: 'feedback.png'
    }
]