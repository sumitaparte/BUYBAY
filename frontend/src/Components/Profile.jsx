import React, { Component } from "react";
import List from "@material-ui/core/List";
import Axios from "axios";
import Cookies from "js-cookie";
import { Layout, Menu, Row, Col, Modal, message } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./css/Profile.css";
import Divider from "@material-ui/core/Divider";
import PersonalInfo from "./PersonalInfo";
import {
  DesktopOutlined,
  FormOutlined,
  UserOutlined,
  UserDeleteOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import ChangePassword from "./ChangePassword";

const setStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
// const classes = useStyles();
// const [selectedIndex, setSelectedIndex] = React.useState(1);
// const handleListItemClick = (event, index) => {
//   setSelectedIndex(index);
// };
let user = {
  firstName: null,
  lastName: null,
  emailId: null,
  phoneNumber: null,
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProfile: false,
      changePassword: true,
      deleteProfile: false,
      logout: false,
      isLoggedIn: false,
    };
    if(Cookies.get("User")){
      this.setState({isLoggedIn : true})
    }
  }
  
  deleteProfile() {
    var answer = window.confirm("Are you sure you want to delete your Profile permanently?");
    if (answer) {
      if (Cookies.get("User")) {
        
        const emailId = Cookies.get("User").toString()
        Axios.delete("https://csci5709-a4-webgroup18.herokuapp.com/deleteUser/"+emailId, {
        }).then((response) => {
          if (response.data.success) {
            Cookies.remove("User");
            alert("Your profile has been deleted successfully");
            this.props.history.push("/home");
          } else {
            alert("Some error occured while deleting your profile");
          }
        });
      }else{
        alert("deletion failed");
      }
    }
    else {
    }
    
  }
  logout() {
    alert("You have succesfully logged out");
    Cookies.set("User", "");
    Cookies.remove("User");
    this.props.history.push("/login");
  }

  componentDidMount() {
    if (Cookies.get("User")) {
      Axios.post("https://csci5709-a4-webgroup18.herokuapp.com/getCurrentUser", {
        emailId: Cookies.get("User").toString(),
      }).then((response) => {
        user.emailId = response.data.user[0].emailId;
        user.firstName = response.data.user[0].firstName;
        user.lastName = response.data.user[0].lastName;
        user.phoneNumber = response.data.user[0].phoneNumber;
        //alert("Logged In successfully. Backend Development in Progress");
        return response;
        //this.props.history.push("/");
      });
    }
  }
  onClickAction = (event, index) => {
    this.props.handleListItemClick(event, index);
    if (index == 0) {
      this.setState({
        myProfile: true,
        changePassword: false,
        deleteProfile: false,
        logout: false,
      });
    } else if (index == 1) {
      this.setState({
        myProfile: false,
        changePassword: true,
        deleteProfile: false,
        logout: false,
      });
    } else if (index == 2) {
      this.setState({
        myProfile: false,
        changePassword: false,
        deleteProfile: true,
        logout: false,
      });
      this.logout();
    } else if (index == 3) {
      this.setState({
        visible: true,
        myProfile: false,
        changePassword: false,
        deleteProfile: false,
        logout: true,
      });
      this.deleteProfile();
    }
  };

  render() {
    let currentComponent = <ChangePassword history={this.props.history} />;
    if (this.state.myProfile) {
      //this.getCurrentUser();
      currentComponent = <PersonalInfo currentUser={user} />;
    } else if (this.state.changePassword) {
      currentComponent = <ChangePassword history={this.props.history} />;
    }

    return (
      <div style={{ marginTop: "100px" }}>
        <div className="row profile">
          <div style={{ marginLeft: "50px" }} className="col-md-3">
            <div className="profile-sidebar">
              <div className={this.props.classes.root}>
                <List>
                  <Divider />
                  <ListItem
                    button
                    selected={this.props.selectedIndex === 0}
                    onClick={(event) => this.onClickAction(event, 0)}
                  >
                    <ListItemIcon>
                      <UserOutlined />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    selected={this.props.selectedIndex === 1}
                    onClick={(event) => this.onClickAction(event, 1)}
                  >
                    <ListItemIcon>
                      <FormOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    selected={this.props.selectedIndex === 2}
                    onClick={(event) => this.onClickAction(event, 2)}
                  >
                    <ListItemIcon>
                      <DisconnectOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    selected={this.props.selectedIndex === 3}
                    onClick={(event) => this.onClickAction(event, 3)}
                  >
                    <ListItemIcon>
                      <UserDeleteOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Delete Profile" />
                  </ListItem>
                  <Divider />
                </List>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-content">{currentComponent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
