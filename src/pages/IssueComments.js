import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { TextField } from "@material-ui/core";
import { Form } from "../component/Form";

class IssueComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };

    this.commentRef = React.createRef();

    const commentsUrl = new URLSearchParams(this.props.location.search).get(
      "commentsUrl"
    );

    if (!commentsUrl) {
      this.props.history.push("/issues");
    }

    this.getIssueCommentsPromise = () => {
      return fetch(commentsUrl, {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa("Firtch: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"),
        },
      }).then((response) => response.json());
    };

    this.postIssueCommentsPromise = () => {
      return fetch(commentsUrl, {
        method: "POST",
        body: JSON.stringify({
          owner: "Firtch",
          repo: commentsUrl.replace("//", "/").split("/")[4],
          issue_number: commentsUrl.replace("//", "/").split("/")[6],
          body: this.commentRef.current.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization:
            "Basic " + btoa("Firtch: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"),
        },
      }).then((response) => response.json());
    };
  }

  componentDidMount() {
    this.getIssueCommentsPromise().then((comments) =>
      this.setState({ comments })
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.postIssueCommentsPromise().then(() =>
      this.getIssueCommentsPromise().then((comments) => 
        this.setState({ comments })
      )
    );
  };

  render() {
    return (
      <>
        <h3>
          <a href="/issues">Назад к списку</a>
        </h3>
        {this.state.comments.length < 1 && <h3>Нет комментариев</h3>}
        {this.state.comments.length > 0 &&
          this.state.comments.map((comment) => {
            return (
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom></Typography>
                  <Typography variant="h5" component="h2">
                    {comment.user.login}
                  </Typography>
                  <Typography color="textSecondary">
                    {moment(comment.created_at).format("DD.MM.yyyy")}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {comment.body}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
              </Card>
            );
          })}

        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom></Typography>
            <Typography variant="h5" component="h2">
              Оставить комментарий
            </Typography>
            <Form onSubmit={(e) => this.onSubmit(e)}>
              <TextField
                id="standard-multiline-static"
                label="Комментарий"
                multiline
                rows={4}                
                fullWidth
                inputRef={this.commentRef}                
              />
              <Button
                type="submit"                
                variant="contained"
                color="primary"
              >
                Отправить
              </Button>
            </Form>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default IssueComments;
