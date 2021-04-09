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

class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "shree",
      studentObjects: {},
      DealList: {},
      qualList: {},
      rate: "",
      Category: "",
      total: "",
      month: "",
    };
  }

  componentDidMount() {}

  view = () => {
    //var month = new Date(this.state.Category).getMonth() + 1;

    firebaseDb
      .database()
      .ref("Admin/Anu/Sales")
      .child(this.state.month)
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ qualList: { ...snapshot.val() } });
          console.log(snapshot.val());
        } else {
          this.setState({ qualList: {} });
        }
      });
  };

  amount = () => {
    tamt = 0;
    

    for (let i in this.state.qualList) {
        for(let x in this.state.qualList[i]){
      if (x!== "NextBill") {
        tamt = tamt + this.state.qualList[i][x];
        console.log(this.state.qualList[i])
      }
    

      
    }}
   
    
    return (parseInt(tamt) );
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
                          Enter the Month in Numeric Format "eg : 4" 
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
                        name="month"
                        value={this.state.month}
                        Lable="Date"
                        placeholder="Enter Month eg: 4 or 10"
                        variant="outlined"
                        onChange={this.handleInputChange}
                      />
                      <Button
                        variant="contained"
                        color="Primary"
                        onClick={this.view}
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
                            {Object.keys(this.state.qualList).map((key) => (
                              <Typography hover key={key}>
                                <Table id="myTable">
                                  
                                    <TableHead>
                                      <TableRow>
                                        <TableCell style={{fontSize:"25px"}}>Date</TableCell>
                                        <TableCell style={{fontSize:"25px"}}>Bill No</TableCell>
                                        <TableCell style={{fontSize:"25px"}}>Rate</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {Object.keys(this.state.qualList[key]).map(
                                      (keyy) => (
                                        <TableRow hover keyy={keyy}>
                                          {keyy !== "NextBill" ? (
                                            <>
                                              <TableCell>{key}</TableCell>
                                              <TableCell>{keyy}</TableCell>
                                              <TableCell>
                                                {this.state.qualList[key][keyy]}
                                              </TableCell>
                                            </>
                                          ) : (
                                            console.log("hi")
                                          )}
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
