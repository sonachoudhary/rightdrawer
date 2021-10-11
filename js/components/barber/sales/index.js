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
  Col,
  Input
} from "native-base";
import PropTypes from "prop-types";


import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";

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
    user: state.driver.user,
  };
}

class Notifications extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func,
    selectRole:PropTypes.func
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
  
  async deleteSession(){
    try {
      await AsyncStorage.removeItem('customerRegistration');
      await AsyncStorage.removeItem('customerRegistration.name');
      await AsyncStorage.removeItem('customerRegistration.pass');
      await AsyncStorage.removeItem('driverRegistration.name');
      await AsyncStorage.removeItem('driverRegistration.pass');
      await AsyncStorage.removeItem('driverRegistration.phone');
      await AsyncStorage.removeItem('driverRegistration.address');
      await AsyncStorage.removeItem('driverRegistration.rates');
      await AsyncStorage.removeItem('driverRegistration.exp');
      await AsyncStorage.removeItem('driverRegistration.cpr');
      await AsyncStorage.removeItem('driverRegistration.insurance');
      await AsyncStorage.removeItem('driverRegistration.license');
      await AsyncStorage.removeItem('driverRegistration.background');
      await AsyncStorage.removeItem('driverRegistration.cert');
      await AsyncStorage.removeItem('driverRegistration.speaciality');

    } catch (error) {
      
    }
  } 

  componentDidMount(){
    this.deleteSession().then((data) => {
        
    }).catch((error) => {
       
    }); 

    // NetInfo.isConnected.addEventListener(
    //   "change",
    //   this._handleConnectionChange
    // );
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
            <Content style={{ backgroundColor: "#0D1214"}}>
              
              <View style={{ flexDirection:'row', justifyContent:'center', marginTop:20 }} >
                  
                  <Text style={{ color: "#E8E8E8", fontSize:14, fontFamily:'Cabin-Regular'}}>
                    Sales
                  </Text>       
                  
              </View>

              <View style={{ flexDirection:'row', justifyContent:'center', marginTop:40, marginBottom:30}} >
                  <Input value = "Search" style={{ borderColor:'#707E85', borderWidth:1, color:'#FFFFFF', height:40, width:340, marginLeft:20, marginRight:20, fontSize:14, fontFamily:"Cabin-Regular", opacity:0.4 }} />             
              </View>

              <View style={{ flex:1, flexDirection:'row', width:deviceWidth, height:20 }} >
              <View style={{ position:'absolute', right:26, borderColor:'#2A3439', color:'#707E85', marginTop:10 }} >
                <Text style={{ color:"#FFFFFF", fontSize: 10, fontFamily:"Cabin-Bold"  }}>March 20</Text>
              </View>
              </View>

              <View style={{ borderBottomWidth:1, borderColor:'#707E85', color:'#707E85', marginLeft:20, marginRight:20 }} >
                <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10 }} >
                  <Text style={{ fontSize:14, color: "#E8E8E8", width: deviceWidth-100,fontFamily:'Cabin-Regular' }}>Tim Carter</Text>
                  <Text style={{ right:10, fontSize:10, fontFamily:'Cabin-Regular' }} >March 11, 2020</Text> 
                </View>  
                <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10, marginBottom:10 }} >
                  <Text style={{ color: "#707E85", width: deviceWidth-100, fontSize:12, fontFamily:'Cabin-Regular' }}>Regular haircut, Facial Shave</Text>
                  <Text style={{ right:10, fontSize:14, color:"#FFFFFF", fontFamily:'Cabin-Bold' }} >$20.00</Text> 
                </View>
              </View>

              <View style={{ borderBottomWidth:1, borderColor:'#707E85', color:'#707E85', marginLeft:20, marginRight:20 }} >
                <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10 }} >
                  <Text style={{ fontSize:14, color: "#E8E8E8", width: deviceWidth-100,fontFamily:'Cabin-Regular' }}>Michael Reyes</Text>
                  <Text style={{ right:10, fontSize:10, fontFamily:'Cabin-Regular' }} >March 4, 2020</Text> 
                </View>  
                <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10, marginBottom:10 }} >
                  <Text style={{ color: "#707E85", width: deviceWidth-100, fontSize:12, fontFamily:'Cabin-Regular'  }}>Facial Shave</Text>
                  <Text style={{ right:10, fontSize:14, color:"#FFFFFF",fontFamily:'Cabin-Bold' }} >0.00</Text> 
                </View>
              </View>

              <View style={{ borderBottomWidth:1, borderColor:'#707E85', color:'#707E85', marginLeft:20, marginRight:20 }} >
                <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10 }} >
                  <Text style={{ fontSize:14, color: "#E8E8E8", width: deviceWidth-100,fontFamily:'Cabin-Regular' }}>Kevin Aton</Text>
                  <Text style={{ right:10, fontSize:10, fontFamily:'Cabin-Regular' }} >March 4, 2020</Text> 
                </View>  
                <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10, marginBottom:10 }} >
                  <Text style={{ color: "#707E85", width: deviceWidth-100,fontSize:12, fontFamily:'Cabin-Regular'  }}>Kevin Aton</Text>
                  <Text style={{ right:10, fontSize:14, color:"#FFFFFF",fontFamily:'Cabin-Bold' }} >$200.00</Text> 
                </View>
              </View>
              

            </Content>

            <View style={{ width: deviceWidth, height: 66, backgroundColor: "#2A3439", flexDirection:'row', justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/2 }} >
                    <Image
                      source={require("../../../../assets/icon/home.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.BarberHome() } 
                    />
                    <Text  onPress={() => Actions.BarberHome() }  style={{fontSize:10, color:'#FFFFFF',paddingTop:10,fontWeight:"bold"}}>Home</Text>
                </View>                    

                {/*<View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/4 }} >
                    <Image
                      source={require("../../../../assets/icon/speechbubble.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.chatlist()}
                    />
                   <Text onPress={() => Actions.chatlist()} style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>Inbox</Text>
                </View>*/}                    

                
                {/*<View style={{ justifyContent:'center', borderRightWidth:1, borderRightColor:'#000000', backgroundColor: "#392F2A",alignItems:'center', width:deviceWidth/4 }} >
                    <Image
                      source={require("../../../../assets/icon/bill.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.barbersales() } 
                    />
                    <Text onPress={() => Actions.barbersales() } style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>Sales</Text>
                </View>   */}                 

                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/2 }} >
                    <Image
                      source={require("../../../../assets/icon/usercopy.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.profile() } 
                    />
                    <Text onPress={() => Actions.profile() }  style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>My Profile</Text>
                </View>                    
            </View>                

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
)(Notifications);
