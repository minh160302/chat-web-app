import React from "react"
// core components
import Button from "./Button"
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import buttonStyles from "assets/jss/material-dashboard-react/components/buttonStyle.js";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  ...buttonStyles,
})

export default function MoreButton(props) {
  const { onClick } = props
  const classes = useStyles()

  return (
    <Button
      className={"btn-36"}
      justIcon
      round
      color="white"
      onClick={onClick}
    >
      <MoreHorizRoundedIcon />
    </Button>
  )
}