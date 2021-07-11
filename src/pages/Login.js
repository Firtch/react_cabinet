import React, { useState, useContext } from "react";
import { MainContainer } from "../component/MainContainer";
import { Form } from "../component/Form";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input } from "../component/Input";
import { NavLink } from "react-router-dom";
import { checkUser } from "../Data/Users";
import Cookies from "universal-cookie";
import { AuthContext } from "../context/AuthContext";

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
      /^([A-Za-z]*)$/,
      "Имя пользователя должно содержать только буквы латинского алфавита"
    )
    .required("Необходимо ввести имя пользователя"),
  password: yup
    .string()
    // .min(5, "Пароль должен содержать минимум 5 символов")
    .required("Вы забыли ввести пароль"),
});

export function Login() {
  const cookies = new Cookies();
  const { setIsLoggedIn } = useContext(AuthContext);
  const btnClasses = useStylesForBtns();
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data, checkUser(data));
    if (checkUser(data).length < 1) {
      setLoginError(true);
    } else {
      cookies.set("user", checkUser(data)[0]);
      setIsLoggedIn(true);
      setLoginError(false);
    }
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Авторизация
        {loginError && (
          <p className="error">Имя пользователя или пароль не правельные</p>
        )}
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          id="username"
          type="text"
          label="Имя пользователя"
          name="username"
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <Input
          {...register("password")}
          id="password"
          type="password"
          label="Пароль"
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <div className={btnClasses.root}>
          <Button type="submit" variant="contained" color="default">
            Войти
          </Button>
          <NavLink to="/reg" className="link">
            <Button variant="contained" color="primary">
              Регистрация
            </Button>
          </NavLink>
        </div>
      </Form>
    </MainContainer>
  );
}
