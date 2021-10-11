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
  Alert
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

class Services extends Component {
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
  

  _handleConnectionChange = isConnected => {
    this.props.connectionState({ status: isConnected });
  };

  registrationstart1(){
      Alert.alert(
      //title
      'Age Alert',
      //body
      'Do you have a parent/guardian over 18 that will accompany you?',
      [
        {text: 'Yes', onPress: () => this.callScreen()},
        {text: 'No', onPress: () => this.registrationstart2()},
      ],
      { cancelable: true }
    );
  }
  registrationstart2(){
      Alert.alert(
      //title
      'Age Alert',
      //body
      'Must be 18+ to sign up as trainee/instructor',
      [
        {text: 'Ok', onPress: () => Actions.pop()},
      ],
      { cancelable: true }
    );
  }

  registrationstart(){
    Alert.alert(
      //title
      'Age Alert',
      //body
      'Are 18 or over?',
      [
        {text: 'Yes', onPress: () => this.callScreen()},
        {text: 'No', onPress: () => this.registrationstart1()},
      ],
      { cancelable: true }
    );
  }


  customerregistrationstart1(){
      Alert.alert(
      //title
      'Age Alert',
      //body
      'Do you have a parent/guardian over 18 that will accompany you?',
      [
        {text: 'Yes', onPress: () => Actions.customersignup()},
        {text: 'No', onPress: () => this.customerregistrationstart2()},
      ],
      { cancelable: true }
    );
  }
  customerregistrationstart2(){
      Alert.alert(
      //title
      'Age Alert',
      //body
      'Must be 18+ to sign up as trainer/instructor',
      [
        {text: 'Ok', onPress: () => Actions.pop()},
      ],
      { cancelable: true }
    );
  }

  customerregistrationstart(){
    Alert.alert(
      //title
      'Age Alert',
      //body
      'Are 18 or over?',
      [
        {text: 'Yes', onPress: () => Actions.customersignup()},
        {text: 'No', onPress: () => this.customerregistrationstart1()},
      ],
      { cancelable: true }
    );
  }


  callScreen(){
    
    this.props.currentLocationUser();
    Actions.names();
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission",
          message: "Fitworld needs access to your GPS "
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
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={styles.backbuttonarrowcolor}
              />
             <Text style={styles.backbuttoncolor}>{" "}Back</Text>
            </Button>
          </Left>
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Sign In
            </Title>
          </Body>
          <Right />
        </Header>
        

          <View style={{ flex: 1 }}>
            
            <Content style={{ backgroundColor: commonColor.brandSecondry }}>
              
              <View
                  style={
                    Platform.OS === "ios"
                      ? { padding: 50, marginTop: 20 }
                      : { padding: 50, marginTop: 20 }
                  }
                >
              
              <Text style={{ color: "#000",  }}>
                Are you looking for a trainer or do you provide training services?
              </Text>
              

              
                <Button
                  block
                  style={styles.serviceBtn}
                  onPress={() => this.customerregistrationstart()}
                >
                  <Text style={{ fontSize: 18, color: "#fff" }}>
                    Client {" "}
                    <Icon
                      name="md-arrow-forward"
                      style={{
                        fontSize: 16,
                        marginLeft: 40,
                        paddingTop:7,
                        paddingLeft:40,
                        color: "#FFF"
                      }}
                    />
                  </Text>
                </Button>
                <Button
                  block
                  onPress={() => this.registrationstart()}
                  style={styles.trainerBtn}
                >
                  <Text style={{ fontSize: 18, color: "#fff" }}>
                    Trainer {" "}
                    <Icon
                      name="md-arrow-forward"
                      style={{
                        fontSize: 16,
                        marginLeft: 40,
                        paddingTop:7,
                        paddingLeft:40,
                        color: "#FFF"
                      }}
                    />
                  </Text>
                </Button>
              </View>
            </Content>
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
)(Services);
