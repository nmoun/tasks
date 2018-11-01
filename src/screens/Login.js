import React from 'react'
import { Redirect } from 'react-router-dom'
import { authenticate, isLoggedIn } from 'service/AuthService'
import ThemedButton from 'components/buttons/ThemedButton'

import "scss/custom.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
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
        <div className="container-fluid">
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <input className="p-2" id="username" name="username" type="username" ref={el => {this.username = el}} placeholder="Username"/>
            <input className="p-2" id="password" name="password" type="password" ref={el => {this.password = el}} placeholder="Password"/>
            <div className="p-2">
              <ThemedButton text="Send" onClick={this.handleSubmit}/>
            </div>
          </div>
        </div>
      );
  }
}

export default Login