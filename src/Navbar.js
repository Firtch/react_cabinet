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
import { Button, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { AddCircle, Link } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

  const titleRef = React.createRef();

  const handleChange = (event) => {
    setIsLoggedIn(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openCerateIssue, setOpenCreateIssue] = React.useState(false);

  const handleClickOpenCreateIssue = () => {    
    setOpenCreateIssue(true);
  };

  const handleCreateIssue = () => {
    postIssueCommentsPromise();
    handleCloseCreateIssue();
  }

  const handleCloseCreateIssue = () => {
    setOpenCreateIssue(false);
  };

  const postIssueCommentsPromise = () => {
    return fetch("https://api.github.com/repos/Firtch/react_cabinet/issues", {
      method: "POST",
      body: JSON.stringify({
        owner: "Firtch",
        repo: "react_cabinet",
        title: titleRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Basic " + btoa("Firtch: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"),
      },
    }).then((response) => response.json());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Приложение "Личный кабинет"
          </Typography>

          <Button color="inherit" onClick={handleClickOpenCreateIssue}>
            <AddCircle /> Create Issue
          </Button>
          <Dialog
            open={openCerateIssue}
            onClose={handleCloseCreateIssue}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Введите название
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  variant="outlined"
                  margin="normal"
                  inputRef={titleRef}                  
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateIssue} color="primary">
                Создать
              </Button>
              <Button
                onClick={handleCloseCreateIssue}
                color="primary"
                autoFocus
              >
                Отмена
              </Button>
            </DialogActions>
          </Dialog>

          <NavLink to="/issues" className="link">
            <Button color="inherit">Issues</Button>
          </NavLink>

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
              <NavLink className="link" to="/cabinet">
                <Button color="inherit">Личный кабинет</Button>
              </NavLink>
              <Button
                color="inherit"
                onClick={() => {
                  cookies.remove("user");
                  setIsLoggedIn(false);
                }}
              >
                Выход
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
