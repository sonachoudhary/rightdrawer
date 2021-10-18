import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,StatusBar,ImageBackground,StyleSheet ,FlatList,ScrollView} from "react-native";
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

class Plan extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    
    
  };
 timer = null;
  

  constructor(props) {
    super(props);
    

    this.state = {
      dataitem:[
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',}

      ]
    };
    
  }

 

  componentWillUnmount(){
   
  }
 
  renderdata=({item,index})=>{
    return(
      <View style={styles.boxmain}>
      

      </View>
      )
  }

  render() {
   
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" />
      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#ed1079',}}>
                   <Button transparent onPress={() =>Actions.Home()} style={{marginTop:'5%',marginBottom:'5%'}}>
                      <Icon
                        name="md-arrow-back"
                        style={{ fontSize: 28, color: "#ffff" }}
                      />
                        <Text style={{color:'#fff',fontSize:deviceHeight/40,textAlign:'center',padding:'5%'}}> My Plan </Text>                            
                    </Button>
              </View>
       <ScrollView>
               <View style={styles.firstview}>
                      <View style={{margin:'1%'}}>
                       <View style={styles.headerview}>
                          <Text style={styles.text}> DIAMOND PLAN</Text>
                       </View>
                       <View style={{backgroundColor:'#e6e6e6',}}>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Amount</Text>
                       <Text style={styles.normaltext2}> Rs 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Duration</Text>
                       <Text style={styles.normaltext2}> 184 days/</Text>
                       </View>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Contacts views</Text>
                       <Text style={styles.normaltext2}> 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Profile Views</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Personal Messages</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Special Offers</Text>
                       <Text style={styles.normaltext2}> 6 month</Text>
                       </View>
                      </View>
                      <View style={styles.btn}>
                         <Text style={{fontSize:20,color:'#000',padding:'3%'}}> BUY NOW</Text>
                      </View>
                      </View>
                       <View style={{margin:'1%'}}>
                       <View style={styles.headerview}>
                          <Text style={styles.text}> MINI PLAN</Text>
                       </View>
                       <View style={{backgroundColor:'#e6e6e6',}}>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Amount</Text>
                       <Text style={styles.normaltext2}> Rs 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Duration</Text>
                       <Text style={styles.normaltext2}> 184 days/</Text>
                       </View>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Contacts views</Text>
                       <Text style={styles.normaltext2}> 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Profile Views</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Personal Messages</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Special Offers</Text>
                       <Text style={styles.normaltext2}> 6 month</Text>
                       </View>
                      </View>
                      <View style={styles.btn}>
                         <Text style={{fontSize:20,color:'#000',padding:'3%'}}> BUY NOW</Text>
                      </View>
                      </View>
                       
               </View>
                <View style={styles.firstview}>
                      <View style={{margin:'1%'}}>
                       <View style={styles.headerview}>
                          <Text style={styles.text}> SILVER PLAN</Text>
                       </View>
                       <View style={{backgroundColor:'#e6e6e6',}}>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Amount</Text>
                       <Text style={styles.normaltext2}> Rs 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Duration</Text>
                       <Text style={styles.normaltext2}> 184 days/</Text>
                       </View>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Contacts views</Text>
                       <Text style={styles.normaltext2}> 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Profile Views</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Personal Messages</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Special Offers</Text>
                       <Text style={styles.normaltext2}> 6 month</Text>
                       </View>
                      </View>
                      <View style={styles.btn}>
                         <Text style={{fontSize:20,color:'#000',padding:'3%'}}> BUY NOW</Text>
                      </View>
                      </View>
                       <View style={{margin:'1%'}}>
                       <View style={styles.headerview}>
                          <Text style={styles.text}> GOLD PLAN</Text>
                       </View>
                       <View style={{backgroundColor:'#e6e6e6',}}>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Amount</Text>
                       <Text style={styles.normaltext2}> Rs 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Duration</Text>
                       <Text style={styles.normaltext2}> 184 days/</Text>
                       </View>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Contacts views</Text>
                       <Text style={styles.normaltext2}> 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Profile Views</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Personal Messages</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Special Offers</Text>
                       <Text style={styles.normaltext2}> 6 month</Text>
                       </View>
                      </View>
                      <View style={styles.btn}>
                         <Text style={{fontSize:20,color:'#000',padding:'3%'}}> BUY NOW</Text>
                      </View>
                      </View>
                       
               </View>
           <View style={styles.firstview}>
                      <View style={{margin:'1%'}}>
                       <View style={styles.headerview}>
                          <Text style={styles.text}> SUMMER PLAN</Text>
                       </View>
                       <View style={{backgroundColor:'#e6e6e6',}}>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Amount</Text>
                       <Text style={styles.normaltext2}> Rs 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Duration</Text>
                       <Text style={styles.normaltext2}> 184 days/</Text>
                       </View>
                       <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Contacts views</Text>
                       <Text style={styles.normaltext2}> 1800/</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Profile Views</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Personal Messages</Text>
                       <Text style={styles.normaltext2}> 1800</Text>
                       </View>
                        <View style={{width:'90%',justifyContent:'center',alignItems:'center',margin:'4%',borderBottomWidth:1,borderColor:'#b2b2b2'}}>
                       <Text style={styles.normaltext}> Special Offers</Text>
                       <Text style={styles.normaltext2}> 6 month</Text>
                       </View>
                      </View>
                      <View style={styles.btn}>
                         <Text style={{fontSize:20,color:'#000',padding:'3%'}}> BUY NOW</Text>
                      </View>
                      </View>
                       
                       
               </View>
       </ScrollView>

      </Container>
    );
  }
}



Plan = reduxForm({
  
})(Plan);

Plan = connect(mapStateToProps)(Plan);

export default Plan;
