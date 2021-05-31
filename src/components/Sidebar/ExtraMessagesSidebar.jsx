import React from "react";
import { ROUTE_PATH } from "../../utils/constants";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import CustomSearchInput from "../CustomInput/CustomSearchInput";
import MoreButton from "../CustomButtons/MoreButton";
import LinearTabs from "../CustomTabs/LinearTabs";

// child component
import Conversations from "./messages/Conversations"
import Archived from "./messages/Archived"
import Starred from "./messages/Starred"


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

export function ExtraMessagesSideBar(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <div className={classes.extraSidebarContainer}>
        <div className={classes.extraSidebarSearchContainer}>
          <div className={classes.extraHeaderWrapper}>
            <div className={classes.extraHeader}>Messages</div>
            <MoreButton onClick={() => {
              console.log("ddd")
            }} />
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
    </>
  );
}

const mapStateToProps = ({ }) => {
  return {
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ExtraMessagesSideBar);