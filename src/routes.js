import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views/Components for Admin layout
import DashboardPage from "views/Components/Dashboard/Dashboard.js";
import UserProfile from "views/Components/UserProfile/UserProfile.js";
import TableList from "views/Components/TableList/TableList.js";
import Typography from "views/Components/Typography/Typography.js";
import Icons from "views/Components/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Components/Notifications/Notifications.js";
import UpgradeToPro from "views/Components/UpgradeToPro/UpgradeToPro.js";
// core components/views/Components for RTL layout
import RTLPage from "views/Components/RTLPage/RTLPage.js";

// auth components
import { ROUTE_PATH } from "utils/constants";
import LoginPage from "views/pages/auth/LoginPage";
import RegisterPage from "views/pages/auth/RegisterPage";

const dashboardRoutes = [
  // authentication
  {
    path: '/login',
    name: 'Log In',
    component: LoginPage,
    layout: ROUTE_PATH.AUTH,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    layout: ROUTE_PATH.AUTH,
  },

  // template
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin",
  },
];

export default dashboardRoutes;
