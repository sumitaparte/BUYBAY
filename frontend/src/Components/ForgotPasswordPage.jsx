import React from "react";
import Axios from "axios";
// import NavbarPage from "./NavbarPage";
import "./css/LoginSignUpCss.css";
// import UserProfile from "./userstate.js";
// import HomePageTrial from "./Home";

const validEmailRegex = RegExp(
  /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,5})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: null,
      errors: {
        email: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, errors } = this.state;
    if (!email) {
      errors.email = "Please fill out Email!";
    }
    if (validateForm(errors)) {
      Axios.put("https://csci5709-a4-webgroup18.herokuapp.com/forgotPassword", {
        emailId: email,
      }).then((response) => {
        //alert("Logged In successfully. Backend Development in Progress");
        this.props.handleSuccessfulForgotPassword();
        //this.props.history.push("/");

        
      });
      // alert("Logged In successfully. Backend Development in Progress");
    } else {
      alert("Invalid Email");
    }
    this.setState({ errors, errors });
  };

  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.handleSubmit} noValidate>
                <h3>RESET YOUR PASSWORD</h3>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.handleChange}
                    noValidate
                  />
                  {errors.email.length > 0 && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>


                <button type="submit" className="btn btn-primary btn-block">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-2" />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
export default ForgotPasswordPage;
//“Build React Login & Sign Up UI Template with Bootstrap 4 - positronX.io,” positronX.io, 27-Sep-2019. [Online]. Available: https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/. [Accessed: 06-Jun-2020].
