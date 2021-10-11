import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,StatusBar,ImageBackground,StyleSheet } from "react-native";
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
import Footer from "../footer";
import Modal from "react-native-modal";
import Contacts from 'react-native-contacts';

//import DeviceInfo from 'react-native-device-info';
import { emit } from "../../../services/socket";
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft:30,
    fontFamily:'ProximaNova-Regular',
    color: '#000000',
    textAlign:'center',
    opacity:0.9,
    height:50,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginTop:-3,
    lineHeight:25,
    textAlign:'center',
    
    width:deviceWidth-250,
    marginLeft:(deviceWidth-250) /3,
    fontFamily:'ProximaNova-Regular',
    height:50,
    opacity:0.8,
    color: '#000000',
    paddingRight: 0, // to ensure the text is never behind the icon
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
  console.log('state.driver.appState',state.app);
  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    setgenderchoice:state.driver.user.setgenderchoice,
    userDetail: state.driver.user,
    gender: state.driver.user.gender,
    uuid : state.app&&state.app.uuid,
    user_id: state.driver?.user?._id
  };
}

class Profile extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    
    
  };
 timer = null;
  

  constructor(props) {
    super(props);
    const idLogedid =  this.props.userDetail._id;
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();

    if(hh<10) { hh='0'+hh; } 
    if(ss<10) { ss='0'+ss; } 
    if(mm<10) { mm='0'+mm; } 
    var showtime = hh + ":" + mm + ":" + ss;

    this.state = {
      socialLogin: null,
      showforgotpanel:false,
      loading: true,
      heading: "RIDER LOCATION ARRIVED",
      gender:(this.props.gender) ? this.props.gender : 'Male',
      displaylabel:'',
      showView: true,
      forgotemail:'',
      showtimer:0,
      timer:15,
      loggedInUserId: idLogedid,
      clocktimer:'',
      alertmodalVisible:false,
      modalVisible: false,
      showmodalOpacity:1,
      dsplaytime:showtime,
      roomsOrder: [0,1,2,3,4,5,6],
    };
    this.props.dispatch(getremaningtimer(119));
    this.props.dispatch(setlistorder(this.state.roomsOrder));
    this.props.dispatch(getpooldata());
  }

  componentDidMount(){
        if(this.state.loggedInUserId == undefined && this.props.setgenderchoice==undefined){
          this.setState({alertmodalVisible:true}) 
        }
      this.clocktimer = setInterval(() => {
          console.log('cehck always working');
          let {clocktimer} = this.state;
          this.setState({clocktimer:clocktimer+1});
      }, 1000);
      
  }

  getcontact(){
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      console.log('contacts',contacts);
    })
  }
  async componentWillMount() {
       var touropen = await AsyncStorage.getItem('touropen');
       
        if(touropen!="0"){
          this.setState({ modalVisible: true,showmodalOpacity:0 });
        }

        
  }
  closedata(){
    this.setState({alertmodalVisible:false});
    this.props.dispatch(setgenderchoice(this.state.gender));
  }
  opennext(){
    
    this.setState({ modalVisible: false,showmodalOpacity:1 });
    //Actions.preferencelist();
  }
  state = {
    showError: false
  };

  submit(values) {
    this.props.dispatch(signinAsync(values, this.state.customer));
  }

  componentWillUnmount(){
    clearInterval(this.clocktimer);
  }
 
  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  
  showtimerdata(){

    const {uuid, user_id} = this.props;
    console.log("uuid uuid ", uuid)
    this.setState({showtimer:1});
    this.timer = setInterval(() => {
      let {timer} = this.state;
      this.setState({timer:timer-1});
      if(timer===15-1){
        if(this.state.gender=='Male') { var gender = 'Female'; }else { var gender = 'Male'; }
        emit('create-new-pool', {uuid,_id:user_id,skip:false,gender:gender});

      }
      if(timer<=0){
        this.setState({timer:15});
        clearInterval(this.timer);
        Actions.preferencelist();
      }
    }, 1000);
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
         <View style={{marginTop:50,marginLeft:10,position:'absolute',right:10}}>
             <TouchableOpacity onPress={() => Actions.notifications()}>
              <Image source={require("../../../../assets/images/notification.png")} style={{width:22,height:26}} />
              </TouchableOpacity>
        </View>
      }
       <View style={{marginTop:deviceHeight/2-115,justifyContent:'center',alignItems:'center',width:deviceWidth}}>
              <View style={{marginBottom:20,opacity:this.state.showmodalOpacity}}>
                  <TouchableOpacity>
                    <View style={{alignItems: 'center',justifyContent: 'center'}}>
                      <ImageBackground
                        source={require("../../../../assets/images/heptagon-glow.png")}
                        style={{width:138,height:138,alignItems: 'center',justifyContent:'center',flexGrow:1}}
                      >
                        { this.state.showtimer==0 ?
                          <TouchableOpacity onPress={() => this.showtimerdata()}>
                            <Text style={{paddingTop:5,paddingLeft:5,fontSize:130*pr,color:'#ffffff',fontWeight:'400',fontFamily:'ProximaNova-Bold',textAlign: 'center',shadowOpacity:0}}>GO</Text>
                          </TouchableOpacity>
                        :
                           <Text style={{paddingTop:5,fontSize:134*pr,color:'#ffffff',fontFamily:'ProximaNova-Bold',fontWeight:'400'}}>{this.state.timer}</Text>
                        }
                      </ImageBackground>
                       <View style={{alignItems: 'center',justifyContent:'center',marginTop:20}}>
                         <Text style={{fontSize:112*pr,color:'#ffffff',fontFamily:'ProximaNova-Regular'}}>{showtime}</Text>
                      </View>
                    </View>
                  </TouchableOpacity> 
              </View>
             
              
       </View>
        <Footer /> 
       
       <Modal
            animationType="slide"
            backdropOpacity={0.4}
            isVisible={this.state.alertmodalVisible}
            coverScreen={false}
            >
              <View style={styles.modalView}>
                <View style={{borderRadius:10,backgroundColor:'#ffffff',width:deviceWidth-100,height:220}}>

                  <View style={{marginTop:30,marginBottom:20,justifyContent:'center',alignItems:'center',width:deviceWidth-100}}>
                    <Text style={{fontSize:20,lineHeight:24,color:'#000000',fontFamily:'ProximaNova-Bold'}}>Interested In</Text>
                  </View>
                    <View style={{width:deviceWidth-100,alignItems: 'center',justifyContent: 'center',}}>
                  <View style={{width:deviceWidth-150,alignItems: 'center',justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#b3b3b3'}}>
                     <RNPickerSelect
                            placeholder={{label: 'Select Gender',value: null,color:'#000000'}}
                            style={pickerSelectStyles}
                            value={this.state.gender}
                            onValueChange={ (value) => ( this.setState({gender: value}) ) }
                            items={[
                              { label: 'Male', value: 'Female' ,color:'#000000'},
                              { label: 'Female', value: 'Male',color:'#000000' },
                            ]}
                        />
                    </View>
                    </View>
                     <View style={{width:deviceWidth-100,alignItems: 'center',justifyContent: 'center',marginTop:20}}>
                        <TouchableOpacity onPress={() => this.closedata()}>
                            <View style={styles.regBtn2}>
                                <Text  style={{ color: '#fff', textAlign:'center', fontSize:18,fontFamily:'ProximaNova-Bold',lineHeight:18,paddingTop:10, }}>Okay</Text>
                            </View>
                        </TouchableOpacity>
                     </View>
                  </View>
              </View>
          </Modal>

       <Modal
            animationType="slide"
            backdropOpacity={0.8}
            isVisible={this.state.modalVisible}
            coverScreen={false}
            >
              <View style={styles.modalView}>
                  <View style={{marginTop:deviceHeight/2-95,justifyContent:'center',alignItems:'center',width:deviceWidth}}>
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
                  <View>
                    <TouchableOpacity onPress={() => this.opennext()}>
                    <View style={{alignItems: 'stretch',justifyContent: 'center'}}>
                      <ImageBackground
                        source={require("../../../../assets/images/heptagon-glow.png")}
                        style={{width:140,height:144,alignItems: 'center',justifyContent:'center',flexGrow:1}}
                      >
                          <Text style={{paddingTop:5,fontSize:130*pr,color:'#ffffff',fontFamily:'ProximaNova-Bold',textAlign: 'center',shadowOpacity:0}}>GO</Text>
                      </ImageBackground>
                    </View>
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
