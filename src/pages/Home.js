import React, { useContext } from "react";
import { Login } from "./Login";
import { AuthContext } from "../context/AuthContext";
import { Link, Redirect } from "react-router-dom";
import userMemoTable from "../Data/Users";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // if(!isLoggedIn) {
  //   return <Redirect to="/login" />
  // }

  return (
    <div>      
      <h1>Добро пожаловать</h1>
      <p>Зарегестрированно всего {userMemoTable.users.length} пользователей</p>
      <p>Перейти в <Link to="cabinet">личный кабинет</Link></p>
    </div>
  );
};

export default Home;
