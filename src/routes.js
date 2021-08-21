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
];

export default dashboardRoutes;
