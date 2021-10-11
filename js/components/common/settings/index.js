import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,ImageBackground,ScrollView,StyleSheet,Switch,StatusBar } from "react-native";
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
import { signinAsync } from "../../../actions/common/signin";
import Textarea from 'react-native-textarea';
import Footer from "../footer";

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";
import { requestFbLogin } from "../loginFb";
import { signInWithGoogleAsync } from "../loginGoogle";
import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import ModalView from "../ModalView"; 
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import {DstATopComposition} from 'react-native-image-filter-kit';

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser } from '../../../actions/driver/home';
import OneSignal from "react-native-onesignal";
import config from "../../../../config";
import { updateUserProfileAsync } from "../../../actions/driver/settings";
//import DeviceInfo from 'react-native-device-info';

let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.fname = 'Email is required';
  }
  
  return errors;
};

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item style={{backgroundColor:'#313131',borderRadius:30,paddingLeft:10,borderBottomColor:'#313131',borderBottomWidth:0}}>
          {props.type === 'email' &&
          <Image source={require("../../../../assets/images/email.png")} style={{marginTop:0,marginLeft:5,marginRight:7,opacity:0.9}} />
        }
        {props.type === 'password' &&
          <Image source={require("../../../../assets/images/key.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
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
         <Input {...input} {...props}  style={Platform.OS === "ios" ? styles.iostextfield : styles.androidtextfield} />
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
    fontFamily:'ProximaNova-Regular',
    color: '#ffffff',
    opacity:0.9,
    height:50,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop:-3,
    lineHeight:25,
    paddingLeft:30,
    marginLeft:25,
    fontFamily:'ProximaNova-Regular',
    height:50,
    opacity:0.8,
    color: '#ffffff',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
    userDetails: state.driver.user,
  };
}

class Settings extends Component {
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
      userDetails:this.props.userDetails,
      bio:'',
      heading: "RIDER LOCATION ARRIVED",
      displaylabel:'',
      showView: true,
      forgotemail:'',
      switchValue:this.props.userDetails.isNotification,
      showtimer:0,
      timer:10,
      gender:this.props.userDetails.gender,
      age:this.props.userDetails.age,
      email:this.props.userDetails.email,
      modalVisible: false,
      
    };

    console.log('this.state.userDetails',this.state.userDetails);
  }

  componentWillMount() {
    this.props.initialize({ email: this.state.userDetails.email });
    console.log(this.props.email);   
  }

 

  state = {
    showError: false
  };

  
  submit(values) {
      var values = { "email":this.state.email, "age":this.state.age, "gender":this.state.gender, "isNotification":this.state.switchValue}
      if(this.state.age!="" && this.state.gender!=""){
           this.props.dispatch(updateUserProfileAsync({ ...values }));
            Actions.profile();
      }else {
          alert('Age and Gender is required');
      }
      
  }

  

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  
  showtimerdata(){
    this.setState({showtimer:1});
    var that = this;
    setTimeout(function(){ that.counter() },1000);
  }
  
  counter(){
    var that = this;
    that.setState({timer:that.state.timer-1});
    if(that.state.timer>0){
      setTimeout(function(){ that.counter() },1000);
    }else {
        that.setState({showtimer:0,timer:10});
    }
  }

  toggleSwitch = (value) => {
    this.setState({switchValue: value})
  }


  render() {
     
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
      <StatusBar barStyle="light-content" />
        <View style={Platform.OS === "ios" ? styles.iosnotheading : styles.androidnotheading}>
         <View style={{width:40}}>
          <TouchableOpacity onPress={() => Actions.myprofile()}>
            <View style={{marginLeft:10}}>
              <Image source={require("../../../../assets/images/leftarrow.png")} style={{width:23,height:16,zIndex:3005}} />
            </View>
          </TouchableOpacity>
          </View>
          <View style={{width: deviceWidth-40,justifyContent:'center',marginTop:0,alignItems:'center',marginLeft:-15}}>
              <Text style={{color:'#ffffff',fontSize:20,fontFamily:'ProximaNova-Bold'}}>Settings</Text>
          </View>
        </View>
        
        
        <ScrollView style={{marginBottom:65}}>
        <View style={{marginTop:deviceHeight/25,justifyContent:'center',alignItems:'center'}}>

             
              
              { (this.state.userDetails.profileUrl!="" && this.state.userDetails.profileUrl!=null) ?
                  <DstATopComposition 
                      dstImage={
                        <Image
                            style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                            resizeMode="contain"
                            source={{ uri: this.state.userDetails.profileUrl }}
                          />
                      }
                      srcImage={
                        <Image
                          style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                          resizeMode="contain"
                          source={require("../../../../assets/images/heptagon2-01.png")}
                          
                        />
                      }
                    />
                    :
                    <DstATopComposition 
                      dstImage={
                        <Image
                          style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                          resizeMode="contain"
                          source={require("../../../../assets/images/user/screenprofile.png")}
                        />
                      }
                      srcImage={
                        <Image
                          style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                          resizeMode="contain"
                          source={require("../../../../assets/images/heptagon2-01.png")}
                          
                        />
                      }
                    />
                  }

             
        </View>

        <View style={{flexDirection:'row',width: deviceWidth,backgroundColor:'#161616',padding:deviceHeight/90,marginTop:deviceHeight/40}}>
          <View style={Platform.OS === "ios" ? styles.iosnoti : styles.acehnoti}>
            <Text style={{color:'#ffffff',fontSize:17,paddingLeft:10,fontFamily:'ProximaNova-Regular'}}>Notification</Text>
          </View>
          <View style={{justifyContent:'flex-end',width:60,marginRight:0}}>
            <Switch
                value={this.state.switchValue}
                onValueChange = {this.toggleSwitch}
                trackColor={{true: '#F54462', false: 'grey'}} 
                onTintColor="#F54462"
                thumbTintColor="#fff"
                thumbTintSize="8"
                style={Platform.OS === "ios" ? styles.ioscheckHeader : styles.acehckHeader}

              />
          </View>
        </View>
        
        <View style={{width: deviceWidth,justifyContent:'center',alignItems:'center',marginTop:10}}>
            <View style={{ paddingVertical: 7,paddingHorizontal:20,width:deviceWidth }}>
                  <Field
                    component={input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    placeholderTextColor={'#686868'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={ value => this.setState({ email: value })}
                    value={this.state.email}
                  />
                </View>
                <View style={{ paddingVertical: 7,paddingHorizontal:20,width:deviceWidth }}>
                  <View style={Platform.OS === "ios" ? styles.iosgender : styles.andgender}>
                      <RNPickerSelect
                            placeholder={{label: 'Gender',value: null,color:'#686868'}}
                            style={pickerSelectStyles}
                            value={this.state.gender}
                            onValueChange={ (value) => ( this.setState({gender: value}) ) }
                            items={[
                              { label: 'Male', value: 'Male' ,color:'#000000'},
                              { label: 'Female', value: 'Female',color:'#000000' },
                            ]}
                        />
                     <View style={{marginTop:-38,flex:1,width:30,paddingBottom:10}}>
                        <Image source={require("../../../../assets/images/gender.png")} style={{marginTop:2,width:16,height:16,marginLeft:5,marginRight:5,opacity:0.9}} />
                    </View>
                  </View>
                </View>

                <View style={{ paddingVertical: 7,paddingHorizontal:20,width:deviceWidth }}>
                  <View style={{backgroundColor:'#313131',borderRadius:30,paddingLeft:11,height:48,borderBottomColor:'#313131',borderBottomWidth:0}}>
                     <DatePicker
                      style = {{ width:140,textAlign:'left',height:48,fontFamily:'ProximaNova-Regular',fontSize: 16,color:'#ffffff',opacity:0.9,paddingTop:3,paddingBottom:0,paddingLeft:16}}
                      date={this.state.age}
                      mode="date"
                      maxDate={new Date()}
                      placeholder=" Date Of Birth"
                      showIcon={false}
                      format="MM/DD/YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {  borderWidth: 0,color: "#ffffff",  fontSize: 16,opacity:0.9 },
                        dateText:{ color: "#ffffff",  fontSize: 16,opacity:0.9},
                        placeholderText: { fontSize: 16, color: '#686868',textAlign:'left' }
                      }}
                      onDateChange={time => {
                        this.setState({ age: time });
                      }} />

                      <View style={{marginTop:-32,flex:1,width:30,paddingBottom:10}}>
                        <Image source={require("../../../../assets/images/date.png")} style={{marginTop:-1,marginLeft:7,marginRight:5,opacity:0.9}} />
                    </View>
                  </View>

                </View>
                

                <View style={[styles.regBtnContain,{justifyContent:'center',alignItems:'center',marginTop:deviceHeight/45,marginLeft:-5}]}>
                  <TouchableOpacity onPress={this.props.handleSubmit(this.submit.bind(this))}>
                      <View style={styles.regBtn}>
                          <Text  style={{ color: '#fff', fontSize:22,fontFamily:'ProximaNova-Bold',lineHeight:22 }}>Save</Text>
                      </View>
                  </TouchableOpacity>
                </View>

        </View>
        </ScrollView>
       
       <Footer />

      </Container>
    );
  }
}


Settings = reduxForm({
  form: "settingsForm", // a unique name for this form
  validate
})(Settings);

function bindActions(dispatch) {
  return {
    updateUserProfileAsync: userDetails => dispatch(updateUserProfileAsync(userDetails))
  };
}

Settings = connect(mapStateToProps,bindActions)(Settings);

export default Settings;
