import React from "react";
import Axios from "axios";
import Cookies from "js-cookie";
// import NavbarPage from "./NavbarPage";
import "./css/LoginSignUpCss.css";
// import UserProfile from "./userstate.js";
// import HomePageTrial from "./Home"
import male from "./male.svg"; 
import female from "./female.svg"; //icons for male and female used from "https://www.flaticon.com/"

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: null,
      subject: null,
      feedback: null,
    };
  }

  render() {
    const { errors } = this.state;
    return (
      <div class="container text-center" style={{ minHeight: "100%" }}>
        <br />
        <br />
        <h1 class="font-weight-bold">About Us</h1>
        <p class="lead" style={{fontStyle:"Italic"}}>
          We are the group of enthusiastic developers who came together to develop an application to help its users 
          in a wide range from finding a place for accomodation to their dream house. Review a property by reading
          comments on it, add listings to your favourite list and much more.
          <br />
          <br/>
          <br/>
        </p>
        <p class="lead" style={{fontWeight:"Bold"}}>Developer Credits: </p>
        <div class="row justify-content-center mt-5">
          <div class="col-2 offset-2 col-md-1 offset-md-0 p-2 rounded-circle">
            <img class="img-fluid w-auto" src={male} />
          </div>
          <div class="col-8 col-md-3 py-2 px-3 text-left">
            <h4 class="font-weight-light text-bold">Anand Bhadania</h4>

            <p class="font-weight-lighter text-muted">
              {" "}
              Graduate Student <br /> Dalhousie University
            </p>
          </div>

          <div class="col-2 offset-2 col-md-1 offset-md-0 p-2 rounded-circle">
            <img class="img-fluid w-auto" src={male} />
          </div>
          <div class="col-8 col-md-3 py-2 px-3 text-left">
            <h4 class="font-weight-light text-bold">Jasper Jiao</h4>

            <p class="font-weight-lighter text-muted">
              {" "}
              Graduate Student <br /> Dalhousie University
            </p>
          </div>

          <div class="col-2 offset-2 col-md-1 offset-md-0 p-2 rounded-circle">
            <img class="img-fluid w-auto" src={male} />
          </div>
          <div class="col-8 col-md-3 py-2 px-3 text-left">
            <h4 class="font-weight-light text-bold">Keerthi Gowda</h4>

            <p class="font-weight-lighter text-muted">
              {" "}
              Graduate Student <br /> Dalhousie University
            </p>
          </div>

          <div class="col-2 offset-2 col-md-1 offset-md-0 p-2 rounded-circle">
            <img class="img-fluid w-auto" src={female} />
          </div>
          <div class="col-8 col-md-3 py-2 px-3 text-left">
            <h4 class="font-weight-light text-bold">Sumita Parte</h4>

            <p class="font-weight-lighter text-muted">
              {" "}
              Graduate Student <br /> Dalhousie University
            </p>
          </div>

          <div class="col-2 offset-2 col-md-1 offset-md-0 p-2 rounded-circle"></div>
          <div class="col-8 col-md-3 py-2 px-3 text-left"></div>

          <div class="col-2 offset-2 col-md-1 offset-md-0 p-2 rounded-circle">
            <img class="img-fluid w-auto" src={female} />
          </div>
          <div class="col-8 col-md-3 py-2 px-3 text-left">
            <h4 class="font-weight-light text-bold">Zeel Shah</h4>

            <p class="font-weight-lighter text-muted">
              {" "}
              Graduate Student <br /> Dalhousie University
            </p>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
export default AboutUs;
//“Build React Login & Sign Up UI Template with Bootstrap 4 - positronX.io,” positronX.io, 27-Sep-2019. [Online]. Available: https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/. [Accessed: 06-Jun-2020].
