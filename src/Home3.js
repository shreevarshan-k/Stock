import React, { Component } from "react";
//import moment from "moment";
import firebaseDb from "./firebase.js";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
 

} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

// const useStyles = makeStyles(() => ({
//   root: {},
//   actions: {
//     justifyContent: "flex-end",
//   },
// }));

var today;
class FailureAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentObjects: {},
      count: 0,
    };
  }

  componentDidMount() {
    today = new Date();
    if (today.getMonth() + 1 < 10) {
      today =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    } else {
      today =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    }
    console.log(today);
    firebaseDb
      .database()
      .ref("Admin").child(localStorage.getItem("user")).child("Bills").child(today)
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ studentObjects: { ...snapshot.val() } });
        }
      });
  }

  render() {
    // const { classes } = this.props;

    return (
      <Card
      //   className={clsx(classes.root, className)}
      //   {...rest}
      >
        <CardHeader title="Today Sales Details" />
        <Divider />

        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>BillNo</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell >
                  
                    Rate
                    
                </TableCell>
                {/* <TableCell>Status</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.state.studentObjects).map((key) => (
                <TableRow hover key={key}>
                  <TableCell>
                    {key}
                  </TableCell>
                  <TableCell>
                    {this.state.studentObjects[key].CustomerName}
                  </TableCell>
                  {/* <TableCell>
                    {moment(this.state.studentObjects[key].PDate).format(
                      "DD/MM/YYYY"
                    )}
                  </TableCell> */}
                  <TableCell>
                    <Chip
                      color="primary"
                      label={this.state.studentObjects[key]["Product"].Total}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Link to="/FailureNotification">
            <Button
              color="primary"
              endIcon={<ArrowRightIcon />}
              size="small"
              variant="text"
            >
              View all
            </Button>
          </Link>
        </Box>
      </Card>
    );
  }
}

export default FailureAssets;
