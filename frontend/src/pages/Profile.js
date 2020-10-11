import React, { Component } from "react";
import ProfileComponent from "../Components/Profile";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function Profile() {
  const classes = useStyles();
  const isLoggedIn = true ? Cookies.get("User") : false;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const history = useHistory();
  if (isLoggedIn) {
    return (
      <div>
        <ProfileComponent
          classes={classes}
          history={history}
          selectedIndex={selectedIndex}
          handleListItemClick={handleListItemClick}
        />
      </div>
    );
  } else {
    return <Redirect to="login" />;
  }
}
