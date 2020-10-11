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

class LoginPage extends React.Component {
  changeState = () => {
    // UserProfile.setState(true);
    return "{'/'}";
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: null,
      password: null,
      errors: {
        email: "",
        password: "",
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
      case "password":
        errors.password =
          value.length < 6 ? "Password must be 6 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, errors } = this.state;
    if (!email) {
      errors.email = "Please fill out Email!";
    }
    if (!password) {
      errors.password = "Please fill out Password!";
    }
    if (validateForm(errors)) {
      Axios.post("https://csci5709-a4-webgroup18.herokuapp.com/login", {
        emailId: email,
        password: password,
      }).then((response) => {
        //alert("Logged In successfully. Backend Development in Progress");
        if(response.data.success){
          this.props.handleSuccessfulLogin(this.state.email);
        }
        else{
          alert(response.data.message);
        }
      });
    } else {
      alert("Invalid Email or Password");
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
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.handleSubmit} noValidate>
                <h3>Sign In</h3>
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

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    noValidate
                  />
                  {errors.password.length > 0 && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
                <p className="forgot-password text-right">
                  <a href="/forgotPassword">Forgot password?</a>
                </p>
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
export default LoginPage;
//“Build React Login & Sign Up UI Template with Bootstrap 4 - positronX.io,” positronX.io, 27-Sep-2019. [Online]. Available: https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/. [Accessed: 06-Jun-2020].
