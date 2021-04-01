import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "./firebase.js";
import { withStyles } from "@material-ui/core/styles";
import CategoryIcon from "@material-ui/icons/Category";
import AddIcon from "@material-ui/icons/Add";

import ToggleOnIcon from "@material-ui/icons/ToggleOn";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";

import { Avatar, Box, Divider, Typography } from "@material-ui/core";

// import useStyles from "./UseStyle";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import {
 
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  
} from "@material-ui/icons";

const drawerWidth = 260;

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
    fontWeight: theme.typography.fontWeightMedium,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  active: {
    color: theme.palette.primary.main,

    fontWeight: theme.typography.fontWeightMedium,

    // color: theme.palette.primary.main,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
});

// const classes = useStyles();

class SidebarEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { studentObjects: {}, open: false, AssetOpen: false };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  Assetopener = () => {
    this.setState({ AssetOpen: !this.state.AssetOpen });
  };

  addasset = () => {
    const name = prompt("Please enter Asset category");
    firebaseDb
      .database()
      .ref("Admin/Asset_category/")
      .child(name)
      .set(name);
  };

  componentDidMount() {
    // const [open, setOpen] = React.useState(true);

    firebaseDb
      .database()
      .ref("Admin/Asset_category")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ studentObjects: { ...snapshot.val() } });
        }
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Box alignItems="center" display="flex" flexDirection="column" p={2}>
            <Avatar
              className={classes.avatar}
              // component={RouterLink}

              //src="https://firebasestorage.googleapis.com/v0/b/asset-d7110.appspot.com/o/admin%2FASSET-USER-ADMIN.png?alt=media&token=38195c4a-6dc5-484a-a19b-9cf890215264"
              src="https://firebasestorage.googleapis.com/v0/b/stock-5230f.appspot.com/o/Ra5894039504b4e8edfb1d4dba914f3ee.png?alt=media&token=49730172-1aef-4e31-9f40-84239a94537f"
              to="/app/account"
            />
            <Typography
              className={classes.name}
              color="textPrimary"
              variant="h5"
            >
              Unique Trendz
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Admin
            </Typography>
          </Box>
          <Divider />
          <List>
            <Link to="/Homepage" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon  style={{ color: "#00ccff" }}>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            
            <Link to="/AddParty" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon style={{color : "#00ccff"}}>
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="Add Party" />
              </ListItem>
            </Link>


            <Link to="/Purchase" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon style={{color : "#00ccff"}}>
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="Add Purchase" />
              </ListItem>
            </Link>
            <Link to="/PurchaseList" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon style={{color : "#00ccff"}}>
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="View Purchase" />
              </ListItem>
            </Link>
            
            

            <Link to="/AddStock" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon style={{color:"#00ccff"}}>
                  <AddIcon />
                </ListItemIcon>

                <ListItemText primary="Add Stock" />
              </ListItem>
            </Link>

            <Link to="/StockList" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon style={{color:"#00ccff"}}>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Stocks" style={{ color: "black" }} />
              </ListItem>
            </Link>

            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <ToggleOnIcon />
              </ListItemIcon>
              <ListItemText primary="Allocation" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/Allocation" className="Sidebar-content">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Allocate" />
                  </ListItem>
                </Link>
                <Link to="/date" className="Sidebar-content">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <DesktopWindowsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Allocation View" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>


            

           
           
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(useStyles)(SidebarEmployee);


