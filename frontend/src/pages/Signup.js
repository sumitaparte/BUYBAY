import React, { Component } from "react";
import Register from "../Components/RegistrationPage";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulSignup = this.handleSuccessfulSignup.bind(this);
  }
  handleSuccessfulSignup(emailId) {
    this.props.handleLogin(emailId);
    this.props.history.push("/");
  }
  render(props) {
    return (
      <div>
        <Register handleSuccessfulSignup = {this.handleSuccessfulSignup}/>
      </div>
    );
  }
}
