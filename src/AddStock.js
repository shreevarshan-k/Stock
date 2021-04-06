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
  BillNo:"",
  ProductId:"",
  Quantity:"",
  PurchaseAmt:"",
  RetailAmt:"",
  stockof:"",


};

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

class AddStock extends Component {
  constructor(props) {
    super(props);
    this.state = initialFieldValues;
  }

    componentDidMount() {
      firebaseDb
        .database()
        .ref("Admin/Anu/Stock")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ studentObjects: { ...snapshot.val() } });
          }
        });

      
    }

  reset = () => {
    this.setState(initialFieldValues);
  };

  handleInputChange = (e) => {
    var { name, value } = e.target;
    if(name==="ProductId"){
      if(value in this.state.studentObjects){
        alert("Product ID" + value + " Already Found");
      }
    }
    
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

        var total=this.state.PurchaseAmt*this.state.Quantity;
        firebaseDb.database().ref("Admin/Anu/Stock").child(this.state.ProductId).child("Totalamt").set(total);
        firebaseDb.database().ref("Admin/Anu/Stock").child(this.state.ProductId).child("studentObjects").remove()

      

    }
    else{
        firebaseDb
        .database()
        .ref("Admin/Aarthi/Stock")
        .child(this.state.ProductId)
        .set(obj);
        var totalamt=this.state.PurchaseAmt*this.state.Quantity;
        firebaseDb.database().ref("Admin/AArthi/Stock").child(this.state.ProductId).child("TotalAmt").set(totalamt);

    }

    
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
                  <h2>Add Stock</h2>
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="BillNo"
                      label="Purchase-BillNo"
                      fullWidth
                      value={this.state.BillNo}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="ProductId"
                      label="ProductID"
                      fullWidth
                      value={this.state.ProductId}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="PurchaseAmt"
                      label="Purchase Rate"
                      fullWidth
                      value={this.state.PurchaseAmt}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="RetailAmt"
                      label="Retail Rate"
                      fullWidth
                      value={this.state.RetailAmt}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Quantity"
                      label="Quantity"
                      fullWidth
                      value={this.state.Quantity}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  
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
export default withStyles(useStyles)(AddStock);
