import React, { useState } from "react";
import { ROUTE_PATH } from "../../utils/constants";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import CustomSearchInput from "../CustomInput/CustomSearchInput";
import MoreButton from "../CustomButtons/MoreButton";
import LinearTabs from "../CustomTabs/LinearTabs";
import CustomPopper from "../CustomPopper/CustomPopper"
import CustomFormDialog from "../CustomDialog/CustomFormDialog"

// child component
import Conversations from "./messages/Conversations"
import Archived from "./messages/Archived"
import Starred from "./messages/Starred"

// redux
import { IRootState } from "../../store/reducers/index"
import { createConversation, clearMessage } from "../../store/actions/conversation"
import { logOut } from "../../store/actions/authentication"
import { findUser } from "store/actions/user";


const useStyles = makeStyles((theme) => ({
  extraSidebarContainer: {
    padding: '10px 0px',
    overflowY: "scroll",
  },
  extraSidebarSearchContainer: {
    alignItems: "center",
    marginTop: "15px",
  },
  extraHeaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  extraHeader: {
    fontWeight: "bold",
    fontSize: "24px",
  },
}))

interface ExtraSideBarProps {

}

interface StateProps {
  visitor: any;
  currentUser: any;
}

interface DispatchProps {
  createConversation: (params: any) => void;
  logOut: () => void;
  findUser: (params: any) => {};
  clearMessage: () => {}
}

type Props = ExtraSideBarProps & StateProps & DispatchProps


const ExtraMessagesSideBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  // input search user to create new conversation
  const [userInput, setUserInput] = useState("")
  const handleChangeInput = (event) => {
    setUserInput(event.target.value)
    if (event.target.value !== "") {
      props.findUser(event.target.value)
    }
  }

  // handle submit add new conversation
  const handleNewConversation = () => {
    const conversation: any = {
      creator: {
        user_id: props.currentUser.id,
        username: props.currentUser.username,
        profile_picture: "s3_url",
      },
      visitor: {
        user_id: props.visitor._id,
        username: props.visitor.username,
        profile_picture: "s3_url",
      },
      createdAt: Date.now(),
      status: "ACTIVE"
    }
    
    props.createConversation(conversation)

    setUserInput("")
    // handleCloseDialog()
  }

  // tab value
  const [value, setValue] = useState(0);

  const handleChangeTab = (newValue) => {
    setValue(newValue);
  };

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
      text: "Start new conversation",
      handleFunction: () => {
        handleOpenDialog()
      }
    },
    {
      text: "Report a problem",
      handleFunction: () => {
        console.log("handle report problem")
      }
    },
    {
      text: "Log out",
      handleFunction: () => {
        props.logOut()
      }
    },
  ]

  // dialog state and handle functions
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    props.clearMessage()
    setUserInput("")
  };

  return (
    <>
      <div className={classes.extraSidebarContainer}>
        <div className={classes.extraSidebarSearchContainer}>
          <div className={classes.extraHeaderWrapper}>
            <div className={classes.extraHeader}>Messages</div>
            <MoreButton onClick={handleOpenMore} />
            <CustomPopper
              openMore={openMore}
              anchorEl={anchorEl}
              handleCloseMore={handleCloseMore}
              handleOpenMore={handleOpenMore}
              options={toolbarOptions}
              placement="bottom-end"
            />
          </div>
          <CustomSearchInput
            placeholder={"Search Messages"}
            formControlProps={{
              fullWidth: true
            }}
            disableUnderline={true}
          />
        </div>
        <LinearTabs tabs={["All Conversations", "Archived", "Starred"]} setTabValue={handleChangeTab} defaultTab={0} />
        {value == 0 && <Conversations />}
        {value == 1 && <Archived />}
        {value == 2 && <Starred />}
      </div>
      <CustomFormDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleSubmit={handleNewConversation}
        userInput={userInput}
        handleChangeInput={handleChangeInput}
      />
    </>
  );
}

const mapStateToProps = ({ user, authentication }: IRootState) => {
  return {
    visitor: user.user,
    currentUser: authentication.currentUser
  }
}

const mapDispatchToProps = {
  createConversation,
  logOut,
  findUser,
  clearMessage
}

export default connect<StateProps, DispatchProps, ExtraSideBarProps>(mapStateToProps, mapDispatchToProps)(ExtraMessagesSideBar);