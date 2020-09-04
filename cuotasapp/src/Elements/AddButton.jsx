import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, TextField } from "@material-ui/core";
import swal from "@sweetalert/with-react";
import { Row, Col } from "react-bootstrap";
import axios from 'axios';

const useStyles = makeStyles({
    button: {
        position: "fixed",
        right: "100px",
        bottom: "40px",
    },
  });

export const AddButton = props => {
    const classes = useStyles();

    const handleClick = () => {
        swal(
            <div>
                <Row>
                    <Col xs={{ span: 6, offset: 1 }}>
                        <TextField type="text" name="name" id="nameField" placeholder="Nombre"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 1 }}>
                        <TextField type="number" name="dni" id="dniField" placeholder="DNI"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 1 }}>
                        <TextField type="text" name="email" id="emailField" placeholder="E-mail"/>
                    </Col>
                </Row>
            </div>, {
                buttons: {
                    cancel: "Cancelar",
                    confirm: "Confirmar"
                }
            }
        ).then((value) => {
            if (value != null){
                var data = {
                    name: document.getElementById("nameField").value,
                    dni: document.getElementById("dniField").value,
                    email: document.getElementById("emailField").value
                }
                axios.post('http://localhost:5001/customers', data, {"headers": {"token": localStorage.getItem("token")}})
                    .then(res => props.click(res.data))
                    .catch(err => console.log(err));
            }
        });
    }

    return (
        <div className={classes.button}>
        <Fab onClick={handleClick} color="primary" aria-label="add">
            <AddIcon />
        </Fab>
        </div>
    );
};