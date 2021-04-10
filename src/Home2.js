import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import firebaseDb from './firebase.js';
import { Link } from "react-router-dom";
import MoneyIcon from '@material-ui/icons/Money';
import {
  Avatar,

  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Button,

} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';






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
    padding:theme.spacing(10),
    marginLeft:theme.spacing(35),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  avatar: {
    backgroundColor: "#ff99cc",
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }

  
});
var today,month;
class Noofassetbooked extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      studentObjects: {},
      count:0
     };
  }

  componentDidMount() {
      today=new Date()
      month=new Date().getMonth()+1
      console.log(today.getDate())
      if (today.getDate() < 10 && today.getMonth() < 10) {
         today =
          today.getFullYear() +
          "-0" +
          (today.getMonth() + 1) +
          "-0" +
          today.getDate();
      } else if (today.getDate() < 10) {
         today =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-0" +
          today.getDate();
      } else if (today.getMonth() < 10) {
         today =
          today.getFullYear() +
          "-0" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
      }
      console.log(month)
      
     firebaseDb
      .database()
      .ref("Admin").child(localStorage.getItem("user")).child("Sales").child(month).child(today)
      .on("value", (snapshot) => {
        if (snapshot.val() != null ) {
          this.setState({ studentObjects: { ...snapshot.val() } });
        }
      })
      
      
      
  }

  count=()=>{
   
    var total=0;
    for (let i in this.state.studentObjects) {
      if(i!=="NextBill"){
        total = total+this.state.studentObjects[i]
      }
    
   }
  
  return(total)
   
  }



  render() {
    const { classes } = this.props;
    

    return (
      <div>

            

        <Card
    //   className={clsx(classes.root, className)}
    //   {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
            Today's Sales:
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
             ₹ {this.count()}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
            <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
         {/* <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>  */}
         <Link to='./SalesReport' className="Sidebar-content">
        <Button
           
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View 
        </Button>
        </Link>

        
      </CardContent>
    </Card>  
    </div>
    );
  }
}



export default withStyles(useStyles)(Noofassetbooked);
