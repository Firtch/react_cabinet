import { yupResolver } from "@hookform/resolvers/yup";
import { Button, makeStyles, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import { changeRegister, selectRegisterForm } from "..";
import { Form } from "../component/Form";
import { Input } from "../component/Input";
import { MainContainer } from "../component/MainContainer";
import { getFio } from "../Data/DaDataService";
import { fakeRegUser } from "../Data/Users";

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
      /^([0-9A-Za-z]*)$/,
      "Имя пользователя должно содержать только буквы латинского алфавита"
    )
    .required("Необходимо ввести имя пользователя"),
  fio: yup
    .string()
    .matches(
      /^[A-Za-zА-Яа-я ]*$/,
      "Ф. И. О. может содержать только буквы латинского или русского алфавита"
    ),
  password: yup
    .string()
    .min(5, "Пароль должен содержать минимум 5 символов")
    .required("Вы забыли ввести пароль"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
    .required("Необходимо подтвердить пароль"),
});

export function Reg() {
  const defaultValues = useSelector(selectRegisterForm);
  const dispatch = useDispatch();

  const btnClasses = useStylesForBtns();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [userExistsError, setUserExistsError] = useState(false);
  const history = useHistory();

  const [fioList, setFioList] = useState([]);

  const onSubmit = (RegisterFormData) => {
    const newUser = dispatch(changeRegister(RegisterFormData));
    const user = fakeRegUser(newUser.payload);
    
    if(!user) {
      setUserExistsError(true);
    } else {
      setUserExistsError(false);
      history.push("/login?registered");
    }
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Регистрация
        {userExistsError && (
          <p className="error"> Пользователь, с таким именем пользователя, уже существует</p>
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
        <Autocomplete
            id="combo-box-demo"
            noOptionsText="Нет данных"            
            options={fioList}
            getOptionLabel={(option) => option.value}
            style={{ width: 300 }}            
            fullWidth
            onChange={(e, v) => {
              // console.log(v);
              // setFio(v.value);
              // props.onChangeFio(v.value);
            }}
            renderInput={(params) => (
              <Input                
                {...params}
                {...register("fio")}
                id="fio"
                type="text"
                label="Ф. И. О."
                name="fio"
                fullWidth
                // text={fio}                
                onChange={(e) => {getFio(e.target.value).then((res) => setFioList(res)); }}
                error={!!errors.fio}
                helperText={errors?.fio?.message}
              />)} />
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
        <Input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          label="Подтвердить пароль"
          name="confirmPassword"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />
        <div className={btnClasses.root}>
          <NavLink to="/login" className="link">
            <Button variant="contained" color="default">
              Войти
            </Button>
          </NavLink>
          <Button type="submit" variant="contained" color="primary">
            Регистрация
          </Button>
        </div>
      </Form>
    </MainContainer>
  );
}
