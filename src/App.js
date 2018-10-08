import React, { Component } from 'react';
import Register from 'modules/Register';
import Login from 'modules/Login';
import Home from 'modules/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  }
};

export default App;
