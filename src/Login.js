import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
// import firebaseDb from "./firebase";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  Card: {
    marginTop: theme.spacing(10),
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const initials = {
  admin: false,
  isLoggedIn: false,
  maintenence: false,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initials;
  }

  handleInputChange = (f) => {
    f.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username==="Anu" && password==="radha1982"){
      localStorage.setItem("user",username)
      this.setState({ isLoggedIn: true });
      
    }
    else if(username==="Aarthi" && password==="Aarthi"){
      localStorage.setItem("user",username)
      this.setState({ isLoggedIn: true });
    }
    else{
      alert("Login Denied")
    }

    // var reference = firebaseDb
    //   .database()
    //   .ref("Staff/" + "staff/" + username)

    //   .on("value", (snapshot) => {
    //     if(snapshot.val()){
    //     let dataRetrieved = snapshot.val();
    //     if (username != "admin") {
    //       if (password == dataRetrieved.plogin) {
    //         this.setState({ isLoggedIn: true });
    //         localStorage.setItem("token", username);
    //         localStorage.setItem("Team", dataRetrieved.TeamName);
    //         localStorage.setItem("Position", dataRetrieved.TeamPosition);
    //       } else {
    //         alert("Incorrect Password");
    //       }
    //     } else if (username == "admin" && password == "admin") {
    //       this.setState({ admin: true });
    //       this.setState({ maintenence: false });
    //       this.setState({ isLoggedIn: true });
    //       localStorage.setItem("token", username);
    //     }}
    //     else{
    //       alert("User Not Found")
    //     }
    //   });
  };

  render() {
    const { classes } = this.props;
    if (this.state.isLoggedIn && localStorage.getItem("user")==="Anu") {
      return <Redirect to="/Homepage" />;
    }

    if (
      
      this.state.isLoggedIn &&
      localStorage.getItem("user")==="Aarthi"
    ) {
      return <Redirect to="/Homepage" />;
    }

   

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="email"
              // autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleInputChange}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/ForgetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/Signupnew" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

        {/* <Box mt={8}>
        <Copyright />
      </Box> */}
      </Container>
    );
  }
}

export default withStyles(useStyles)(Login);