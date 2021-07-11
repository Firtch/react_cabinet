import React, { useContext } from "react";
import { Login } from "./Login";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // if(!isLoggedIn) {
  //   return <Redirect to="/login" />
  // }

  return (
    <div>      
      <h1>Home</h1>
    </div>
  );
};

export default Home;
