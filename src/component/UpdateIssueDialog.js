import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Edit } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { TOKEN } from "../Data/TOKEN";

export default function UpdateIssueDialog(props) {
  const [open, setOpen] = React.useState(false);
  const titleRef = React.createRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    patchIssueTitlePromise();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const patchIssueTitlePromise = () => {
    return fetch(
      "https://api.github.com/repos/Firtch/react_cabinet/issues/" +
        props.issueNumber,
      {
        method: "PATCH",
        body: JSON.stringify({
          owner: "Firtch",
          repo: "react_cabinet",
          issue_number: props.issueNumber,
          title: titleRef.current.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization:
            "Basic " + btoa("Firtch:" + TOKEN),
        },
      }
    ).then((response) => response.json());
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Edit />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Введите новое название
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField variant="outlined" margin="normal" inputRef={titleRef} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">
            Обновить
          </Button>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
