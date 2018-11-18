import React, { Component } from 'react';
import Modules from 'screens/modules'
import Register from 'screens/Register';
import Login from 'screens/Login';
import Home from 'screens/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <Router>
      <Switch>
        <Route path="/modules" component={Modules} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  }
};

export default App;
