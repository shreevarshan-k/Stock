import React, { Component } from "react";
import CategoryIcon from "@material-ui/icons/Category";
import { withStyles } from "@material-ui/core/styles";
import firebaseDb from './firebase.js';
import { Link} from "react-router-dom";

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
    marginLeft:theme.spacing(30),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  avatar: {
    backgroundColor: "#99ccff",
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

class Numofcategory extends Component {
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
      .ref("Admin/Anu/NONGSTStock")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ studentObjects: { ...snapshot.val() } });
        }
      })
      console.log(new Date())
      
      
  }

  count=()=>{
    const c=[]
    for (let i in this.state.studentObjects) {
      c.push(this.state.studentObjects[i].Totalamt)
   }
   console.log(c)
   var total=0;
   for(var x=0;x<c.length;x++){
     
     total=total+c[x];
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
          spacing={2}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              NON GST Stocks
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
            <CategoryIcon />
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
        </Box> */}
        <Link to='./Assetview' className="Sidebar-content">
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



export default withStyles(useStyles)(Numofcategory);