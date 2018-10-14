import React from 'react'
import * as modules from 'screens/modules'
import Register from 'screens/Register';
import Login from 'screens/Login';
import Home from 'screens/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function MainRouter(){
  let adrsrs = [];
  for(let module in modules){
    console.log("module: "+ module.URL)
  }


  return <Router>
    <Switch>
      <Route path="/order" component={modules.Order} />
      <Route path="/reception" component={modules.Reception} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
}

export default MainRouter