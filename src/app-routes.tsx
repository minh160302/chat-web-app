import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { ROUTE_PATH } from "./utils/constants"
import { createBrowserHistory } from "history";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Overview from "./layouts/Overview.jsx"
import Messages from "./layouts/Messages.jsx"
import Auth from "./layouts/Auth.jsx"

import "assets/css/material-dashboard-react.css?v=1.9.0";


const hist = createBrowserHistory();
console.log("fetch")
const Routes = () => (
  <div className="view-routes">
    <Router history={hist}>
      <Switch>
        <Route path={"/admin"} component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Route path={ROUTE_PATH.AUTH} component={Auth} />
        <Route path={ROUTE_PATH.MESSAGES} component={Messages} />
        <Route path={ROUTE_PATH.OVERVIEW} component={Overview} />
        <Redirect from="/" to={"/o/dashboard"} />
      </Switch>
    </Router>
  </div>
);

export default Routes;
