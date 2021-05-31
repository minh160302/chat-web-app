import React from "react"
import PropTypes from "prop-types"
import { makeStyles, List } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  messagesContainer: {
    padding: "16px 16px 16px 0px",
    margin: "0px 0px 0px 0px",
  },
  contentWrapper: {
    overflow: "scroll"
  },
}))

function Conversations(props) {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.contentWrapper}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.messagesContainer}
        >
          Conversations
        </List>
      </div>
    </div>
  )
}

Conversations.propTypes = {

}

export default Conversations;