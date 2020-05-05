import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import moment from "moment";
import cx from "classnames";
import styles from "./Card.module.css";

const SingleCard = ({ loading, status, lastUpdate, statusName }) => {
  let styleCardClass = {};
  switch (statusName) {
    case "Confirmed":
      styleCardClass = `${cx(styles.card, styles.infected)}`;
      break;
    case "Recovered":
      styleCardClass = `${cx(styles.card, styles.recovered)}`;
      break;
    case "Deaths":
      styleCardClass = `${cx(styles.card, styles.deaths)}`;
      break;
    default:
      styleCardClass = `${styles.card}`;
  }

  return (
    <Grid item component={Card} xs={12} md={3} className={styleCardClass}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {statusName}
        </Typography>

        <Typography variant="h5">
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <CountUp
              start={0}
              end={status.value}
              duration={2}
              separator=","
              useEasing
            />
          )}
        </Typography>

        <Typography color="textSecondary">
          {moment(lastUpdate).fromNow()}
        </Typography>
        <Typography variant="body2">
          Number of Active cases of Covid-19
        </Typography>
      </CardContent>
    </Grid>
  );
};

export default SingleCard;
