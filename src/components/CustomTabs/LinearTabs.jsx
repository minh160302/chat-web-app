import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components

import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";

const useStyles = makeStyles(styles);

export default function LinearTabs(props) {
  const { tabs, setTabValue, defaultTab } = props
  const [value, setValue] = React.useState(defaultTab || 0);

  React.useEffect(() => {
    setValue(defaultTab)
  }, [defaultTab])

  const handleChange = (event, value) => {
    setTabValue(value)
    setValue(value);
  };
  const classes = useStyles();

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{
          root: classes.tabsRoot,
          indicator: classes.displayNone,
          scrollButtons: classes.displayNone
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, i) =>
          <Tab
            classes={{
              root: classes.tabRootButton,
              selected: classes.tabSelected,
              wrapper: classes.tabWrapper
            }}
            label={tab}
            key={i}
          />
        )}
      </Tabs>
    </>
  );
}

LinearTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  setTabValue: PropTypes.func.isRequired,
  defaultTab: PropTypes.number
};
