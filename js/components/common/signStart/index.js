import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,StatusBar } from "react-native";
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
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import * as appStateSelector from "../../../reducers/driver/appState";
//import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin"; 
import PasswordInputText from 'react-native-hide-show-password-input';
import pr from 'pr-unit';
import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest,setgenderchoice } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser } from '../../../actions/driver/home';
//import OneSignal from "react-native-onesignal";
import config from "../../../../config";
//import DeviceInfo from 'react-native-device-info';

let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  } else if (isNaN(Number(values.phoneNo))) {
    errors.phoneNo = 'Must be a number';
  } else if (!values.password) {
    errors.password = 'Password is required';
  } else if (!values.phoneNo) {
    errors.phoneNo = 'Mobile number is required';
  } else if (!values.fname) {
    errors.fname = 'First name is required';
  } else if (!values.lname) {
    errors.lname = 'Last name is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};




class SignIn extends Component {
 

  

  constructor(props) {
    super(props);
    
    this.state = {
      socialLogin: null,
      showforgotpanel:false,
      loading: true,
      heading: "RIDER LOCATION ARRIVED",
      displaylabel:'',
      showView: true,
      forgotemail:'',
      
      modalVisible: false,
      
    };

    this.props.dispatch(setgenderchoice());  
  }

  
 

  render() { 
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
        <StatusBar barStyle="light-content" />
        <Content scrollEnabled bounces={false}>
          <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center',marginTop:deviceHeight/4.5,marginBottom:60}}>
            <Image source={require("../../../../assets/images/logo.png")} style={{width:140,height:160}} />
          </View>
          <View style={[styles.regBtnContain,{marginTop:0}]}>
            <View style={{ width:deviceWidth/1.5}}>
              <Button onPress={() => Actions.profile()} block style={styles.regBtn1}>  
                  <Text style={{ color: '#fff', letterSpacing: 0.4,fontSize:68*pr,fontFamily:'ProximaNova-Bold',paddingTop:10}}>Start Demo</Text>
                
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default SignIn;