import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Block, Edit, GitHub, HighlightOff, Reply } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import UpdateIssueDialog from "./UpdateIssueDialog";
import DescriptionDialog from "./DescriptionDialog";
import CloseIssueDialog from "./CloseIssueDialog";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DataTable = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToComments = (link) => {
    history.push(link);
  };

  // const patchIssueClosePromise = (issueNumber) => {
  //   return fetch(
  //     "https://api.github.com/repos/Firtch/react_cabinet/issues/" +
  //       issueNumber,
  //     {
  //       method: "PATCH",
  //       body: JSON.stringify({
  //         owner: "Firtch",
  //         repo: "react_cabinet",
  //         issue_number: props.issueNumber,
  //         state: "closed",
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         Authorization:
  //           "Basic " + btoa("Firtch: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"),
  //       },
  //     }
  //   ).then((response) => response.json());
  // };

  const columns = [
    { field: "number", headerName: "Номер", renderCell: (number) => {
      return (
        <>
        {number.value}
          <UpdateIssueDialog issueNumber={number.value} />
          <CloseIssueDialog issueNumber={number.value}/>
          {/* <Button>
            <Block onClick={() => {patchIssueClosePromise(number.value)}} />
          </Button> */}
        </>
      );
    }, width: 130 },    
    {
      field: "state",
      headerName: "Статус",
      renderCell: (status) => {
        return <>{status.value}</>;
      },
      width: 130,
    },
    { field: "title", headerName: "Название", width: 300 },
    { field: "created_at", headerName: "Создано", width: 150 },
    {
      field: "description",
      headerName: "Описание",
      renderCell: (description) => {
        // console.log(description.value);
        return (
          <>
          {description.value ? <DescriptionDialog description={description.value} /> : "Без описания"}
         
          </>
        );
      },
      width: 160,
    },
    {
      field: "html_url",
      headerName: "Ссылка",
      renderCell: (link) => {
        return (
          <a href={link.value}>
            <Button variant="contained" color="default" startIcon={<GitHub />} />
          </a>
        );
      },
      width: 160,
    },
    {
      field: "user_url",
      headerName: "Автор",
      renderCell: (usr) => {
        return <a href={"https://github.com/" + usr.value}>{usr.value}</a>;
      },
      width: 190,
    },
    // {
    //   field: "edit",
    //   headerName: "Редактировать",
    //   renderCell: (number) => {
    //     return (
    //       <>
    //         <UpdateIssueDialog issueNumber={number.value} />
    //         <Button>
    //           <Block onClick={() => {patchIssueClosePromise(number.value)}} />
    //         </Button>
    //       </>
    //     );
    //   },
    //   width: 190,
    // },
    {
      field: "comments",
      headerName: "Комментарии",
      renderCell: (commentsLink) => {
        return (
          <a href={"/issue-comments?commentsUrl=" + commentsLink.value}>
            Все обращения
          </a>
        );
      },
      width: 190,
    },
  ];


  console.log(props.issues);

  const importedIssues = props.issues.map((issue) => {
    return {
      id: issue.number,
      number: issue.number,
      title: issue.title,
      state: issue.state,
      created_at: moment(issue.created_at).format("DD.MM.yyyy"),
      description: issue.body,
      html_url: issue.html_url,
      user_url: issue.user.login,
      comments: issue.comments_url,
      edit: issue.number,
    };
  });

  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid rows={importedIssues} columns={columns} />
    </div>
  );
};

export default DataTable;
