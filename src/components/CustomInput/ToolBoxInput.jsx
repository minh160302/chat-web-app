import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ImageIcon from '@material-ui/icons/Image';
import AttachmentIcon from '@material-ui/icons/Attachment';
// core components
import customSearchInputStyle from "assets/jss/material-dashboard-react/components/customSearchInputStyle.js";
import { TextField } from "@material-ui/core";
import Button from "../CustomButtons/Button"
import { mainColor } from "../../assets/jss/material-dashboard-react";

import { connect } from "react-redux";

import io from "socket.io-client"
import CustomPopper from "../CustomPopper/CustomPopper";
import socket from "socket.io"

const useStyles = makeStyles({
  ...customSearchInputStyle,
  inputContainer: {
    margin: "18px 5px",
    borderRadius: "22px",
    border: "1px solid",
    padding: "8px",
  },
  iconRoot: {
    marginTop: '0px',
    cursor: "pointer"
  },
  inputSearch: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: 'black',
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#c8c8c8',
      opacity: 1
    },
  },
  textFieldRoot: {
    padding: "8px 16px",
    border: "1px solid #c3c3c3",
    borderRadius: "22px",
    bottom: "8px",
  },
  chatInput: {
    position: "fixed"
  },
  sendButton: {
    boxShadow: "none",
    background: "none",
    color: "blue",
    "&:hover": {
      boxShadow: "none",
      background: "none",
      color: "#C4C4C4",
    },
    "&:focus": {
      boxShadow: "none",
      background: "none",
      color: mainColor[0],
    },
  },
});

// let socket
function ToolBoxInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    id,
    inputValue,
    setInputValue
  } = props;

  let messageInfo = {
    content: "",
    type: "",
    createdAt: "",
    deletedAt: "",
    senderId: ""
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }
  

  const sendMessageToSocket = (message) => {
    socket.emit("sendMessage", message, () => {
      setInputValue("")
    });
  }

  const handleSubmit = () => {
    messageInfo.content = inputValue.trim()
    messageInfo.type = "CHAT"
    messageInfo.createdAt = new Date(Date.now()).toUTCString()
    messageInfo.deletedAt = ""
    messageInfo.senderId = props.currentUser.id

    if (messageInfo.content !== "") {
      sendMessageToSocket(messageInfo)
    }
  }


  // popper state and handle functions
  const [openMore, setOpenMore] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloseMore = () => setOpenMore(false)
  const handleOpenMore = (event) => {
    setOpenMore(true)
    setAnchorEl(event.currentTarget);
  }

  const toolbarOptions = [
    {
      text: <ImageIcon />,
      handleFunction: () => {
        console.log("image icon")
      }
    },
    {
      text: <AttachmentIcon />,
      handleFunction: () => {
        console.log("attachment icon")
      }
    },
  ]

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl + classes.chatInput}
    >
      <TextField
        id={id}
        placeholder="Type your message"
        value={inputValue}
        onChange={handleChange}
        classes={{
          root: classes.textFieldRoot
        }}
        InputProps={{
          classes: { input: classes.inputSearch },
          startAdornment: (
            <InputAdornment position="start">
              <AddCircleRoundedIcon classes={{ root: classes.iconRoot }} onClick={handleOpenMore} />
              <CustomPopper
                openMore={openMore}
                anchorEl={anchorEl}
                handleCloseMore={handleCloseMore}
                handleOpenMore={handleOpenMore}
                options={toolbarOptions}
                placement="top-start"
              />
            </InputAdornment>
          ),
          endAdornment: (
            <Button
              className={classes.sendButton}
              justIcon
              round
              color="white"
              onClick={handleSubmit}
            >
              <SendIcon className={classes.iconRoot} />
            </Button>
          ),
          disableUnderline: true
        }}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            // Do code here
            ev.preventDefault();
            handleSubmit()
          }
        }}
      />
    </FormControl>
  );
}

ToolBoxInput.propTypes = {
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired
};

const mapStateToProps = ({ authentication }) => {
  return {
    currentUser: authentication.currentUser
  }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBoxInput);