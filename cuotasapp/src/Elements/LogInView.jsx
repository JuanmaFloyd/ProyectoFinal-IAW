import React from 'react'
import { Card, TextField, Typography, Container, Button } from '@material-ui/core'
import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export const LogInView = () => {
    const history = useHistory();
    const [nick, setNick] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:5001/isAuth", {"headers": {"token": localStorage.getItem("token")}})
            .then(() => history.push("/admin/customer"))
    })

    const handleLogin = () => {
        var data = {
            email: email,
            password: pwd
        }

        Axios.post("http://localhost:5001/signin", data)
            .then(res => {
                localStorage.setItem("token", res.data);
                history.push("/admin/customer");
            })
            .catch(err => console.log(err))
    }

    return(
        <Container>
            <Card>
                <Typography>Nickname</Typography>
                <TextField></TextField>
                
                <Typography>Email</Typography>
                <TextField></TextField>
                
                <Typography>Password</Typography>
                <TextField></TextField>
                
                <Button>Registrarse</Button>
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