import React from 'react';
import './App.css';
import Explorer from './Explorer'
import Pago from './Pago'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/pago">
          <Pago />
        </Route>
        <Route path="/home">
          <Explorer />
        </Route>
        <Route path="/">
          <h1>home</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
