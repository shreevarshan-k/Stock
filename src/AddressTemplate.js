
  //import Grid from "@material-ui/core/Grid";
  import { withStyles } from "@material-ui/core/styles";

  //import Typography from "@material-ui/core/Typography";
  import React, { Component } from "react";
  import firebaseDb from "./firebase.js";
  import { Col, Divider, Row } from "antd";
  import "antd/dist/antd.css";
  import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
  
  //import Pdf from "react-to-pdf";
  
  
  const ref = React.createRef();
  //const drawerWidth = 240;
  
  const useStyles = (theme) => ({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: "2rem"
    },
    button: {
      marginTop: theme.spacing(4),
    },
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  // var today = new Date();
  // var date;
  // if (today.getDate() < 10 && today.getMonth() < 10) {
  //   date =
  //     today.getFullYear() +
  //     "-0" +
  //     (today.getMonth() + 1) +
  //     "-0" +
  //     today.getDate();
  // } else if (today.getDate() < 10) {
  //   date =
  //     today.getFullYear() + "-" + (today.getMonth() + 1) + "-0" + today.getDate();
  // } else if (today.getMonth() < 10) {
  //   date =
  //     today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate();
  // }
  var billamount = 0;
  class AddressTemplate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        custObjects: {},
        assetObjects: {},
        Leadobj: "",
        rate: "",
      };
    }
  
    componentDidMount() {
      firebaseDb
        .database()
        .ref("Admin/bill")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ assetObjects: { ...snapshot.val() } });
          }
        });
      firebaseDb
        .database()
        .ref("Admin/bill/Product")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({ custObjects: { ...snapshot.val() } });
          }
        });
    }
  
    Finalamt = () => {
      var finalamt =
        billamount+parseInt(this.state.assetObjects.shippingRate)
      return finalamt;
    };
    render() {
      const { classes } = this.props;
      return (
        <>
          <div className={classes.root}>
            {/* <Navbar />
            <Sidebar /> */}
            <main className={classes.content} ref={ref} >
              <Document>
                <Page size="A5" style={styles.page}>
                  <View>
                    <Text>
              
              <div style={{ padding: 0 }}>
                <Row style={{marginTop:"-3rem"}}>
                  <Col>
                    <Divider style={{ marginLeft: "9rem"}}>Address Details</Divider>
                    
                  </Col>
                </Row>
  
                <Row gutter={24} style={{ marginTop: 32,marginLeft:"14rem" }}>
                  <Col span={14}>
                     <h2>To </h2> 
                    <h4>{this.state.assetObjects.CustomerName}</h4>
                    <h5>{this.state.assetObjects.Address}</h5>
                    <h5>{this.state.assetObjects.District} -{" "}
                  {this.state.assetObjects.Pincode}</h5>
                    
                    <h5>MOBILE: {this.state.assetObjects.CustomerMobile}</h5>
                  </Col>
                  
                </Row>
              </div>
              <div style={{ padding: 15 }}>

              <Row gutter={24} style={{ marginTop: 30,marginLeft: 0}}>
                  <Col span={14}>
                     <h2>From </h2> 
                    <h4>Unique Trendz,</h4>
                    <h5>Tiruvannamalai - 606601</h5>
                  
                    <h5>MOBILE: 9787965463</h5>
                  </Col>
                  
                </Row>
              </div>
  
              {/* <Row style={{ marginTop: 48 }}>
                <div>
                  Bill To: <strong>{this.state.assetObjects.CustomerName} ,</strong>
                </div>
                <div> {this.state.assetObjects.Address} ,</div>
                <div>
                  {this.state.assetObjects.District} -{" "}
                  {this.state.assetObjects.Pincode}
                </div>
              </Row> */}
  
              
              </Text>
                  </View>
                </Page>
              </Document>
              
              </main>
              {/* <Pdf targetRef={ref} filename={this.state.Leadobj}>
                    {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                  </Pdf>
            */}
          </div>
        </>
      );
    }
  }
  export default withStyles(useStyles)(AddressTemplate);
  