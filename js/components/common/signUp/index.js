import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,StyleSheet,StatusBar } from "react-native";
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
import Register from "../register/";
import { registerAsync } from "../../../actions/common/register";
import RNPickerSelect from 'react-native-picker-select';
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
import DatePicker from 'react-native-datepicker';
import PasswordInputText from 'react-native-hide-show-password-input';


function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);
}
let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = 'First name is required';
  } else if (!values.lname) {
    errors.lname = 'Last name is required';
  }else if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
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
      <Item style={{backgroundColor:'#ffffff',borderRadius:30,paddingLeft:10,borderBottomColor:'#313131',borderBottomWidth:0}}>
        {props.type === 'email' &&
          <Image source={require("../../../../assets/images/email.png")} style={{marginTop:1,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'password' &&
          <Image source={require("../../../../assets/images/key.png")} style={{marginTop:2,marginLeft:5,marginRight:10,opacity:0.9}} />
        }
        {props.type === 'user' &&
          <Image source={require("../../../../assets/images/user.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'gender' &&
          <Image source={require("../../../../assets/images/gender.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'date' &&
          <Image source={require("../../../../assets/images/date.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'password' ?
          <PasswordInputText {...input} {...props} inputContainerStyle={{borderBottomWidth:0,height:50}}  style={{ marginTop:-12,color: '#ffffff',borderColor:'#1A1A1A',borderWidth:0,opacity:0.9,width:deviceWidth-100 }} iconColor='#ffffff'  label='' textContentType="oneTimeCode"
          />
        :
        <Input {...input} {...props} style={{ color: '#000',opacity:0.8,height:48,lineHeight:18,justifyContent:'center',marginTop:0,borderBottomColor:'#313131',borderBottomWidth:0 }}  />
        }
       
      </Item>

      {meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft:30,
    color: '#000000',
    height:50,
    opacity:0.7,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop:0,
    paddingLeft:30,
    height:50,
    justifyContent:'center',
    marginLeft:25,
    opacity:0.7,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

function mapStateToProps(state) {
 

  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    
  };
}

class SignUp extends Component {
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
      isconPassword:true,
      isPassword:true,
      
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

  submit(values) {
    var values = { "fname":values.fname,"lname":values.lname,"email":values.email,"password":values.password,
    "bio":values.bio, "age":this.state.age, "gender":this.state.gender}
    this.props.dispatch(registerAsync(values, 1));  
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
        <Content  scrollEnabled bounces={false}>
        <View style={{marginTop:40,marginLeft:10}}>
         <TouchableOpacity onPress={() => Actions.signIn()}>
          <Image source={require("../../../../assets/images/leftarrow.png")} style={{width:25,height:18}} />
          </TouchableOpacity>
        </View>
        <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center',marginTop:10}}>
          <Image source={require("../../../../assets/images/fev.png")} style={{width:132,height:150}} />
        </View>
<View style={{ padding: 10,marginTop:15 }}>
            {!this.state.socialLogin && (  
              <View>
               <View style={{ paddingHorizontal: 10,paddingVertical:8 }}>
                  <Field
                    component={input}
                    name="fname"
                    type="user"
                    placeholder="First Name"
                    placeholderTextColor={'#888888'}
                    autoCapitalize="none"
                  />
                </View>
                <View style={{paddingHorizontal: 10,paddingVertical:8 }}>
                  <Field
                    component={input}
                    name="lname"
                    type="user"
                    placeholder="Last Name"
                    placeholderTextColor={'#888888'}
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={{ paddingHorizontal: 10,paddingVertical:8 }}>
                  <View style={{backgroundColor:'#ffffff',borderRadius:30,paddingLeft:10,height:48,borderBottomColor:'#a2a2a2',borderBottomWidth:0}}>
                      <RNPickerSelect
                            placeholder={{label: 'Gender',value: null,color:'#000000'}}
                            style={pickerSelectStyles}
                            onValueChange={ (value) => ( this.setState({gender: value}) ) }
                            items={[
                              { label: 'Male', value: 'Male' ,color:'#000000'},
                              { label: 'Female', value: 'Female',color:'#000000' }
                             
                          ]}
                        />
                     <View style={{marginTop:-38,flex:1,width:30,paddingBottom:10}}>
                        <Image source={require("../../../../assets/images/gender.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
                    </View>
                  </View>
                </View>

                <View style={{ paddingHorizontal: 10,paddingVertical:8 }}>
                  <View style={{backgroundColor:'#ffffff',borderRadius:30,paddingLeft:10,height:48,borderBottomColor:'#313131',borderBottomWidth:0}}>
                     <DatePicker
                      style = {{ width:140,textAlign:'left',fontSize: 16,height:48,opacity:0.8,paddingTop:5,color:'#000000',paddingBottom:0,paddingLeft:20}}
                      date={this.state.age}
                      mode="date"
                      maxDate={new Date()}
                      placeholder=" Date Of Birth"
                      showIcon={false}
                      format="MM/DD/YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {  borderWidth: 0,color: "#000000",  fontSize: 16,opacity:0.8 },
                        dateText:{ color: "#000000",  fontSize: 16,opacity:0.8},
                        placeholderText: { fontSize: 16, color: '#a2a2a2',textAlign:'left',opacity:0.5 }
                      }}
                      onDateChange={time => {
                        this.setState({ age: time });
                      }} />

                      <View style={{marginTop:-32,flex:1,width:30,paddingBottom:10}}>
                        <Image source={require("../../../../assets/images/date.png")} style={{marginTop:-1,marginLeft:8,marginRight:5,opacity:0.9}} />
                    </View>
                  </View>
                </View>
                
                <View style={{ paddingHorizontal: 10,paddingVertical:8 }}>
                  <Field
                    component={input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    placeholderTextColor={'#888888'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ paddingHorizontal: 10,paddingVertical:8 }}>
                  <Field
                    component={input}
                    placeholder="Password"
                    type="password"
                    
                    placeholderTextColor={'#888888'}
                    name="password"
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ paddingHorizontal: 10,paddingVertical:8 }}>
                  <Field
                    component={input}
                    placeholder="Confirm Password"
                    type="password"
                    
                    placeholderTextColor={'#888888'}
                    name="conpassword"
                    autoCapitalize="none"
                  />
                </View>
                

                

                <View style={[styles.regBtnContain,{justifyContent:'center',alignItems:'center',marginTop:35}]}>
                  <View style={{width:138}}>
                  <Button onPress={this.props.handleSubmit(this.submit.bind(this))} block style={styles.regBtn}>
                    {this.props.isFetching ? (
                      <Spinner />
                    ) : (
                      <Text style={{ color: '#fff', fontSize:22,fontFamily:'ProximaNova-Bold',lineHeight:22 }}>Sign Up</Text> 
                    )}
                  </Button>
                  </View>
                </View>
                
              </View>
            )}

            <View style={{flexDirection:'row', width:deviceWidth,justifyContent:'center',alignItems:'center', marginTop:20, marginBottom:114,}}>
              <Text style={{ fontFamily:'ProximaNova-Regular', fontSize:14, opacity:0.8, color: "#ed1e79", textAlign: "center",marginRight:2 }}>
                 Already have an account?  
                
              </Text>
              <TouchableOpacity onPress={() => Actions.Profile()}>
                    <Text style={{ fontSize:14, fontFamily:'ProximaNova-Bold',  opacity:1, color: "#ed1e79", textAlign: "center" }}>Sign In </Text>
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



SignUp = reduxForm({
  form: "signupForm", // a unique name for this form
  validate
})(SignUp);

SignUp = connect(mapStateToProps)(SignUp);

export default SignUp;
