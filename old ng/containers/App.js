import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Calculator from '../containers/Calculator/Calculator';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Calculator} />
        </Switch>
      </div>
    );
  }
}

export default App;
