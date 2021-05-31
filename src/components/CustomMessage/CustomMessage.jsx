import React from "react";
// @material-ui/core
import GridItem from "../Grid/GridItem"
import PropTypes from "prop-types";

import classNames from "classnames"
import { mainColor } from "../../assets/jss/material-dashboard-react"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  message: {
    background: mainColor[0],
    color: "#ffffff",
    fontSize: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "12px",
    width: "fit-content",
    marginTop: "2px",
    marginBottom: "2px",
  },
  currentUser: {
    float: "right"
  },
}))

function CustomMessage(props) {
  const { content, isCurrentUser } = props

  const classes = useStyles();

  const messageClasses = classNames({
    [classes.message]: true,
    [classes.currentUser]: isCurrentUser,
  })

  return (
    <div className={messageClasses}>
      <GridItem>{content}</GridItem>
    </div>
  )
}

CustomMessage.propTypes = {
  content: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool.isRequired
}

export default CustomMessage;