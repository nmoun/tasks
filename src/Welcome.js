import React from "react";
import { NavLink } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return <ul>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
    </ul>;
  }
};
export default Welcome;