import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);  

  return (    
    <Route
      {...rest} render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default AuthorizedRoute;
