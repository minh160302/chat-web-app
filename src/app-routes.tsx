import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { ROUTE_PATH } from "./utils/constants"
import { createBrowserHistory } from "history";

// // core components
import Overview from "layouts/Overview"
import Messages from "layouts/Messages"
import Auth from "layouts/Auth"

import "assets/css/material-dashboard-react.css?v=1.9.0";


const hist = createBrowserHistory();
const Routes = () => (
  <div className="view-routes">
    <Router history={hist}>
      <Switch>
        <Route path={ROUTE_PATH.AUTH} component={Auth} />
        <Route path={ROUTE_PATH.MESSAGES} component={Messages} />
        <Route path={ROUTE_PATH.OVERVIEW} component={Overview} />
        <Redirect from="/" to={"/o/dashboard"} />
      </Switch>
    </Router>
  </div>
);

export default Routes;
