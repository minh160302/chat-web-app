import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import Button from "../CustomButtons/Button.js"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { dangerColor } from "../../assets/jss/material-dashboard-react.js"
// redux
import { findUser } from "store/actions/user";
import { connect } from "react-redux";
import { IRootState } from "store/reducers/index";
import { Dispatch } from "redux";

const useStyles = makeStyles((theme: Theme) => createStyles({
  errorMessage: {
    fontSize: 14,
    fontWeight: 500,
    color: dangerColor[0]
  },
  successMessage: {
    fontSize: 14,
    fontWeight: 500,
    color: "#4BB543",
  }
}))

interface DispatchProps {
  findUser: (params: any) => {}
}

interface StateProps {
  user: any;
  error: any;
  conversationError: any;
  conversationSuccess: any;
}

interface FormInputProps {
  label: string;
}

interface FormDialogProps {
  open: boolean;
  handleClose: (params: any) => void;
  handleSubmit: (params: any) => void;
  userInput: string;
  handleChangeInput: (params: any) => void,
}

type Props = StateProps & DispatchProps & FormDialogProps

const CustomFormDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { open, handleClose, handleSubmit, userInput, handleChangeInput } = props

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To start a new conversation, please enter that people's username or email here. --Perform elastic search here--
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address or Username"
            type="text"
            fullWidth
            value={userInput}
            onChange={handleChangeInput}
          />
        </DialogContent>
        {
          props.user?._id &&
          <DialogContent>
            <Grid>User ID: {props.user._id}</Grid>
            <Grid>Username: {props.user.username}</Grid>
          </DialogContent>
        }
        {
          userInput !== "" && <DialogContent className={classes.errorMessage}>{props.error}</DialogContent>
        }
        {
          props.conversationError !== "" && <DialogContent className={classes.errorMessage}>{props.conversationError}</DialogContent>
        }
        {
          props.conversationSuccess && <DialogContent className={classes.successMessage}>Create conversation successfully</DialogContent>
        }
        <DialogActions>
          <Button round onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            round
            onClick={handleSubmit}
            color="blue"
            disabled={props.error !== "" && userInput !== ""}
          >
            Create conversation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


const mapStateToProps = ({ user, conversation }: IRootState) => {
  return {
    user: user.user,
    error: user.message,
    conversationError: conversation.errorMessage,
    conversationSuccess: conversation.success
  }
}

const mapDispatchToProps = {
  findUser
}


export default connect<StateProps, DispatchProps, FormDialogProps>(mapStateToProps, mapDispatchToProps)(CustomFormDialog);