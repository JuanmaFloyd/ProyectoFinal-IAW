import React from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Explorer extends React.Component{

    constructor(){
        super();
        this.state = {}
    }

    componentDidMount(){
        window.axios = require('axios')

        axios.get('https://localhost:5001/api/Users')
            .then(function (response) {
                //Aca se obtienen los usuarios
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render(){
        return(
            <h1>Aca se van a mostrar los usuarios</h1>
        );
    }
}

export default Explorer;