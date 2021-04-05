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
import Pdf from "react-to-pdf";

//import Pdf from "react-to-pdf";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
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
class BillGenerate extends Component {
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
      .ref("Admin/Return")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ assetObjects: { ...snapshot.val() } });
        }
      });
    firebaseDb
      .database()
      .ref("Admin/Return/Product")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ custObjects: { ...snapshot.val() } });
        }
      });
  }

  Finalamt = () => {
    var finalamt =
      billamount -
      (billamount * this.state.assetObjects.ReturnPercentage) / 100;
    finalamt = finalamt + (finalamt * this.state.assetObjects.Gst) / 100;
    return finalamt;
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Navbar />
          <Sidebar />
          <main className={classes.content} ref={ref} >
            
            <div style={{ padding: 20 }}>
              <Row>
                <Col>
                  <Divider style={{ marginLeft: "10rem", marginTop:"2rem" }}>Invoice</Divider>
                  
                </Col>
              </Row>

              <Row gutter={24} style={{ marginTop: 32 }}>
                <Col span={8}>
                  <h3>Unique Trendz</h3>
                  <div>120,chinnakadai,Street</div>
                  <div>Tiruvannamalai - 606601</div>
                  <div>9787965463</div>
                </Col>
                <Col span={8} offset={1}>
                  <table>
                    <tr>
                      <th>Invoice # :</th>
                      <td>{this.state.assetObjects.BillNo}</td>
                    </tr>
                    <tr>
                      <th>Return Date :</th>
                      <td>{this.state.assetObjects.Date}</td>
                    </tr>
                  </table>
                </Col>
              </Row>
            </div>

            <Row style={{ marginTop: 48 }}>
              <div>
                Bill To: <strong>{this.state.assetObjects.PartyName} ,</strong>
              </div>
              <div> {this.state.assetObjects.Address}</div>
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
                                )),
                                (
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
                                  </TableRow>
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
                  <Col span={8} offset={9}>
                    <table>
                      <tr>
                        <th>Total Amount :</th>
                        <td>Rs. {billamount}</td>
                      </tr>
                      <tr>
                        <th>Discount :</th>
                        <td>{this.state.assetObjects.ReturnPercentage} %</td>
                      </tr>
                      <tr>
                        <th>GST :</th>
                        <td>{this.state.assetObjects.Gst} %</td>
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
            
            </main>
            <Pdf targetRef={ref} filename={this.state.Leadobj}>
                  {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                </Pdf>
         
        </div>
      </>
    );
  }
}
export default withStyles(useStyles)(BillGenerate);
