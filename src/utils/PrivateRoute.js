import fakeAuth from './fakeAuth'
import {Route, Redirect} from 'react-router-dom'
import React, {Component} from 'react'

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log('PrivateRoute: fakeAuth: ' + fakeAuth.isAuthenticated)
    return (
            <Route {...rest} render={(props) => (
            fakeAuth.isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                    }} />
            )} />
        )
}

export default PrivateRoute