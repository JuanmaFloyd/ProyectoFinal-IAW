import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { CustomerEdition } from './Elements/CustomerEdition';
import { PaymentForm } from './Elements/PaymentForm';
import { CustomersView } from './Elements/CustomersView';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
        marginTop: "5%"
    }
  }));

function AuthRoutes(){
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/")
    }

    return(
        <div>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">CuotasApp</Typography>
                    <IconButton className={classes.menuButton} onClick={handleLogout}>
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}>
                <Switch>
                    <Router>
                        <Route exact path="/admin/customer" component={CustomersView} />
                        <Route exact path="/admin/payment/:id" component={PaymentForm} />
                        <Route exact path="/admin/customer/:id" component={CustomerEdition} />
                    </Router>
                </Switch>
            </div>
        </div>
    )
}

export default AuthRoutes;