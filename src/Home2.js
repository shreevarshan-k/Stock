import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import firebaseDb from './firebase.js';
import { Link } from "react-router-dom";
import EventIcon from '@material-ui/icons/Event';
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
var today;
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
      if(today.getMonth()+1<10){
      today= today.getFullYear() + '-0' + (today.getMonth()+1) + '-' + today.getDate();}
      else{
        today= today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
      }
      console.log(today)
     firebaseDb
      .database()
      .ref("Admin/Asset_Booked").child(today)
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
            Today's Expensense:
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {this.count()}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
            <EventIcon />
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
         <Link to='./BookedAssetView' className="Sidebar-content">
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
