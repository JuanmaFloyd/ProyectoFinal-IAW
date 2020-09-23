import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 250,
  },
}));

export const Spinner = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};