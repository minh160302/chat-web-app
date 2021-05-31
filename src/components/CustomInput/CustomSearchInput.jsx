import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search';
// core components
import customSearchInputStyle from "assets/jss/material-dashboard-react/components/customSearchInputStyle.js";
import { TextField } from "@material-ui/core";


const useStyles = makeStyles({
  ...customSearchInputStyle,
  inputContainer: {
    margin: "18px 5px",
    borderRadius: "22px",
    border: "1px solid",
    padding: "8px",
  },
  iconRoot: {
    marginTop: '0px'
  },
  inputSearch: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#25345C',
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
  },
});

export default function CustomSearchInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    id,
    disableUnderline,
    placeholder,
  } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <TextField
        id={id}
        placeholder={placeholder}
        classes={{
          root: classes.textFieldRoot
        }}
        InputProps={{
          classes: { input: classes.inputSearch },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon classes={{ root: classes.iconRoot }} />
            </InputAdornment>
          ),
          disableUnderline: disableUnderline
        }}
      />
    </FormControl>
  );
}

// CustomSearchInput.propTypes = {
//   id: PropTypes.string,
//   inputProps: PropTypes.object,
//   formControlProps: PropTypes.object,
//   error: PropTypes.bool,
//   success: PropTypes.bool
// };
