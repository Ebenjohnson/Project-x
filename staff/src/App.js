import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { PrivateRoute } from './helpers/PrivateRoute';
import Booking from "./pages/Booking";
import Invoice from "./pages/Invoice";
import Setting from "./pages/Setting";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route  component={Login} path="/login" />
          <Route  component={Signup} path="/signup" />
          <PrivateRoute  component={Home} path="/"  />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
