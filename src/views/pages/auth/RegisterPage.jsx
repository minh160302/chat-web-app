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
// redux
import { sendRegisterInfo } from "../../../store/actions/authentication"
import { registerService } from "../../../store/service/authentication"

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

function RegisterPage(props) {
  const classes = useStyles()

  const [notification, setNotification] = useState(false)
  const [responseMessage, setResponseMessage] = useState({
    code: "",
    message: ""
  })

  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = async () => {
    // validate input
    if (!inputValue.email
      || !inputValue.firstName
      || !inputValue.lastName
      || !inputValue.username
      || !inputValue.password
      || !inputValue.confirmPassword) {
      setNotification(true)
    }
    // uncomment after done security
    if (inputValue.password.length < 6) {
      setNotification(true)
    }
    if (inputValue.password !== inputValue.confirmPassword) {
      setNotification(true)
    }

    else {
      let registerInfo = {}
      registerInfo.first_name = inputValue.firstName
      registerInfo.last_name = inputValue.lastName
      registerInfo.email = inputValue.email
      registerInfo.type = "register"
      registerInfo.password = inputValue.password
      registerInfo.created_at = new Date(Date.now()).toUTCString()
      registerInfo.username = inputValue.username

      // const result = await props.sendRegisterInfo(registerInfo)
      const result = await registerService(registerInfo)
      console.log(result)

      if (result.data) {
        // setResponseMessage(result.data)
        setNotification(true)
        setResponseMessage({
          code: result.status,
          message: result.data.message
        })
      } else {
        setNotification(true)
        setResponseMessage(result)
      }

      const resetInput = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
      }
      setInputValue(resetInput)
    }
  }

  return (
    <div>
      <div>
        <h1>REGISTER PAGE</h1>
        <div style={{ display: "flex", columnGap: "30px" }}>
          <CustomInput
            id="user-first-name"
            name="firstName"
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeholder={"Enter Your First Name"}
            formControlProps={{
              fullWidth: true
            }}
            labelText="First Name"
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
                  <PersonIcon classes={{ root: classes.iconRoot }} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            id="user-last-name"
            name="lastName"
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeholder={"Enter Your Last Name"}
            formControlProps={{
              fullWidth: true
            }}
            labelText="Last Name"
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
                  <PersonIcon classes={{ root: classes.iconRoot }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <CustomInput
          id="user-email"
          name="email"
          type="email"
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={"Enter Your Email"}
          formControlProps={{
            fullWidth: true
          }}
          labelText="Email"
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
                <EmailIcon classes={{ root: classes.iconRoot }} />
              </InputAdornment>
            ),
          }}
        />
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
        <CustomInput
          id="user-confirm-password"
          name="confirmPassword"
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={"Confirm Your Password"}
          type="password"
          formControlProps={{
            fullWidth: true
          }}
          labelText="Confirm Password"
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

      {/* Notifications */}
      <Snackbar
        place="tr"
        color="danger"
        icon={ErrorOutlinedIcon}
        message={"Register failed. Check Input!"}
        open={notification}
        setNotification={setNotification}
        // closeNotification={() => setNotification(false)}
        autoHideDuration={2500}
      />

      {/* Register success */}
      <Snackbar
        place="tr"
        color={responseMessage?.code === 200 ? "success" : "danger"}
        icon={ErrorOutlinedIcon}
        message={responseMessage.message}
        // open={responseMessage.message !== ""}
        open={notification}
        setNotification={setNotification}
        // closeNotification={() => setNotification(false)}
        autoHideDuration={2500}
      />

      <div className={classes.btnContainer}>
        <Button
          round
          color="blue"
          onClick={handleSubmit}
        >
          Register
        </Button>
        <Button
          round
          color="primary"
          onClick={() => {
            props.history.push("/a/login")
          }}
        >
          Back to Login
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authentication }) => {
  return {
    registerInfo: authentication.register
  }
}

const mapDispatchToProps = {
  sendRegisterInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)