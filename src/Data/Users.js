const userData = {
  users: [
    {
      username: "user",
      password: "pass1",
      fio: "Иванов Иван Иванович",
      sex: "male",
      passportSeria: "DF",
      passportNumber: "12332",
      passportDate: "24.24.1992",
      passportCode: "234",
      passportGivenBy: "Goverment",
      birthdate: "12.12.1992",
      birthplace: "Moscow",
      regAddress: "Moscow, agava str.",
      liveAddress: "Moscow, agava str.",      
    },
  ],
};

export const checkUser = ({username, password}) => {
    return userData.users.filter((user) => user.username === username && user.password === password);    
}

export default userData;
