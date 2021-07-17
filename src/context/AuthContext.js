import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";

export const AuthContext = createContext();

export class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      authUser: new Cookies(),
    };
  }

  setIsLoggedIn = (value) => this.setState({ isLoggedIn: value });

  render() {
    const { isLoggedIn, authUser } = this.state;
    const setIsLoggedIn = this.setIsLoggedIn;

    const user = authUser.get("user");
    console.log("USER", user);
    if(user && !isLoggedIn) {
        setIsLoggedIn(true);
    }

    // if (authUser.get("user")) {
    //   const user = authUser.get("user");
    //   if (!isLoggedIn) {
    //     setIsLoggedIn(true);
    //   }
    //   console.log(user);
    // } else {
    //   if (isLoggedIn) {
    //     setIsLoggedIn(false);
    //   }
    // }

    return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

// export const AuthContextProvider = (props) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (
//         <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };
