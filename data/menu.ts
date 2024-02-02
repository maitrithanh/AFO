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
        text: 'statistical',
        icon: LuLayoutDashboard,
        pathname: '/admin',
        img: "analysis.webp"
    },
    {
        text: 'accountManagement',
        icon: IoAnalyticsSharp,
        pathname: '/admin/account',
        img: 'user.webp'
    },
    {
        text: 'classes',
        icon: LuUser2,
        pathname: '/admin/classes',
        img: 'blackboard.webp'
    },
    {
        text: 'studySchedule',
        icon: MdOutlineInventory,
        pathname: '/admin/schedule',
        img: 'attendance.webp'
    },
    ,
    {
        text: 'subject',
        icon: FaHeart,
        pathname: '/admin/subject',
        img: "book.webp"
    },
    {
        text: 'pickup',
        icon: PiChalkboardTeacherDuotone,
        pathname: '/admin/bus',
        img: 'bus.webp'
    },
    {
        text: 'helth',
        icon: CiMoneyBill,
        pathname: '/admin/health',
        img: 'heartbeat.webp'
    },
    {
        text: 'menu',
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
        text: 'schoolFee',
        icon: GiTeacher,
        pathname: '/admin/schoolfee',
        img: 'cost.webp'
    },
    {
        text: 'notification',
        icon: GiTeacher,
        pathname: '/admin/notification',
        img: 'notification.webp'
    }
    ,
    {
        text: 'feedback',
        icon: GiTeacher,
        pathname: '/admin/feedback',
        img: 'feedback.webp'
    }
]