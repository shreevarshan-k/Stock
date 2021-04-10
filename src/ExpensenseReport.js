import {
  Box,
  Card,
  CardContent,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import firebaseDb from "./firebase.js";
import Sidebar from "./Sidebar.js";
import Navbar from "./Navbar.js";
//   var amt=[];
var tamt = 0;
const ref = React.createRef();
// var today = new Date(),
// const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
});
var ex = [];
class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentObjects: {},
      DealList: {},
      qualList: {},
      start: "",
      end: "",
    };
  }

  //   view = () => {
  //     //var month = new Date(this.state.Category).getMonth() + 1;

  //     firebaseDb
  //       .database()
  //       .ref("Admin/Anu/Sales")
  //       .child(this.state.month)
  //       .on("value", (snapshot) => {
  //         if (snapshot.val() != null) {
  //           this.setState({ qualList: { ...snapshot.val() } });
  //           console.log(snapshot.val());
  //         }
  //       });
  //   };

  getDates(start, end) {
    var arr = [];
    for (var dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
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
    this.amount(arr, arr.length);
    //return console.log(arr);
  }

  amount = (arr, length) => {
      ex=[]
    //   tamt = 0;

    //   for (let i in this.state.qualList) {
    //       for(let x in this.state.qualList[i]){
    //     if (x!== "NextBill") {
    //       tamt = tamt + this.state.qualList[i][x];
    //       console.log(this.state.qualList[i])
    //     }

    //   }}
    for (var i = 0; i < length; i++) {
      firebaseDb
        .database()
        .ref("Admin")
        .child(localStorage.getItem("user"))
        .child("Expensense")
        .child(arr[i])
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            ex.push({ ...snapshot.val() });
            console.log(snapshot.val());
          }
        });
      console.log(ex);
      this.setState({qualList:(ex)}) // console.log(i)
    }
    return ex;
    //return console.log();
  };

  myFunction() {
    console.log("fn");
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");

    filter = input.value.toUpperCase();
    console.log(filter);
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  handleInputChange = (e) => {
    var { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Sidebar />
          <Navbar />
          <main className={classes.content}>
            <card minWidth={1050} ref={ref}>
              <Toolbar />
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  <h2>Sales Report</h2>
                </Typography>
                <Box>
                  <Card>
                    <CardContent>
                      {/* <TextField
                          placeholder="Search By ProductID"
                          variant="outlined"
                          type="text"
                          id="myInput"
                          onKeyUp={() => this.myFunction()}
                        /> */}
                      {/* <pre >      Total:{tamt}</pre> */}

                      <FormControl className={classes.formControl}>
                        {/* <TextField
                            name="Category"
                            value={this.state.Category}
                            Lable="Date"
                            type="Date"
                            placeholder="Search By ProductID"
                            variant="outlined"
                            onChange={this.handleInputChange}
                          /> */}

                        {/* <InputLabel>Category</InputLabel>
                        <Select
                          label="Category"
                          s
                          name="Category"
                          value={this.state.Category}
                          // variant="outlined"
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
                        </Select> */}
                      </FormControl>
                      <TextField
                        name="start"
                        type="date"
                        value={this.state.start}
                        Lable="Date"
                        variant="outlined"
                        onChange={this.handleInputChange}
                      />
                      <TextField
                        name="end"
                        type="date"
                        value={this.state.end}
                        Lable="Date"
                        variant="outlined"
                        onChange={this.handleInputChange}
                      />
                      <Button
                        variant="contained"
                        color="Primary"
                        onClick={() =>
                          this.getDates(
                            new Date(this.state.start),
                            new Date(this.state.end)
                          )
                        }
                        className={classes.button}
                      >
                        View
                      </Button>
                    </CardContent>
                  </Card>
                </Box>

                <Grid>
                  <Grid item xs={5} sm={3}></Grid>
                </Grid>
                <div class="position-relative">
                  <div>
                    <div>
                      <Box mt={3}>
                        <Card>
                          <CardContent>
                            {Object.keys(ex).map((key) => (
                              <Typography hover key={key}>
                                <Table id="myTable">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell style={{ fontSize: "25px" }}>
                                        Date
                                      </TableCell>
                                      <TableCell style={{ fontSize: "25px" }}>
                                        Bill No
                                      </TableCell>
                                      <TableCell style={{ fontSize: "25px" }}>
                                        Rate
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {Object.keys(ex[key]).map(
                                      (keyy) => (
                                        <TableRow hover keyy={keyy}>
                                         
                                        
                                              <TableCell>{key}</TableCell>
                                              <TableCell>{keyy}</TableCell>
                                              <TableCell>
                                                {ex[key][keyy]}
                                              </TableCell>
                                            
                                         
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>

                                {/* {amt.push(this.state.qualList[key])} */}
                              </Typography>
                            ))}
                            <TableCell colSpan="1"></TableCell>
                            <TableCell>Total Amount:</TableCell>
                            <TableCell>
                              {this.amount()}
                              {/* {amt=[]} */}
                            </TableCell>
                          </CardContent>
                        </Card>
                      </Box>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </card>
          </main>
        </div>
      </>
    );
  }
}
export default withStyles(useStyles)(SalesReport);
