import React from 'react';
import './App.css';
import { PaymentForm } from './Elements/PaymentForm';
import { CustomersView } from './Elements/CustomersView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CustomerEdition } from './Elements/CustomerEdition';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={CustomersView} />
            <Route exact path="/payment/:id" component={PaymentForm} />
            <Route exact path="/customer/:id" component={CustomerEdition} />
          </Switch>
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
