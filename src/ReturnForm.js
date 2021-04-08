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
import Loader from "react-loader-spinner";

const initialFieldValues = {
  BillNo: "",
  Product: [{ ID: "", Quantity: "", Rate: "" }],
  Quantity: "",
  PurchaseAmt: "",
  ReturnPercentage: "",
  Gst: "",
  stockof: "",
  PartyName: "",
  Address: "",
  District: "",
  Pincode: "",
  PartyMobile: "",
  Date: "",
};

// const product={ProductId:""}
var spin=0;
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

class ReturnForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialFieldValues;
  }

  //   componentDidMount() {
  //     firebaseDb
  //       .database()
  //       .ref("Anu/Pruchase")
  //       .on("value", (snapshot) => {
  //         if (snapshot.val() != null) {
  //           this.setState({ studentObjects: { ...snapshot.val() } });
  //         }
  //       });

  //     console.log(this.state.studentObjects);
  //   }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }
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

  // handle click event of the Add button
  handleAddClick = () => {
    this.setState({
      Product: [...this.state.Product, { ID: "", Quantity: "", Rate: "" }],
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
    var quantity = [];
    for (let i in this.state.Product) {
      console.log(this.state.Product[i].ID);
      console.log(this.state.Product[i].Quantity);
      console.log(this.state.Product.length);
      firebaseDb
        .database()
        .ref("Admin")
        .child(this.state.stockof)
        .child("Stock")
        .child(obj.Product[i].ID)
        .child("Quantity")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            //this.setState({ PartyName: snapshot.val() });
            console.log(snapshot.val());

            quantity.push(snapshot.val() - obj.Product[i].Quantity);
          }
        });
      console.log(quantity);

      // var qua=[];
      // for(var x=0;x<this.state.Product.length;x++){
      //   qua.push(quantity[x]-this.state.Product[x].Quantity)

      // }
      // console.log(qua);
    }

    // this.reset();
    //firebaseDb.database().ref("Admin/Return/Products").set(this.state.Product)
    firebaseDb.database().ref("Admin/Return").set(obj);
    for (var X in quantity) {
      firebaseDb
        .database()
        .ref("Admin/Return/Balance")
        .child(X)
        .set(quantity[X]);
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addorEdit(this.state);
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
                maxWidth="sm"
                style={{ backgroundColor: "#F8F8FF", height: "100vh" }}
              >
                <Typography variant="h6" gutterBottom>
                  <h2>Return Item</h2>
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="PartyName"
                      label="PartyName"
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
                      label="PartyMobile"
                      fullWidth
                      value={this.state.PartyMobile}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Date"
                      label="Return Date"
                      fullWidth
                      value={this.state.Date}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="BillNo"
                      label="Purchase-InvoiceNo"
                      fullWidth
                      value={this.state.BillNo}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="ReturnPercentage"
                      label="Return Percentage"
                      fullWidth
                      value={this.state.ReturnPercentage}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="Gst"
                      label="GST Tax"
                      fullWidth
                      value={this.state.Gst}
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

                        <Grid item xs={3}>
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
                            value={this.state.Product.Rate}
                            autoComplete="off"
                            onChange={(e) => this.handleInputChange1(e, i)}
                          />
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

                  <Grid item xs={12} sm={6}>
                    <InputLabel>Puchased By</InputLabel>

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

                  <Grid item xs={12}>
                    
                      <Button
                        variant="contained"
                        color="Primary"
                        onClick={this.handleFormSubmit}
                      >
                        Bill
                      </Button>
                  
                    (Double Click the button)
                  </Grid>
                  {spin === 2 ? 
                  <>
                  <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    secondaryColor="grey"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  /><Link to="/ReturnBill">bill</Link></>:console.log(spin)}
                </Grid>
              </Container>
            </React.Fragment>
          </main>
        </div>
      </>
    );
  }
}
export default withStyles(useStyles)(ReturnForm);
