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
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
var spin = 0;
const initialFieldValues = {
  BillNo: "",
  Product:[{ ID: "", Quantity: "", Rate: "", Gst: "" }],
  PartyName: "",
  PartyMobile: "",
  Date: "",
};
var stock=[]

// const product={ProductId:""}
//var spin=0;
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
var billamount=0;
class SalesReturnForm extends Component {
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

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
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
      Product: [...this.state.Product, { ID: "", Quantity: "", Rate: "",Gst:"" }],
    });
  };

  reset = () => {
    this.setState(initialFieldValues);
  };

  handleInputChange = (e) => {
    var { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  //   Fileupload = (e) => {
  //     console.log("fn");
  //     e.preventDefault();
  //     var { name } = e.target;

  //     const file = e.target.files[0];
  //     const storageRef = firebaseDb
  //       .storage()
  //       .ref("Invoice/")
  //       .child(this.state.BillNO);
  //     const fileRef = storageRef.child(file.name);
  //     fileRef.put(file).then((snapshot) => {
  //       console.log("uploaded", file.name);
  //       fileRef.getDownloadURL().then((url) => {
  //         this.setState({
  //           ...this.state,
  //           [name]: url,
  //         });

  //         console.log(url);
  //       });
  //     });
  //   };

  addorEdit = (obj) => {
    var qua = [];
    try {
      for (let i in this.state.Product) {
        console.log(this.state.Product[i].ID);
        console.log(this.state.Product[i].Quantity);
        console.log(this.state.Product.length);
        if (this.state.Product[i].Gst === "Yes") {
          firebaseDb
            .database()
            .ref("Admin/Stock/GST")
    
            .child(obj.Product[i].ID)

            .on("value", (snapshot) => {
              if (snapshot.val() != null) {
                //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

                qua.push({
                  ID: obj.Product[i].ID,
                  Quan:
                    parseInt(snapshot.val().Quantity) +
                    parseInt(obj.Product[i].Quantity),
                  Total:
                    parseInt(snapshot.val().Totalamt) +
                    parseInt(obj.Product[i].Quantity) *
                      parseInt(snapshot.val().PurchaseAmt),
                  Gst: "GST",
                });
              }
            });
        } else {
          firebaseDb
            .database()
            .ref("Admin/Stock/NONGST")
           
          
            .child(obj.Product[i].ID)

            .on("value", (snapshot) => {
              if (snapshot.val() != null) {
                //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

                qua.push({
                  ID: obj.Product[i].ID,
                  Quan:
                    parseInt(snapshot.val().Quantity) +
                    parseInt(obj.Product[i].Quantity),
                  Total:
                    parseInt(snapshot.val().Totalamt) +
                    parseInt(obj.Product[i].Quantity) *
                      parseInt(snapshot.val().PurchaseAmt),
                  Gst: "NONGST",
                });
              }
              console.log(qua);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
    for(let i in this.state.Product){
        
        billamount += parseInt(
          this.state.Product[i].Rate *
            this.state.Product[i].Quantity)
        
      }
      firebaseDb.database().ref("Admin/SalesReturn").child(this.state.BillNo).set(obj);
      firebaseDb.database().ref("Admin/SalesReturn").child(this.state.BillNo).child("Amount").set(billamount);
        billamount=0
    
    firebaseDb.database().ref("Admin/SalesReturn").child(this.state.BillNo).child("initialFieldValues").remove();
    if (spin > 0) {
        for (var x in qua) {
          firebaseDb
            .database()
            .ref("Admin/Stock")
           
            .child(qua[x].Gst)
            .child(qua[x].ID)
            .child("Quantity")
            .set(qua[x].Quan);
  
          firebaseDb
            .database()
            .ref("Admin/Stock")
           
            .child(qua[x].Gst)
            .child(qua[x].ID)
            .child("Totalamt")
            .set(qua[x].Total);
        }
        
      }
     
   };

  handleFormSubmit = (e) => {
    e.preventDefault();
    var qua = [];
    try {
      for (let i in this.state.Product) {
        console.log(this.state.Product[i].ID);
        console.log(this.state.Product[i].Quantity);
        console.log(this.state.Product.length);
        if (this.state.Product[i].Gst === "Yes") {
          firebaseDb
            .database()
            .ref("Admin/Anu/Stock")
    
            .child(this.state.Product[i].ID)

            .on("value", (snapshot) => {
              if (snapshot.val() != null) {
                //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

                qua.push({
                  ID: this.state.Product[i].ID,
                  Quan:
                    parseInt(snapshot.val().Quantity) +
                    parseInt(this.state.Product[i].Quantity),
                  Total:
                    parseInt(snapshot.val().Totalamt) +
                    parseInt(this.state.Product[i].Quantity) *
                      parseInt(snapshot.val().PurchaseAmt),
                  Gst: "Stock",
                });
              }
            });
        } else {
          firebaseDb
            .database()
            .ref("Admin/Anu/NONGSTStock")
           
          
            .child(this.state.Product[i].ID)

            .on("value", (snapshot) => {
              if (snapshot.val() != null) {
                //console.log(parseInt(snapshot.val())-parseInt(obj.Product[i].Quantity))

                qua.push({
                  ID: this.state.Product[i].ID,
                  Quan:
                    parseInt(snapshot.val().Quantity) +
                    parseInt(this.state.Product[i].Quantity),
                  Total:
                    parseInt(snapshot.val().Totalamt) +
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
    for(let i in this.state.Product){
        
        billamount += parseInt(
          this.state.Product[i].Rate *
            this.state.Product[i].Quantity)
        
      }
      firebaseDb.database().ref("Admin/Anu/SalesReturn").child(this.state.BillNo).set({BillNo: this.state.BillNo,
      Product:this.state.Product,
      PartyName: this.state.PartyName,
      PartyMobile: this.state.PartyMobile,
      Date: this.state.Date});
      firebaseDb.database().ref("Admin/Anu/SalesReturn").child(this.state.BillNo).child("Amount").set(billamount);
        billamount=0
    
   
        for (var x in qua) {
          firebaseDb
            .database()
            .ref("Admin/Anu")
           
            .child(qua[x].Gst)
            .child(qua[x].ID)
            .child("Quantity")
            .set(qua[x].Quan);
  
          firebaseDb
            .database()
            .ref("Admin/Anu")
           
            .child(qua[x].Gst)
            .child(qua[x].ID)
            .child("Totalamt")
            .set(qua[x].Total);
        }
        
      
    this.setState({
      initialFieldValues,
    });
    spin=spin+1;
  };

  render() {
    const { classes } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return (
      <>
        <div className={classes.root}>
          <Sidebar />

          <Navbar />
          <main className={classes.content}>
            <Toolbar />
            <React.Fragment>
              <Container
                maxWidth="md"
                style={{ backgroundColor: "#F8F8FF", height: "100vh" }}
              >
                <Typography variant="h6" gutterBottom>
                  <h2>Return Sold Item</h2>
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="PartyName"
                      label="Customer Name"
                      fullWidth
                      value={this.state.PartyName}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="PartyMobile"
                      label="Customer Mobile"
                      fullWidth
                      value={this.state.PartyMobile}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  
                  
                

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type="date"
                      name="Date"
                      label="Return Date"
                      fullWidth
                      value={this.state.Date}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      InputLabelProps={{shrink:true}}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="BillNo"
                      label="Sale-BillNo"
                      fullWidth
                      value={this.state.BillNo}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  
                  
                  {this.state.Product.map((x, i) => {
                    return (
                      <>
                        {/* <p></p>
                    <p>{i}</p> */}
                        <Grid item xs={3}>
                          <TextField
                            required
                            name="ID"
                            label="Product Id"
                            fullWidth
                            value={this.state.Product.ID}
                            autoComplete="off"
                            onChange={(e) => this.handleInputChange1(e, i)}
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <TextField
                            required
                            name="Quantity"
                            label="Quantity"
                            fullWidth
                            value={this.state.Product.Quantity}
                            autoComplete="off"
                            onChange={(e) => this.handleInputChange1(e, i)}
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <TextField
                            required
                            name="Rate"
                            label=" Rate"
                            fullWidth
                            value={this.state.Product[i].Rate}
                            autoComplete="off"
                            onChange={(e) => this.handleInputChange1(e, i)}
                          />
                        </Grid>
                        <Grid item  sm={2}>
                                <label>GST</label>
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
                                    value="NO"
                                    control={<Radio />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </Grid>

                        <Grid>
                          {this.state.Product.length !== 1 && (
                            <Button
                              variant="outlined"
                              className="mr10"
                              color="secondary"
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
                            >
                              Add
                            </Button>
                            // <button onClick={this.handleAddClick}>Add</button>
                          )}
                        </Grid>
                      </>
                    );
                  })}
                  {/* <div style={{ marginTop: 20 }}>{JSON.stringify(this.state.Product)}</div> */}



                  <Grid item xs={12}>
                    
                      <Button
                        variant="contained"
                        color="Primary"
                        onClick={this.handleFormSubmit}
                      >
                        Bill
                      </Button>
                  
                    
                  </Grid>
                  {/* {spin === 2 ? 
                  <>
                  <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    secondaryColor="grey"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  /></>:console.log(spin)} */}
                </Grid>
              </Container>
            </React.Fragment>
          </main>
        </div>
      </>
    );
  }
}
export default withStyles(useStyles)(SalesReturnForm);