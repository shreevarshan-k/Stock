import "@firebase/storage";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";

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
//import { Link } from "react-router-dom";
//import Loader from "react-loader-spinner";
import {
  Card,
  CardContent,
 // FormControlLabel,
  //Radio,
  //RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
//import { Col, Row } from "antd";

const initialFieldValues = {
  Product: [{ Date: "", Reason: "", Rate: "" }],
};

// const product={ProductId:""}
var spin = 0;
const drawerWidth = 240;

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

// var billno = 0;

class ExpensenseEntry extends Component {
  constructor(props) {
    super(props);
    this.state = initialFieldValues;
  }

  // componentDidMount() {
  //   firebaseDb
  //     .database()
  //     .ref("Admin/Anu/Sales")
  //     .on("value", (snapshot) => {
  //       if (snapshot.val() != null) {
  //         this.setState({ studentObjects: { ...snapshot.val() } });
  //       }
  //     });

  //   console.log(this.state.studentObjects);
  // }
 
  handleInputChange1 = (e, index) => {
    const { name, value } = e.target;
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

    getDates(start, end) {
       
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        var today = new Date(dt);
    if (today.getDate() < 10 && today.getMonth() < 10) {
      var date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-0" +
        today.getDate();
    } else if (today.getDate() < 10) {
       date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-0" +
        today.getDate();
    } else if (today.getMonth() < 10) {
      date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    }
        arr.push(date);
    }
    return arr;
}

  // handle click event of the Add button
  handleAddClick = () => {
    this.setState({
      Product: [...this.state.Product, { Date: "", Reason: "", Rate: "" }],
    });
  };

  reset = () => {
    this.setState(initialFieldValues);
  };

//   handleInputChange = (e) => {
//     var { name, value } = e.target;

//     if (name === "Date") {
//       var mon = new Date(value).getMonth() + 1;
//       console.log(value);
//       console.log(mon);
      
//     }
//     // catch(error){
//     //   console.log(error);
//     // }

//     this.setState({
//       ...this.state,
//       [name]: value,
//     });
//   };

  addorEdit = (obj) => {
    for (var i=0;i< this.state.Product.length;i++) {
      firebaseDb
        .database()
        .ref("Admin")
        .child(localStorage.getItem("user"))
        .child("Expensense")
        .child(this.state.Product[i].Date).child(this.state.Product[i].Reason).set(this.state.Product[i].Rate);
    }

    //   for (var x in qua) {
    //     firebaseDb
    //       .database()
    //       .ref("Admin")
    //       .child(this.state.stockof)
    //       .child("Stock")
    //       .child(qua[x].ID)
    //       .child("Quantity")
    //       .set(qua[x].Quan);

    //     firebaseDb
    //       .database()
    //       .ref("Admin")
    //       .child(this.state.stockof)
    //       .child("Stock")
    //       .child(qua[x].ID)
    //       .child("Totalamt")
    //       .set(qua[x].Total);
    //   }

    // this.reset();
  };

//   total = () => {
//     var total = 0;
//     for (var i = 0; i < this.state.Product.length; i++) {
//       total += this.state.Product[i].Rate * this.state.Product[i].Quantity;
//     }
//     return total;
//   };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addorEdit(this.state);
    this.setState({
      initialFieldValues,
    });
    spin = spin + 1;
  };

  render() {
    const { classes } = this.props;

    return (
      <>
      {console.log(this.getDates(new Date("2021-04-01"),new Date("2021-05-01")))}
        <div className={classes.root}>
          <Sidebar />

          <Navbar />
          <main className={classes.content}>
            <Toolbar />
            <React.Fragment>
              <Container style={{ backgroundColor: "white", height: "7vh" }}>
                <Typography variant="h6" gutterBottom>
                  <h2>Expensense Entry</h2>
                </Typography>
              </Container>
            </React.Fragment>
            <Card>
              <CardContent>
                <Table id="myTable">
                  <TableHead style={{ backgroundColor: "white" }}>
                    <TableRow>
                      <TableCell>Date </TableCell>

                      <TableCell>Reason</TableCell>

                      <TableCell>Rate</TableCell>
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
                                name="Date"
                                type="date"
                                fullWidth
                                value={this.state.Product.Date}
                                autoComplete="off"
                                onChange={(e) => this.handleInputChange1(e, i)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                variant="outlined"
                                required
                                name="Reason"
                                label="Reason"
                                fullWidth
                                value={this.state.Product.Reason}
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
                                value={this.state.Product.Rate}
                                autoComplete="off"
                                onChange={(e) => this.handleInputChange1(e, i)}
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

            <Grid
              item
              xs={12}
              style={{ marginTop: "1rem", marginLeft: "60rem" }}
            >
              <Button
                variant="contained"
                color="Primary"
                onClick={this.handleFormSubmit}
              >
                Add
              </Button>
              
            </Grid>
          </main>
        </div>
      </>
    );
  }
}
export default withStyles(useStyles)(ExpensenseEntry);
