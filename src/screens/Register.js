import React from 'react'
import {register} from 'service/AuthService'

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
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" onChange={this.handleChange} ref={el => {this.username = el}}/>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" onChange={this.handleChange} ref={el => {this.email = el}}/>

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={this.handleChange} ref={el => {this.password = el}}/>

        <label htmlFor="passwordConf">Confirm password</label>
        <input id="passwordConf" name="passwordConf" type="password" onChange={this.handleChange} ref={el => {this.passwordConf = el}}/>

        <button>Send</button>
      </form>
    );
  }
}

export default Register