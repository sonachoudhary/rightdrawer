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
  Input,

} from "native-base";
import { Actions } from "react-native-router-flux";
import * as appStateSelector from "../../../reducers/driver/appState";
//import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin";
import AsyncStorage from '@react-native-community/async-storage';

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
import Modal from "react-native-modal";
import IconBadge from 'react-native-icon-badge';

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
  console.log('state.driver.appState',state.driver);
  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    userDetail: state.driver.user,
    user_id: state.driver.user._id,
  };
}

class Profile extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    
    
  };

  

  constructor(props) {
    super(props);
    const idLogedid =  this.props.userDetail._id;
    this.state = {
      socialLogin: null,
      showforgotpanel:false,
      loading: true,
      heading: "RIDER LOCATION ARRIVED",
      displaylabel:'',
      showView: true,
      forgotemail:'',
      showtimer:0,
      timer:10,
      loggedInUserId: idLogedid,
      modalVisible: false,
      showmodalOpacity:1,
      notcount:0
    };

    
  }
    componentDidMount() {this.notificationcount(this.props.user_id); }

  async componentWillMount() {
       var touropen = await AsyncStorage.getItem('touropen');
       
        if(touropen!="0"){
          this.setState({ modalVisible: true,showmodalOpacity:0 });
        }
  }

  opennext(){
    
    this.setState({ modalVisible: false,showmodalOpacity:1 });
    Actions.preferencelist();
  }
  state = {
    showError: false
  };

  submit(values) {
    this.props.dispatch(signinAsync(values, this.state.customer));  
   
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
      Actions.match();
    }
  }
  

  notificationcount(user_id){
      var today = new Date();
      const userEmail = { user_id: user_id,time:today  };
      fetch(`${config.serverSideUrl}:${config.port}/api/users/unreadnotificaitoncount`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail)
      })
      .then(response => response.json())
      .then(data => { 
        this.setState({notcount:data.notificationdatalist.length});
      })
      .catch(error => { });
  }

  render() {
     var today = new Date();
      var hh = today.getHours();
      var mm = today.getMinutes();
      var ss = today.getSeconds();

      if(hh<10) { hh='0'+hh; } 
      if(ss<10) { ss='0'+ss; } 
      if(mm<10) { mm='0'+mm; } 
     var showtime = hh + ":" + mm + ":" + ss;
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
      <StatusBar barStyle="light-content" />
        { this.state.loggedInUserId != undefined &&
         <View style={{marginTop:45,marginLeft:10,position:'absolute',right:10}}>
             <TouchableOpacity onPress={() => Actions.notifications()}>
               <IconBadge
                  MainElement={
                    <Image source={require("../../../../assets/images/notification.png")} style={{width:22,height:24,marginTop:8,marginRight:10}} />
                  }
                  BadgeElement={
                    <Text style={{color:'#FFFFFF',fontSize:10,fontFamily:'ProximaNova-Bold'}}>{this.state.notcount}</Text>
                  }
                  IconBadgeStyle={
                    {width:15,
                    height:20,
                    backgroundColor: '#FF0000',borderWidth:2,borderColor:'#008000'}
                  }
                  Hidden={this.state.notcount==0}
              />
              </TouchableOpacity>
        </View>
      }
       <View style={{marginTop:deviceHeight/3-10,justifyContent:'center',alignItems:'center'}}>
              <View style={{marginBottom:20,opacity:this.state.showmodalOpacity}}>
                 <View style={{shadowColor: 'rgba(245, 68, 98, .8)',shadowOffset: { height:0, width: 2 },shadowOpacity: 1,shadowRadius: 5,elevation: 10}}>
                  <TouchableOpacity onPress={() => this.showtimerdata()}>
                  <Image
                          style={{width:138,height:136}}
                          resizeMode="contain"
                          source={require("../../../../assets/images/heptagon-glow.png")}
                          
                        />
                  </TouchableOpacity> 
                  </View>
                    { this.state.showtimer==0 ?
                      <View style={{backgroundColor:'#1A1A1A'}}>
                       <TouchableOpacity onPress={() => this.showtimerdata()}>
                        <Text style={{fontSize:46,color:'#ffffff',lineHeight:70,fontFamily:'ProximaNova-Bold',padding:10,marginTop:-107,marginLeft:28}}>GO</Text>
                      </TouchableOpacity>
                      </View>
                      :
                      <View>
                       {this.state.timer==10 ?
                        <Text style={{fontSize:50,color:'#ffffff',fontFamily:'ProximaNova-Bold',padding:10,marginTop:-102,marginLeft:38}}>{this.state.timer}</Text>
                        :
                        <Text style={{fontSize:50,color:'#ffffff',fontFamily:'ProximaNova-Bold',padding:10,marginTop:-102,marginLeft:47}}>{this.state.timer}</Text>
                       }
                      </View>
                    }

              </View>
              <View>
                <Text style={{fontSize:36,color:'#ffffff',fontFamily:'ProximaNova-Regular'}}>{showtime}</Text>
              </View>
       </View>
        <Footer /> 
       
       <Modal
            animationType="slide"
            backdropOpacity={0.8}
            isVisible={this.state.modalVisible}
            coverScreen={false}
            >
              <View style={styles.modalView}>
                  <View style={{marginTop:-deviceHeight/3.3,justifyContent:'center',alignItems:'center',width:deviceWidth}}>
                    <Text style={{fontSize:20,lineHeight:24,color:'#ffffff',fontFamily:'ProximaNova-Bold'}}>Between 9 - 10 PM</Text>
                    <Text style={{fontSize:20,lineHeight:24,color:'#ffffff',fontFamily:'ProximaNova-Bold',marginBottom:5}}>Tap Go to join a pool!</Text>
                    <TouchableOpacity onPress={() => this.opennext()}>
                    <Image
                          style={{width:38,height:50}}
                          resizeMode="contain"
                          source={require("../../../../assets/images/arrow.png")}
                          onPress={() => this.opennext()}
                    />
                    </TouchableOpacity>
                  </View>
                  <View style={{shadowColor: 'rgba(245, 68, 98, .8)',shadowOffset: { height:1, width: 4 },shadowOpacity: 1,shadowRadius: 5,elevation: 5}}>
                    <TouchableOpacity onPress={() => this.opennext()}>
                    <Image style={{width:140,height:144}} resizeMode="contain" source={require("../../../../assets/images/heptagon-glow.png")} /> 
                    </TouchableOpacity>
                  </View>
                  
                    <View style={{backgroundColor:'#1A1A1A'}}>
                      <TouchableOpacity onPress={() => this.opennext()}>
                        <Text style={{fontSize:52,color:'#ffffff',lineHeight:80,fontFamily:'ProximaNova-Bold',padding:10,marginTop:-115,marginLeft:10}}>GO</Text>
                      </TouchableOpacity>
                    </View>
                  
              </View>
          </Modal>

      </Container>
    );
  }
}



Profile = reduxForm({
  form: "loginForm", // a unique name for this form
  validate
})(Profile);

Profile = connect(mapStateToProps)(Profile);

export default Profile;
