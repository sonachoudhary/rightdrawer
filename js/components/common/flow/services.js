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
import { selectRole } from '../../../actions/common/register';

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    appConfig: state.basicAppConfig.config,
    activeLogin: state.entrypage.active,    
  };
}

class Services extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func,
    selectRole:PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,      
    };
    
  }

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
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "change",
      this._handleConnectionChange
    );
  }

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
              <Header style={{ backgroundColor: commonColor.brandSecondry }} >
              <Left>
                <Button transparent onPress={() => Actions.signIn()}>
                  <Icon
                    name="md-arrow-back"
                    style={{
                      fontSize: 24,
                      marginLeft: 15,
                      fontWeight:'bold',
                      color: "#E8E8E8"
                    }}
                  />
                  <Text style={{ color: "#E8E8E8", marginTop:3, fontSize:16, fontFamily:"Cabin-Bold" }}>{" "}Back</Text>
                </Button>
              </Left>
              <Body>
                <Title/>
              </Body>
              <Right />
            </Header>
              <View
                  style={
                    Platform.OS === "ios"
                      ? { padding: 50, marginTop: 20 }
                      : { padding: 50, marginTop: 20 }
                  }
                >
              
                <Text style={{ color:"#E8E8E8", fontSize:28, fontFamily:"Cabin-Bold"  }}>
                  Specify
                </Text>
                <Text style={{ color: "#E8E8E8", fontSize:16, fontFamily:"Cabin-Regular", marginTop:10  }}>
                  Please select from the two options
                </Text>
              </View>

              <View style={{ flexDirection:'row', justifyContent:'center' }} >
                <View style={{ width: 152, height: 152, backgroundColor: "#2A3439", margin:10, borderRadius:10, justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ color: "#E8E8E8", fontSize:28, fontFamily:'Cabin-Bold' }} onPress={() => this.props.selectRole('Student')} >
                    Student
                  </Text>
                </View>

                <View style={{ width: 152, height: 152, backgroundColor: "#2A3439", margin:10, borderRadius:10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: "#E8E8E8", fontSize:28, fontFamily:'Cabin-Bold' }} onPress={() => this.props.selectRole('Teacher')} >
                    Teacher
                  </Text>
                </View>
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
    selectRole:(role) => dispatch(selectRole(role))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Services);
