import {
  drawerWidth,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    background: "#f9f9fc",
    // "&:after": {
    //   display: "table",
    //   clear: "both",
    //   content: '" "',
    // },
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth + 20}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    padding: "0px 0px",
    marginBottom: "15px",
    maxHeight: "100%",
    overflow: "scroll",
  },
  container,
  map: {
    marginTop: "70px",
  },
  messagesSidebar: {
    float: "left",
    minWidth: `${drawerWidth + 200}px`,
    // backgroundColor: "white",
    maxHeight: "100vh",
    // borderRight: "1px solid #25345c1f",
    position: "sticky",
    top: "0",
    overflowY: "auto",
    marginRight: "10px",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".5s",
    transitionTimingFunction: "linear, linear, ease",
  },
  messagesContainer: {
    width: `calc(100% - 0px)`,
    float: "left",
    backgroundColor: "#ffffff",
    paddingLeft: "15px",
    paddingRight: "15px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  conversationInfo: {
    float: "left",
    minWidth: `${drawerWidth + 150}px`,
    maxHeight: "100vh",
    position: "sticky",
    top: "0",
    overflowY: "auto",
    backgroundColor: "#ffffff",
  },
  "@media screen and (max-width: 960px)": {
    messagesSidebar: {
      marginLeft: "15px !important",
    },
  },
});

export default appStyle;
