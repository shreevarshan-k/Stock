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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { Component } from "react";
import firebaseDb from "./firebase.js";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const initialFieldValues = {
  PartyMobile: "",
  PartyName: "",
  BillNO: "",
  BillAmount: "",
  Date: "",
  Transacid: "",
  Gst: "",
  Invoice: "",
  lorrycopy: "",
  purchaseby: "",
  lorryEx: "",
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

class Form extends Component {
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

  reset = () => {
    this.setState(initialFieldValues);
  };

  handleInputChange = (e) => {
    var { name, value } = e.target;
    if (name === "PartyMobile") {
      //Add the length in the if condition to solve the error
      firebaseDb
        .database()
        .ref("Admin/Parties")
        .child(value)
        .child("PartyName")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ PartyName: snapshot.val() });
            console.log(snapshot.val());
            console.log(this.state.PartyName);
          }
          // else {
          //   alert("Party Not Found");
          // }
        });
    }
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  Fileupload = (e) => {
    console.log("fn");
    e.preventDefault();
    var { name } = e.target;

    const file = e.target.files[0];
    const storageRef = firebaseDb
      .storage()
      .ref("Invoice/")
      .child(this.state.BillNO);
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then((snapshot) => {
      console.log("uploaded", file.name);
      fileRef.getDownloadURL().then((url) => {
        this.setState({
          ...this.state,
          [name]: url,
        });

        console.log(url);
      });
    });
  };

  addorEdit = (obj) => {
    var today = new Date();
    if (today.getDate() < 10 && today.getMonth() < 10) {
      var date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-0" +
        today.getDate();
    } else if (today.getDate() < 10) {
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-0" +
        today.getDate();
    } else if (today.getMonth() < 10) {
      date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    }
    if (this.state.PartyMobile) {
      firebaseDb
        .database()
        .ref("Admin/Parties/")
        .child(this.state.PartyMobile)
        .child("Purchase")
        .child(this.state.BillNO)
        .set(obj);
    

    if (this.state.purchaseby === "Anu") {
      if (this.state.Gst === "Yes") {
        firebaseDb
          .database()
          .ref("Admin/Anu/Purchase/GST")
          .child(this.state.BillNO)
          .set(obj);
        firebaseDb
          .database()
          .ref("Admin/Anu/Expensense")
          .child(date)
          .child(this.state.BillNO)
          .set({ Reason: "Lorry", Amount: this.state.lorryEx });
      } else {
        firebaseDb
          .database()
          .ref("Admin/Anu/Purchase/NoGST")
          .child(this.state.BillNO)
          .set(obj);
      }
    } else {
      firebaseDb
        .database()
        .ref("Admin/Aarthi/Purchase/NoGST")
        .child(this.state.BillNO)
        .set(obj)
        firebaseDb
        .database()
        .ref("Admin/Aarthi/Expensense")
        .child(date)
        .child(this.state.BillNO)
        .set({ Reason: "Lorry", Amount: this.state.lorryEx });
    }
  } else {
    alert("Enter Party Mobile Number");
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
                  <h2>Add Purchase</h2>
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="PartyMobile"
                      label="Party-MobileNumber"
                      fullWidth
                      value={this.state.PartyMobile}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="PartyName"
                      label="Party-Name"
                      fullWidth
                      value={this.state.PartyName}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="BillNO"
                      label="BillNO"
                      fullWidth
                      value={this.state.BillNO}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="BillAmount"
                      label="BillAmount"
                      fullWidth
                      value={this.state.BillAmount}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Date"
                      label="Date"
                      fullWidth
                      value={this.state.Date}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Transacid"
                      label="Transaction ID"
                      fullWidth
                      value={this.state.Transacid}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="lorryEx"
                      label="Lorry Expense"
                      fullWidth
                      value={this.state.lorryEx}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Puchased By</InputLabel>

                    <Select
                      label="Purchaseby"
                      name="purchaseby"
                      value={this.state.purchaseby}
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
                  <Grid item xs={12} sm={6}>
                    <label>GST</label>
                    <pre></pre>

                    <label>
                      Yes
                      <input
                        type="radio"
                        id="Yes"
                        name="Gst"
                        value="Yes"
                        onChange={this.handleInputChange}
                      />
                    </label>

                    <label>
                      NO
                      <input
                        type="radio"
                        id="No"
                        name="Gst"
                        value="No"
                        onChange={this.handleInputChange}
                      />
                      <span></span>
                    </label>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <label>Invoice</label>
                    <input
                      type="file"
                      name="invoice"
                      onChange={this.Fileupload}
                    />

                    {this.state.warranty_card ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <p></p>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
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
                  </Grid>

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
export default withStyles(useStyles)(Form);
