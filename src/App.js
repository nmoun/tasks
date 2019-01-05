import React, { Component } from 'react';
import routes from 'routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <Router>
      <Switch>
        {routes.map((el) => {
          return <Route key={el.path} {...el}/>
        })}
      </Switch>
    </Router>
  }
};

export default App;
