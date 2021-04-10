import {
    AppBar,
    Badge,
    Box,
    Button,
    CssBaseline,
    IconButton,
    ListItemIcon,
    Popover,
    Toolbar,
    Typography,
    Avatar
  } from "@material-ui/core";
  import { withStyles } from "@material-ui/core/styles";
  import { Redirect } from "react-router-dom";
  import {
    
    Notifications as NotificationsIcon,
  } from "@material-ui/icons";
  import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
  import React, { Component } from "react";
  //import firebaseDb from "./firebase";
  import InputIcon from '@material-ui/icons/Input';
  
  const drawerWidth = 240;

  var i=0;
  const exp=[];
  
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
    avatar:{
      
        fontSize: '8rem',
        width: '4rem',
        height: '4rem',
        
    }
  });
  
  class SidebarEmployee extends Component {
    constructor(props) {
      super(props);
      // this.state = { studentObjects: {}, open: true };
  
      this.state = { currentId: "0", studentObjects: {},contactObjects: {}, 
      Warranty_expdate: "",  Machinename: "", LoggedIn: true};
  
    }
  
    componentDidMount() {
     
    }
  
    
  
    warranty=()=>{
      
      if(i<exp.length)
      {
        i++;
        return("-->  " + exp[i-1]);
      }
  
    }
  
  
  
    logout=()=>{
          console.log("logout")
          localStorage.removeItem("token")
          console.log(localStorage.getItem("uname"))
          this.setState({LoggedIn: false})
        }
        
        
  
    render() {
      if (this.state.LoggedIn === false) {
        return <Redirect to="/" />;
      }
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            style={{
              background: '#4481eb ',
            }}
            className={classes.appBar}
          >
            <Toolbar>
            <Avatar
              
              className={classes.avatar}
              // component={RouterLink}

              //src="https://firebasestorage.googleapis.com/v0/b/asset-d7110.appspot.com/o/admin%2FASSET-USER-ADMIN.png?alt=media&token=38195c4a-6dc5-484a-a19b-9cf890215264"
             // src="https://firebasestorage.googleapis.com/v0/b/stock-5230f.appspot.com/o/Ra5894039504b4e8edfb1d4dba914f3ee.png?alt=media&token=49730172-1aef-4e31-9f40-84239a94537f"
             src="https://firebasestorage.googleapis.com/v0/b/stock-5230f.appspot.com/o/WhatsApp%20Image%202021-04-03%20at%202.24.28%20PM.jpeg?alt=media&token=e50b72ce-ff67-4d22-a898-f90e6fae8d91" 
             to="/app/account"
            />
            {localStorage.getItem("user")==="Anu"?
              <Typography variant="h6" style={{marginLeft:"1rem",color: "white"}} noWrap>
               Unique Trendz
              </Typography>
              :
              <Typography variant="h6" style={{marginLeft:"1rem",color: "white"}} noWrap>
              Trendz zone 
             </Typography>}
  
              <div style={{ position: "absolute", right: "5rem" }}>
                <PopupState variant="popover">
                  {(popupState) => (
                    <div>
                      <IconButton
                        aria-label="show 17 new notifications"
                        color="inherit"
                        // onClick={() => {
                        //   this.state.currentId = "0";
                        // }}
                      >
                        <Badge
                          badgeContent={this.state.currentId}
                          color="secondary"
                          showZero
                          {...bindTrigger(popupState)}
                        >
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box p={2} color="text.primary">
                         
                        </Box>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </div>
              <ListItemIcon style={{ position: "absolute", right: "0.3rem" }}>
                <PopupState variant="popover">
                  {(popupState) => (
                    <div>
                      <IconButton>
                        <Badge
                          color="secondary"
                          showZero
                          {...bindTrigger(popupState)}
                        >
                          <InputIcon style={{ color: "white" }} />
                        </Badge>
                      </IconButton>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box p={2} color="text.primary">
                          <Typography>
                            <Button onClick={this.logout}>Logout </Button>
                          </Typography>
                        </Box>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </ListItemIcon>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
  
  export default withStyles(useStyles)(SidebarEmployee);
  