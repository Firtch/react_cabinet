import { Button } from "@material-ui/core";
import { Sync } from "@material-ui/icons";
import React from "react";
import DataTable from "../component/DataTable";
import { TOKEN } from "../Data/TOKEN";

const getIssuesPromise = () => {
    return fetch("https://api.github.com/repos/Firtch/react_cabinet/issues", {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa("Firtch:" + TOKEN),
      },
    }).then((response) => response.json());
  };

class Issues extends React.Component {
  constructor(props) {
    super(props);

    this.state = {      
      issues: [],
    };    
  }

 

  componentDidMount() {
    getIssuesPromise().then((issues) => this.setState({issues}));
  }

  handleUpdate = () => {
    getIssuesPromise().then((issues) => this.setState({issues}));
  }

  

  render() {
    return (
      <>
        <Button onClick={this.handleUpdate}><Sync /></Button>
        {this.state.issues && <DataTable issues={this.state.issues} />}
      </>
    );
  }
}

export default Issues;
