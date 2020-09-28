import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { CustomerCard } from './CustomerCard';
import { AddButton } from './AddButton';
import { Spinner } from './Spinner';

const useStyles = makeStyles(theme => ({
    grid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(8),
      },
    typo: {
        paddingTop: theme.spacing(15),
        color: "gray"
    }
}))

export const CustomersView = () => {
    const [customers, setCustomers] = useState("");
    const classes = useStyles();

    useEffect(() => {
        axios.get('http://localhost:5001/customers', {"headers": {"token": sessionStorage.getItem("token")}})
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [setCustomers])

    return (
        customers ? (
        <Container className={classes.grid} maxWidth="md">
            <Grid container spacing={4}>
            { customers.length > 0 ? (
                customers.map((customer) => 
                    <Grid item xs={12} sm={6} md={4} key={customer._id}>
                        <CustomerCard 
                            customer={customer} 
                            delete={() => 
                                axios.delete('http://localhost:5001/customers/'+customer._id, {"headers": {"token": sessionStorage.getItem("token")}})
                                .then(() => {
                                    axios.get('http://localhost:5001/customers', {"headers": {"token": sessionStorage.getItem("token")}})
                                        .then((response) => {
                                            setCustomers(response.data);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })
                                }).catch((error) => console.log(error))
                            }
                        />
                    </Grid>
                )
            ) : <Typography className={classes.typo} variant="h3">Esto se ve muy vacío... Agregue un cliente!</Typography> }
                <AddButton 
                    click={(data) =>{
                            setCustomers(customers.concat(data));
                        }
                    }
                />
            </Grid>
        </Container>
        ) : <Spinner />
    )
}