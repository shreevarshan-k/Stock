import {
    Box,
    Card,
    CardContent,
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
  import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
  
  //import Pdf from "react-to-pdf";
  
  
  const ref = React.createRef();
  //const drawerWidth = 240;
  
  const useStyles = (theme) => ({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: "2rem"
    },
    button: {
      marginTop: theme.spacing(4),
    },
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
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
        .ref("Admin/bill")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ assetObjects: { ...snapshot.val() } });
          }
        });
      firebaseDb
        .database()
        .ref("Admin/bill/Product")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ custObjects: { ...snapshot.val() } });
          }
        });
    }
  
    Finalamt = () => {
      var finalamt =
        billamount+parseInt(this.state.assetObjects.shippingRate)
      return finalamt;
    };
    render() {
      const { classes } = this.props;
      return (
        <>
          <div className={classes.root}>
            {/* <Navbar />
            <Sidebar /> */}
            <main className={classes.content} ref={ref} >
              <Document>
                <Page size="A4" style={styles.page}>
                  <View>
                    <Text>
              
              <div style={{ padding: 15 }}>
                <Row>
                  <Col>
                    <Divider style={{ marginLeft: "11rem", marginTop:"2rem" }}>Customer Bill</Divider>
                    
                  </Col>
                </Row>
  
                <Row gutter={24} style={{ marginTop: 32 }}>
                  <Col span={14}>
                    <h3>Unique Trendz</h3>
                    <div>120,chinnakadai Street,</div>
                    <div>Tiruvannamalai - 606601</div>
                    <div>GSTIN: 33AIKPA7720P1Z3</div>
                    <div>MOBILE: 9787965463</div>
                  </Col>
                  <Col span={8} offset={1}>
                    <table>
                      {/* <tr>
                        <th>Invoice # :</th>
                        <td>{this.state.assetObjects.BillNo}</td>
                      </tr> */}
                      <tr>
                        <th>Bill Date :</th>
                        <td>{this.state.assetObjects.Date}</td>
                      </tr>
                    </table>
                  </Col>
                </Row>
              </div>
  
              <Row style={{ marginTop: 48 }}>
                <div>
                  Bill To: <strong>{this.state.assetObjects.CustomerName} ,</strong>
                </div>
                <div> {this.state.assetObjects.Address} ,</div>
                <div>
                  {this.state.assetObjects.District} -{" "}
                  {this.state.assetObjects.Pincode}
                </div>
              </Row>
  
              <card minWidth="75%" >
                <Toolbar />
                <React.Fragment>
                  <Box style={{ marginTop: "-2rem", width: 700 }}>
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
                                      this.state.custObjects[key].Quantity
                                  ))
                                  // eslint-disable-next-line
                                  ,
                                  ( key!=="Total"?
                                    <TableRow hover key={key}>
                                      <TableCell>
                                        {this.state.custObjects[key].Rate}
                                      </TableCell>
                                      <TableCell>Saree</TableCell>
                                      <TableCell>
                                        {this.state.custObjects[key].Quantity}
                                      </TableCell>
                                      <TableCell>
                                        {this.state.custObjects[key].Rate *
                                          this.state.custObjects[key].Quantity}
                                      </TableCell>
                                    </TableRow>:console.log(1)
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
                    <Col span={8} offset={14}>
                      <table>
                        <tr>
                          <th>Total Amount :</th>
                          <td>Rs. {billamount}</td>
                        </tr>
                        <tr>
                          <th>Shipping Rate :</th>
                          <td>Rs. {this.state.assetObjects.shippingRate} </td>
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
        </>
      );
    }
  }
  export default withStyles(useStyles)(SalesBillTemplate);
  