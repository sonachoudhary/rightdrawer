import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,ImageBackground,StatusBar } from "react-native";
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
import { emit } from "../../../services/socket";

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest,getremaningtimer } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";
import Footer from "../footer";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser,getpooldata } from '../../../actions/driver/home';
import OneSignal from "react-native-onesignal";
import config from "../../../../config";
//import DeviceInfo from 'react-native-device-info';
import { openChatWindow } from "../../../actions/common/chat";
import {DstATopComposition} from 'react-native-image-filter-kit'; 
import AsyncStorage from '@react-native-community/async-storage';
import pr from 'pr-unit';

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

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item style={{borderBottomColor:'#ffffff',borderBottomWidth:1}}>
         {props.type === 'email' &&
          <Image source={require("../../../../assets/images/email.png")} style={{marginTop:5,marginRight:5}} />
        }
        {props.type === 'password' &&
          <Image source={require("../../../../assets/images/key.png")} style={{marginTop:5,marginRight:5}} />
        }
        <Input {...input} {...props} style={{ color: '#ffffff' }}  />
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
    userDetail: state.driver.user,
    gender: (state.driver) ? state.driver.user.gender:'Female',
    setgenderchoice: (state.driver) ? state.driver.user.setgenderchoice:'Female',
    nearByTrainers: (state.app) ? state.app.prefrences : [],
    randompoolarr:(state.viewStore) ? state.viewStore.randompoolarr : [], 
  };
}

class Profile extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    nearbyTrainers: PropTypes.array,
    randompoolarr: PropTypes.array
    
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
      loggedInUserId: this.props.userDetail._id,
      nearByTrainers:this.props.nearByTrainers,
      showloader:false
    };
    
    this.props.dispatch(getremaningtimer(119));
    this.props.dispatch(getpooldata());
  }

  openpic(){
    if(this.props.nearByTrainers.length>0){ 
      this.setState({nearByTrainers:this.props.nearByTrainers})
    }
  }
  
  state = {
    showError: false
  };

  submit(values) {
    this.props.dispatch(signinAsync(values, this.state.customer));  
  }

  async openChatWindow(value){ 
    this.props.dispatch(openChatWindow(value));
  }

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  
  nextpool(){
    this.setState({ showloader:true }) ;
    const _id = this.props.user_id;
    const {uuid} = this.props;
     if(this.state.loggedInUserId == undefined){
       if(this.props.setgenderchoice=='Male') { var gender = 'Female'; }else { var gender = 'Male'; }
     }else {
       if(this.props.gender=='Male') { var gender = 'Female'; }else { var gender = 'Male'; }
     }
    
   
    emit('create-new-pool', {uuid,_id,skip:true,gender:gender});
    var that = this;
    setTimeout(function(){  that.setState({ showloader:false }) ; Actions.preferencelist();  },5000); 
  }

  render() {
      var name = '';
      var age = '';
      var profile_pic ='';
      var userId = this.state.nearByTrainers[0]._id;
      console.log('this.state.loggedInUserId',this.state.nearByTrainers);
      if(this.state.loggedInUserId == undefined){
        console.log('nearByTrainers',this.state.nearByTrainers[0]);
        var name = this.state.nearByTrainers[0].fname +' '+this.state.nearByTrainers[0].lname;
        var age = '24';
      }else {
        if((this.props.userDetail.extra && this.props.userDetail.extra!="") && (this.props.userDetail.fratienty && this.props.userDetail.fratienty!="") && (this.props.userDetail.major && this.props.userDetail.major!="") && (this.props.userDetail.unveristy && this.props.userDetail.unveristy!="") ){
            console.log('case 1');
            for(i=0;i<this.state.nearByTrainers.length;i++){
              if((this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") && (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") &&  (this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") && (this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") ){
                if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra && this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty && this.state.nearByTrainers[i].major==this.props.userDetail.major && this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy){
                      var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                      var userId = this.state.nearByTrainers[i]._id;
                      if(this.state.nearByTrainers[i].age!=""){
                        var birthday = this.state.nearByTrainers[i].age;
                        var convertdate = new Date(birthday);
                        var ageDifMs = Date.now() - convertdate.getTime();
                        var ageDate = new Date(ageDifMs); 
                        var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                        if(age==50){ var age = 24; }
                      }else {
                          var age = 24;
                      }
                      break;
                  }
              }
            }
            if(name==""){ console.log('case 2');
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") && (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") &&  (this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") ){
                      if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra && this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty && this.state.nearByTrainers[i].major==this.props.userDetail.major){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }


             if(name==""){ console.log('case 3');
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if(  (this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") && (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") &&  (this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") ){
                      if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra && this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty && this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

            if(name==""){ console.log('case 4');
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") && (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") &&  (this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") ){
                      if( this.state.nearByTrainers[i].major==this.props.userDetail.major && this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty && this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

            if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") && (this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") &&  (this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") ){
                      if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra && this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy && this.state.nearByTrainers[i].major==this.props.userDetail.major){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

             if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") && (this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") ){
                      if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra && this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }


            if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") && (this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") ){
                      if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra && this.state.nearByTrainers[i].major==this.props.userDetail.major){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

             if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") && (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") ){
                      if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra && this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

             if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") && (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") ){
                      if( this.state.nearByTrainers[i].major==this.props.userDetail.major && this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

             if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if(  (this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") && (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") ){
                      if( this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy && this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

            if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if(  (this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") && (this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") ){
                      if( this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy && this.state.nearByTrainers[i].major==this.props.userDetail.major){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

            if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].unveristy && this.state.nearByTrainers[i].unveristy!="") ){
                      if( this.state.nearByTrainers[i].unveristy==this.props.userDetail.unveristy){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

            if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if((this.state.nearByTrainers[i].major && this.state.nearByTrainers[i].major!="") ){
                      if( this.state.nearByTrainers[i].major==this.props.userDetail.major){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

            if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if(  (this.state.nearByTrainers[i].fratienty && this.state.nearByTrainers[i].fratienty!="") ){
                      if( this.state.nearByTrainers[i].fratienty==this.props.userDetail.fratienty){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }

            if(name==""){
                for(i=0;i<this.state.nearByTrainers.length;i++){
                    if(  (this.state.nearByTrainers[i].extra && this.state.nearByTrainers[i].extra!="") ){
                      if( this.state.nearByTrainers[i].extra==this.props.userDetail.extra){
                            var name = this.state.nearByTrainers[i].fname +' '+this.state.nearByTrainers[i].lname;
                            var userId = this.state.nearByTrainers[i]._id;
                            if(this.state.nearByTrainers[i].age!=""){
                              var birthday = this.state.nearByTrainers[i].age;
                              var convertdate = new Date(birthday);
                              var ageDifMs = Date.now() - convertdate.getTime();
                              var ageDate = new Date(ageDifMs); 
                              var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
                              if(age==50){ var age = 24; }
                            }else {
                                var age = 24;
                            }
                            break;
                        }
                    }
                  }
            }


        }
      }
      if(name==""){ console.log('case last');
        var name = this.state.nearByTrainers[0].fname +' '+this.state.nearByTrainers[0].lname;
        var userId = this.state.nearByTrainers[0]._id;
        if(this.state.nearByTrainers[0].age!="") {
          var birthday = this.state.nearByTrainers[0].age;
          var convertdate = new Date(birthday);
          var ageDifMs = Date.now() - convertdate.getTime();
          var ageDate = new Date(ageDifMs); 
          var age =  Math.abs(ageDate.getUTCFullYear() - 1970);
          if(age==50){ var age = 24; }
        }else{
          var age = 24;
        }
      }
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
         <StatusBar barStyle="light-content" />
         <Content style={{marginBottom:80}}>
        <View style={Platform.OS === "ios" ? styles.gettopheaderios : styles.gettopheaderandroid}>
            <Text style={{color:'#ffffff',fontSize:58*pr,fontFamily:'ProximaNova-Bold',marginBottom:10}}>Your Match</Text>
            <Text style={{color:'#ffffff',fontSize:84*pr,marginTop:20,fontFamily:'ProximaNova-Bold'}}>{name}, {age}</Text>
        </View>
        <View style={{marginTop:25,justifyContent:'center',alignItems:'center',width:deviceWidth}}>
          <View style={{width:deviceWidth-20,justifyContent:'center',alignItems:'center'}}>
            
            { (profile_pic!="" && profile_pic!=null) ?
              <DstATopComposition 
                  dstImage={
                    <Image
                        style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                        resizeMode="contain"
                        source={{ uri: profile_pic }}
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
        </View>
        <View style={[styles.regBtnContain,{justifyContent:'center',alignItems:'center'}]}>
          {this.state.loggedInUserId == undefined  ?
            <View style={{marginTop:30,width:deviceWidth-100,}}>
              <Button block style={styles.regBtn1} onPress={() => Actions.signUp()}>
                <Text style={{ color: '#fff', fontSize:47*pr,fontFamily:'ProximaNova-Bold',lineHeight:18 }}>Register</Text>
              </Button>
            </View>
          : 
            <View style={{marginTop:30,width:deviceWidth-100,}}>
              <Button block style={styles.regBtn1} onPress={() => this.openChatWindow(userId)} >
                <Text style={{ color: '#fff', fontSize:47*pr,fontFamily:'ProximaNova-Bold',lineHeight:18 }}>Let's Chat!</Text>
              </Button>
            </View>
          }

           <View style={{marginTop:30,width:deviceWidth-100,marginTop:18}}>
            <Button block style={styles.regBtn1} onPress={() => this.nextpool()}>
              <Text style={{ color: '#fff', fontSize:47*pr,fontFamily:'ProximaNova-Bold',lineHeight:18}}>Next Pool</Text>
            </Button>
          </View>
        </View>

        </Content>
       <Footer />
       { this.state.showloader==true &&
          <View style={{position:'absolute',opacity:0.5,width:deviceWidth,height:deviceHeight, backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
              <Spinner color="red" />
          </View>
      }
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    openChatWindow: user_id => dispatch(openChatWindow(user_id)),   
  };
}

Profile = reduxForm({
  form: "loginForm", // a unique name for this form
  validate
})(Profile);

Profile = connect(mapStateToProps,bindActions)(Profile);

export default Profile;
