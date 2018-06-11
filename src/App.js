import React, { Component } from 'react';
import Register from 'Register';
import Login from 'Login';
import Welcome from 'Welcome';
import Home from 'Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <Router>
      <div>
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Welcome} />
        </Switch>
      </div>
    </Router>
  }
};

export default App;
