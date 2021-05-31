import { ROUTE_PATH } from "../utils/constants";

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Footer from "components/Footer/Footer.js";

import routes from "routes";

import styles from "assets/jss/material-dashboard-react/layouts/authStyle.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from "@material-ui/core/Grid";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import { Col, Row } from 'reactstrap';

const useStyles = makeStyles(styles);

export default function Pages(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() { };
  });
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === ROUTE_PATH.AUTH) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  // const getBgImage = () => {
  //   if (window.location.pathname.indexOf(ROUTE_PATH.AUTH + "/sign-in") !== -1) {
  //     return bgLogin;
  //   } else if (window.location.pathname.indexOf(OUTE_PATH.AUTH + "/sign-up") !== -1) {
  //     return bgRegister;
  //   }
  //   return bgLogin;
  // };
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  return (
    <div>
      {/* <AuthNavbar brandText={getActiveRoute(routes)} {...rest} /> */}
      <Row className="margin-0">
        <Col xs={12} sm={12} md={12} lg={6} className="padding-0">
          <div className="">
            <div className={classes.wrapper} ref={wrapper}
              style={{ backgroundColor: "white", borderRadius: "0px 20px 20px 0px", zIndex: "1" }}>
              <div
                className={classes.fullPage}
              >
                <div className={classes.container} style={{ width: '100%', zIndex: '9', padding: '20px' }}>
                  <Row className="justify-content-center">
                    <Card className={classes[cardAnimaton]} style={{ boxShadow: 'none', maxWidth: '700px', padding: "0 25px 0 25px" }}>
                      <CardBody>
                        <Switch>
                          {getRoutes(routes)}
                          <Redirect from={ROUTE_PATH.AUTH} to={ROUTE_PATH.AUTH + "/login"} />
                        </Switch>
                      </CardBody>
                    </Card>
                  </Row>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
