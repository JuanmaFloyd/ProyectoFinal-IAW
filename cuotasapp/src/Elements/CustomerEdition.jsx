import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from "@material-ui/core";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { useHistory } from 'react-router-dom';
import { Spinner } from './Spinner';
import { BackButton } from './BackButton';

export const CustomerEdition = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const id = props.location.pathname.split("/")[3];
    const [name, setName] = useState("");
    const [dni, setDNI] = useState("");
    const [number, setNumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    useEffect(() => {
        axios.get('http://localhost:5001/customers/'+id, {"headers": {"token": sessionStorage.getItem("token")}})
            .then((response) => {
                setName(response.data.name);
                setDNI(response.data.dni);
                setNumber(response.data.number);
                setMonth(response.data.month);
                setYear(response.data.year);
            })
            .catch(error => {
                console.log(error);
            })
    }, [setDNI, setNumber, setName, id])

    const handleUpdate = () => {
        var data = {
            name: name,
            dni: dni,
            number: number
        }
        axios.put('http://localhost:5001/customers/'+id, data, {"headers": {"token": sessionStorage.getItem("token")}})
            .then(response => {
                enqueueSnackbar("Cliente actualizado!", {variant: "success"});
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleCash = () => {
        axios.put('http://localhost:5001/customers/'+id+'/cash', null, {"headers": {"token": sessionStorage.getItem("token")}})
            .then(response => {
                enqueueSnackbar("Cuota pagada!", {variant: "success"});
                setMonth(response.data.updatedCustomer.month);
                setYear(response.data.updatedCustomer.year);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const hasPayed = () => {
        if (year < currentYear)
            return false;
        else { 
            if (month === currentMonth || month > currentMonth) 
                return true;
            else return false;
        }
    }
    
    return (
        name !== "" ? (
        <Container>
            <BackButton link={"/admin/customer/"} />
            <div className="d-flex flex-column p-5">
                <div className="p-2">
                    <TextField type="text" name="name" id="nameField" variant="outlined" label="Nombre" value={name} onChange={e => setName(e.target.value)} fullWidth/>
                </div>
                <div className="p-2">
                    <TextField type="number" name="dni" id="dniField" variant="outlined" label="DNI" value={dni} onChange={e => setDNI(e.target.value)} fullWidth/>
                </div>
                <div className="p-2">
                    <TextField type="text" name="number" id="numberField" variant="outlined" label="Teléfono" value={number} onChange={e => setNumber(e.target.value)} fullWidth/>
                </div>
                <div className="p-3">
                    <Button variant="contained" color="primary" onClick={handleUpdate}>Actualizar</Button>
                </div>
            </div>
            <div>
                { (hasPayed() === false) ?
                <div> 
                    
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => history.push("/admin/payment/"+id)} 
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
                </div> : <Typography>Este usuario tiene la cuota al día</Typography>}
            </div>
        </Container>
        ) : <Spinner />
    )
}