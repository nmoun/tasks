import React from 'react'
import { Redirect } from 'react-router-dom'
import { authenticate, isLoggedIn } from 'service/AuthService'

import "scss/custom.scss";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { redirectToReferrer: false };
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    authenticate(this.username.value, this.password.value)
      .then(() => {
        if (isLoggedIn()) {
          this.setState({ redirectToReferrer: true })
        }
      })
  }

  render() {
    const from = this.props.location.state ? this.props.location.state.from : { pathname: '/' }
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer)
      return <Redirect
        to={from}
      />
    else
      return (
        <div className="container-emo">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="username" ref={el => {this.username = el}}/>

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" ref={el => {this.password = el}}/>

            <button>Send</button>
          </form>
        </div>
      );
  }
}

export default Login