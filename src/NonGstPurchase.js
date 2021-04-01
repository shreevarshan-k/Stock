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
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import firebaseDb from "./firebase.js";

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
});

class NonGstPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "shree",
      studentObjects: {},
      DealList: {},
      qualList: {},
      rate: "",
      Category:"",
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("token"));
    
  }

  myFunction() {
    console.log("fn");
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");

    filter = input.value.toUpperCase();
    console.log(filter);
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
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
    console.log(value)
  
    
    
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  view=()=>{
    firebaseDb
    .database()
    .ref("Admin/"+this.state.Category).child("Purchase").child("NoGST")
    .on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.setState({ qualList: { ...snapshot.val() } });
      }
    });}


  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <main className={classes.content}>
            <card minWidth={1050} ref={ref}>
              <Toolbar />
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  <h2>Purchase List</h2>
                </Typography>
                <Box mt={3}>
                  <Card>
                    <CardContent>
                      <TextField
                        placeholder="Search By BillNo"
                        variant="outlined"
                        type="text"
                        id="myInput"
                        onKeyUp={() => this.myFunction()}
                      />
                      <InputLabel>Category</InputLabel>
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
                      </Select>
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
                            <Table id="myTable">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Bill No</TableCell>
                                  <TableCell>Party Name</TableCell>

                                  <TableCell>Party Number</TableCell>
                                  <TableCell>Purchase Date</TableCell>
                                  <TableCell>Bill Amount</TableCell>
                                  <TableCell>Transaction Id</TableCell>

                                  <TableCell>Invoice</TableCell>

                                  <TableCell>Lorry Copy</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.keys(this.state.qualList).map((key) => (
                                  <TableRow hover key={key}>
                                    <TableCell>
                                      {this.state.qualList[key].BillNO}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].PartyName}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].PartyMobile}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].Date}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].BillAmount}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].Transacid}
                                    </TableCell>
                                    <TableCell>
                                      <a
                                        href={this.state.qualList[key].invoice}
                                        target="blank"
                                      >
                                        Invoice
                                      </a>
                                    </TableCell>

                                    <TableCell>
                                      <a
                                        href={
                                          this.state.qualList[key].lorrycopy
                                        }
                                        target="blank"
                                      >
                                        LorryCopy
                                      </a>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
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
export default withStyles(useStyles)(NonGstPurchase);
