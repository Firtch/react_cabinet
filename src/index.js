import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

// REDUX
// constants action creator name
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
// /constants action creator name

// Actions creator
export const changeLogin = (loginForm) => ({
  type: LOGIN,
  payload: loginForm,
});

export const changeRegister = (registgerForm) => ({
  type: REGISTER,
  payload: registgerForm,
});
// /Actions creator

// state initialization
const loginInitialState = {
  username: "",
  password: "",
};

const registerInitialState = {
  username: "",
  fio: "",
  password: "",
  confirmPassword:""
};
// /state initialization

// Reducer
export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const registerReducer = (state = registerInitialState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


const rootReducer = combineReducers({ login: loginReducer, register: registerReducer });
// /Reducer

// Store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// /Store

// Selector
export const selectLoginForm = (state) => state.login;
export const selectRegisterForm = (state) => state.register;
// /Selector

// /REDUX

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
