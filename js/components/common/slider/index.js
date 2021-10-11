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
  AppState,
  TouchableWithoutFeedback
} from "react-native";
import {
  Content,
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
import AsyncStorage from '@react-native-community/async-storage';

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
        require('../../../../assets/images/slider/slide1.png'),   
        require('../../../../assets/images/slider/slide2.png'),
        require('../../../../assets/images/slider/slide3.png'),
        require('../../../../assets/images/slider/slide4.png'),
        require('../../../../assets/images/slider/slide5.png'),
        require('../../../../assets/images/slider/slide6.png'),
      ],
      slogan:'Streamline walk ins'
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
      
      return null;
    }
  }
  
  changeText(index) {
    if(index==0) {
      this.setState({ slogan: "Streamline walk ins" })
    } else if(index==1) {
      this.setState({ slogan: "Arrive on time to your appointments" })
    } else if(index==2) {
      this.setState({ slogan: "Reduce no call no shows" })
    } else if(index==3) {
      this.setState({ slogan: "Know your professionals’ availability" })
    } else if(index==4) {
      this.setState({ slogan: "Find the best specialist for your needs" })
    } else if(index==5) {
      this.setState({ slogan: "Book now" })
      setTimeout(() => {  Actions.services() }, 3000)
    }
  }
  
  deleteAsync = async () => {        
    await AsyncStorage.getItem("FCM_TOCKEN");
  }

  render() {
    var resize = 'no-resize';
    if(Platform.OS === 'android') {
      resize = 'auto'
    }
    
    return (
      <View>
        
        <SliderBox
          images={this.state.images}
          onCurrentImagePressed={index => this.changeText(index) }
          currentImageEmitter={index => this.changeText(index) }
          sliderBoxHeight={deviceHeight} 
          resizeMethod={resize}
          resizeMode={'stretch'} />

        <View style={{ position:'absolute', bottom:150, zIndex:1001 }}>          
            <View style={{ flexDirection:'row', width:deviceWidth , justifyContent:'center', alignItem:'center'}} >
              <Text style={{ fontSize:28, color:"#FFFFFF", fontFamily:'Cabin-Bold', textAlign:'center' }}>{this.state.slogan}</Text>
            </View>          
        </View>
        
      </View>
      );
  }
}

function mapStateToProps(state) {
  return {
    activeLogin: state.entrypage.active,
    appConfig: state.basicAppConfig.config
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
