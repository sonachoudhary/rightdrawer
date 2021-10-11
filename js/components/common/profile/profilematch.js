import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,ScrollView,StatusBar } from "react-native";
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
import { SliderBox } from "../../../obj/sliderprofile/SliderBox";

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest,getremaningtimer } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser } from '../../../actions/driver/home';
import OneSignal from "react-native-onesignal";
import AsyncStorage from '@react-native-community/async-storage';

import { openChatWindow } from "../../../actions/common/chat";
import UserAvatar from 'react-native-user-avatar';
import {CustomCachedImage} from "react-native-img-cache";
import CustomImage from 'react-native-image-progress';


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


function mapStateToProps(state) {
  return {
   
    remaining_time:(state.driver) ? state.driver.user.remaining_time:0,
    
  };
}

class Profile extends Component {
  static propTypes = { };

  

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
      images: [],
      dummyimages: [
       require('../../../../assets/images/user/testslider.png'),
      ],
      slogan:'',
      showtimer:0,
      timer:this.props.remaining_time,
      userid:'',
      userName:'',
      modalVisible: false,
      profiledata:[],
      dob:0,
    };

     
   
  }

  showtimerdata(){
    this.timer = setInterval(() => {
      let {timer} = this.state;
      this.setState({timer:timer-1});
      
      if(timer<=0){
         clearInterval(this.timer);
      }
    }, 1000);
  }

  componentWillMount() {
     this.showtimerdata();
     this.getuserprofile();
  }

  componentWillUnmount(){
    
    clearInterval(this.timer);
    this.props.dispatch(getremaningtimer(this.state.timer));
  }

  async openChatWindow(){ 
    const value = await AsyncStorage.getItem('user_id');
    this.props.dispatch(openChatWindow(value));
  }
  
  
  async getuserprofile(){
    
    const value = await AsyncStorage.getItem('user_id');
    this.setState({'userid':value});
  
    if(value!=""){
        const userEmail = { user_id: value };
        fetch(`${config.serverSideUrl}:${config.port}/api/users/getbio`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmail)
        })
          .then(response => response.json())
          .then(data => {
              
              this.setState({profiledata:data.data});
              if(data.data.slider_pic1!=null){ this.state.images.push(data.data.slider_pic1); }
              if(data.data.slider_pic2!=null){ this.state.images.push(data.data.slider_pic2); }
              if(data.data.slider_pic3!=null){ this.state.images.push(data.data.slider_pic3); }
              if(data.data.slider_pic4!=null){ this.state.images.push(data.data.slider_pic4); }
              if(data.data.slider_pic5!=null){ this.state.images.push(data.data.slider_pic5); }
              if(data.data.slider_pic6!=null){ this.state.images.push(data.data.slider_pic6); }
              if(this.state.profiledata.age!=""){
                  var birthday = this.state.profiledata.age;
                  var convertdate = new Date(birthday);
                
                  var ageDifMs = Date.now() - convertdate.getTime();
                  var ageDate = new Date(ageDifMs); 
                  var agedata =  Math.abs(ageDate.getUTCFullYear() - 1970);
                  if(agedata==50){ var agedata = 24; }
              }else {
                  var agedata = 24;
              }
              this.setState({dob:agedata});

           })
          .catch(error => {
            
          });
    }
    
  }
  
 
  changeText(index) {
    if(index==0) {
      this.setState({ slogan: "" })
    } else if(index==1) {
      this.setState({ slogan: "" });
    }else if(index==5) {
      this.setState({ slogan: "" })
      
    }

  }
  render() {
     
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{marginBottom:60}}>
       <View style={{ justifyContent:'center',alignItems:'center',width:deviceWidth}}>
              
              
              <View style={{width:deviceWidth,borderRadius:25,marginTop:0}}>
                    { this.state.images.length > 0 ? 
                      <SliderBox
                      images={this.state.images}
                      onCurrentImagePressed={index => this.changeText(index) }
                      currentImageEmitter={index => this.changeText(index) }
                      sliderBoxHeight={deviceHeight/1.80} 
                      resizeMode={'cover'} />
                    :
                     <SliderBox
                      images={this.state.dummyimages}
                      onCurrentImagePressed={index => this.changeText(index) }
                      currentImageEmitter={index => this.changeText(index) }
                      sliderBoxHeight={deviceHeight/1.80} 
                      resizeMode={'cover'} />
                    }

                    <View style={{flexDirection:'row'}}>
                          <View style={{flexDirection:'row',width:deviceWidth-30}}>
                              <Text style={styles.nameheda}>
                              {this.state.profiledata.fname} {this.state.profiledata.lname}, {this.state.dob}</Text>
                              
                          </View>
                       <View style={{marginTop:20,marginRight:15}}>
                          <View style={styles.CircleShape} />
                          <View style={styles.CircleShape} />
                          <View style={styles.CircleShape} />
                      </View>

                    </View>
                     <View style={{paddingLeft:10,marginBottom:10}}>
                       <View style={{flexDirection:'row'}}>
                           <Image source={require("../../../../assets/images/icon1.png")} style={{width:20,height:20}} />
                           {this.state.profiledata.unveristy!="" ?
                            <Text style={styles.setnewcls}>{this.state.profiledata.unveristy}</Text>
                           :
                            <Text style={styles.setnewcls}>Institution</Text>
                           }
                       </View>
                       <View style={{flexDirection:'row'}}>
                           <Image source={require("../../../../assets/images/icon2.png")} style={{width:20,height:20}} />
                           {this.state.profiledata.major!="" ?
                            <Text style={styles.setnewcls}>{this.state.profiledata.major}</Text>
                           :
                            <Text style={styles.setnewcls}>Major</Text>
                           }
                       </View>
                       <View style={{flexDirection:'row'}}>
                           <Image source={require("../../../../assets/images/icon3.png")} style={{width:20,height:20}} />
                           {this.state.profiledata.extra!="" ?
                            <Text style={styles.setnewcls}>{this.state.profiledata.extra}</Text>
                           :
                            <Text style={styles.setnewcls}>Extracurricular</Text>
                           }

                       </View>
                       <View style={{flexDirection:'row'}}>
                           <Image source={require("../../../../assets/images/icon4.png")} style={{width:20,height:20}} />
                           {this.state.profiledata.fratienty!="" ?
                            <Text style={styles.setnewcls}>{this.state.profiledata.fratienty}</Text>
                           :
                            <Text style={styles.setnewcls}>Fraternity</Text>
                           }
                       </View>

                     </View>
                    <View style={{borderTopWidth:1,borderTopColor:'#303030'}}>
                      <Text style={styles.biodetail}>{this.state.profiledata.bio}</Text>
                    </View>
                 
              </View>

               
          </View>
       </ScrollView>
       <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center'}}>
           <View style={{marginTop:40,marginBottom:10, position:'absolute',bottom:5}}>
               <TouchableOpacity onPress={() => Actions.preferencelist()}>
                  <Image
                      source={require("../../../../assets/images/backicon.png")}
                      style={{width:40,height:40}}
                      
                    />
                </TouchableOpacity>
            
           </View>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    //openChatWindow: user_id => dispatch(openChatWindow(user_id)),   
  };
}


Profile = connect(mapStateToProps,bindActions)(Profile);

export default Profile;
