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

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";
import AsyncStorage from '@react-native-community/async-storage';

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

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item style={{backgroundColor:'#ffffff',borderRadius:30,paddingLeft:10,borderBottomColor:'#313131',borderBottomWidth:0}}>
         {props.type === 'email' &&
          <Image source={require("../../../../assets/images/email.png")} style={{marginTop:1,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'password' &&
          <Image source={require("../../../../assets/images/key.png")} style={{marginTop:2,marginLeft:5,marginRight:10,opacity:0.9}} />
        }
        {props.type === 'password' ?
          <PasswordInputText {...input} {...props} inputContainerStyle={{borderBottomWidth:0,height:50}}  style={{fontSize:14, marginTop:-7,color: '#ffffff',borderColor:'#1A1A1A',borderWidth:0,opacity:0.9,width:deviceWidth-100 }} iconColor='#ffffff'  label='' textContentType="oneTimeCode"
          />
        :
        <Input {...input} {...props} style={{ fontSize:14,color: '#000',opacity:0.9,height:48,lineHeight:18,justifyContent:'center',borderBottomColor:'#313131',borderBottomWidth:0 }}  />
        }
       
      </Item>

      {meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
    </View>
  );
};


input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

function mapStateToProps(state) {
 
  return {
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    
  };
}

class SignIn extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    
  };

  

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

    
  }

  

  openforgotpassword(){
     this.setState({
      showforgotpanel: true
     })
  }
  closeforgotpassword(){
     this.setState({
      showforgotpanel: false
     })
  }

 

  state = {
    showError: false
  };

 

  async submit(values) {
    let fcmToken = await AsyncStorage.getItem("FCM_TOCKEN");
    this.props.dispatch(signinAsync(values, this.state.customer,fcmToken));
  }

  componentWillReceiveProps(nextProps) {
    
   
  }

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }

  render() {
    
    return (
      <Container style={{ backgroundColor: "#e6e6e6" }}>
        <StatusBar barStyle="light-content" />
        <Content scrollEnabled bounces={false}>
        <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center',marginTop:80,marginBottom:40}}>
            <Image source={require("../../../../assets/images/fev.png")} style={{width:132,height:150,borderRadius:80}} />

        </View>
<View>
            {!this.state.socialLogin && (  
              <View>
              <View style={{ padding: 10 }}>
                <View style={{ padding: 10 }}>
                  <Field
                    component={input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    placeholderTextColor={'#a2a2a2'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ padding: 10,marginTop:6 }}>
                  <Field
                    component={input}
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    placeholderTextColor={'#a2a2a2'}
                    name="password"
                    autoCapitalize="none"
                    
                  />
                </View>
              </View>
                <View style={{marginTop:-7,width:deviceWidth,alignItems: 'center', justifyContent:'center' }}>
                  <TouchableOpacity onPress={() => Actions.forgotpassword()}>
                    <Text style={{ color: '#ffffff',fontSize:14,opacity:0.4,fontFamily:'ProximaNova-Regular'}}>Forgot Password ?</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.regBtnContain,{marginTop:81}]}>
                  <View style={{ height: 50,width:218}}>
                  <Button onPress={() => Actions.Profile()} block style={styles.regBtn1}>
                    {this.props.isFetching ? (
                      <Spinner />
                    ) : (
                      <Text style={{color: '#fff', fontSize:22,fontFamily:'ProximaNova-Bold',lineHeight:26 }}>Sign In</Text>
                    )}
                  </Button>
                  </View>
                </View>

                 
                
              </View>
            )}
          
           <View style={{flexDirection:'row', width:deviceWidth,justifyContent:'center',alignItems:'center', marginTop:20, marginBottom:114,}}>
            <Text style={{ fontFamily:'ProximaNova-Regular', fontSize:14, opacity:0.8, color: "#ed1e79", textAlign: "center",marginRight:2 }}>
              Don't have an account? 
              
            </Text>
            <TouchableOpacity onPress={() => Actions.signUp()}>
                  <Text style={{ fontSize:14, fontFamily:'ProximaNova-Bold',  opacity:1, color: "#ed1e79", textAlign: "center" }}>Sign Up </Text>
            </TouchableOpacity>
            </View>
              {this.state.showError &&
              Toast.show({
                text: this.props.errormsg,
                position: "bottom",
                duration: 1500
              })}
          </View>
          {this.props.loadingStatus ? this.showLoaderModal() : null}

           

        </Content>

       

      </Container>
    );
  }
}




SignIn = reduxForm({
  form: "loginForm", // a unique name for this form
  validate
})(SignIn);

SignIn = connect(mapStateToProps)(SignIn);

export default SignIn;
