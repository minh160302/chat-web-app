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
// core components
import customSearchInputStyle from "assets/jss/material-dashboard-react/components/customSearchInputStyle.js";
import { TextField } from "@material-ui/core";
import Button from "../CustomButtons/Button"
import { mainColor } from "../../assets/jss/material-dashboard-react";

import { sendMessage } from "../../store/actions/message"
import { connect } from "react-redux";
import SockJsClient from 'react-stomp';

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

  // websocketclient
  const [isPaused, setPause] = useState(false);

  const handleSubmit = () => {
    messageInfo.content = inputValue
    messageInfo.type = "CHAT"
    messageInfo.createdAt = new Date(Date.now()).toUTCString()
    messageInfo.deletedAt = ""
    messageInfo.senderId = props.currentUser.id
    if (messageInfo.content !== "") {
      props.sendMessage(messageInfo)
      setInputValue("")
    }
  }


  useEffect(() => {

  }, []);

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
              <AddCircleRoundedIcon classes={{ root: classes.iconRoot }} />
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
  sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBoxInput);