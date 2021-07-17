import { useContext } from "react";
import Cookies from "universal-cookie";
import { AuthContext } from "../context/AuthContext";

const userMemoTable = {
  users: [
    {
      username: "user",
      password: "pass1",
      fio: "Иванов Иван Иванович",
      gender: "male",
      passportSeria: "DF",
      passportNumber: "12332",
      passportDate: new Date(),
      passportCode: "234",
      passportGivenBy: "Goverment",
      birthdate: "12.12.1976",
      birthplace: "Moscow",
      regAddress: "Moscow, agava str.",
      liveAddress: "Moscow, agava str.",
    },
  ],
};

export const fakeAuthUser = ({ username, password }, setLoggedIn) => {
  const usr = userMemoTable.users.filter(
    (user) => user.username === username && user.password === password
  );
  if (usr.length != 0) {    
    new Cookies().set("user", usr[0].username);
    setLoggedIn(true);
    return usr;
  }
  return undefined;
};

export const fakeRegUser = (usr) => {
  if (
    userMemoTable.users.filter((user) => user.username === usr.username)
      .length > 0
  ) {
    return undefined;
  } else {
    const newUser = {
      username: usr.username,
      password: usr.password,
      fio: usr.fio,
      pastLastName: "",
      gender: "",
      passportSeria: "",
      passportNumber: "",
      passportDate: "",
      passportCode: "",
      passportGivenBy: "",
      birthdate: "",
      birthplace: "",
      regAddress: "",
      liveAddress: "",            
    };
    userMemoTable.users.push(newUser);
    return usr;
  }
};

export const getFakeUser = (username) => {
  const user = userMemoTable.users.filter(usr => usr.username === username);
  return user ? user[0] : undefined;
}

export default userMemoTable;
