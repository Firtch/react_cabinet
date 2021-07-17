import React, { useContext } from "react";
import "./App.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Reg } from "./pages/Reg";
import AuthorizedRoute from "./component/AuthorizedRoute";
import NotAuthorizedRoute from "./component/NotAuthorizedRoute";
import Cabinet from "./pages/Cabinet";
import Issues from "./pages/Issues";
import IssueComments from "./pages/IssueComments";
import NotFound from "./pages/NotFound";

function App() {
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <AuthorizedRoute exact path="/" component={Home} />
        <AuthorizedRoute path="/home" component={Home} />
        <AuthorizedRoute path="/cabinet" component={Cabinet} />
        <NotAuthorizedRoute path="/login" component={Login} />
        <NotAuthorizedRoute path="/reg" component={Reg} />
        <Route path="/issues" component={Issues}/>
        <Route path="/issue-comments" component={IssueComments}/>
        <Route path="/404" component={NotFound} />
        <Redirect fro0m="*" to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
