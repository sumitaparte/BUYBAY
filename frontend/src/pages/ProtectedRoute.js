import React from "react";
import { Redirect, Route } from "react-router-dom";
const ProtectedRoute = ({ loginStatus, component: Component, ...rest}) => {
  return (
    <Route
    {...rest}
      render={() => (loginStatus ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
//<ProtectedRoute path="/news/" loggedIn={this.state.loggedInStatus} component={News}/>