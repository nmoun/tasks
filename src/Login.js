import React from 'react'
import {Redirect} from 'react-router-dom'
import fakeAuth from './utils/fakeAuth'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {redirectToReferrer: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fakeAuth
            .authenticate(this.state)
            .then(() => {
                if(fakeAuth.isAuthenticated){
                    this.setState({redirectToReferrer: true})
                }
            })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const from = this.props.location.state ? this.props.location.state.from : { pathname: '/home'}
        console.log("from.pathname value: " +from.pathname)
        const { redirectToReferrer } = this.state;
        if(redirectToReferrer)
            return <Redirect
                to={from}
            />
        else
            return (
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="username" onChange={this.handleChange}  />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={this.handleChange} />

                    <button>Send</button>
                </form>
            );
    }
}

export default Login