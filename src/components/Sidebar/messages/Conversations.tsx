import { makeStyles, List } from "@material-ui/core"
import React, { useEffect } from "react"
import { getConversationsByType } from "../../../store/actions/conversation"
import { connect } from "react-redux"
import { IRootState } from "store/reducers"

const useStyles = makeStyles((theme) => ({
  messagesContainer: {
    padding: "16px 16px 16px 0px",
    margin: "0px 0px 0px 0px",
  },
  contentWrapper: {
    overflow: "scroll"
  },
}))


interface ConversationsProps {

}

interface StateProps {
  conversations: Array<any>;
}

interface DispatchProps {
  getConversationsByType: (params: any) => {}
}

type Props = ConversationsProps & StateProps & DispatchProps

const Conversations: React.FC<Props> = (props) => {
  const classes = useStyles()

  useEffect(() => {
    props.getConversationsByType("ACTIVE")
  }, [])

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

const mapStateToProps = ({ conversation }: IRootState) => {
  return {
    conversations: conversation.all
  }
}

const mapDispatchToProps = {
  getConversationsByType
}

export default connect<StateProps, DispatchProps, ConversationsProps>(mapStateToProps, mapDispatchToProps)(Conversations);