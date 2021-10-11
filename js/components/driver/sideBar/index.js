import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, Dimensions,ScrollView } from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import {
  Content,
  View,
  Text,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Item,
  List,
  ListItem,
  Left
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";

import { closeDrawer } from "../../../actions/drawer";
import { logOutUserAsync } from "../../../actions/common/signin";
import config from "../../../../config.js";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const deviceHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return {
    
  };
}
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      
      notcount:0,
      chcount:0,
      appcount:0,
    };
    
  }

  static propTypes = {
    fname: PropTypes.string,
    logOutUserAsync: PropTypes.func,
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func
  };
  

  render() {
    var userType = this.state.userType;
    return (
        <View style={{maxWidth:10}}></View>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(SideBar);
