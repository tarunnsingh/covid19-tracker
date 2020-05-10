import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import styles from "./TweetCard.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundImage: "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-512.png",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [tags, setTags] = React.useState(["Covid-19", "Vaccine"]);

  const addTags = (event) => {
    if (event.target.onKeyUp == "Enter") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar className={classes.avatar} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Latest tweets with #coronavirus"
        subheader="Tweets being fetched in real time"
      />
      <CardMedia className={classes.media} image="../../images/virus.svg" title="Covid-19 Pandemic" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {}
        </Typography>
        <div className={styles.tagsInput}>
          <ul>
            {tags.map((tag, index) => {
              <li key={index}>
                <span>{tag}</span>
                <i className={styles.tagCloseIcon}>close</i>
              </li>;
            })}
          </ul>
          <input placeholder="Enter covid related tags here..." type="text" onKeyUp={addTags} />
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="more">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
