import {
    Box,
    Card,
    CardContent,
    FormControl,
    IconButton,
   
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core";
  
  import Grid from "@material-ui/core/Grid";
  import { withStyles } from "@material-ui/core/styles";
  import TextField from "@material-ui/core/TextField";
  //import Toolbar from "@material-ui/core/Toolbar";
  import Typography from "@material-ui/core/Typography";
  import { DeleteOutlined, VisibilityOutlined } from "@material-ui/icons";
  import React, { Component } from "react";
import { Link } from "react-router-dom";
  
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
  
  class SalesReturninvoice extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "shree",
        studentObjects: {},
        DealList: {},
        qualList: {},
        rate: "",
      };
    }
  
    componentDidMount() {
      firebaseDb
        .database()
        .ref("Admin/Anu/SalesReturn")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ qualList: { ...snapshot.val() } });
          }
        });
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
  
    Amount = () => {
      var total = 0;
      for (let i in this.state.qualList) {
        total = total + parseInt(this.state.qualList[i].BillAmount);
      }
  
      return total;
    };

    view=(key)=>{
        localStorage.setItem("SalesBill",key)
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
       
            <main className={classes.content}>
              <card minWidth={1050} ref={ref}>
           
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    <h2>Sale Return Invoice</h2>
                  </Typography>
                  <Box>
                    <Card>
                      <CardContent>
                        <TextField
                          placeholder="Search By BillNo"
                          variant="outlined"
                          type="text"
                          id="myInput"
                          onKeyUp={() => this.myFunction()}
                        /><FormControl className={classes.formControl}>
                        {/* <InputLabel htmlFor="standard-adornment-amount">
                         Total Amount
                        </InputLabel> */}
                        {/* <Input
                          id="standard-adornment-amount"
                          value={this.Amount()}
                         
                          startAdornment={
                            <InputAdornment position="start">₹</InputAdornment>
                          }
                        /> */}
                        </FormControl>
                      
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
                              <TableContainer>
                              <Table id="myTable">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Bill No</TableCell>
                                    <TableCell>Party Name</TableCell>
  
                                    <TableCell>Party Number</TableCell>
                                    <TableCell>Purchase Date</TableCell>
                                    <TableCell>Bill Amount</TableCell>
                                   
  
                                    
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Object.keys(this.state.qualList).map((key) => (
                                    <TableRow hover key={key}>
                                      <TableCell>
                                        {this.state.qualList[key].BillNo}
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
                                        {this.state.qualList[key].Amount}
                                       
                                        {/* if  style={{display: "none"}}  is not decleared it will show the index values     */}
                                      </TableCell>
                                     
                                     
  
                                      
                                      <TableCell>
                                          <Link to="/SalesReturnInvoiceTemplate">
                                        <IconButton
                                          color="primary"
                                          aria-label="add an alarm"
                                          onClick={()=>this.view(this.state.qualList[key].BillNo)}
                                        >
                                          <VisibilityOutlined />
                                        </IconButton></Link>
                                      </TableCell>
                                      <TableCell>
                                        <IconButton
                                          color="secondary"
                                          aria-label="add an alarm"
                                        >
                                          <DeleteOutlined />
                                        </IconButton>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                               
                                
                                <TableCell>
                                  {/* {this.Amount()} */}
                           
                                </TableCell>
                              </Table></TableContainer>
                            </CardContent>
                          </Card>
                        </Box>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              </card>
            </main>
  
        </>
      );
    }
  }
  export default withStyles(useStyles)(SalesReturninvoice);