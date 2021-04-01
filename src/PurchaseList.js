import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import GstPurchase from "./GstPurchase";
import NonGstPurchase from "./NonGstPurchase"

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

class DealPipeline extends Component {
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
            <Tab eventKey="home" title="GST">
              <GstPurchase/>
            </Tab>
            <Tab eventKey="profile" title="Non GST">
              <NonGstPurchase/>
            </Tab>
           
          </Tabs>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(DealPipeline);
