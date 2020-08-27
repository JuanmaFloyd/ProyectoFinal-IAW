import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, colors } from "@material-ui/core";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

export const CustomerEdition = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const id = props.location.pathname.split("/")[2];
    const [name, setName] = useState("");
    const [dni, setDNI] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5001/user/'+id)
            .then((response) => {
                setName(response.data.name);
                setDNI(response.data.dni);
                setEmail(response.data.email);
            })
            .catch(error => {
                console.log(error);
            })
    }, [setDNI, setEmail, setName, id])

    const handleUpdate = () => {
        var data = {
            name: name,
            dni: dni,
            email: email
        }
        axios.put('http://localhost:5001/user/'+id, data)
            .then(response => {
                enqueueSnackbar("Cliente actualizado!", {variant: "success"});
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleCash = () => {
        var data = {
            name: name,
            dni: dni,
            email: email
        }
        axios.put('http://localhost:5001/pay/'+id)
            .then(response => {
                enqueueSnackbar("Cuota pagada!", {variant: "success"});
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    return (
        <Container>
            <div className="d-flex flex-column p-5">
                <div className="p-2">
                    <TextField type="text" name="name" id="nameField" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} fullWidth/>
                </div>
                <div className="p-2">
                    <TextField type="number" name="dni" id="dniField" placeholder="DNI" value={dni} onChange={e => setDNI(e.target.value)} fullWidth/>
                </div>
                <div className="p-2">
                    <TextField type="text" name="email" id="emailField" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} fullWidth/>
                </div>
                <div className="p-3">
                    <Button variant="contained" color="primary" onClick={handleUpdate}>Actualizar</Button>
                </div>
            </div>
            <div>
                <div>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleUpdate} 
                        className="mx-3"
                        startIcon={<CreditCardIcon />}
                    >
                        Pagar cuota con tarjeta
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleCash} 
                        className="mx-3"
                        startIcon={<LocalAtmIcon />}
                    >
                        Pagar cuota en efectivo
                    </Button>
                </div>
            </div>
        </Container>
    )
}