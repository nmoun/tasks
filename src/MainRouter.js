import React from 'react'
import Order from 'modules/Order'
import Reception from 'modules/Reception'
import Register from 'modules/Register';
import Login from 'modules/Login';
import Home from 'modules/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function MainRouter(){
  return <Router>
    <Switch>
      <Route path="/order" component={Order} />
      <Route path="/reception" component={Reception} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
}

export default MainRouter