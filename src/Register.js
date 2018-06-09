import React from 'react'

class Register extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => console.log("response"));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" onChange={this.handleChange}  />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" onChange={this.handleChange} />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={this.handleChange} />

                <label htmlFor="passwordConf">Confirm password</label>
                <input id="passwordConf" name="passwordConf" type="password" onChange={this.handleChange} />

                <button>Send</button>
            </form>
        );
    }
}

export default Register