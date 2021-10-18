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

class Details extends Component {
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

      ],
      isopen:false,
      isopen1:false,
      isopen2:false,
      isopen3:false,
      isopen4:false,
      isopen5:false,
      isopen6:false,
    };
    
  }

 

  componentWillUnmount(){
   
  }
 

 showdata=()=>{
  this.setState({
    isopen:true,
    isopen1:false,
    isopen2:false,
    isopen3:false,
    isopen4:false,
    isopen5:false,
    isopen6:false,
  })
 }
 showdata1=()=>{
  this.setState({
    isopen1:true,
    isopen:false,
    isopen2:false,
    isopen3:false,
    isopen4:false,
    isopen5:false,
    isopen6:false,
  })
 }
 showdata2=()=>{
  this.setState({
    isopen2:true,
    isopen:false,
    isopen1:false,
    isopen3:false,
    isopen4:false,
    isopen5:false,
    isopen6:false,
  })
 }
 showdata3=()=>{
  this.setState({
    isopen1:false,
    isopen:false,
    isopen2:false,
    isopen3:true,
    isopen4:false,
    isopen5:false,
    isopen6:false,
  })
 }
 showdata4=()=>{
  this.setState({
    isopen1:false,
    isopen:false,
    isopen2:false,
    isopen3:false,
    isopen4:true,
    isopen5:false,
    isopen6:false,
  })
 }
 showdata5=()=>{
  this.setState({
    isopen4:false,
    isopen5:true,
    isopen1:false,
    isopen:false,
    isopen2:false,
    isopen3:false,
    isopen6:false,
  })
 }
 showdata6=()=>{
  this.setState({
    isopen4:false,
    isopen5:false,
    isopen1:false,
    isopen:false,
    isopen2:false,
    isopen3:false,
    isopen6:true,
  })
 }
  renderdata=({item,index})=>{
    return(
      <View style={styles.boxmain}>
       <View style={styles.box}>
       <View style={{justifyContent:'center',alignItems:'center',}}>
                   <Image                      
                       source={require("../../../../assets/images/profilepic.png")}
                      style={{ width:deviceWidth/4, height: 100,paddingLeft:20}}
                      />
        </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:deviceWidth/1.7}}>
            <View>
           <Text style={styles.lefttext}> Name:</Text>
           <Text style={styles.lefttext}> Membership:</Text>
           <Text style={styles.lefttext}> Age:</Text>
           <Text style={styles.lefttext}> Locations:</Text>
           <Text style={styles.lefttext}> Educations:</Text>
           <Text style={styles.lefttext}> Occupation:</Text>
           <Text style={styles.lefttext}> Married Status:</Text>
           <Text style={styles.lefttext}> Regligion/Cast:</Text>
           </View>
           <View>
           
           <Text style={styles.righttext}> Name{item.Name}</Text>
           <Text style={styles.righttext}> Name{item.Membership}</Text>
           <Text style={styles.righttext}> Name{item.Age}</Text>
           <Text style={styles.righttext}> Name{item.Locations}</Text>
           <Text style={styles.righttext}> Name{item.Educations}</Text>
           <Text style={styles.righttext}> Name{item.Occupation}</Text>
           <Text style={styles.righttext}> Name{item.Status}</Text>
           <Text style={styles.righttext}> Name{item.Regligion}</Text>
           </View>
           </View>
           
       </View>
       <TouchableOpacity style={{margin:'2%',backgroundColor:'#ed1e79',justifyContent:'center',alignItems:'center',borderRadius:10}}>
               <Text style={{color:'#fff',padding:'2%'}}>View Complete Profile</Text>
           </TouchableOpacity>
      </View>
      )
  }

  render() {
   
    
    return (
      <Container style={{ backgroundColor: "#ed1e79" }}>
      <StatusBar barStyle="light-content"  backgroundColor="#ed1e79"/>
         
                  <Button transparent onPress={() =>Actions.Home()} style={{padding:'1%',backgroundColor:'#ed1e79',}}>
                      <Icon
                        name="md-arrow-back"
                        style={{ fontSize: deviceHeight/25, color: "#ffffff" }}
                      />
                        <Text style={{color:'#ffffff',fontSize:deviceHeight/30,paddingLeft:'30%',padding:'5%'}}> Details </Text>                            
                    </Button>
              
              <ScrollView style={{marginBottom:'10%'}}>
       <View>
         <Image                      
           source={require("../../../../assets/images/profilepic.png")}
          style={{ width:deviceWidth, height: deviceHeight/2,paddingLeft:20,margin:'3%'}}
          /> 
       </View>
       <View style={{justifyContent:'center',alignItems:'center'}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',width:deviceWidth/1.7}}>
            <View>
           <Text style={styles.lefttext1}> Name:</Text>
           
           <Text style={styles.lefttext1}> Age:</Text>
           
           <Text style={styles.lefttext1}> Married Status:</Text>
           
           </View>
           <View>
           <Text style={styles.righttext1}> Harrish</Text>
           
           <Text style={styles.righttext1}> 24</Text>
          
           <Text style={styles.righttext1}> Unmarringed</Text>
           
           </View>
        </View>
        </View>  
        <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:'2%'}}>
           <TouchableOpacity style={{
                                 borderColor:'#ffffff',borderWidth:1,
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10
                               }} onPress={()=>this.showdata()}>
               <Text style={{color:'#fff',padding:'3%'}}>Basic Informations</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{
                                 borderColor:'#ffffff',borderWidth:1,
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10
                               }} onPress={()=>this.showdata1()}>
               <Text style={{color:'#fff',padding:'3%'}}>Socio Religious Background</Text>
           </TouchableOpacity>
        </View>
        { this.state.isopen==true &&
            <View style={{
                                 backgroundColor:'#ffff',borderWidth:1,borderColor:'#ed1e79',
                                 justifyContent:'center',paddingLeft:'5%',
                                 alignItems:'center',borderRadius:10,paddingTop:'10%',marginLeft:'5%',marginRight:'5%',
                               }}>
                               
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Name:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Tarun</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Age(D.O.B):</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>29</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Height:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>6ft</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Weight:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>60kg</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Body type:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Slim</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Blood Group:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>O++</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Mother Tongue :</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Hindi</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Eating Habit :</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Non-Veg</Text>
                               </View>
               
           </View>
           
          }
          { this.state.isopen1==true &&
            <View style={{
                                 backgroundColor:'#ffff',borderWidth:1,borderColor:'#ed1e79',
                                 justifyContent:'center',paddingLeft:'5%',
                                 alignItems:'center',borderRadius:10,paddingTop:'10%',marginLeft:'5%',marginRight:'5%',
                               }}>
                               
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Religion:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Hindu</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Caste:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Hindu</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Star:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Does not matter</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Moonsign:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Does not matter</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Horoscope:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>No</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Sub caste:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Jatt</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Gothra :</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Singh</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Manglik :</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>No</Text>
                               </View>
               
           </View>
           
          }
        <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:'2%'}}>
           <TouchableOpacity style={{
                                 borderColor:'#ffffff',borderWidth:1,
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10
                               }} onPress={()=>this.showdata2()}>
               <Text style={{color:'#fff',padding:'3%'}}>Education and Professional Information</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{
                                 borderColor:'#ffffff',borderWidth:1,
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10
                               }} onPress={()=>this.showdata3()}>
               <Text style={{color:'#fff',padding:'3%'}}>About Me</Text>
           </TouchableOpacity>
        </View> 
        { this.state.isopen2==true &&
            <View style={{
                                 backgroundColor:'#ffff',borderWidth:1,borderColor:'#ed1e79',
                                 justifyContent:'center',paddingLeft:'5%',
                                 alignItems:'center',borderRadius:10,paddingTop:'10%',marginLeft:'5%',marginRight:'5%',
                               }}>
                               
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Education:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Mca</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Employed In:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Govt</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Occupation:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Developer</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Annual Income:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>12lakh</Text>
                               </View>
                               
           </View>
           
          }
          { this.state.isopen3==true &&
            <View style={{
                                 backgroundColor:'#ffff',borderWidth:1,borderColor:'#ed1e79',
                                 justifyContent:'center',paddingLeft:'5%',
                                 alignItems:'center',borderRadius:10,paddingTop:'10%',marginLeft:'5%',marginRight:'5%',
                               }}>
                               
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>About Me:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Middle family</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Hobbies & Interests:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Cooking ridding dancing watching</Text>
                               </View>
                               
               
           </View>
           
          }
        <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:'2%'}}>
           <TouchableOpacity style={{
                                 borderColor:'#ffffff',borderWidth:1,
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10
                               }} onPress={()=>this.showdata4()}>
               <Text style={{color:'#fff',padding:'3%'}}>Family Details</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{
                                 borderColor:'#ffffff',borderWidth:1,
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10
                               }} onPress={()=>this.showdata5()}>
               <Text style={{color:'#fff',padding:'3%'}}>Contact Details</Text>
           </TouchableOpacity>
        </View> 
        { this.state.isopen4==true &&
            <View style={{
                                 backgroundColor:'#ffff',borderWidth:1,borderColor:'#ed1e79',
                                 justifyContent:'center',paddingLeft:'5%',
                                 alignItems:'center',borderRadius:10,paddingTop:'10%',marginLeft:'5%',marginRight:'5%',
                               }}>
                               
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Family Values:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Family Type:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Father's Name:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Father's Occupation:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Mother's Name:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Mother's Occupation:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Family Status:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Ancestral Origin Total Brothers:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Married Brothers:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Total Sisters:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Married Sisters:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               
           </View>
           
          }
          { this.state.isopen5==true &&
            <View style={{
                                 backgroundColor:'#ffff',borderWidth:1,borderColor:'#ed1e79',
                                 justifyContent:'center',paddingLeft:'5%',
                                 alignItems:'center',borderRadius:10,paddingTop:'10%',marginLeft:'5%',marginRight:'5%',
                               }}>
                               
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Address:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>mohali</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Country:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>India</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>State:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>mohali</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Residing State:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>India</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Parent's Contact:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>**********</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Mobile:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>97635426***</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Time to call:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>1:10</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Email:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Example@yopmail.com</Text>
                               </View>
                               
               
           </View>
           
          }
         
           <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:'2%'}}>
           <TouchableOpacity style={{
                                 borderColor:'#ffffff',borderWidth:1,
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10
                               }} onPress={()=>this.showdata6()}>
               <Text style={{color:'#fff',padding:'3%'}}>Partner Expectations</Text>
           </TouchableOpacity>
           
        </View> 

         { this.state.isopen6==true &&
            <View style={{
                                 backgroundColor:'#ffff',borderWidth:1,borderColor:'#ed1e79',
                                
                                 borderRadius:10,paddingTop:'10%',marginLeft:'5%',marginRight:'5%',justifyContent:'center',paddingLeft:'5%',
                                 alignItems:'center',
                               }}>
                               
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Age Preference:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>23 to 26</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Height Between:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>5ft 2in to 5ft 5in</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Martial Status:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Unmarried</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Have Children:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>No</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Mother Tongue:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Chhattisgarhi, Hindi</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Religion:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Hindu</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Caste:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>satnami</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Education:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Any, B.A, B.Com</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Country Living in:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>India</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Complexion:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>satnami</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Income:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'2%'}}> 
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Resident Status:</Text>
                                  <Text style={{color:'#ed1e79',width:'50%'}}>Not Available</Text>
                               </View>
                               
               
           </View>
           
          }
       </ScrollView>
      </Container>
    );
  }
}



Details = reduxForm({
  
})(Details);

Details = connect(mapStateToProps)(Details);

export default Details;
