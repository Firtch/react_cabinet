import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { AuthContext } from "./context/AuthContext";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const classes = useStyles();
  //   const [auth, setAuth] = React.useState(true);
  const cookies = new Cookies();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setIsLoggedIn(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        {/* <FormControlLabel
          control={
            <Switch
              checked={isLoggedIn}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={isLoggedIn ? "Logout" : "Login"}
        /> */}
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Приложение Личный кабинет
          </Typography>

          {!isLoggedIn && (
            <div>
              <NavLink to="/login" className="link">
                <Button color="inherit">Войти</Button>
              </NavLink>
              <NavLink to="/reg" className="link">
                <Button color="inherit">Регистрация</Button>
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div>
              <Button color="inherit">Личный кабинет</Button>
              <Button color="inherit" onClick={() => { cookies.remove("user"); setIsLoggedIn(false);}}>
                Выход
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
