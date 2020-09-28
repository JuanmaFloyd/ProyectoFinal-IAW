import { Fab, makeStyles } from '@material-ui/core';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        position: "fixed",
        right: "100px",
        bottom: "40px",
    },
});

export const BackButton = props => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.button}>
            <Fab onClick={() => history.push(props.link)} color="primary" aria-label="add">
                <ArrowBackIcon />
            </Fab>
        </div>
    )
}