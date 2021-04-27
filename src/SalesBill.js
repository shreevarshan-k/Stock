import "@firebase/storage";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import useStyles from "./UseStyle";
//import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { Component } from "react";
import firebaseDb from "./firebase.js";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
//import Loader from "react-loader-spinner";
import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Col, Row } from "antd";

const initialFieldValues = {
  CustomerName: "",
  Product: [{ ID: "", Quantity: "", Rate: "", Gst: "" }],
  stockof: "",
  Address: "",
  District: "",
  Pincode: "",
  CustomerMobile: "",
  Date: "",
  shippingRate: "",
  GST: "",
};

// const product={ProductId:""}
var spin = 0;
const drawerWidth = 240;
var stock = [];
const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
  },
});

var billno = 0;

class ReturnForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialFieldValues;
  }

  componentDidMount() {
    var gststock = [];
    var nonstock = [];

    firebaseDb
      .database()
      .ref("Admin")
      .child(localStorage.getItem("user"))
      .child("Stock")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          gststock = snapshot.val();
          this.setState({ gst: { ...snapshot.val() } });
        }
      });
    firebaseDb
      .database()
      .ref("Admin")
      .child(localStorage.getItem("user"))
      .child("NONGSTStock")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          nonstock = snapshot.val();
          this.setState({ Nongst: { ...snapshot.val() } });
        }
      });
    for (let i in gststock) {
      stock.push(gststock[i]);
    }
    for (let i in nonstock) {
      stock.push(nonstock[i]);
    }
    this.setState({ studentObjects: stock });
  }

  handleInputChange1 = (e, index) => {
    const { name, value } = e.target;
    if (name === "ID") {
      try {
        const list = [...this.state.Product];
        list[index]["Rate"] = this.state.gst[value].RetailAmt;
        this.setState({ Product: list });
        if (this.state.gst[value].RetailAmt) {
          const list = [...this.state.Product];
          list[index]["Gst"] = "Yes";
          this.setState({ Product: list });
        }
      } catch (error) {
        console.log("not Gst product");
      }
      try {
        const list = [...this.state.Product];
        list[index]["Rate"] = this.state.Nongst[value].RetailAmt;
        this.setState({ Product: list });
        if (this.state.Nongst[value].RetailAmt) {
          const list = [...this.state.Product];
          list[index]["Gst"] = "No";
          this.setState({ Product: list });
        }
      } catch (error) {
        console.log("Gst product");
      }
    }
    const list = [...this.state.Product];
    list[index][name] = value;
    this.setState({ Product: list });
  };

  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    console.log(index);
    const list = [...this.state.Product];
    list.splice(index, 1);
    this.setState({ Product: list });
  };

  // handle click event of the Add button
  handleAddClick = () => {
    this.setState({
      Product: [
        ...this.state.Product,
        { ID: "", Quantity: "", Rate: "", Gst: "" },
      ],
    });
  };

  reset = () => {
    this.setState(initialFieldValues);
  };

  handleInputChange = (e) => {
    var { name, value } = e.target;

    if (name === "Date") {
     
      firebaseDb
        .database()
        .ref("Admin/Anu/Sales/NextBill")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            billno = snapshot.val();
            console.log(billno);
          } else {
            billno = "1";
            console.log(billno);
          }
        });
    }
    // catch(error){
    //   console.log(error);
    // }

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  // addorEdit = (obj) => {
  //   var month = new Date(this.state.Date).getMonth() + 1;

  //   var qua = [];
  //   try {
  //     for (let i in this.state.Product) {
  //       console.log(this.state.Product[i].ID);
  //       console.log(this.state.Product[i].Quantity);
  //       console.log(this.state.Product.length);
  //       if (this.state.Product[i].Gst === "Yes") {
  //         firebaseDb
  //           .database()
  //           .ref("Admin")
  //           .child(this.state.stockof)
  //           .child("Stock")
  //           .child(obj.Product[i].ID)

  //           .on("value", (snapshot) => {
  //             if (snapshot.val() != null) {
  //               //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

  //               qua.push({
  //                 ID: obj.Product[i].ID,
  //                 Quan:
  //                   parseInt(snapshot.val().Quantity) -
  //                   parseInt(obj.Product[i].Quantity),
  //                 Total:
  //                   parseInt(snapshot.val().Totalamt) -
  //                   parseInt(obj.Product[i].Quantity) *
  //                     parseInt(snapshot.val().PurchaseAmt),
  //                 Gst: "Stock",
  //               });
  //             }
  //           });
  //       } else {
  //         firebaseDb
  //           .database()
  //           .ref("Admin")
  //           .child(this.state.stockof)
  //           .child("NONGSTStock")
  //           .child(obj.Product[i].ID)

  //           .on("value", (snapshot) => {
  //             if (snapshot.val() != null) {
  //               //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

  //               qua.push({
  //                 ID: obj.Product[i].ID,
  //                 Quan:
  //                   parseInt(snapshot.val().Quantity) -
  //                   parseInt(obj.Product[i].Quantity),
  //                 Total:
  //                   parseInt(snapshot.val().Totalamt) -
  //                   parseInt(obj.Product[i].Quantity) *
  //                     parseInt(snapshot.val().PurchaseAmt),
  //                 Gst: "NONGSTStock",
  //               });
  //             }
  //             console.log(qua);
  //           });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   if (spin > 0) {
  //     for (var x in qua) {
  //       firebaseDb
  //         .database()
  //         .ref("Admin")
  //         .child(this.state.stockof)
  //         .child(qua[x].Gst)
  //         .child(qua[x].ID)
  //         .child("Quantity")
  //         .set(qua[x].Quan);

  //       firebaseDb
  //         .database()
  //         .ref("Admin")
  //         .child(this.state.stockof)
  //         .child(qua[x].Gst)
  //         .child(qua[x].ID)
  //         .child("Totalamt")
  //         .set(qua[x].Total);
  //     }
  //   }

  //   // this.reset();

  //   console.log(month);
  //   firebaseDb
  //     .database()
  //     .ref("Admin")
  //     .child(this.state.stockof)
  //     .child("Sales")
  //     .child(this.state.Date)
  //     .child(billno)
  //     .set(this.total());
  //   if (spin === 1) {
  //     firebaseDb
  //       .database()
  //       .ref("Admin")
  //       .child(this.state.stockof)
  //       .child("Sales")
  //       .child("NextBill")
  //       .set(parseInt(billno) + parseInt(1));
  //     firebaseDb
  //       .database()
  //       .ref("Admin")
  //       .child(this.state.stockof)
  //       .child("Bills")
  //       .child(this.state.Date)
  //       .child(billno)
  //       .set({
  //         CustomerName: this.state.CustomerName,
  //         Product: this.state.Product,

  //         Address: this.state.Address,
  //         District: this.state.District,
  //         Pincode: this.state.Pincode,
  //         CustomerMobile: this.state.CustomerMobile,
  //         Date: this.state.Date,
  //         shippingRate: this.state.shippingRate,
  //       });
  //   }
  //   firebaseDb.database().ref("Admin/bill").set({
  //     CustomerName: this.state.CustomerName,
  //     Product: this.state.Product,

  //     Address: this.state.Address,
  //     District: this.state.District,
  //     Pincode: this.state.Pincode,
  //     CustomerMobile: this.state.CustomerMobile,
  //     Date: this.state.Date,
  //     shippingRate: this.state.shippingRate,
  //   });
  //   firebaseDb.database().ref("Admin/bill/Product/Total").remove();

  //   try {
  //     firebaseDb.database().ref("Admin/bill/initialFieldValues").remove();
  //     firebaseDb
  //       .database()
  //       .ref("Admin")
  //       .child(this.state.stockof)
  //       .child("Bills")
  //       .child(this.state.Date)
  //       .child(billno)
  //       .child("initialFieldValues")
  //       .remove();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  total = () => {
    var total = 0;
    for (var i = 0; i < this.state.Product.length; i++) {
      total += this.state.Product[i].Rate * this.state.Product[i].Quantity;
    }
    return total;
  };

  handleFormSubmit = () => {
   
    var month = new Date(this.state.Date).getMonth() + 1;

    var qua = [];
    try {
      for (let i in this.state.Product) {
        console.log(this.state.Product[i].ID);
        console.log(this.state.Product[i].Quantity);
        console.log(this.state.Product.length);
        if (this.state.Product[i].Gst === "Yes") {
          firebaseDb
            .database()
            .ref("Admin")
            .child(this.state.stockof)
            .child("Stock")
            .child(this.state.Product[i].ID)

            .on("value", (snapshot) => {
              if (snapshot.val() != null) {
                //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

                qua.push({
                  ID: this.state.Product[i].ID,
                  Quan:
                    parseInt(snapshot.val().Quantity) -
                    parseInt(this.state.Product[i].Quantity),
                  Total:
                    parseInt(snapshot.val().Totalamt) -
                    parseInt(this.state.Product[i].Quantity) *
                      parseInt(snapshot.val().PurchaseAmt),
                  Gst: "Stock",
                });
              }
            });
        } else {
          firebaseDb
            .database()
            .ref("Admin")
            .child(this.state.stockof)
            .child("NONGSTStock")
            .child(this.state.Product[i].ID)

            .on("value", (snapshot) => {
              if (snapshot.val() != null) {
                //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

                qua.push({
                  ID: this.state.Product[i].ID,
                  Quan:
                    parseInt(snapshot.val().Quantity) -
                    parseInt(this.state.Product[i].Quantity),
                  Total:
                    parseInt(snapshot.val().Totalamt) -
                    parseInt(this.state.Product[i].Quantity) *
                      parseInt(snapshot.val().PurchaseAmt),
                  Gst: "NONGSTStock",
                });
              }
              console.log(qua);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
   
      for (var x in qua) {
        firebaseDb
          .database()
          .ref("Admin")
          .child(this.state.stockof)
          .child(qua[x].Gst)
          .child(qua[x].ID)
          .child("Quantity")
          .set(qua[x].Quan);

        firebaseDb
          .database()
          .ref("Admin")
          .child(this.state.stockof)
          .child(qua[x].Gst)
          .child(qua[x].ID)
          .child("Totalamt")
          .set(qua[x].Total);
      }
    

    // this.reset();

    console.log(month);
    firebaseDb
      .database()
      .ref("Admin")
      .child(this.state.stockof)
      .child("Sales")
      .child(this.state.Date)
      .child(billno)
      .set(this.total());
   
      firebaseDb
        .database()
        .ref("Admin")
        .child(this.state.stockof)
        .child("Bills")
        .child(this.state.Date)
        .child(billno)
        .set({ CustomerName: this.state.CustomerName,
          Product: this.state.Product,
    
          Address: this.state.Address,
          District: this.state.District,
          Pincode: this.state.Pincode,
          CustomerMobile: this.state.CustomerMobile,
          Date: this.state.Date,
          shippingRate: this.state.shippingRate  });
    
    firebaseDb.database().ref("Admin/bill").set({CustomerName: this.state.CustomerName,
      Product: this.state.Product,

      Address: this.state.Address,
      District: this.state.District,
      Pincode: this.state.Pincode,
      CustomerMobile: this.state.CustomerMobile,
      Date: this.state.Date,
      shippingRate: this.state.shippingRate });
    firebaseDb.database().ref("Admin/bill/Product/Total").remove();
    
    firebaseDb
    .database()
    .ref("Admin")
    .child(this.state.stockof)
    .child("Sales")
    .child("NextBill")
    .set(parseInt(billno) + parseInt(1));

    
    this.setState({
      initialFieldValues,
    });
    spin = spin + 1;
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Sidebar />

          <Navbar />
          <main className={classes.content}>
            <Toolbar />
            <React.Fragment>
              <Container style={{ backgroundColor: "white", height: "30vh" }}>
                <Typography variant="h6" gutterBottom>
                  <h2>Bill</h2>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      name="CustomerName"
                      label="Customer Name"
                      fullWidth
                      value={this.state.PartyName}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      name="CustomerMobile"
                      label="Customer Mobile"
                      fullWidth
                      value={this.state.PartyMobile}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={7}>
                    <TextField
                      required
                      name="Address"
                      label="Address"
                      fullWidth
                      value={this.state.Address}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      name="District"
                      label="District"
                      fullWidth
                      value={this.state.District}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      name="Pincode"
                      label="Pincode"
                      fullWidth
                      value={this.state.Pincode}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <InputLabel>Date</InputLabel>
                    <TextField
                      required
                      type="Date"
                      name="Date"
                      fullWidth
                      value={this.state.Date}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      name="shippingRate"
                      label="Shipping Rate"
                      fullWidth
                      value={this.state.shippingRate}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel>Stock of</InputLabel>

                    <Select
                      label="stockof"
                      name="stockof"
                      value={this.state.stockof}
                      onChange={this.handleInputChange}
                      fullWidth
                    >
                      {" "}
                      <MenuItem key={"Anu"} value={"Anu"}>
                        {"Anu"}
                      </MenuItem>
                      <MenuItem key={"Aarthi"} value={"Aarthi"}>
                        {"Aarthi"}
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Container>
            </React.Fragment>
            <Card>
              <CardContent>
                <Table id="myTable">
                  <TableHead style={{ backgroundColor: "white" }}>
                    <TableRow>
                      <TableCell>Product ID </TableCell>

                      <TableCell>Quantity</TableCell>

                      <TableCell>Rate</TableCell>
                      <TableCell>GST</TableCell>
                      <TableCell>Total</TableCell>

                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  {this.state.Product.map((x, i) => {
                    return (
                      <>
                        {/* <p></p>
                    <p>{i}</p> */}
                        <TableBody>
                          <TableRow hover>
                            <TableCell>
                              <TextField
                                variant="outlined"
                                required
                                name="ID"
                                label="Product Id"
                                fullWidth
                                value={this.state.Product.ID}
                                autoComplete="off"
                                onChange={(e) => this.handleInputChange1(e, i)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                variant="outlined"
                                required
                                name="Quantity"
                                label="Quantity"
                                fullWidth
                                value={this.state.Product.Quantity}
                                autoComplete="off"
                                onChange={(e) => this.handleInputChange1(e, i)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                variant="outlined"
                                required
                                name="Rate"
                                label=" Rate"
                                fullWidth
                                value={this.state.Product[i].Rate}
                                autoComplete="off"
                                onChange={(e) => this.handleInputChange1(e, i)}
                              />
                            </TableCell>
                            <TableCell>
                              <Grid item xs={12} sm={3}>
                                <pre></pre>

                                <RadioGroup
                                  aria-label="gender"
                                  name="Gst"
                                  value={this.state.Product[i].Gst}
                                  onChange={(e) =>
                                    this.handleInputChange1(e, i)
                                  }
                                >
                                  <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </Grid>
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={
                                  // eslint-disable-next-line
                                  (this.state.Product.Total =
                                    this.state.Product[i].Quantity *
                                    this.state.Product[i].Rate)
                                }
                                id="outlined-basic"
                                variant="outlined"
                                name="Total"
                                // onChange={(e) => this.handleInputChange2(e, i)}
                              />
                            </TableCell>

                            <Grid>
                              {this.state.Product.length !== 1 && (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  className="mr10"
                                  style={{ marginTop: "1rem" }}
                                  onClick={() => this.handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                                // <button
                                //   className="mr10"
                                //   onClick={() => this.handleRemoveClick(i)}
                                // >
                                //   Remove
                                // </button>
                              )}
                              {this.state.Product.length - 1 === i && (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={this.handleAddClick}
                                  style={{
                                    marginTop: "1rem",
                                    marginLeft: "1rem",
                                  }}
                                >
                                  Add
                                </Button>
                                // <button onClick={this.handleAddClick}>Add</button>
                              )}
                            </Grid>
                          </TableRow>
                        </TableBody>
                      </>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>
                    {JSON.stringify(this.state.Product)}
                  </div> */}
                </Table>
              </CardContent>
            </Card>
            <Row style={{ marginTop: 48 }}>
              <Col span={8} offset={15}>
                <table>
                  <tr>
                    <th>Total Amount :</th>
                    <td>{this.total()}</td>
                  </tr>
                  <tr>
                    <th>Shipping Rate:</th>
                    <td>{this.state.shippingRate}</td>
                  </tr>
                  <tr>
                    <th>Nett Total :</th>
                    <td>
                      {parseInt(this.total()) +
                        parseInt(this.state.shippingRate)}
                    </td>
                  </tr>
                  {/* <tr>
                        <th>Nett Total :</th>
                        <td>Rs. 100</td>
                      </tr> */}
                </table>
              </Col>
            </Row>
            <Grid
              item
              xs={12}
              style={{ marginTop: "1rem", marginLeft: "60rem" }}
            >
              <Link to="/SalesBillTemplate">
              <Button
                variant="contained"
                color="Primary"
                onClick={this.handleFormSubmit}
              >
                Bill
              </Button>
              </Link>
             
            </Grid>
          </main>
        </div>
      </>
    );
  }
}
export default withStyles(useStyles)(ReturnForm);
