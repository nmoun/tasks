import React from "react";
import { Link } from "react-router-dom";

import "scss/custom.scss";

class Welcome extends React.Component {
  render() {
    return (<div className="container-emo">
         <div class="mx-auto p-2">
           <Link to="/login"><button type="button" className="btn btn-lg btn-emo-dark border-emo text-emo">Login</button></Link>
         </div>
         <div class="mx-auto p-2">
           <Link to="/register"><button type="button" className="btn btn-lg btn-emo-dark border-emo text-emo">Register</button></Link>
         </div>
     </div>);
  }
};
export default Welcome;