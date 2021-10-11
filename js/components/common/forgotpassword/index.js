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
//import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin";

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

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
      <Item style={{backgroundColor:'#313131',borderRadius:30,paddingLeft:10,borderBottomColor:'#313131',borderBottomWidth:0}}>
        {props.type === 'email' &&
          <Image source={require("../../../../assets/images/email.png")} style={{marginTop:1,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        <Input {...input} {...props} style={{fontSize:14, color: '#ffffff',opacity:0.9,height:48,marginTop:0,lineHeight:18,justifyContent:'center',borderBottomColor:'#313131',borderBottomWidth:0 }}  />
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

class Forgotpassword extends Component {
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

  

  
  state = {
    showError: false
  };
  
  async submit(values) {
    
    if(values['email']!=""){
          await AsyncStorage.setItem('forgotPasswordsetEmail',values['email']);
          const obj = {
              email:values['email']
          };
          fetch(`${config.serverSideUrl}:${config.port}/api/config/forgot`, {
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
                  Actions.resetpassword();
              }
              
             
            })
            .catch(e => {
            
            });
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
            <View style={{marginTop:35,marginLeft:10}}>
             <TouchableOpacity onPress={() => Actions.signIn()}>
              <Image source={require("../../../../assets/images/leftarrow.png")} style={{width:23,height:16}} />
              </TouchableOpacity>
            </View>
          <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center',marginTop:25,marginBottom:35}}>
            <Image source={require("../../../../assets/images/logo.png")} style={{width:132,height:150}} />
          </View>
        <View style={{width:deviceWidth,flexDirection:'row',justifyContent:'center',alignItems:'center', marginTop:10, marginBottom:10}}>
            <Text style={{ fontFamily:'ProximaNova-Regular',opacity:0.8, fontSize:26,  color: "#cccccc", textAlign: "center",marginRight:0 }}> Forgot </Text>
            <Text style={{ fontFamily:'ProximaNova-Bold', fontSize:26,  color: "#ffffff", textAlign: "center",marginLeft:-2 }}> Password </Text>
        </View>
        <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center', marginTop:4, marginBottom:50}}>
            <Text style={{ width:214,opacity:0.8, fontSize:16,  color: "#ffffff", textAlign: "center",fontFamily:'ProximaNova-Regular' }}> Recovery code will be sent to </Text>
            <Text style={{ width:214,opacity:0.8, fontSize:16,  color: "#ffffff", textAlign: "center",fontFamily:'ProximaNova-Regular' }}> your Email Id </Text>
            
        </View>

<View style={{ padding: 10 }}>
            {!this.state.socialLogin && (  
              <View>
              
                <View style={{ padding:10  }}>
                  <Field
                    component={input}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    placeholderTextColor={'#808080'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                

                <View style={[styles.regBtnContain,{justifyContent:'center',alignItems:'center',marginTop:53}]}>
                <View style={{ width:138}}>
                  <Button onPress={this.props.handleSubmit(this.submit.bind(this))} block style={styles.regBtn}>
                    {this.props.isFetching ? (
                      <Spinner />
                    ) : (
                      <Text style={{ color: '#fff', fontSize:22,fontFamily:'ProximaNova-Bold',lineHeight:22}}>Send</Text>
                    )}
                  </Button>
                  </View>
                </View>
                
              </View>
            )}
          
           <View style={{flexDirection:'row', width:deviceWidth,justifyContent:'center',alignItems:'center', marginTop:20, marginBottom:114,}}>
              <Text style={{ fontFamily:'ProximaNova-Regular', fontSize:14, opacity:0.8, color: "#ffffff", textAlign: "center",marginRight:2 }}>
                 Already have an account?  
                
              </Text>
              <TouchableOpacity onPress={() => Actions.signIn()}>
                    <Text style={{ fontSize:14, fontFamily:'ProximaNova-Bold',  opacity:1, color: "#ffffff", textAlign: "center" }}>Sign In </Text>
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



Forgotpassword = reduxForm({
  form: "forgotForm", // a unique name for this form
  validate
})(Forgotpassword);

Forgotpassword = connect(mapStateToProps)(Forgotpassword);

export default Forgotpassword;
