/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classnames from "classnames";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Button from "../CustomButtons/Button";

export default function FixedPlugin(props) {
  const handleClick = () => {
    props.handleFixedClick();
  };
  return (
    <div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive,
      })}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <Button
          className={"btn-36"}
          justIcon
          round
          color="white"
          // onClick={handleClick}
        >
          <SettingsOutlinedIcon />
        </Button>
      </div>
    </div>
  );
}
