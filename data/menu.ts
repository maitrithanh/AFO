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
        pathname: '/admin/statistics',
        img: "analysis.webp"
    },
    {
        text: 'accountManagement',
        icon: IoAnalyticsSharp,
        pathname: '#',
        img: 'user.webp',
        child: [
            {
                text: 'parentlist',
                icon: IoAnalyticsSharp,
                pathname: '/admin/listparent',
                img: 'parentList.webp'
            },
            {
                text: 'childrenlist',
                icon: IoAnalyticsSharp,
                pathname: '/admin/children',
                img: 'childList.webp'
            },
            {
                text: 'teacherList',
                icon: IoAnalyticsSharp,
                pathname: '/admin/list-teacher',
                img: 'employment.webp'
            },
        ]
    },
   
    {
        text: 'classes',
        icon: LuUser2,
        pathname: '/admin/classes',
        img: 'blackboard.webp'
    },
    {
        text: 'Điểm danh',
        icon: LuUser2,
        pathname: '/admin/attendance',
        img: 'attendance.webp'
    },
    {
        text: 'Danh sách xin nghỉ',
        icon: GiTeacher,
        pathname: '/admin/burnout',
        img: 'burnout.webp'
    },
    {
        text: 'Danh sách chuyển lớp',
        icon: GiTeacher,
        pathname: '/admin/change-class',
        img: 'change-class.webp'
    },
    {
        text: 'studySchedule',
        icon: MdOutlineInventory,
        pathname: '/admin/schedule',
        img: 'weekly.webp'
    },
    ,
    {
        text: 'event',
        icon: FaHeart,
        pathname: '/admin/event',
        img: "event.webp"
    },
    {
        text: 'pickup',
        icon: PiChalkboardTeacherDuotone,
        pathname: '#',
        img: 'bus.webp',
        child: [
            {
                text: 'Tuyến xe',
                icon: PiChalkboardTeacherDuotone,
                pathname: '/admin/bus',
                img: 'route.webp',
            },
            {
                text: 'Tài xế',
                pathname: '/admin/bus/driver',
                img: 'driver.webp'
            },

        ]
    },
    {
        text: 'helth',
        icon: CiMoneyBill,
        pathname: '/admin/health',
        img: 'heartbeat.webp'
    },
    {
        text: 'news',
        icon: CiMoneyBill,
        pathname: '/admin/news',
        img: 'news.webp'
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