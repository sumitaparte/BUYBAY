import React, { Component } from "react";
import uc from './images/UC.jpg';

export default class Construction extends Component {
  render() {
    return (
      <div>
        <img className="col-md-6 offset-md-3 mt-5" src={uc} style={{ height:'40%'}}  alt="Under Developemnt"/>
      </div> 
    );
  }
}
