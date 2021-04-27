import {
    Box,
    Card,
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@material-ui/core";
  //import Grid from "@material-ui/core/Grid";
  import { withStyles } from "@material-ui/core/styles";
  import Toolbar from "@material-ui/core/Toolbar";
  //import Typography from "@material-ui/core/Typography";
  import React, { Component } from "react";
  import firebaseDb from "./firebase.js";
  import { Col, Divider, Row } from "antd";
  import "antd/dist/antd.css";
  import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
  import ReactToPrint from "react-to-print";
  
  import Sidebar from "./Sidebar.js";
  import Navbar from "./Navbar.js";
  import { PrintOutlined } from "@material-ui/icons";
  //import Pdf from "react-to-pdf";
  
  // const ref = React.createRef();
  //const drawerWidth = 240;
  
  const useStyles = (theme) => ({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: "7rem",
    },
    button: {
      marginTop: theme.spacing(4),
    },
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  // var today = new Date();
  // var date;
  // if (today.getDate() < 10 && today.getMonth() < 10) {
  //   date =
  //     today.getFullYear() +
  //     "-0" +
  //     (today.getMonth() + 1) +
  //     "-0" +
  //     today.getDate();
  // } else if (today.getDate() < 10) {
  //   date =
  //     today.getFullYear() + "-" + (today.getMonth() + 1) + "-0" + today.getDate();
  // } else if (today.getMonth() < 10) {
  //   date =
  //     today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate();
  // }
  var billamount = 0;
  class SalesBillTemplate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        custObjects: {},
        assetObjects: {},
        Leadobj: "",
        rate: "",
      };
    }
  
    componentDidMount() {
      firebaseDb
        .database()
        .ref("Admin/Anu/Bills")
        .child(localStorage.getItem("Date"))
        .child(localStorage.getItem("BillNo"))
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ assetObjects: { ...snapshot.val() } });
          }
        });
      firebaseDb
        .database()
        .ref("Admin/Anu/Bills").child(localStorage.getItem("Date"))
        .child(localStorage.getItem("BillNo")).child("Product")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ custObjects: { ...snapshot.val() } });
          }
        });
    }
  
    Finalamt = () => {
      var finalamt = this.state.custObjects.Total + parseInt(this.state.assetObjects.shippingRate);
      return finalamt;
    };
    render() {
      const { classes } = this.props;
      return (
        <>
          <div className={classes.root}>
            <Navbar />
            <Sidebar />
            <main
              className={classes.content}
              ref={(el) => (this.componentRef = el)}
            >
              <Document >
                <Page size="A4" style={styles.page}>
                  <View>
                    <Text>
                      <div style={{ padding: 15 }}>
                        <Row>
                          <Col>
                            <Divider
                              style={{ marginLeft: "10rem", marginTop: "2rem" }}
                            >
                              Bill
                            </Divider>
                          </Col>
                        </Row>
  
                        <Row gutter={24} style={{ marginTop: 32 }}>
                          <Col span={8}>
                            <th>Bill TO:</th>
                            <h3>{this.state.assetObjects.CustomerName}</h3>
                            <div>{this.state.assetObjects.Address} ,</div>
                            <div>
                              {this.state.assetObjects.District} -{" "}
                              {this.state.assetObjects.Pincode}
                            </div>
  
                            <div>
                              MOBILE: {this.state.assetObjects.CustomerMobile}
                            </div>
                          </Col>
                          <Col span={8} offset={5}>
                            <table>
                              <tr>
                                <th>Invoice # :</th>
                                <td>{localStorage.getItem("BillNo")}</td>
                              </tr>
                              <tr>
                                <th>Bill Date :</th>
                                <td>{this.state.assetObjects.Date}</td>
                              </tr>
                            </table>
                          </Col>
                        </Row>
                      </div>
  
                      <card minWidth="75%">
                        <Toolbar />
                        <React.Fragment>
                          <Box style={{ marginTop: "-2rem", width: 650, marginLeft:"-2rem"}}>
                            <Card>
                              <CardContent>
                                <Table style={{ width: 700 }}>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Rate</TableCell>
                                      <TableCell>Item</TableCell>
                                      <TableCell>Quantity</TableCell>
                                      <TableCell>Total Amount</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {
                                      ((billamount = 0),
                                      Object.keys(this.state.custObjects).map(
                                        (key) => (
                                          (billamount += parseInt(
                                            this.state.custObjects[key].Rate *
                                              this.state.custObjects[key].Quantity // eslint-disable-next-line
                                          )),
                                          key !== "Total" ? (
                                            <TableRow hover key={key}>
                                              <TableCell>
                                                {this.state.custObjects[key].Rate}
                                              </TableCell>
                                              <TableCell> {this.state.custObjects[key].ID}</TableCell>
                                              <TableCell>
                                                {
                                                  this.state.custObjects[key]
                                                    .Quantity
                                                }
                                              </TableCell>
                                              <TableCell>
                                                {this.state.custObjects[key]
                                                  .Rate *
                                                  this.state.custObjects[key]
                                                    .Quantity}
                                              </TableCell>
                                            </TableRow>
                                          ) : (
                                            console.log(1)
                                          )
                                        )
                                      ))
                                    }
                                  </TableBody>
                                </Table>
                              </CardContent>
                            </Card>
                          </Box>
                          <Row style={{ marginTop: 48 }}>
                            <Col span={8} offset={13}>
                              <table>
                                <tr>
                                  <th>Total Amount :</th>
                                  <td>Rs. {this.state.custObjects.Total}</td>
                                </tr>
                                <tr>
                                  <th>Shipping Rate :</th>
                                  <td>
                                    Rs. {this.state.assetObjects.shippingRate}{" "}
                                  </td>
                                </tr>
  
                                <tr>
                                  <th>Nett Total :</th>
                                  <td>Rs. {this.Finalamt()}</td>
                                </tr>
                              </table>
                            </Col>
                          </Row>
  
                          {/* <Box mt={3}>
                      <Card>
                        <CardContent>
                          <Table style={{ width: 500 }}>
                            <TableRow>
                              <TableCell>Total Amount: {billamount}</TableCell>
                              <TableCell>
                                Return Percentage:{" "}
                                {this.state.assetObjects.ReturnPercentage}%
                              </TableCell>
                              <TableCell>
                                GST Tax : {this.state.assetObjects.Gst}%
                              </TableCell>
                              <TableCell>Final Amount: {this.Finalamt()}</TableCell>
                            </TableRow>
                          </Table>
                        </CardContent>
                      </Card>
                    </Box> */}
                        </React.Fragment>
                      </card>
                    </Text>
                  </View>
                </Page>
              </Document>
              
            </main>
            
           
            {/* <Pdf targetRef={ref} filename={this.state.Leadobj}>
                      {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                    </Pdf>
              */}
          </div>
          <div style={{marginLeft:"20rem"}}>
          <ReactToPrint 
           
              trigger={()=> 
              <IconButton
                color="primary"
              
                aria-label="add an alarm"
                onClick={() => this.view()}
              >
                <PrintOutlined /> Print this page
              </IconButton>} 
              content={() => this.componentRef}/></div>
        </>
      );
    }
  }
  export default withStyles(useStyles)(SalesBillTemplate);