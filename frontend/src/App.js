import React from "react";
import {Component} from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import CommentSignUp from "./Components/SignUp";
import Axios from "axios";
import Signup from "./pages/Signup";
import Home from "./Components/Home";
import View from "./Components/View";
import Header from "./Components/Header";
import Property from "./Components/Products";
import Underconstruction from "./Components/Construction";
import login from "./Components/commentlogin";
import Pay from "./Components/Pay";
import Upgrade from "./Components/Upgrade";
import Blog from "./Components/Blog";
import Roommate from "./Components/FindingRoomate";
import Blogpost from "./Components/Blogpost";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Fav from "./Components/ViewFavourites";
import Feedback from "./Components/Feedback";
import AboutUs from "./Components/AboutUs";

let loginStatus = true;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loginStatus: true,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(emailId) {
    this.setState({
      loginStatus: true,
    });
    loginStatus = true;
    Cookies.set("User", emailId);
  }
  checkLoginStatus() {
    if (Cookies.get("User")) {
      Axios.post("http://localhost:5000/getCurrentUser", {
        emailId: Cookies.get("User").toString(),
      })
        .then((response) => {
          if (response.data.success) {
            this.setState({
              loginStatus: true,
            });
          } else {
            this.setState({
              loginStatus: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  setLoginStatus() {
    if (Cookies.get("User") == undefined) {
      this.setState({
        loginStatus: false,
      });
    } else {
      this.setState({
        loginStatus: true,
      });
    }
  }
  componentDidMount() {
    this.setLoginStatus();
  }
  render() {
    return (
      <div className="content bg-light">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/sign-up" render={(props) => (<Signup {...props} handleLogin={this.handleLogin} /> )}  />
            <Route path="/listings" component={View} />
            <Route path="/underCons" component={Underconstruction} />
            <Route path="/viewblog" component={Blog} />
            <Route path="/blogpost" component={Blogpost} />
            <Route path="/roommate" component={Roommate} />
            <Route path="/property-page" component={Property} />
            <Route path="/commentlogin" component={login} />
            <Route path="/payment" component={Pay} />
	    <Route path="/feedback" component={Feedback} />
            <Route path="/aboutus" component={AboutUs} />
            <Route exact path="/login" render={(props) => (<Login {...props} handleLogin={this.handleLogin} /> )}  />
            <Route exact path="/forgotPassword" render={(props) => <ForgotPassword {...props} />} />
            <Route path="/fav" component={Fav} />
            <ProtectedRoute
              exact
              path="/profile"
              loginStatus={loginStatus}
              component={Profile}
            />
            <Route path="/upgrade" component={Upgrade} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
