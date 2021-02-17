import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Tooltip} from '@material-ui/core';
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

export const CustomerCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    const hasPayed = () => {
        if (props.customer.year < currentYear)
            return false;
        else { 
            if (props.customer.month === currentMonth || props.customer.month > currentMonth) 
                return true;
            else return false;
        }
    }

    return(
        <Card className={classes.root}>
            <CardContent>
                <PersonIcon color="primary" />
                <Typography variant="h5">{props.customer.name}</Typography>
                <Typography>{"Telefono: "+ props.customer.number}</Typography>
                <Typography>{"DNI: "+ props.customer.dni}</Typography>
                {hasPayed() ? <Typography color="primary">Cuota al día</Typography> : <Typography color="error">Debe cuota</Typography>}
            </CardContent>
            <CardActions>
                <Tooltip title="Editar cliente" aria-label="Editar cliente" arrow>
                    <IconButton onClick={() => history.push("/admin/customer/"+props.customer._id)}>
                            <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar cliente" aria-label="Eliminar cliente" arrow>
                    <IconButton onClick={props.delete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}