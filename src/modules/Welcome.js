import React from "react";
import { Link } from "react-router-dom";
import logo from 'assets/logo.svg';

import "scss/custom.scss";

function Welcome() {
  return (<div className="container-emo">
    <div className="d-flex flex-column justify-content-center" style={{ height: '40vh', overflow: 'hidden' }}>
      <img src={logo} className="App-logo" alt="circle" />
    </div>
    <div className="d-flex flex-column justify-content-start align-items-center">
      <div className="p-2">
        <Link to="/login"><button type="button" className="btn btn-lg btn-emo-dark border-emo text-emo">Login</button></Link>
      </div>
      <div className="p-2">
        <Link to="/register"><button type="button" className="btn btn-lg btn-emo-dark border-emo text-emo">Register</button></Link>
      </div>
    </div>
  </div>);
};
export default Welcome;