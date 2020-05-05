import React from "react";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./Cards.module.css";
import SingleCard from "./Card/Card";

const Cards = ({
  loading,
  data: { confirmed, recovered, deaths, lastUpdate }
}) => {
  if (!confirmed) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }
  console.log("confiremd", confirmed);
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <SingleCard
          loading={loading}
          status={confirmed}
          lastUpdate={lastUpdate}
          statusName="Confirmed"
        />
        <SingleCard
          loading={loading}
          status={recovered}
          lastUpdate={lastUpdate}
          statusName="Recovered"
        />
        <SingleCard
          loading={loading}
          status={deaths}
          lastUpdate={lastUpdate}
          statusName="Deaths"
        />
      </Grid>
    </div>
  );
};

export default Cards;
