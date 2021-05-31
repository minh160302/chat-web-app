import React, { useState } from "react"
// core components
import CustomInput from "components/CustomInput/CustomInput"
import Button from "../../../components/CustomButtons/Button"
import Snackbar from "components/Snackbar/Snackbar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// @material-ui/icons
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// utils
import { makeStyles, InputAdornment } from "@material-ui/core"
import { connect } from "react-redux"
import { loginService, storeAuthToken } from "../../../store/service/authentication"

const useStyles = makeStyles((theme) => ({
  inputRoot: {},
  iconRoot: {},
  labelRoot: {
    fontSize: "17px",
  },
  btnContainer: {
    float: "right",
    display: "flex",
    marginTop: "15px",
    columnGap: "15px"
  },
}))

function LoginPage(props) {
  const classes = useStyles()

  const [invalidInput, setInvalidInput] = useState(false)

  const [notification, setNotification] = useState(false)

  const [responseMessage, setResponseMessage] = useState({
    code: "",
    message: ""
  })

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async () => {
    if (!inputValue.username || !inputValue.password) {
      setInvalidInput(true)
    }

    else {
      let loginInfo = {}
      loginInfo.username = inputValue.username;
      loginInfo.password = inputValue.password;

      const result = await loginService(loginInfo)

      if (result.data) {
        console.log(result.data)
        const accessToken = await storeAuthToken(result.data.token)
        if (accessToken.success) {
          console.log(props)
          props.history.push("/m")
        }

      } else {
        setNotification(true)
        setResponseMessage(result)
      }
    }
  }


  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <div>
        <CustomInput
          id="user-username"
          name="username"
          type="text"
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={"Enter Your Username"}
          formControlProps={{
            fullWidth: true
          }}
          labelText="Username"
          labelProps={{
            classes: {
              root: classes.labelRoot
            }
          }}
          inputProps={{
            classes: {
              root: classes.inputRoot
            },
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircleIcon classes={{ root: classes.iconRoot }} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          id="user-password"
          name="password"
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={"Enter Your Password"}
          formControlProps={{
            fullWidth: true
          }}
          type="password"
          labelText="Password"
          labelProps={{
            classes: {
              root: classes.labelRoot
            }
          }}
          inputProps={{
            classes: {
              root: classes.inputRoot
            },
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon classes={{ root: classes.iconRoot }} />
              </InputAdornment>
            ),
          }}
        />
      </div>


      {/* Invalid input */}
      <Snackbar
        place="tr"
        color="danger"
        icon={ErrorOutlinedIcon}
        message={"Invalid input. Check Input!"}
        open={invalidInput}
        setNotification={setInvalidInput}
        autoHideDuration={3000}
      />


      {/* Login status */}
      <Snackbar
        place="tr"
        color={responseMessage?.code === 200 ? "success" : "danger"}
        icon={ErrorOutlinedIcon}
        message={responseMessage.message}
        open={notification}
        setNotification={setNotification}
        // closeNotification={() => setNotification(false)}
        autoHideDuration={3000}
      />

      <div className={classes.btnContainer}>
        <Button
          round
          color="blue"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Button
          round
          color="primary"
          onClick={() => {
            props.history.push("/a/register")
          }}
        >
          Create a new account
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ }) => {
  return {}
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)