import React from 'react'
import { Card, TextField, Typography, Container, Button } from '@material-ui/core'
import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import swal from '@sweetalert/with-react';

export const LogInView = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [nick, setNick] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:5001/auth/isAuth", {"headers": {"token": localStorage.getItem("token")}})
            .then(() => history.push("/admin/customer"))
            .catch(() => null)
    }, [history])

    const handleSignup = () => {
        var data = {
            nickname: nick,
            email: newEmail,
            password: newPwd
        }

        Axios.post("http://localhost:5001/auth/signup", data)
            .then(res => {
                enqueueSnackbar("Cuenta creada!", {variant: "success"});
            })
            .catch(err => swal(err.response.data, "", "error"))
    }

    const handleLogin = () => {
        var data = {
            email: email,
            password: pwd
        }

        Axios.post("http://localhost:5001/auth/signin", data)
            .then(res => {
                localStorage.setItem("token", res.data);
                history.push("/admin/customer");
            })
            .catch(
                () => swal("Mail o contraseña incorrectos", "", "error")
            )
    }

    return(
        <Container>
            <Card>
                <Typography>Nickname</Typography>
                <TextField onChange={e => setNick(e.target.value)}></TextField>
                
                <Typography>Email</Typography>
                <TextField onChange={e => setNewEmail(e.target.value)}></TextField>
                
                <Typography>Password</Typography>
                <TextField onChange={e => setNewPwd(e.target.value)}></TextField>
                
                <Button onClick={handleSignup}>Registrarse</Button>
            </Card>
            <Card>
                <Typography>Email</Typography>
                <TextField onChange={e => setEmail(e.target.value)}></TextField>
                
                <Typography>Password</Typography>
                <TextField onChange={e => setPwd(e.target.value)}></TextField>

                <Button onClick={handleLogin}>Conectarse</Button>
            </Card>
        </Container>
    )
}