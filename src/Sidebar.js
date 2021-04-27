import React, { Component } from "react";
import { Link} from "react-router-dom";
import firebaseDb from "./firebase.js";
import { withStyles } from "@material-ui/core/styles";
import CategoryIcon from "@material-ui/icons/Category";
import AddIcon from "@material-ui/icons/Add";




import { Avatar, Box, Divider, Typography } from "@material-ui/core";

// import useStyles from "./UseStyle";
import {
 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import {
 
  
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
              //src="https://firebasestorage.googleapis.com/v0/b/stock-5230f.appspot.com/o/Ra5894039504b4e8edfb1d4dba914f3ee.png?alt=media&token=49730172-1aef-4e31-9f40-84239a94537f"
              //src="https://firebasestorage.googleapis.com/v0/b/stock-5230f.appspot.com/o/WhatsApp%20Image%202021-04-03%20at%202.20.06%20PM%20(1).jpeg?alt=media&token=c44ef9ea-aaf5-4338-9f95-efc24ffa00ac"
              src="https://firebasestorage.googleapis.com/v0/b/stock-5230f.appspot.com/o/WhatsApp%20Image%202021-04-03%20at%202.24.28%20PM.jpeg?alt=media&token=e50b72ce-ff67-4d22-a898-f90e6fae8d91"
              to="/app/account"
            />
            {localStorage.getItem("user")==="Anu"?
            <Typography
              className={classes.name}
              color="textPrimary"
              variant="h5"
            >
              Unique Trendz
            </Typography>
            :
            <Typography
              className={classes.name}
              color="textPrimary"
              variant="h5"
            >
              Trendz zone
            </Typography>}

            <Typography color="textSecondary" variant="body2">
              Admin
            </Typography>
          </Box>
          <Divider />
          <List>
            <Link to="/Homepage" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon  >
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            
            <Link to="/AddParty" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="Add Party" />
              </ListItem>
            </Link>

            <Link to="/PartiesList" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="Parties Details" />
              </ListItem>
            </Link>


            <Link to="/Purchase" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="Add Purchase" />
              </ListItem>
            </Link>
            <Link to="/invoice" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="Invoice" />
              </ListItem>
            </Link>
            <Link to="/PurchaseList" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>

                <ListItemText primary="View Purchase" />
              </ListItem>
            </Link>
            
            

            <Link to="/AddStock" className="Sidebar-content">
              <ListItem button activeClassName={classes.active}>
                <ListItemIcon >
                  <AddIcon />
                </ListItemIcon>

                <ListItemText primary="Add Stock" />
              </ListItem>
            </Link>

            <Link to="/StockList" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Stocks" style={{ color: "black" }} />
              </ListItem>
            </Link>
            <Link to="/ReturnForm" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Return" style={{ color: "black" }} />
              </ListItem>
            </Link>
            <Link to="/SalesBill" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Bill" style={{ color: "black" }}  />
              </ListItem>
            </Link>
            <Link to="/SalesReport" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Report" style={{ color: "black" }} />
              </ListItem>
            </Link>
            <Link to="/ExpensenseEntry" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Expensense Entry" style={{ color: "black" }} />
              </ListItem>
            </Link>
            <Link to="/ExpensenseReport" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Expensense Report" style={{ color: "black" }} />
              </ListItem>
            </Link>
            <Link to="/SalesReturnForm" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Return Entry" style={{ color: "black" }} />
              </ListItem>
            </Link>
            <Link to="/AddressTemplate" className="Sidebar-content">
              <ListItem button>
                <ListItemIcon >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Address Slip" style={{ color: "black" }} />
              </ListItem>
            </Link>

            


            

           
           
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(useStyles)(SidebarEmployee);


