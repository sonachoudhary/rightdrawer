import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo,
  AppState
} from "react-native";
import {
  Content,
  Container,
  Text,
  Button,
  Icon,
  Spinner,
  Thumbnail,
  Grid,
  Col
} from "native-base";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";

import Register from "../register/";
import SignIn from "../signIn/";
import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import ModalView from "../ModalView";
import { connectionState } from "../../../actions/network";
import { SliderBox } from "../../../obj/slider/SliderBox";
import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width; 



class Slider extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      appState: AppState.currentState,
      images: [
        require('../../../../assets/images/slide1.png')
      ],
      slogan:''
    };
  }

  state = {
    activeLogin: null
  };
  UNSAFE_componentWillMount() {
    this.requestCameraPermission();
    // navigator.geolocation.getCurrentPosition(
    //   position => {
        
    //   }
     
    // );
    setTimeout(() => {
      this.setState({ loading: false });
    }, 600);
  }
  componentDidMount() {
    if(this.props.isLoggedIn == true){
        setTimeout(function(){ Actions.profile(); },10);
    }else {
      setTimeout(function(){ Actions.signStart(); },1500);
    }

    AppState.addEventListener('change', this._handleAppStateChange);
    // NetInfo.isConnected.addEventListener(
    //   "change",
    //   this._handleConnectionChange
    // );
  }

  _handleAppStateChange = (nextAppState) => {
    
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.requestCameraPermission();
    }
    this.setState({appState: nextAppState});
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeLogin !== null) {
      this.setState({
        activeLogin: nextProps.activeLogin
      });
    } else if (nextProps.activeLogin === null) {
      this.setState({
        activeLogin: null
      });
    }
  }
  // componentWillUnmount() {
  //   NetInfo.isConnected.removeEventListener(
  //     "change",
  //     this._handleConnectionChange
  //   );
  // }

  _handleConnectionChange = isConnected => {
    this.props.connectionState({ status: isConnected });
  };

  async requestCameraPermission() {
    console.log('requestCameraPermission called')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "HTC needs access to your location"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
      } else {
        
      }
    } catch (err) {
      console.log('Permission error:', err)
      return null;
    }
  }
  
  changeText(index) {
    if(index==0) {
      this.setState({ slogan: "" })
    } else if(index==1) {
      this.setState({ slogan: "" });
      
    }else if(index==5) {
      this.setState({ slogan: "" })
      
    }

  }

  render() { 

    //alert('this.state.images',this.state.images);
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
        <StatusBar barStyle="light-content" />
        <Content scrollEnabled bounces={false}>
          <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center', height:deviceHeight}}>
            <Image source={require("../../../../assets/images/logo.png")} style={{width:deviceHeight/6.55,height:deviceHeight/4.65}} />
          </View>
         
        </Content>
      </Container>
      );
  }
}

function mapStateToProps(state) { //console.log('state.driver.appState',state.driver.appState);
  return {
    activeLogin: state.entrypage.active,
    appConfig: state.basicAppConfig.config,
    isLoggedIn: state.driver.appState.isLoggedIn,

  };
}

function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Slider);
