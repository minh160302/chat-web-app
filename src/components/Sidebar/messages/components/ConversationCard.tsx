import { makeStyles, withStyles, List } from "@material-ui/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { IRootState } from "store/reducers"
import classNames from "classnames"
// components
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallMade from '@material-ui/icons/CallMade';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
const jisoo = require("assets/img/jisoo.png")

const StyledTooltip = withStyles({
  tooltip: {
    marginTop: '0.2rem',
    backgroundColor: 'rgba(0,0,0,0.72)',
    color: '#fff',
  },
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
  avatar: {
    borderRadius: 8,
    backgroundColor: '#495869',
  },
  overline: {
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#495869',
    // overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  content: {
    fontSize: 14,
    fontWeight: 400,
    color: '#495869',
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  time: {
    fontSize: 14,
    fontWeight: 400,
    color: '#495869',
    fontStyle: "normal",
    textTransform: "none"
  },
}));


interface BasicProfileProps {
  id: string;
  updatedAt: string;
  members: Array<string>;
  currentUsername: string;
}

const BasicProfile: React.FC<BasicProfileProps> = (props) => {
  const styles = useBasicProfileStyles();

  const calculateTime = (time: string): string => {
    const minutes = Math.floor((Date.now() - parseInt(time)) / 60000)
    return `${minutes} min ago`
  }

  return (
    <Row position="bottom">
      {/* <Item><Avatar className={styles.avatar}>S</Avatar></Item> */}
      <Item position={'middle'} pl={{ sm: 0.5, lg: 0.5 }}>
        <Typography component={'span'} className={styles.overline}>
          <div>{props.members
            .filter((mem) => mem !== props.currentUsername)
            .map(mem => <span>{mem},</span>)
          }</div>
          <div className={styles.time}>{calculateTime(props.updatedAt)}</div>
        </Typography>
        <Typography component={'span'} className={styles.content}>{props.id}</Typography>
      </Item>
    </Row>
  );
};


// Card header //
const useCardHeaderStyles = makeStyles(() => ({
  root: { paddingBottom: 0 },
  title: {
    fontSize: '14px',
    color: '#122740',
    height: "21px"
  },
  subheader: {
    fontSize: '0.875rem',
    color: '#495869',
  },
}));

interface CardHeaderProps {
  header: string;
}

const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const styles = useCardHeaderStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
  return (
    <Row>
      <Item position={'middle'}>
        <Typography className={styles.title}>
          <b>{props.header}</b>
        </Typography>
        <Typography className={styles.subheader}>
          {/* Similar to firebase theme */}
        </Typography>
      </Item>
    </Row>
  );
};
// ----------------------------- //

const useStyles = makeStyles((theme) => ({
  card: {
    border: '2px solid',
    borderColor: '#E7EDF3',
    borderRadius: 16,
    transition: '0.4s',
    '&:hover': {
      borderColor: '#464B9C',
    },
    padding: 15,
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer"
  },
  imgWrapper: {
    display: "flex",
    alignItems: "center"
  },
  active: {
    borderColor: 'rgb(46,67, 151)',
  },
}))

interface DetailProps {
  _id: string;
  members: Array<string>;
  created_at: string;
  updated_at: string;
  avatar: string;
  chatName: string;
  status: string;
}

interface ConversationCardProps {
  conversation: DetailProps;
  active: boolean;
}

interface StateProps {
  currentUser: any;
}

interface DispatchProps { }

type Props = ConversationCardProps & StateProps & DispatchProps

const ConversationCard: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { conversation, active } = props

  const cardWrapperClasses = classNames({
    [classes.card]: true,
    [classes.active]: active
  })

  return (
    <div className={cardWrapperClasses}>
      <Item className={classes.imgWrapper}>
        {/* <Box minHeight={200} bgcolor={'#F4F7FA'} borderRadius={8} /> */}
        <img src={jisoo} style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
      </Item>
      <BasicProfile
        id={conversation._id}
        updatedAt={conversation.updated_at}
        members={conversation.members}
        currentUsername={props.currentUser.username}
      />
    </div>
  )
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  currentUser: authentication.currentUser
})

const mapDispatchToProps = {

}

export default connect<StateProps, DispatchProps, ConversationCardProps>(mapStateToProps, mapDispatchToProps)(ConversationCard);

