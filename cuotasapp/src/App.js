import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { LogInView } from './Elements/LogInView';
import AuthRoutes from './AuthRoutes';
import { AuthMiddleware } from './Middleware/AuthMiddleware';

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
            <Route exact path="/" component={LogInView} />
            <AuthMiddleware>
              <Route path="/admin" component={AuthRoutes} />
            </AuthMiddleware>
          </Switch>
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
