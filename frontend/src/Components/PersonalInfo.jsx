import React, { Component } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
  DisconnectOutlined,
  PieChartOutlined,
  UserOutlined,
  UserDeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
class PersonalInfo extends Component {
  state = {};
  render() {
    return (
      <div>
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
            <div style={{ maxWidth: "auto", minWidth: "auto" }}>
              <ListItemText primary="First Name" />
            </div>
            <div style={{ marginLeft: "auto" }}>
              <ListItemText
                style={{ alignContent: "left" }}
                primary={this.props.currentUser.firstName}
              />
            </div>
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
            <div style={{ maxWidth: "auto", minWidth: "auto" }}>
              <ListItemText primary="Last Name" />
            </div>
            <div style={{ marginLeft: "auto" }}>
              <ListItemText
                style={{ alignContent: "left" }}
                primary={this.props.currentUser.lastName}
              />
            </div>
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
            <div style={{ maxWidth: "auto", minWidth: "auto" }}>
              <ListItemText primary="Email Id" />
            </div>
            <div style={{ marginLeft: "auto" }}>
              <ListItemText
                style={{ alignContent: "left" }}
                primary={this.props.currentUser.emailId}
              />
            </div>
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
            <div style={{ maxWidth: "auto", minWidth: "auto" }}>
              <ListItemText primary="Phone Number" />
            </div>
            <div style={{ marginLeft: "auto" }}>
              <ListItemText
                style={{ alignContent: "left" }}
                primary={this.props.currentUser.phoneNumber}
              />
            </div>
          </ListItem>
          <Divider />
        </List>
      </div>
    );
  }
}

export default PersonalInfo;
