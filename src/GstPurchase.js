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

  import Grid from "@material-ui/core/Grid";
  import { withStyles } from "@material-ui/core/styles";
  import TextField from "@material-ui/core/TextField";
  import Toolbar from "@material-ui/core/Toolbar";
  import Typography from "@material-ui/core/Typography";
  import React, { Component } from "react";
  
  import firebaseDb from "./firebase.js";
 
  var amt=[];
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
  
  class GstPurchase extends Component {
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
        .ref("Admin/Anu/Purchase/GST")
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
  
  Amount=()=>{
    var total=0;
    for(var i=0;i<amt.length;i++){
      total=total+parseInt(amt[i]);
      console.log(amt[i])
    }
   return(total)
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
                          placeholder="Search By BillNo"
                          variant="outlined"
                          type="text"
                          id="myInput"
                          onKeyUp={() => this.myFunction()}
                        />
                      </CardContent>
                      Total Amount : {this.Amount()}
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
                                  {Object.keys(this.state.qualList).map((key) =>
                                  
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
                                            {amt.push(this.state.qualList[key].BillAmount)}
                                          </TableCell>
                                          <TableCell>
                                            {this.state.qualList[key].Transacid}
                                          </TableCell>
                                          <TableCell>
                                              <a href={this.state.qualList[key].invoice} target="blank">Invoice</a>
                                           
                                          </TableCell>
  
                                          <TableCell>
                                          <a href={this.state.qualList[key].lorrycopy} target="blank">LorryCopy</a>

                                          </TableCell>
  
                                      
  
                                        
                                        </TableRow>
                                      
                                    
                                  )}
                                </TableBody>
                                Total Amount :{this.Amount()}
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
  export default withStyles(useStyles)(GstPurchase);
  