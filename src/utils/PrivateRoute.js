import {isLoggedIn} from 'service/AuthService'
import { Route, Redirect } from 'react-router-dom'
import React from 'react'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      isLoggedIn()
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  )
}

export default PrivateRoute