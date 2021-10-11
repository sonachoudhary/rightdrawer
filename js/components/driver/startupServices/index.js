import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Spinner } from "native-base";

import {
  fetchUserCurrentLocationAsync,
  mapDeviceIdToUser
} from "../../../actions/driver/home";
import { socketInit } from "../../../services/driversocket";
import DriverRootView from "../rootView";
import * as appStateSelector from "../../../reducers/driver/appState";
import config from "../../../../config";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

function mapStateToProps(state) {
  return {
    region: {
      latitude: state.driver.user.gpsLoc[1],
      longitude: state.driver.user.gpsLoc[0],
      latitudeDelta: state.driver.user.latitudeDelta,
      longitudeDelta: state.driver.user.latitudeDelta * aspectRatio
    },
    user: state.driver.user,
    isInitialLocationFetched: appStateSelector.isInitialLocationFetched(state),
    jwtAccessToken: state.driver.appState.jwtAccessToken
  };
}

class DriverStartupServices extends Component {
  static propTypes = {
    fetchUserCurrentLocationAsync: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isInitialLocationFetched: PropTypes.bool,
    region: PropTypes.object
  };

  state = {
    notification: {}
  };

  componentDidMount() {
    socketInit();
    this.props.fetchUserCurrentLocationAsync();
  }
  
  render() {
    // eslint-disable-line class-methods-use-this
    if (this.props.isInitialLocationFetched) {
      return <DriverRootView initialRegion={this.props.region} />;
    }
    return <Spinner />;
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
)(DriverStartupServices);
