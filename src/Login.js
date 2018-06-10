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

        // fetch('/api/login', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state),
        //     credentials: 'same-origin'
        // }).then((res) => {
        //     console.log("login success")
        //     if(res.status == 200){
        //         this.setState({login: true})
        //         Cookies.set("SESSIONID","DUMMY")
        //     }
        // });
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
        const from = this.props.location.state ? this.props.location.state.from : { from: { pathname: '/home'}}
        console.log("from value: " +from)
        const { redirectToReferrer } = this.state;
        if(redirectToReferrer)
            return <Redirect
                to={from}
            />
        else
            return (
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Username</label>
                    <input id="email" name="email" type="email" onChange={this.handleChange}  />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={this.handleChange} />

                    <button>Send</button>
                </form>
            );
    }
}

export default Login