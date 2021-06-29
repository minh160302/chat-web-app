import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Loading from "../components/Loading/Loading"

import routes from "../user-routes";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { mainColor } from "../assets/jss/material-dashboard-react"

import { ROUTE_PATH } from "../utils/constants"
import bgImage from "assets/img/sidebar-2.jpg";
import { connect } from "react-redux";

import { verifyJwtToken, reloadWithToken, getCurrentUserInfo } from "../store/actions/authentication"

let ps;

const logo = require("assets/img/pyramid.png")

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === ROUTE_PATH.OVERVIEW) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/" to="/o/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

function Overview(props) {
  // styles
  const classes = useStyles();
  const history = useHistory();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [fetchSession, setFetchSession] = React.useState(false);

  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // keep props.isAuthenticated value unchanged when reload
  React.useEffect(() => {
    props.reloadWithToken()
  }, [])


  // fetch user info after user authenticated
  React.useEffect(() => {
    if (props.isAuthenticated) {
      props.getCurrentUserInfo();
    }
  }, [props.isAuthenticated])

  // fetch session
  React.useEffect(() => {
    console.log(`fetchSession: ${fetchSession}`);

    async function fetchUserInfo() {
      try {
        await props.verifyJwtToken();
      } catch (e) {
      } finally {
        console.log("fffff", fetchSession)
        setFetchSession(true);
        console.log(props.isAuthenticated);
      }
    }

    fetchUserInfo();

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [1]);

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const redirectLogin = () => {
    history.push(ROUTE_PATH.AUTH);
  }

  return (
    <div className={classes.wrapper}>
      {
        fetchSession && props.isAuthenticated &&
        <Sidebar
          routes={routes}
          // logoText={"Creative Tim"}
          logo={logo}
          // image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
        // {...rest}
        />
      }
      <div className={classes.mainPanel} ref={mainPanel}>
        {
          fetchSession ?
            <>
              {fetchSession && props.isAuthenticated ?
                <>
                  <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                  // {...rest}
                  />
                  {getRoute() ? (
                    <div className={classes.content}>
                      <div className={classes.container}>{switchRoutes}</div>
                    </div>
                  ) : (
                      <div className={classes.map}>{switchRoutes}</div>
                    )}
                  {getRoute() ? <Footer /> : null}
                </> :
                <>
                  {redirectLogin()}
                </>
              }
            </> :
            <>
              <Loading />
            </>
        }



        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}


const mapStateToProps = ({ authentication }) => {
  return {
    isAuthenticated: authentication.isAuthenticated
  }
}

const mapDispatchToProps = {
  verifyJwtToken,
  reloadWithToken,
  getCurrentUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)