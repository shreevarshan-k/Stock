import {
    Box,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Avatar,
  } from "@material-ui/core";
  import Button from "@material-ui/core/Button";
  import Grid from "@material-ui/core/Grid";
  import { withStyles } from "@material-ui/core/styles";
  import TextField from "@material-ui/core/TextField";
  import Toolbar from "@material-ui/core/Toolbar";
  import Typography from "@material-ui/core/Typography";
  import React, { Component } from "react";
  import { Link } from "react-router-dom";
  import firebaseDb from "./firebase.js";
  import Navbar from "./Navbar";
  import Sidebar from "./Sidebar";
  

   var date;

  
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
  
  class PartiesList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Category: "",
        studentObjects: {},
        partieslist: {},
        rate: "",
      };
    }
  
    componentDidMount() {
      firebaseDb
        .database()
        .ref("Admin/Parties")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ partieslist: { ...snapshot.val() } });
          }
        });
    }
  
    Save = (key) => {
      firebaseDb
        .database()
        .ref("Admin/Products/")
        .child(this.state.Category)
        .child(key)
        .update({ rate: this.state.rate });
  
      firebaseDb
        .database()
        .ref("Admin/Timeline/")
        .child(date)
        .push("Admin Updated the rate of the " + key + " to " + this.state.rate);
    };
  
    myFunction() {
      console.log("fn");
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
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
  
    DeleteAsset = (key) => {
      console.log(this.state.Category);
      console.log(key);
  
      if (window.confirm("Do you want to delete product " + key + "  ?")) {
        firebaseDb
          .database()
          .ref("Admin/Products/")
          .child(this.state.Category)
  
          .child(key)
          .remove();
  
        firebaseDb
          .database()
          .ref("Admin/Timeline/")
          .child(date)
          .push("Admin Deleted the " + key);
      }
    };
  
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
          {console.log("token")}
          <div className={classes.root}>
            
            <Sidebar />
            <Navbar />
            <main className={classes.content}>
              <card minWidth={1050}>
                <Toolbar />
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    <h2>Parties</h2>
                  </Typography>
                  <Box>
                    <Card>
                      <CardContent>
                        <TextField
                          placeholder="Search By Mobile Number"
                          variant="outlined"
                          type="text"
                          id="myInput"
                          onKeyUp={() => this.myFunction()}
                        />
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
                                    <TableCell></TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile Number</TableCell>
                                    <TableCell>Alternate Mobile</TableCell>
                                    <TableCell>GST</TableCell>
  
                                    <TableCell>Address</TableCell>
                                    <TableCell>Pincode</TableCell>
                                    <TableCell>Purchase Details</TableCell>
  
                                    <TableCell>Action</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Object.keys(this.state.partieslist).map(
                                    (key) => (
                                      <TableRow hover key={key}>                                                
                                        <TableCell><Avatar/></TableCell>
                                        <TableCell>
                                          {this.state.partieslist[key].PartyName}
                                        </TableCell>
                                        <TableCell>
                                          {this.state.partieslist[key].Mobile}
                                        </TableCell>
                                        <TableCell>
                                          {this.state.partieslist[key].Altmobile}
                                        </TableCell>
                                        <TableCell>
                                          {this.state.partieslist[key].Gst}
                                        </TableCell>
                                        <TableCell>
                                          {this.state.partieslist[key].Address}
                                        </TableCell>
                                        <TableCell>
                                          {this.state.partieslist[key].pincode}
                                        </TableCell>
                                      
                                        <TableCell>
                                        <Link
                                            to="/CustomerDeals"
                                            onClick={() =>
                                              localStorage.setItem(
                                                "Cus",
                                                this.state.partieslist[key]
                                                  .Mobile
                                              )
                                            }
                                          >
                                            Purchases
                                          </Link>
                                        </TableCell>
  
                                        {/* <TableCell>
                                          <InputLabel>Category</InputLabel>
  
                                          <Select
                                            label="Category
                                            name="Category"
                                            value={this.state.Category}
                                            onChange={this.handleInputChange}
                                            fullWidth
                                          >
                                            {" "}
                                            {Object.keys(
                                              this.state.studentObjects
                                            ).map((key) => (
                                              <MenuItem key={key} value={key}>
                                                {key}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        </TableCell> */}
                                        {/* <TableCell>
                                          <Button
                                            variant="contained"
                                            color="Primary"
                                            className={classes.button}
                                            //onClick={() => this.Save(key)}
                                          >
                                            Allot
                                          </Button>
                                        </TableCell> */}
  
                                        <TableCell>
                                          <Button
                                            variant="contained"
                                            color="Primary"
                                            className={classes.button}
                                            onClick={() => this.DeleteAsset(key)}
                                          >
                                            Delete
                                          </Button>
  
                                          {/* {localStorage.getItem("token")=='admin'?
                                    <Button
                                      variant="contained"
                                      color="Primary"
                                      className={classes.button}
                                      onClick={() => this.DeleteAsset(key)}
                                    >
                                      Delete
                                    </Button>:<h1></h1>
                                  } */}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
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
  export default withStyles(useStyles)(PartiesList);
  