import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Dimensions, View } from "react-native";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Item,
  Spinner,
  Body,
  Toast,
  Input
} from "native-base";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import {
  fetchUserCurrentLocationAsync,
  mapDeviceIdToUser
} from "../../../actions/driver/home";
import {
  socketDriverInit,
  updateLocation
} from "../../../services/driversocket";

import * as appStateSelector from "../../../reducers/driver/appState";
import config from "../../../../config";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

function mapStateToProps(state) {
  return {
    user: state.driver.user,
    isInitialLocationFetched: appStateSelector.isInitialLocationFetched(state),
    jwtAccessToken: state.driver.appState.jwtAccessToken
  };
}

class CustomerStartupServices extends Component {
  static propTypes = {
    fetchUserCurrentLocationAsync: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isInitialLocationFetched: PropTypes.bool,
    region: PropTypes.object
  };

  state = {
    notification: {}
  };

 
  render() {

    return (

      <Container >
        <Header style={{ backgroundColor: commonColor.brandSecondry }} >
          <Left>
            <Button transparent onPress={() => Actions.slider()}>
              <Icon
                name="md-arrow-back"
                style={{
                  fontSize: 24,
                  marginLeft: 15,
                  fontWeight:'bold',
                  color: "#E8E8E8"
                }}
              />
              <Text style={{ color: "#E8E8E8", marginTop:3, fontSize:16 }}>{" "}Back</Text>
            </Button>
          </Left>
          <Body>
            <Title/>
          </Body>
          <Right />
        </Header>
        
        <View style={{ flexDirection:'row', width:deviceWidth , justifyContent:'center', alignItem:'center', marginTop: deviceHeight/2}}>
          <Text style={{ fontSize:18, color:"#000000" }}>Customer Page is under construction</Text>
        </View>
      </Container>

      );
  }
}

function bindActions(dispatch) {
  return {
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    mapDeviceIdToUser: (jwtAccessToken, deviceId, pushToken) =>
      dispatch(mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken))
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(CustomerStartupServices);
