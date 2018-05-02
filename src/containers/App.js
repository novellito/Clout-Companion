import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Calculator from '../containers/Calculator/Calculator';
import Resources from '../components/Resources/Resources';
import Landing from '../components/Landing/Landing';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Calculator} />
          <Route exact path="/resources" component={Resources} />
        </Switch>
      </div>
    );
  }
}

export default App;