import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,AsyncStorage,StatusBar } from "react-native";
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
import Register from "../register/";
import { signinAsync } from "../../../actions/common/signin";
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";
import { requestFbLogin } from "../loginFb";
import { signInWithGoogleAsync } from "../loginGoogle";
import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser } from '../../../actions/driver/home';
import OneSignal from "react-native-onesignal";
import config from "../../../../config";
//import DeviceInfo from 'react-native-device-info';
import PasswordInputText from 'react-native-hide-show-password-input';


function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);
}

let that = null;
const deviceWidth = Dimensions.get('window').width; 
const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Password is required';
  } else if(!validatePassword(values.password)){
    errors.conpassword = "The password should have at least 8 character, 1 upper case, 1 lower case, 1 number and 1 special character(*,%,!,@,&,$,?)";
  }else if (values.password != values.conpassword) {
    errors.conpassword = "Password doesn't match";
  }
  return errors;
};

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item style={{backgroundColor:'#313131',borderRadius:30,paddingLeft:10,borderBottomColor:'#313131',borderBottomWidth:0}}>
        {props.type === 'email' &&
          <Image source={require("../../../../assets/images/email.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'password' &&
          <Image source={require("../../../../assets/images/key.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'password' ?
         <PasswordInputText {...input} {...props} inputContainerStyle={{borderBottomWidth:0,height:50}}  style={{ marginTop:-11,color: '#ffffff',borderColor:'#1A1A1A',borderWidth:0,opacity:0.8,width:deviceWidth-100 }} iconColor='#ffffff'  label='' textContentType="oneTimeCode"
          />
        :
        <Input {...input} {...props} style={{ color: '#ffffff',opacity:0.8,height:50,lineHeight:20,justifyContent:'center',marginTop:0,borderBottomColor:'#313131',borderBottomWidth:0,paddingLeft:10 }}  />
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
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    
  };
}

class Resetpassword extends Component {
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
      otp:'',
     
      modalVisible: false,
      
    };

  }

  

  state = {
    showError: false
  };

  async submit(values) {
   
    if(this.state.otp!=""){
      const ForgotEmail = await AsyncStorage.getItem('forgotPasswordsetEmail');
          const obj = {
              email:ForgotEmail,
              password:values['password'],
              otp:this.state.otp
          };
         
          fetch(`${config.serverSideUrl}:${config.port}/api/config/forgotemail`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
          })
            .then(resp => resp.json())
            .then(data => {
              alert(data.message);
              if(data.success==true){
                  Actions.signIn();
              }   
            })
            .catch(e => {
            
            });
      }else {
        alert('OTP can not be blank');
      }

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
      <Container style={{ backgroundColor: "#1A1A1A" }}>
        <StatusBar barStyle="light-content" />
        <Content scrollEnabled bounces={false}>
        
        <View style={{marginTop:40,marginLeft:10}}>
         <TouchableOpacity onPress={() => Actions.forgotpassword()}>
          <Image source={require("../../../../assets/images/leftarrow.png")} style={{width:23,height:16}} />
          </TouchableOpacity>
        </View>

        <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:30}}>
          <Image source={require("../../../../assets/images/logo.png")} style={{width:132,height:150}} />
        </View>

        <View style={{width:deviceWidth,flexDirection:'row',justifyContent:'center',alignItems:'center', marginTop:10, marginBottom:10}}>
           <View style={{width:deviceWidth,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
            <Text style={{ fontFamily:'ProximaNova-Regular',opacity:0.8, fontSize:26,  color: "#cccccc", textAlign: "center",marginRight:0 }}>Reset </Text>
            <Text style={{ fontFamily:'ProximaNova-Bold', fontSize:26,  color: "#ffffff", textAlign: "center",marginLeft:-1 }}>Password </Text>
          </View>
        </View>

        <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center', marginTop:4, marginBottom:0}}>
            <Text style={{ fontFamily:'ProximaNova-Regular',opacity:0.8, fontSize:16,  color: "#ffffff", textAlign: "center" }}>Enter OTP from your Email </Text>
            
        </View>

<View style={{ padding: 10 }}>
            {!this.state.socialLogin && (  
              <View>
               <View style={{ paddingBottom: 20,paddingLeft:10,paddingRight:10,justifyContent:'center',width:deviceWidth, }}> 
               <OTPInputView
                    style={{width: '70%', height: 100,fontSize:18,color:'#ffffff',marginLeft:'13%'}}
                    pinCount={4}
                    autoFocus={true}
                    selectionColor={'#ffffff'}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled = {(code => {
                       this.setState({ otp: code });
                    })}
                />
               </View>
                <View style={{ padding: 10,marginTop:10,marginBottom:5 }}>
                  <Field
                    component={input}
                    placeholder="Password"
                    type="password"
                    placeholderTextColor={'#808080'}
                    name="password"
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Field
                    component={input}
                    placeholder="Confirm Password"
                    type="password"
                    placeholderTextColor={'#808080'}
                    name="conpassword"
                    autoCapitalize="none"
                  />
                </View>
                

                <View style={[styles.regBtnContain,{justifyContent:'center',alignItems:'center',marginTop:68}]}>
                  <View style={{width:138}}>
                  <Button onPress={this.props.handleSubmit(this.submit.bind(this))} block style={styles.regBtn}>
                    {this.props.isFetching ? (
                      <Spinner />
                    ) : (
                      <Text style={{ color: '#fff', fontSize:22,fontFamily:'ProximaNova-Bold',lineHeight:22 }}>Submit</Text>
                    )}
                  </Button>
                  </View>
                </View>
                
              </View>
            )}
          
           <View style={{width:deviceWidth,flexDirection:'row',justifyContent:'center',alignItems:'center', marginTop:27, marginBottom:63,}}>
            <Text style={{ fontFamily:'ProximaNova-Regular',opacity:0.8, fontSize:14,  color: "#ffffff", textAlign: "center",marginRight:2 }}>
              Already have an account? 
              
            </Text>
            <TouchableOpacity onPress={() => Actions.signIn()}>
                  <Text style={{ fontFamily:'ProximaNova-Bold', fontSize:14,  color: "#ffffff", textAlign: "center" }}>Sign In </Text>
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



Resetpassword = reduxForm({
  form: "resetForm", // a unique name for this form
  validate
})(Resetpassword);

Resetpassword = connect(mapStateToProps)(Resetpassword);

export default Resetpassword;
