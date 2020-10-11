import React from "react";
import "./css/LoginSignUpCss.css";
import { Link } from "react-router-dom";
import Axios from "axios";

const emailIDRegex = RegExp(
  /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,5})$/i
);

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      emailID: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      message: "",
      errors: {},
      open: false,
      formErrors: {
        firstName: "",
        lastName: "",
        emailID: "",
        password: "",
        phoneNumber: "",
        confirmPassword: "",
      },
    };
  }

  setfirstName = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  setLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  setphoneNumber = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  setEmailId = (event) => {
    this.setState({
      emailID: event.target.value,
    });
  };

  setPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  setconfirmPassword = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  signUp = () => {
    alert(this.state.message);
  };

  register = (event) => {
    event.preventDefault();
    if (!this.state.firstName) {
      this.setState({
        open: true,
        message: "please enter your First Name",
      });
    }
    if (typeof this.state.firstName !== "undefined") {
      if (
        !this.state.firstName.match(/^[a-zA-Z ]*$/) ||
        this.state.firstName.length < 4
      ) {
        this.setState({
          open: true,
          message: "please enter only alphabet character in your First Name",
        });
      }
    }
    if (!this.state.lastName) {
      this.setState({
        open: true,
        message: "please enter your Last Name",
      });
    }

    if (typeof this.state.lastName !== "undefined") {
      if (
        !this.state.lastName.match(/^[a-zA-Z ]*$/) &&
        this.state.lastName.length < 4
      ) {
        this.setState({
          open: true,
          message: "please enter only alphabet character in your Last Name",
        });
      }
    }

    if (this.state.emailID === "") {
      this.setState({
        open: true,
        message: "please enter Email ID",
      });
    } else if (this.state.emailID !== "undefined") {
      if (
        !this.state.emailID.match(
          /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,5})$/i
        )
      ) {
        this.setState({
          open: true,
          message: "Please enter Valid EmailID",
        });
      }
    }
    if (!this.state.phoneNumber) {
      this.setState({
        open: true,
        message: "please enter your Phone Number",
      });
    } else if (this.state.phoneNumber !== "undefined") {
      if (!this.state.phoneNumber.match(/^[0-9]{10}$/)) {
        this.setState({
          open: true,
          message: "Please enter Valid Phone Number",
        });
      }
    }
    if (!this.state.password) {
      this.setState({
        open: true,
        message: "please enter the password",
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        open: true,
        message: "Password should be atleast 6 characters in length",
      });
    }
    if (!this.state.confirmPassword) {
      this.setState({
        open: true,
        message: "Confirm Pasword field is empty",
      });
    }

    if (this.state.confirmPassword !== "") {
      if (this.state.confirmPassword !== this.state.password) {
        this.setState({
          open: true,
          message: "password doesnot match",
        });
      }
      if (this.state.open === true) {
      }
    }

    if (
      !this.state.firstName &&
      !this.state.lastName &&
      !this.state.emailID &&
      !this.state.password &&
      !this.state.phoneNumber &&
      !this.state.confirmPassword
    ) {
      this.setState({
        open: true,
        message: "please fill the details",
      });
    }

    if (
      this.state.firstName.match(/^[a-zA-Z ]*$/) &&
      this.state.firstName != "" &&
      this.state.firstName.length >= 3
    ) {
      if (
        this.state.lastName.match(/^[a-zA-Z ]*$/) &&
        this.state.lastName != "" &&
        this.state.lastName.length >= 3
      ) {
        if (
          this.state.emailID.match(
            /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,5})$/i
          )
        ) {
          if (this.state.phoneNumber.match(/^[0-9]{10}$/)) {
            if (this.state.password.length >= 6) {
              if (this.state.confirmPassword === this.state.password) {
                this.setState({
                  open: true,
                  message: "User Registered Sucessfully",
                });
                Axios.post("https://csci5709-a4-webgroup18.herokuapp.com/sign-up", {
                  emailId: this.state.emailID,
                  firstName : this.state.firstName,
                  lastName : this.state.lastName,
                  phoneNumber : this.state.phoneNumber,
                  password: this.state.password,
                }).then((response) => {
                  this.props.handleSuccessfulSignup(this.state.emailID);
                  //alert("sign up successfully. Backend Development in Progress");
                  //this.handleSuccessfulLogin();
                  //this.props.history.push("/");
                });
              }else{
                alert("password does not match!!");
              }
            }
          }
        }
      }
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      case "phoneNumber":
        formErrors.phoneNumber =
          value.length < 10 ? "minimum 10 digits required" : "";
        break;

      case "emailID":
        formErrors.emailID = emailIDRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 auth-wrapper">
            <header>
              <div className="auth-inner">
                <form onSubmit={this.register} noValidate>
                  <h3>Sign Up</h3>
                  <div className="form-group firstName">
                    <label>First name</label>
                    <input
                      type="text"
                      className={
                        formErrors.firstName.length > 0 ? "error" : null
                      }
                      name="firstName"
                      noValidate
                      required
                      className="form-control"
                      onChange={this.handleChange}
                      placeholder="First name"
                    />
                    {formErrors.firstName.length > 0 && (
                      <span className="error">{formErrors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group lastName">
                    <label>Last name</label>
                    <input
                      type="text"
                      className={
                        formErrors.lastName.length > 0 ? "error" : null
                      }
                      name="lastName"
                      noValidate
                      onChange={this.handleChange}
                      required
                      className="form-control"
                      placeholder="Last name"
                    />
                    {formErrors.lastName.length > 0 && (
                      <span className="error">{formErrors.lastName}</span>
                    )}
                  </div>

                  <div className="form-group phoneNumber">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className={
                        formErrors.phoneNumber.length > 0 ? "error" : null
                      }
                      name="phoneNumber"
                      noValidate
                      onChange={this.handleChange}
                      required
                      className="form-control"
                      placeholder="Enter phone number"
                    />
                    {formErrors.phoneNumber.length > 0 && (
                      <span className="error">{formErrors.phoneNumber}</span>
                    )}
                  </div>

                  <div className="form-group email">
                    <label>Email address</label>
                    <input
                      type="email"
                      className={formErrors.emailID.length > 0 ? "error" : null}
                      name="emailID"
                      noValidate
                      value={this.state.emailID}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                      placeholder="Enter email"
                    />
                    {formErrors.emailID.length > 0 && (
                      <span className="error">{formErrors.emailID}</span>
                    )}
                  </div>

                  <div className="form-group password">
                    <label>Password</label>
                    <input
                      type="password"
                      variant="standard"
                      margin="normal"
                      className={
                        formErrors.password.length > 0 ? "error" : null
                      }
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                      placeholder="Enter password"
                    />
                    {formErrors.password.length > 0 && (
                      <span className="error">{formErrors.password}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      variant="standard"
                      margin="normal"
                      className={
                        formErrors.confirmPassword.length > 0 ? "error" : null
                      }
                      name="confirmPassword"
                      onChange={this.handleChange}
                      required
                      className="form-control"
                      placeholder="Re-enter password"
                    />
                    {formErrors.confirmPassword.length > 0 && (
                      <span className="error">
                        {formErrors.confirmPassword}
                      </span>
                    )}
                  </div>

                  <button
                    className="createAccount"
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Sign Up
                  </button>
                  <p className="forgot-password text-right">
                    Already registered <Link to="/Login">sign in?</Link>
                  </p>
                </form>
              </div>
            </header>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
//https://www.facebook.com/positronXX, “Build React Login & Sign Up UI Template with Bootstrap 4 - positronX.io,” positronX.io, 27-Sep-2019.
//[Online]. Available: https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/. [Accessed: 06-Jun-2020].
