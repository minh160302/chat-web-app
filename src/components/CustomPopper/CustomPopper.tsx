import React, { useEffect, useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core"
import classNames from "classnames"
import Popper, { PopperPlacementType } from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import customDropdownStyle from "../../assets/jss/material-dashboard-react/components/customDropdownStyles"


interface ToolbarOption {
  text: string,
  handleFunction: (params: any) => void
}

interface PopperProps {
  openMore: boolean;
  handleCloseMore: (params: any) => void;
  anchorEl: any;
  handleOpenMore: (params: any) => void;
  options: Array<ToolbarOption>;
  placement: PopperPlacementType;
}

const styles = {

}

const useStyles = makeStyles((theme: Theme) => createStyles({
  ...customDropdownStyle(theme),
  ...styles
}))


const CustomPopper: React.FC<PopperProps> = (props) => {
  const classes = useStyles();

  const { openMore, handleCloseMore, anchorEl, handleOpenMore, options, placement } = props

  const dropdownItem = classNames(classes.dropdownItem, classes.mainColorHover);

  return (
    <>
      <Popper
        open={openMore}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={placement}
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.popperResponsive]: true,
          [classes.popperNav]: true
        })}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}

            style={{ transformOrigin: "0 0 0" }}
          >
            <Paper className={classes.dropdown}>
              <ClickAwayListener onClickAway={handleCloseMore}>
                <MenuList role="menu">
                  {
                    options.map((option, i) =>
                      <MenuItem key={i} className={dropdownItem} onClick={option.handleFunction}>{option.text}</MenuItem>
                    )
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default CustomPopper;