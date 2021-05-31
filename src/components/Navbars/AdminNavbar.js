import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/adminNavbarStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const { color, rtlActive, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        {/* <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>

          </div>
        </Hidden> */}
        {props.displaySetting ? (
          <Button
            className={"btn-36"}
            justIcon
            round
            color="white"
            onClick={props.settingMinimize}
          >
            <ChevronLeftIcon className={classes.sidebarMiniIcon} />
          </Button>
        ) : (
          <Button
            className={"btn-36"}
            justIcon
            round
            color="white"
            onClick={props.settingMinimize}
          >
            <ChevronRightIcon className={classes.sidebarMiniIcon} />
          </Button>
        )}
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {brandText}
          </Button>
        </div>
        {/* <Hidden smDown implementation="css">
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden> */}
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
        <div className={sidebarMinimize}>
          <Button
            className={"btn-36"}
            justIcon
            round
            color="white"
            onClick={props.infoMinimize}
          >
            <InfoOutlinedIcon className={classes.sidebarMiniIcon} />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
  infoMinimize: PropTypes.func,
  displaySetting: PropTypes.bool,
  settingMinimize: PropTypes.func,
};
