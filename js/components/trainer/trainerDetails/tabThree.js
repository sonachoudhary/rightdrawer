import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions } from "react-native";
import {
  Tabs, 
  TabHeading,
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Label,
  Body,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";


import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    phoneNo: state.driver.user.phoneNo,
    profileUpdating: state.driver.user.profileUpdating,
    emergencyDetails: state.driver.user.emergencyDetails,
    workAddress: state.driver.user.workAddress,
    homeAddress: state.driver.user.homeAddress
  };
}
class Tab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      render: false
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        
        <Content/>
         
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  bindActions
)(Tab3);