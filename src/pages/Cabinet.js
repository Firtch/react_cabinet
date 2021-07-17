import React, { useContext, useReducer, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Redirect } from "react-router-dom";
import { getFakeUser } from "../Data/Users";
import Cookies from "universal-cookie";
import { FioCard } from "../component/FioCard";
import { LastNameChangeCard } from "../component/LastNameChangeCard";
import { Input } from "../component/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../component/Form";
import { TextField, Typography } from "@material-ui/core";
import { AddressCard } from "../component/AddressCard";
import HorizontalProgress from "../component/HorizontalProgress";

const Cabinet = () => {
  const cookies = new Cookies();
  const [currentUser] = useState(
    cookies.get("user") ? getFakeUser(cookies.get("user")) : undefined
  );
  
  // const changeFio = (fio) => currentUser.fio = fio;

  const schema = yup.object().shape({
    username: yup
      .string()
      .matches(
        /^([A-Za-z0-9]*)$/,
        "Имя пользователя может содержать, только буквы латинского алфавита и цифры"
      )
      .required("Необходимо ввести имя пользователя"),
    password: yup.string().required("Вы забыли ввести пароль"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Form>
        <FioCard fio={currentUser.fio} /*onChangeFio={changeFio}*/ />
        <LastNameChangeCard lastName={currentUser.fio.split(" ")[0]} />
        <Typography variant="h5" component="h2">
          Пасспортные данные
        </Typography>
        <Input
          {...register("passportSerial")}
          id="passportSerial"
          type="text"
          label="Серия"
          name="passportSerial"
          error={!!errors.passportSerial}
          helperText={errors?.passportSerial?.message}
        />
        <Input
          {...register("passportNumber")}
          id="passportNumber"
          type="text"
          label="Номер"
          name="passportNumber"
          error={!!errors.passportSerial}
          helperText={errors?.passportSerial?.message}
        />
        <Input
          {...register("passportDate")}
          id="passportDate"
          label="Дата выдачи"
          type="date"
          // defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Input
          {...register("passportCode")}
          id="passportCode"
          type="text"
          label="Код"
          name="passportCodeNumber"
          error={!!errors.passportCode}
          helperText={errors?.passportCode?.message}
        />
        <Input
          {...register("passportGivenBy")}
          id="passportGivenBy"
          type="text"
          label="Выдан"
          name="passportGivenBy"
          fullWidth
          error={!!errors.passportGivenBy}
          helperText={errors?.passportGivenBy?.message}
        />
        <Input
          {...register("birthdate")}
          id="birthdate"
          label="Дата рождения"
          type="date"
          // defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Input
          {...register("birthplace")}
          id="birthplace"
          type="text"
          label="Место рождения"
          name="birthplace"
          fullWidth
          error={!!errors.birthplace}
          helperText={errors?.birthplace?.message}
        />
        <AddressCard regAddress={currentUser.regAddress} liveAddress={currentUser.liveAddress} />
        <HorizontalProgress />
      </Form>
    </div>
  );
};

export default Cabinet;
