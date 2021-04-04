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

const initialFieldValues = {
  BillNo: "",
  Product: [{ ID: "", Quantity: "" }],
  Quantity: "",
  PurchaseAmt: "",
  ReturnPercentage: "",
  Gst: "",
  stockof: "",
};

// const product={ProductId:""}

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
  handleInputChange1 = (e, index) => {
    const { name, value } = e.target;
    const list = [...this.state.Product];
    list[index][name] = value;
    this.setState({ Product: list });
  };

  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    console.log(index)
    const list = [...this.state.Product];
    list.splice(index, 1);
    this.setState({ Product: list });
  };

  // handle click event of the Add button
  handleAddClick = () => {
    this.setState({
      Product: [...this.state.Product, { ID: "", Quantity: "" }],
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
    for(var i=0;i<this.state.Product.length;i++)
    {
      console.log(this.state.Product[i].ID);
      console.log(this.state.Product[i].Quantity)
    }
    // if (this.state.PartyMobile && this.state.PartyName) {
    //   firebaseDb
    //     .database()
    //     .ref("Admin/Parties/")
    //     .child(this.state.PartyMobile)
    //     .child("Purchase")
    //     .child(this.state.BillNO)
    //     .set(obj);
    // } else {
    //   alert("Enter Party Mobile Number");
    // }

    if (this.state.stockof === "Anu") {
      firebaseDb
        .database()
        .ref("Admin/Anu/Stock")
        .child(this.state.ProductId)
        .set(obj);

      var total = this.state.PurchaseAmt * this.state.Quantity;
      firebaseDb
        .database()
        .ref("Admin/Anu/Stock")
        .child(this.state.ProductId)
        .child("Totalamt")
        .set(total);
    } else {
      firebaseDb
        .database()
        .ref("Admin/Aarthi/Stock")
        .child(this.state.ProductId)
        .set(obj);
      var totalamt = this.state.PurchaseAmt * this.state.Quantity;
      firebaseDb
        .database()
        .ref("Admin/AArthi/Stock")
        .child(this.state.ProductId)
        .child("TotalAmt")
        .set(totalamt);
    }

    this.reset();
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addorEdit(this.state);
    this.setState({
      initialFieldValues,
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
                      name="PurchaseAmt"
                      label="Invoice Rate"
                      fullWidth
                      value={this.state.PurchaseAmt}
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
                  <Grid item xs={12} sm={6}>
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
                  {this.state.Product.map((x,i)=>{
                    return(
                    <>
                    {/* <p></p>
                    <p>{i}</p> */}
                    <Grid item >
                    <TextField
                      required
                      name="ID"
                      label="Product Id"
                      fullWidth
                      value={this.state.Product.ID}
                      autoComplete="off"
                      onChange={e => this.handleInputChange1(e, i)}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      required
                      name="Quantity"
                      label="Quantity"
                      fullWidth
                      value={this.state.Product.Quantity}
                      autoComplete="off"
                      onChange={e => this.handleInputChange1(e, i)}
                    />
                  </Grid>
                  <Grid>
                  {this.state.Product.length !== 1 && (
                    <button
                      className="mr10"
                      onClick={() => this.handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                  {this.state.Product.length - 1 === i && (
                    <button onClick={this.handleAddClick}>Add</button>
                  )}
                  </Grid>
                  </>)

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

                  {/* <Grid item xs={12} sm={6}>
                    <label>Lorry Copy</label>
                    <input
                      type="file"
                      name="lorrycopy"
                      onChange={this.Fileupload}
                    />

                    {this.state.warranty_card ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <p></p>
                    )}
                  </Grid> */}

                  <Grid>
                    <Button
                      variant="contained"
                      color="Primary"
                      onClick={this.handleFormSubmit}
                      className={classes.button}
                    >
                      Save
                    </Button>
                    
                  </Grid>
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