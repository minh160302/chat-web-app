import React, { useEffect, useState } from "react";
import { ROUTE_PATH } from "../utils/constants";
import cx from "classnames";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import ExtraMessagesSideBar from "../components/Sidebar/ExtraMessagesSidebar"
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "user-routes";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

// Messages components:
import Messages from "../views/pages/user/main/ChatDialog"
import ToolBoxInput from "components/CustomInput/ToolBoxInput"

var ps;

const useStyles = makeStyles(styles);

const messagesRoute = [
  {
    path: "/messages",
    brand: "Messages",
    component: Messages,
    layout: ROUTE_PATH.MESSAGES
  },
]

export function MessagesLayout(props) {
  const history = useHistory();
  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(true);
  const [miniSetting, setMiniSetting] = React.useState(true)
  const [displaySetting, setDisplaySetting] = React.useState(true)
  const [miniInfo, setMiniInfo] = React.useState(true)
  const [displayInfo, setDisplayInfo] = React.useState(true)
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("white");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(require("assets/img/pyramid.png"));

  const [fetchSession, setFetchSession] = React.useState(false);

  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  // React.useEffect(() => {

  // });

  // To render correct layout for mobile on open
  React.useEffect(() => {
    if (window.innerWidth >= 960) {
      setDisplaySetting(true)
      setDisplayInfo(true)
    } else {
      setDisplaySetting(true)
      setDisplayInfo(false)
    }
  }, [])

  React.useEffect(() => {
    resizeFunction();

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
  // functions for changeing the states from components
  const handleFixedClick = () => {
    setDisplaySetting(!displaySetting)
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/o/dashboard";
  };
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
          return routes[i].brand;
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === ROUTE_PATH.MESSAGES) {
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
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const infoMinimize = () => {
    setDisplayInfo(!displayInfo)
    setMiniInfo(!miniInfo)
  }
  const settingMinimize = () => {
    setMiniSetting(!miniSetting)
    setDisplaySetting(!displaySetting)
  }
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
      setDisplaySetting(true)
      setDisplayInfo(true)
    } else {
      setMiniActive(false);
      setDisplaySetting(false)
      setMiniInfo(false)
      setMiniSetting(false)
    }
  };

  const renderDataContent = () => {
    return (
      <>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          // brandText={getActiveRoute(messagesRoute)}
          handleDrawerToggle={handleDrawerToggle}
          displaySetting={displaySetting}
          infoMinimize={infoMinimize.bind(this)}
          settingMinimize={settingMinimize.bind(this)}
          displayInfo={displayInfo}
          {...rest}
        />
        <div className="layout-container">
          <div className={classes.content} style={{ display: "flex" }}>
            {/* {displaySetting || <ExtraMessagesMobile />} */}
            <div className={classes.container} style={{ flex: 1 }}>
              <Switch>
                {getRoutes(messagesRoute)}
                {/* <Redirect from={ROUTE_PATH.MESSAGES} to={ROUTE_PATH.MESSAGES + "/messages"} /> */}
              </Switch>
            </div>
          </div>
        </div>
        <ToolBoxInput
          id="chat-input"
          formControlProps={{
            fullWidth: true
          }}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </>
    )
  }

  // state of input
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <div className={classes.wrapper}>
        {/* {props.isAuthenticated && */}
        <Sidebar
          routes={routes}
          logo={logo}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          miniActive={displaySetting}
          {...rest}
        />
        {/* } */}
        <div className={mainPanelClasses} ref={mainPanel}>
          <>
            {/* {props.isAuthenticated ? */}
            <>
              <div id="main" style={{ display: "flex" }}>
                {displaySetting &&
                  <div className={classes.messagesSidebar}>
                    <ExtraMessagesSideBar />
                  </div>
                }
                {/* <FixedPlugin 
                  handleFixedClick={handleFixedClick}
                /> */}
                <div className={classes.messagesContainer}>
                  {renderDataContent()}
                </div>
                {
                  displayInfo &&
                  <div className={classes.conversationInfo}>
                    sss
                  </div>
                }
              </div>
            </>
            {/* <>
                {redirectLogin()}
              </> */}
            {/* } */}
          </>
        </div>
      </div>
    </>
  );
}

export default MessagesLayout

// export default connect(
//   ({ authentication }) => ({
//     isAuthenticated: authentication.isAuthenticated,
//     user: authentication.user,
//   }),
//   {
//     getUserInfo
//   }
// )(MessagesLayout);