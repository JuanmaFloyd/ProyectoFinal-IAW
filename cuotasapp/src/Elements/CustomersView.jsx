import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from "@material-ui/core";
import { CustomerCard } from './CustomerCard';
import { AddButton } from './AddButton';

export const CustomersView = () => {
    const [customers, setCustomers] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5001/user')
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [setCustomers])

    return (
        <Grid container spacing={3}>
        { customers ? (
            customers.map((customer) => 
                <Grid item xs={12} sm={6} md={4} key={customer._id}>
                    <CustomerCard 
                        customer={customer} 
                        delete={() => 
                            axios.delete('http://localhost:5001/user/'+customer._id)
                            .then(() => {
                                axios.get('http://localhost:5001/user')
                                    .then((response) => {
                                        setCustomers(response.data);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            }).catch((error) => console.log(error))
                        }
                    />
                    <AddButton 
                        click={(data) =>{
                                setCustomers(customers.concat(data));
                            }
                        }
                    />
                </Grid>
            )
        ) : null }
        </Grid>
    )
}