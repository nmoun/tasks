import React, { Component } from 'react';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Home from 'pages/Home';
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
