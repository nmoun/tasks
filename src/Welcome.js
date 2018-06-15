import React from "react";
import { Link } from "react-router-dom";

import "scss/custom.scss";

class Welcome extends React.Component {
  render() {
    return (<div className="container-emo">
    <div className="container">
       <div class="row justify-content-md-center">
         <div class="col-md-auto">
           <Link to="/login"><button type="button" className="btn btn-lg btn-emo text-white">Login</button></Link>
         </div>
       </div>
       <div class="row justify-content-md-center">
         <div class="col-md-auto">
           <Link to="/register"><button type="button" className="btn btn-lg btn-emo text-white">Register</button></Link>
         </div>
       </div>
       </div>
     </div>);
  }
};
export default Welcome;