import React, { useEffect, useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomMessage from "../../../../components/CustomMessage/CustomMessage"

import { connect } from "react-redux";

const useStyles = makeStyles({
  conversation: {
    display: "flex",
    flexDirection: "column"
  },
})


function ChatDialog(props) {
  const classes = useStyles();

  return (
    <div className={classes.conversation}>
      {/* <div>content</div> */}
      {
        props.allMessages?.map((message, i) => {
          return (
            <div style={message.senderId === props.currentUser.id ? { textAlign: "end" } : { textAlign: "start" }} key={i}>
              <CustomMessage isCurrentUser={message.senderId === props.currentUser.id} content={message.content} />
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = ({ message, authentication }) => {
  return {
    allMessages: message.all,
    currentUser: authentication.currentUser
  };
};

const mapDispatchToProps = {


};


export default connect(mapStateToProps, mapDispatchToProps)(ChatDialog);
