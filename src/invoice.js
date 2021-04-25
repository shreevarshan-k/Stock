import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
//import GstPurchase from "./GstPurchase";
//import NonGstPurchase from "./NonGstPurchase"

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import Sidebar from "./Sidebar";
//import PurchaseInvoice from "./PurchaseInvoice";
import SaleInvoice from "./SaleInvoice";
// import PurchaseReturninvoice from "./PurchaseReturninvoice";
// import SalesReturnInvoice from "./SalesReturnInvoice";

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
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Purchase Invoice">
              hi
            </Tab>
            <Tab eventKey="profile" title="Sale Invoice">
              <SaleInvoice/>
            </Tab>
            <Tab eventKey="PurchaseReturn" title="Purchase Return Invoice">
             soon
            </Tab>
            <Tab eventKey="SalesReturn" title="Sales Return Invoice">
              soon
            </Tab>
           
          </Tabs>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(DealPipeline);