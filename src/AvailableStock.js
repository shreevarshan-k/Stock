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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button"
import firebaseDb from "./firebase.js";
var amt=[];
var tamt=0;
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

class AvailableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "shree",
      studentObjects: {},
      DealList: {},
      qualList: {},
      rate: "",
      Category:"",
      total:"",
    };
  }

  componentDidMount() {
    
  }
  view=()=>{
    firebaseDb
    .database()
    .ref("Admin/"+this.state.Category).child("Stock")
    .on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.setState({ qualList: { ...snapshot.val() } });
      }
      else{
          this.setState({qualList:{}})
      }
    });}

  amount=()=>{
    tamt=0;
    
    for(let i=0;i<amt.length;i++){
      
      tamt=tamt+amt[i];


    }
    return(tamt)
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
          <main className={classes.content}>
            <card minWidth={1050} ref={ref}>
              <Toolbar />
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  <h2>Purchase List</h2>
                </Typography>
                <Box>
                  <Card>
                    <CardContent>
                      <TextField
                        placeholder="Search By ProductID"
                        variant="outlined"
                        type="text"
                        id="myInput"
                        onKeyUp={() => this.myFunction()}
                      />
                      {/* <pre >      Total:{tamt}</pre> */}
                      
                    
                    <FormControl className={classes.formControl}>
                    
                    
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
                    </FormControl>
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
                                  <TableCell>Product ID</TableCell>

                                  <TableCell>Purchase Price</TableCell>
                                  <TableCell>Retail Price</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Amount of Stock</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.keys(this.state.qualList).map((key) => (
                                  <TableRow hover key={key}>
                                    <TableCell>
                                      {this.state.qualList[key].BillNo}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].ProductId}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].PurchaseAmt}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].RetailAmt}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].Quantity}
                                    </TableCell>
                                    <TableCell>
                                      {this.state.qualList[key].Totalamt}
                                    </TableCell>
                                   
                                    {amt.push(this.state.qualList[key].Totalamt)}
                                    
                                  </TableRow>
                                ))}
                                <TableCell colSpan="4">

                                </TableCell>
                                <TableCell >
                                  Total Amount:
                                </TableCell>
                                <TableCell>
                                  {this.amount()}
                                  {amt=[]}
                                </TableCell>
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
export default withStyles(useStyles)(AvailableList);
