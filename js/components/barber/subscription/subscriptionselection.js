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
  ImageBackground,
  TouchableWithoutFeedback
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
import Modal from "react-native-modal";
import { setActiveLogin } from "../../../actions/common/entrypage";
import { confirmfreetrial } from "../../../actions/common/all";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { connectionState } from "../../../actions/network";
import { logOutUserAsync } from "../../../actions/common/signin";
import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { selectRole } from '../../../actions/common/register';
//import * as RNIap from 'react-native-iap';


function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    appConfig: state.basicAppConfig.config,
    activeLogin: state.entrypage.active,  
    userType: state.driver.appState.userType,  
    jwtAccessToken: state.driver.appState.jwtAccessToken,
  };
}

class SubscriptionSelection extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func,
    selectRole:PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,      
      modalVisible: false,
      plan:undefined 
    };
  }

  setModalVisible(visible,plan) {
    this.setState({
      modalVisible: visible,
      plan: plan
    });
  }

  handleLogOut() {
    this.props.logOutUserAsync(this.props.jwtAccessToken);
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

  confirmRedirect(confirm){ 
    this.setModalVisible(false,'')
    
    if(confirm) {
      if(this.state.plan == "free trial"){
        this.props.confirmfreetrial()
      } else {
        Actions.SubscriptionPanel()
      }
    }    
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
      <Container>          
          <View style={{ flex: 1 }}>            
            <Content style={{ backgroundColor: "#0D1214" }}>
              <Header style={{ backgroundColor: "#0D1214" }} >
              <Left>
                {/*<Button 
                  transparent 
                  onPress={()=> (this.props.userType=='barber') ? Actions.BarberHome() : Actions.BookingDate() }
                >
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
                </Button>*/}
              </Left>
              <Body>
                <Title/>
              </Body>
              <Right />
            </Header>
              <View style={{ padding: 20, marginTop: 20 }} >              
                <Text style={{ color:"#E8E8E8", fontSize:28, fontFamily:"Cabin-Bold"  }}>
                  Subscription
                </Text>
                <Text style={{ color: "#E8E8E8", fontSize:16, fontFamily:"Cabin-Regular", marginTop:10  }}>
                  Select mode of subscription.
                </Text>
              </View>

              
              <View style={{ justifyContent:'center' }} >

                <TouchableWithoutFeedback onPress={() => this.setModalVisible(true,'free trial') }>
                <View style={{ height: 158, backgroundColor: "#151D22", marginLeft:20, marginRight:20, justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ color: "#E8E8E8", fontSize:24, fontFamily:'Cabin-Bold' }} onPress={() => this.setModalVisible(true,'free trial')} >
                    FREE TRIAL
                  </Text>
                  <Text style={{ color: "#E8E8E8", fontSize:12, fontFamily:'Cabin-Regular' }} >
                    (Use full features within 14 days)
                  </Text>                  
                </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.setModalVisible(true,'paid plan') }>
                <View style={{ height: 158, backgroundColor: "#352A1F", marginLeft:20, marginRight:20, marginTop:10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: "#E8E8E8", fontSize:24, fontFamily:'Cabin-Bold' }} >
                    PAID PLAN
                  </Text>
                  <Text style={{ color: "#E8E8E8", fontSize:12, fontFamily:'Cabin-Regular' }} onPress={() => this.setModalVisible(true,'paid plan')} >
                    (Use all features with limited and unlimited plans)
                  </Text>
                </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.handleLogOut() }>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
                  <Text style={{ color: "#E8E8E8", fontSize:16, fontFamily:'Cabin-Bold' }} >
                    LOG OUT
                  </Text>
                </View>
                </TouchableWithoutFeedback>              

              </View>
              
              <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                  <View style={styles.modalView}>
                    <Text style={{ color: "#FFF", fontSize:24, marginTop:20, fontFamily:'Cabin-Bold', textAlign:"center" }}>You select {this.state.plan}</Text>
                    
                    <View>
                      <View style={{ justifyContent: "center", margin:10,  }}>                      
                        <Text style={{ alignSelf: "center", color: "#FFF", fontFamily:'Cabin-Bold', fontSize:62, marginTop:15 }}> ? </Text>
                        
                        <View style={{ justifyContent: "center", marginTop:10  }}>
                          <TouchableWithoutFeedback onPress={() => this.confirmRedirect(true)}>
                            <View style={[styles.completeBtn,{backgroundColor:"#38454B", borderRadius:10 }]}> 
                              <Text style={{alignSelf: "center", color: "#FFF"}}> Confirm </Text>
                            </View>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress={() => this.setModalVisible(false,'')}>
                            <View style={[styles.completeBtn,{backgroundColor:"#38454B", borderRadius:10 }]}> 
                              <Text style={{alignSelf: "center", color: "#FFF"}}> Cancel </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    </View>

                </View>
            </Modal>

            </Content>
          </View>
          
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    logOutUserAsync: jwtAccessToken => dispatch(logOutUserAsync(jwtAccessToken)),
    connectionState: status => dispatch(connectionState(status)),
    currentLocationUser: () => dispatch(currentLocationUser()),
    clearEntryPageFields: () => dispatch(clearEntryPageFields()),
    selectRole:(role) => dispatch(selectRole(role)),
    confirmfreetrial:() => dispatch(confirmfreetrial())
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(SubscriptionSelection);
