import { Actions, ActionConst } from "react-native-router-flux";
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
  AsyncStorage,
  ImageBackground
} from "react-native";
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
  Body,
  Toast,
  Spinner,
  Thumbnail,
  Grid,
  Col
} from "native-base";
import PropTypes from "prop-types";

import Register from "../register/";
import SignIn from "../signIn/";
import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import ModalView from "../ModalView";
import { connectionState } from "../../../actions/network";

import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    appConfig: state.basicAppConfig.config,
    activeLogin: state.entrypage.active,
    latitude: state.driver.user.gpsLoc[1],
    longitude: state.driver.user.gpsLoc[0],
  };
}

class Regsuccess extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      customer: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
    };
    
  }

  state = {
    activeLogin: null
  };
  
  // componentDidMount(){
  //   NetInfo.isConnected.addEventListener(
  //     "change",
  //     this._handleConnectionChange
  //   );
  // }

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

  callScreen(){
    
    this.props.currentLocationUser();
    Actions.names()
  }
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Taxi App needs access to your GPS "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
      } else {
        
      }
    } catch (err) {
     
    }
  }
  render() {
    return(
      <Container style={{ backgroundColor: "#fff" }}>
          
          <View style={{ flex: 1 }}>
            <ImageBackground source={ require('../../../../assets/images/slider/splash.png')} style={{width: deviceWidth, height: deviceHeight, resizeMode:'cover' }} >
            <Content style={{ backgroundColor: commonColor.brandSecondry , opacity:0.80}}>
            
              <View
                  style={
                    Platform.OS === "ios"
                      ? { padding: 50, marginTop: 20,flexDirection:'row', justifyContent:'center' }
                      : { padding: 50, marginTop: 20,flexDirection:'row', justifyContent:'center' }
                  }
                >
                            
                <Text style={{ color:"#E8E8E8", fontSize:28, fontFamily:'Cabin-Bold' }}>
                  Confirm your email
                </Text>
                
              </View>

              <View style={{ flexDirection:'row', justifyContent:'center' }} >
                <View style={{ width: 152, height: 152, backgroundColor: "#2A3439", margin:10, borderRadius:10, justifyContent: 'center', alignItems: 'center' }} >
                  <Image
                    source={ require("../../../../assets/images/check-symbol.png")}
                    style={{ width:92, height: 70 }}
                  />
                </View>                
              </View>
              

              <View style={{ padding: 50, marginTop: 20,flexDirection:'row', justifyContent:'center' }} >                            
                <Text style={{ width:deviceWidth-150, color:"#E8E8E8", fontSize:14,flexDirection:'row', justifyContent:'center', textAlign:"center", fontSize:16, fontFamily:'Cabin-Regular'  }}>
                  Please check your inbox for confirmation email. Click the link or button to confirm your email address.
                </Text>                
              </View>    


              <Button
                  block
                  onPress={()=> Actions.signIn()}
                  style={[styles.nameBtn,{backgroundColor:"#392F2A"}]} >
                  <Text style={{ fontSize:16, fontFamily:'Cabin-Bold', color: "#FFFFFF" }}>
                      LOGIN                      
                  </Text>
              </Button>          


              <View style={{ padding: 10, marginTop: 15,flexDirection:'row', justifyContent:'center' }} >
                <Text style={{ color:"#E8E8E8", fontSize:16, fontFamily:'Cabin-Regular'  }}>
                  Re-send confirmation email
                </Text>
              </View>

            </Content>
            </ImageBackground>
          </View>
          
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status)),
    currentLocationUser: () => dispatch(currentLocationUser()),
    clearEntryPageFields: () => dispatch(clearEntryPageFields()),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Regsuccess);
