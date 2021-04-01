import React, { Component } from "react";
 import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import firebaseDb from './firebase.js';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
// import Numofcategory from './Numofcategory'
// import Noofassetbooked from './Noofassetbooked'
// import Nooffailureasset from './Nooffailureasset'
// import FailureAssets from'./FailureAssets'
import {

  Grid,
 
} from '@material-ui/core';
//import Shiftdetails from "../../Shiftdetails";



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
    padding:theme.spacing(5),
    marginLeft:theme.spacing(35),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      studentObjects: {},
      count:0
     };
  }

  componentDidMount() {
     firebaseDb
      .database()
      .ref("Admin/Asset_category")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ studentObjects: { ...snapshot.val() } });
        }
      })
      
      
  }

  count=()=>{
    const c=[]
    for (let i in this.state.studentObjects) {
      c.push(i)
   }
   console.log(c.length)
  return(c.length)

  }



  render() {
    const { classes } = this.props;
    

    return (
      <div>
        <Sidebar />
        
        <Navbar /> 
       
        <main className={classes.content}>
       
          
          <Toolbar />
          
          <div id="demoObject" style={{marginLeft:"22rem"}} ><Home1/></div>
          <div id="demoObject" style={{marginLeft:"44rem"}} >
            <Home1/>
          </div>
          <div id="demoObject"><Home2/></div>
         <div style={{marginTop:"13rem"}}> <Home3/></div>
         <Grid
            // item
            // lg={8}
            // md={12}
            // xl={9}
            // xs={12}
          >
         <div style={{marginTop:"3rem"}}> <Home3/></div></Grid>
        </main>
      </div>
    );
  }
}



export default withStyles(useStyles)(Home);
