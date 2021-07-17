import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Block, Edit } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

export default function CloseIssueDialog(props) {
  const [open, setOpen] = React.useState(false);
  const titleRef = React.createRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseIssue = () => {
    patchIssueClosePromise();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const patchIssueClosePromise = () => {
    console.log(props.issueNumber);
    return fetch(
      "https://api.github.com/repos/Firtch/react_cabinet/issues/" +
        props.issueNumber,
      {
        method: "PATCH",
        body: JSON.stringify({
          owner: "Firtch",
          repo: "react_cabinet",
          issue_number: props.issueNumber,
          state: "closed",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization:
            "Basic " + btoa("Firtch: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"),
        },
      }
    ).then((response) => response.json());
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Block />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Вы действительно хотите закрыть?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseIssue} color="primary">
            Да
          </Button>
          <Button onClick={handleClose} color="primary">
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
