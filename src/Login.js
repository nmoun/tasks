import React from 'react'
import {Redirect} from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            console.log("login success")
            if(res.status == 200)
                this.setState({login: true})
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        if(this.state.login)
            return <Redirect
                to={{
                pathname: "/"
                }}
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