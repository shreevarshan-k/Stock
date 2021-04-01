import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AvailableStock from './AvailableStock';


import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import Sidebar from "./Sidebar";

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(30),
  },
  button: {
    marginTop: theme.spacing(4),
  },
});

class StockList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Sidebar />
          <Navbar />
        </div>
        <main className={classes.content}>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="In Stock">
              <AvailableStock/>
            </Tab>
            <Tab eventKey="profile" title="Out of Stock">
              jello
            </Tab>
           
          </Tabs>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(StockList);
