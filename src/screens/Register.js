import React from 'react'
import { register } from 'service/AuthService'
import ThemedButton from 'components/buttons/ThemedButton'

class Register extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    register(this.username.value, this.email.value, this.password.value, this.passwordConf.value)
  }

  render() {
    return (<div className="container-all">
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <input className="p-2" id="username" name="username" type="text" ref={el => { this.username = el }} placeholder="Username" />
        <input className="p-2" id="email" name="email" type="email" ref={el => { this.email = el }} placeholder="Email" />
        <input className="p-2" id="password" name="password" type="password" ref={el => { this.password = el }} placeholder="Password" />
        <input className="p-2" id="passwordConf" name="passwordConf" type="password" ref={el => { this.passwordConf = el }} placeholder="Confirm password" />
        <div className="p-2">
          <ThemedButton text="Send" onClick={this.handleSubmit} />
        </div>
      </div>
    </div>
    );
  }
}

export default Register