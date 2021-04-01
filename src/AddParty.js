import "@firebase/storage";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
//import InputLabel from "@material-ui/core/InputLabel";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import useStyles from "./UseStyle";

import React, { Component } from "react";
import firebaseDb from "./firebase.js";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const initialFieldValues = {
  PartyName: "",
  Mobile: "",
  Altmobile:"",
  Address: "",
  Gst: "",
  pincode:"",
 
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

class AddParty extends Component {
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
      .ref("Products/")
      .child(this.state.Name);
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
    firebaseDb
      .database()
      .ref("Admin/Parties/")
      .child(this.state.Mobile)
      .set(obj);


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
                  <h2>Add Party</h2>
                </Typography>

                <Grid container spacing={3}>
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
                      name="Mobile"
                      label="Party-Mobile"
                      fullWidth
                      value={this.state.Mobile}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Altmobile"
                      label="Alternate number"
                      fullWidth
                      value={this.state.Altmobile}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Gst"
                      label="GST Number"
                      fullWidth
                      value={this.state.Gst}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} >
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
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      value={this.state.pincode}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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
export default withStyles(useStyles)(AddParty);
