import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Calculator from '../containers/Calculator/Calculator';
import Resources from '../components/Resources/Resources';
// import Landing from '../components/Landing/Landing';
import Dashboard from '../containers/Dashboard/Dashboard';
import Login from '../containers/Login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Calculator} />
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
