import React, { useState, useContext, useReducer, useEffect } from "react";
import { MainContainer } from "../component/MainContainer";
import { Form } from "../component/Form";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input } from "../component/Input";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { fakeAuthUser } from "../Data/Users";
import Cookies from "universal-cookie";
import { AuthContext } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN, changeLogin, loginReducer, selectLoginForm } from "../index";

const useStylesForBtns = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^([A-Za-z0-9]*)$/,
      "Имя пользователя может содержать, только буквы латинского алфавита и цифры"
    )
    .required("Необходимо ввести имя пользователя"),
  password: yup
    .string()
    .required("Вы забыли ввести пароль"),
});

export function Login() {

  const defaultValues = useSelector(selectLoginForm);
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const { setIsLoggedIn } = useContext(AuthContext);
  const btnClasses = useStylesForBtns();
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const registered = useLocation().search.includes("registered");
  const history = useHistory();

  // useEffect(()=>{
  //   console.log("defaultValues: ", defaultValues);
  // }, [defaultValues])

  const onSubmit = (LoginFormData) => {   
    const authData = dispatch(changeLogin(LoginFormData));        
    const user = fakeAuthUser(authData.payload, setIsLoggedIn);    
    if(!user) {     
      setLoginError(true);
    } else {
      setLoginError(false);
    }
    history.push("/login")    
  };  

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Авторизация
        {loginError && (
          <p className="error">Имя пользователя или пароль не правельные</p>
        )}
        {registered && (
          <p className="success">Спасибо за регистрацию, Вы можете войти</p>
        )}
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          id="username"
          type="text"
          label="Имя пользователя"
          name="username"
          fullWidth
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <Input
          {...register("password")}
          id="password"
          type="password"
          label="Пароль"
          name="password"
          fullWidth
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <div className={btnClasses.root}>
          <Button type="submit" variant="contained" color="primary">
            Войти
          </Button>
          <NavLink to="/reg" className="link">
            <Button variant="contained" color="default">
              Регистрация
            </Button>
          </NavLink>
        </div>
      </Form>
    </MainContainer>
  );
}
