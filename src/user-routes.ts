import { ROUTE_PATH } from "./utils/constants";
// @material-ui/icons
import ChatIcon from "@material-ui/icons/Chat";
import EventIcon from "@material-ui/icons/Event";
import DraftsIcon from "@material-ui/icons/Drafts";

// import components
import DashboardPage from "views/Components/Dashboard/Dashboard.js";
import ChatDialog from "./views/pages/user/main/ChatDialog.jsx";

const routes = [
  {
    path: "/messages",
    brand: "Messages",
    icon: ChatIcon,
    component: ChatDialog,
    layout: ROUTE_PATH.MESSAGES,
  },
  {
    path: "/dashboard",
    icon: EventIcon,
    brand: "Events",
    component: DashboardPage,
    layout: ROUTE_PATH.OVERVIEW,
  },
  // {
  //   path: "/draft",
  //   icon: DraftsIcon,
  //   component: DashboardPage,
  //   layout: ROUTE_PATH.MESSAGES,
  //   hide: true,
  // },
];

export default routes;
