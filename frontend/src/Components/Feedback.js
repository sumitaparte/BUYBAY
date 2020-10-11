import React from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Redirect } from "react-router-dom";
// import NavbarPage from "./NavbarPage";
import "./css/LoginSignUpCss.css";
// import UserProfile from "./userstate.js";
// import HomePageTrial from "./Home";

const isLoggedIn = true ? Cookies.get("User") : false;

class Feedback extends React.Component {
  changeState = () => {
    // UserProfile.setState(true);
    return "{'/'}";
  };
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      emailId: null,
      subject: null,
      feedback: null,
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
     
      case "subject":
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
    const { emailId, subject, feedback } = this.state;
    if (true) {
      Axios.post("https://csci5709-a4-webgroup18.herokuapp.com/feedback", {
        emailId: Cookies.get("User"),
        subject: subject,
        feedback: feedback
      }).then((response) => {
        //alert("Logged In successfully. Backend Development in Progress");
        if(response.data.success){
          //this.props.handleSuccessfulLogin(this.state.email);
          alert("feedback submitted successfully");
        }
        else{
          alert(response.data.message);
        }
      });
    } else {
      alert("Invalid Email or Password");
    }
  };

  render() {
    if(isLoggedIn){
    
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
                <h3>Feedback</h3>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="Enter email"
                    name="emailId"
                    onChange={this.handleChange}
                    value= {Cookies.get("User")}
                    noValidate
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="form-control"
                    placeholder="Enter your subject"
                    onChange={this.handleChange}
                    noValidate
                  />
                </div>

                <div className="form-group">
                  <label>Feedback</label>
                  <input
                    type="text"
                    name="feedback"
                    required
                    className="form-control"
                    placeholder="Enter your feddback message"
                    onChange={this.handleChange}
                    noValidate
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Submit Feedback
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
    }else{
      return <Redirect to="login" />;
    }
  }
}
export default Feedback;
//“Build React Login & Sign Up UI Template with Bootstrap 4 - positronX.io,” positronX.io, 27-Sep-2019. [Online]. Available: https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/. [Accessed: 06-Jun-2020].
