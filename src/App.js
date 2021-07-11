import React, { useContext } from "react";
import "./App.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Reg } from "./pages/Reg";
import AuthorizedRoute from "./component/AuthorizedRoute";
import NotAuthorizedRoute from "./component/NotAuthorizedRoute";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <AuthorizedRoute exact path="/" component={Home} />
        <NotAuthorizedRoute path="/login" component={Login} />
        <NotAuthorizedRoute path="/reg" component={Reg} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
