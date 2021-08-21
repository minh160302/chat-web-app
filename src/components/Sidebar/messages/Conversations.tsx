import { makeStyles, List } from "@material-ui/core"
import React, { useEffect } from "react"
import { getConversationsByType } from "../../../store/actions/conversation"
import { connect } from "react-redux"
import { IRootState } from "store/reducers"
import ConversationCard from "./components/ConversationCard"
import { useState } from "react"

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
  currentUser: any;
  createSuccess: boolean
}

interface DispatchProps {
  getConversationsByType: (params: any) => {}
}

type Props = ConversationsProps & StateProps & DispatchProps

const Conversations: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (Object.keys(props.currentUser).length > 0) {
      props.getConversationsByType({
        userId: props.currentUser.username,
        status: "ACTIVE"
      })
    }
  }, [props.currentUser, props.createSuccess])

  const handleClickCard = (id, key) => {
    setActiveIndex(key)
    console.log(id, key)
    // TODO: fetch conversation by ID
  }

  return (
    <div>
      <div className={classes.contentWrapper}>
        {
          props.conversations.length > 0 &&
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.messagesContainer}
          >
            {
              props.conversations.map((con, i) =>
                <div key={i} onClick={() => handleClickCard(con._id, i)}>
                  <ConversationCard conversation={con} active={activeIndex === i} />
                </div>
              )
            }
          </List>
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ conversation, authentication }: IRootState) => {
  return {
    conversations: conversation.conversations,
    currentUser: authentication.currentUser,
    createSuccess: conversation.createSuccess
  }
}

const mapDispatchToProps = {
  getConversationsByType
}

export default connect<StateProps, DispatchProps, ConversationsProps>(mapStateToProps, mapDispatchToProps)(Conversations);