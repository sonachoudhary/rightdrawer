import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,StatusBar,ImageBackground,StyleSheet ,FlatList} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
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
  Input,

} from "native-base";
import { Actions } from "react-native-router-flux";
import * as appStateSelector from "../../../reducers/driver/appState";
//import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin";
import AsyncStorage from '@react-native-community/async-storage';
import pr from 'pr-unit';
import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest,getremaningtimer,setlistorder,setgenderchoice } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";
import RNPickerSelect from 'react-native-picker-select';

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser,getpooldata } from '../../../actions/driver/home';
import OneSignal from "react-native-onesignal";
import config from "../../../../config";
import Modal from "react-native-modal";
import Contacts from 'react-native-contacts';

//import DeviceInfo from 'react-native-device-info';
import { emit } from "../../../services/socket";
let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 




function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };
  console.log('state.driver.appState',state.app);
  return {
   
  };
}

class Home extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    
    
  };
 timer = null;
  

  constructor(props) {
    super(props);
    

    this.state = {
     
    };
    
  }

 

  componentWillUnmount(){
   
  }
 
 
  render() {
   
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" />
               <View style={styles.mainmenu}>
                <TouchableOpacity>
                   <Image                      
                       source={require("../../../../assets/images/logoicon.jpeg")}
                      style={{ width:55, height: 55,paddingLeft:20}}
                      />
                  </TouchableOpacity>
                <TouchableOpacity  onPress={() =>this.props.navigation.openDrawer()}>
                   <Image                      
                       source={require("../../../../assets/images/menuicon.png")}
                      style={{ width:35, height: 35,paddingLeft:20}}
                      />
                  </TouchableOpacity>
                   
            </View>
       <View style={styles.text}>
       <Text style={{fontSize:34,color:'blue'}}> This is main page </Text>
               
       </View>
       
       

      </Container>
    );
  }
}



Home = reduxForm({
  
})(Home);

Home = connect(mapStateToProps)(Home);

export default Home;
