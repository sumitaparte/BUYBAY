import React from "react";
import Axios from "axios";
import Cookies from "js-cookie";
// import NavbarPage from "./NavbarPage";
import "./css/LoginSignUpCss.css";
// import UserProfile from "./userstate.js";
// import HomePageTrial from "./Home"
const validEmailRegex = RegExp(
  /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,5})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentPassword: null,
      newPassword: null,
      reNewPassword: null,
      errors: {
        currentPassword: "",
        newPassword: "",
        reNewPassword: "",
      },
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "currentPassword":
        errors.currentPassword =
          value.length < 6 ? "Password must be 6 characters long!" : "";
        break;
      case "newPassword":
        errors.newPassword =
          value.length < 6 ? "Password must be 6 characters long!" : "";
        break;
      case "reNewPassword":
        errors.reNewPassword =
          value.length < 6 ? "Password must be 6 characters long!" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, reNewPassword, errors } = this.state;
    if (!currentPassword) {
      errors.currentPassword = "Please enter your current Password!";
    }
    if (!newPassword) {
      errors.newPassword = "Please enter your new password!";
    }
    if (!reNewPassword) {
      errors.reNewPassword = "please re-enter your new password!";
    }
    if (reNewPassword !== newPassword) {
      alert("Password does not match");
    } else if (validateForm(errors)) {
      Axios.put("https://csci5709-a4-webgroup18.herokuapp.com/changePassword", {
        emailId: Cookies.get("User").toString(),
        password: currentPassword,
        newPassword: newPassword,
      }).then((response) => {
        if (response.data.success) {
          alert("password changed successfully");
          this.props.history.push("/login");
        } else {
          alert("current password entered is incorrect");
        }
        //alert("Logged In successfully. Backend Development in Progress");
        //this.props.history.push("/");
      });
      // alert("Logged In successfully. Backend Deve
    } else {
      alert("No User");
    }
    this.setState({ errors, errors });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 auth-wrapper">
            <div className="">
              <form onSubmit={this.handleSubmit} noValidate>
                <h3>RESET YOUR PASSWORD</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Enter current password"
                    name="currentPassword"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {errors.currentPassword.length > 0 && (
                    <span className="error">{errors.currentPassword}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Enter new password"
                    name="newPassword"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {errors.newPassword.length > 0 && (
                    <span className="error">{errors.newPassword}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Repeat New Password</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Re-enter new password"
                    name="reNewPassword"
                    onChange={this.handleChange}
                    noValidate
                  />
                  {errors.reNewPassword.length > 0 && (
                    <span className="error">{errors.reNewPassword}</span>
                  )}
                </div>

                <button className="btn btn-primary btn-block">
                  Change Password
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
export default ChangePassword;
//“Build React Login & Sign Up UI Template with Bootstrap 4 - positronX.io,” positronX.io, 27-Sep-2019. [Online]. Available: https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/. [Accessed: 06-Jun-2020].
