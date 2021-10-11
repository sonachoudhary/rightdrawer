import { Actions, ActionConst } from "react-native-router-flux";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo,
  AsyncStorage,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity
} from "react-native";
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
  Body,
  Toast,
  Spinner,
  Thumbnail,
  Grid,
  Col,Input
} from "native-base";
import PropTypes from "prop-types";


import { setActiveLogin } from "../../../actions/common/entrypage";
import { barberAppointments } from "../../../actions/common/signin";
import { checkSubscription } from "../../../actions/common/all";
import { acceptAppointment, rejectAppointment, upcomingBooking, setUserLocationNew, startWalkForAppointment, deleteAppointment, getNotificationList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";

import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { selectRole } from '../../../actions/common/register';
import GetLocation from 'react-native-get-location'
import { schoolboardcaste } from "../../../actions/common/signin";
import  Footernew  from "../../../components/footernew";
  
function mapStateToProps(state) {
 
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    user: state.driver.user,
    appointmentList: state.booking.appointmentList,
    profileUrl: state.driver.user.profileUrl,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    homeworkdata:state.driver.user.homework,
    username:state.driver.user.teacherinfo,
    schooldata:state.driver.user.schooldata,
    schoolid:state.driver.user.schoollogin.schoolid,
  };
  
}

class SchoolHome extends Component {
  

  constructor(props) {
    super(props);
   
    this.state = {
      loading: true,
      teacherboarddata:this.props.teacherboard,
      data:[{image:"../../../../assets/icon/Group_16379.png",subject:'Math',Teacher:'Gurmit'},{image:"../../../../assets/images/hindi1.png",subject:'Hindi',Teacher:'Guroue'},{image:"../../../../assets/images/hindi2.png",subject:'English',Teacher:'Hardeep'},{image:"../../../../assets/images/hindi3.png",subject:'Science',Teacher:'Aman'},{image:"../../../../assets/images/hindi4.png",subject:'Computer',Teacher:'Ankur'},{image:"../../../../assets/images/hindi5.png",subject:'Social Science',Teacher:'Asha'}],
      data2:[{image:"../../../../assets/icon/Group_16886.png",Text:'Bus Tracks'},{image:"../../../../assets/images/hindi6.png",Text:'Feeds'},{image:"../../../../assets/images/hindi7.png",Text:'Events'},{image:"../../../../assets/images/hindi8.png",Text:'Quiz'}],
      data3:[{Text:'Event'},{Text:'Event'},{Text:'Event'},{Text:'Event'}],
      customer: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      showModal:false,
      bookings: this.props.appointmentList,
      modalUserName: undefined,
      modalAppointmentId: undefined,
      modalProfileUrl: undefined,
      status:0,
      isCompleted:undefined,
      isConfirmed:undefined
    };
    
  }
  
  componentDidMount(){
    
  
    
    this.props.schoolboardcaste(this.props.jwtAccessToken,this.props.schoolid)
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        
        this.props.setUserLocationNew(location)
    })
    .catch(error => {
        const { code, message } = error;
        console.warn('getCurrentPosition error-', message);
    })
    
    
  }

  _handleConnectionChange = isConnected => {
    this.props.connectionState({ status: isConnected });
  };
  openInfo(item) {
    
    this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true})
    this.setState({
      showModal: true,
      modalUserName: item.name,
      modalAppointmentId: item.appointment_id,
      services: item.services,
      time: item.time,
      appointment_status: item.status,
      isCompleted: item.isCompleted,
      isConfirmed: item.isConfirmed
    })
  }

  acceptAppointment(id){
    this.setState({
      showModal: false,
    })
    this.props.acceptAppointment(id)
    this.props.barberAppointments(this.props.user._id)
  }

  callBooking(){
    this.props.upcomingBooking(this.props.user._id)
  }

  deleteAppointment(id){
    this.setState({
      showModal: false,
    })
    this.props.deleteAppointment(id);
   
  }

  startWalk(){  
    this.props.startWalkForAppointment(this.state.modalAppointmentId); 
  }

  renderItem = ({item, index}) => {
   
  
     
    return (
      <TouchableOpacity onPress={()=>Actions.Homework()}>
       <View style={styles.Smallbox}>
                { index==0 && <Image source={require("../../../../assets/icon/Group_16379.png")} style={{width:35,height:35}} /> }
                { index==1 && <Image source={require("../../../../assets/images/hindi1.png")} style={{width:35,height:35}} /> }
                { index==2 && <Image source={require("../../../../assets/images/hindi2.png")} style={{width:35,height:35}} /> }
                { index==3 && <Image source={require("../../../../assets/images/hindi3.png")} style={{width:35,height:35}} /> }
                { index==4 && <Image source={require("../../../../assets/images/hindi4.png")} style={{width:35,height:35}} /> }
                { index==5 && <Image source={require("../../../../assets/images/hindi5.png")} style={{width:35,height:35}} /> }

                 </View>
           <Text style={{color:"#484347", fontSize:15,fontWeight:'600',marginLeft:30}}>{item.subject}</Text>  
           <Text style={{color:"#000", fontSize:11,fontWeight:'600',width:'60%',marginLeft:30,marginTop:10}}>{item.teacher}</Text>  
        </TouchableOpacity>         
               
    )
  };
  renderItem2 = ({item, index}) => {
   
    return (
      <TouchableOpacity onPress={()=>Actions.TrainerGeoFence()}>
      <View>
              <View style={styles.Smallbox}>
                { index==0 && <Image source={require("../../../../assets/images/Group_16886.png")} style={{width:35,height:35}} /> }
                { index==1 && <Image source={require("../../../../assets/images/hindi6.png")} style={{width:35,height:35}} /> }
                { index==2 && <Image source={require("../../../../assets/images/hindi7.png")} style={{width:35,height:35}} /> }
                { index==3 && <Image source={require("../../../../assets/images/hindi8.png")} style={{width:35,height:35}} /> }

              </View>
                 
             <Text style={styles.subtext,{paddingTop:10,marginLeft:25}}>{item.Text}</Text>
       
           
        </View>         
      </TouchableOpacity>     
    )
  };
 renderItem3 = ({item, index}) => {
    
    return (
      <View style={{backgroundColor:'#fff',borderRadius:20,width:300,height:150,marginLeft:30,flexDirection:'row'}}>
              <View style={{width:'40%',marginTop:10}}>
                       <Text style={{color:"#484347", fontSize:13,fontWeight:'600',marginLeft:30}}>
                          {item.title}                     
                        </Text>
                         
                        <Text style={styles.subtext}>
                         {item.message}              
                        </Text>
                         <Button
                          style={{backgroundColor:'#DB4C7B',width:88,borderRadius:90,height:26,marginLeft:20,marginTop:10,paddingBottom:5}}
                         
                          >
                         <Text style={{ color: "#fff", fontSize: 11,textalign:'center', }}> View All</Text>
                        </Button>
                 </View>
                 <View style={{width:'40%',marginTop:15}}>
                  <Image
                         source={require("../../../../assets/images/Group_16982.png")}
                         style={{ width:148.04, height: 100.71 }}
                    />

                  </View>        
               </View>
    )
  };

  
  
  render() { 
  
    return(
      <Container style={{ backgroundColor: "#fff" }}>
          
          <Content style={{ flex: 1 ,marginTop:50}}>
          <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: deviceWidth, height: deviceHeight-450, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray' }}> 
              
            
              
              <TouchableWithoutFeedback onPress={() => this.props.navigation.openDrawer()}>
                    <Image                      
                      source={require("../../../../assets/images/Group_16691.png")}
                      style={{ width:30.08, height: 30.08, position:'absolute', left:10 , backgroundColor:'#FFDEDB',marginTop:20,marginLeft:17,}}
                    />                          
                  </TouchableWithoutFeedback>
              <View style={{ marginTop:45,}} >
               
               <View style={{ flexDirection:'row', justifyContent:'space-between',marginLeft:20}} >
                 
                  <View style={{ justifyContent:'center', marginLeft:10 }} >
                   {this.props.username && <Text style={{ color:"#484347", fontSize:18, fontFamily:'Cabin-Bold'  }}>
                      Hi ,{this.props.username.name}
                    </Text> 
                  }
                    <Text style={{ color:"#484347", fontSize:13, fontFamily:'Cabin-Bold'  }}>
                      Welcome Back
                    </Text>                    
                  </View>
                 
                </View>
                 
                  
                  
              </View>

               
              <View style={{position:'absolute',top:90,bottom:5}}>

              <Text style={{ color:"#484347", fontSize:14,fontFamily:'Cabin-Regular' ,fontWeight:'bold',marginLeft:30,marginTop:15 }}>
                   Feed                       
              </Text>
             
                <View style={{}}>
                 <FlatList
                   horizontal={true}
                    style={{ margin:10}}
                  data={this.props.schooldata}
                  extraData={this.props}
                  
                   renderItem={this.renderItem3}
                 />
                </View>
                 </View>
                </ImageBackground>
               
                <View style={{marginTop:20}}>
                <TouchableOpacity>
                <Text style={{ color:"#000", fontSize:14,fontWeight:'bold',marginLeft:30,}}>HomeWorks</Text>
               </TouchableOpacity>
                <FlatList
                   
                  style={{ margin:10}}
                  data={this.state.data}
                  extraData={this.state}
                  numColumns={4}
                   renderItem={this.renderItem}
                  
                  
                />
                  <View style={{borderTopWidth:1,borderColor:'gray',flexDirection:'row',}}>
                  
                          <TouchableOpacity style={styles.eventsbox} onPress={()=>Actions.TrainerGeoFence()}>
                             <Image source={require("../../../../assets/images/Group_16886.png")} style={{width:35,height:35}} /> 
                             <Text style={{color:"#707070", fontSize:12,paddingTop:10,fontWeight:'bold'}}>Bus Tracks</Text>

                          </TouchableOpacity>
                           <TouchableOpacity style={styles.eventsbox} onPress={()=>Actions.Schoolfeedback()}>
                             <Image source={require("../../../../assets/images/hindi6.png")} style={{width:35,height:35}} /> 
 
                             <Text style={{color:"#707070", fontSize:12,paddingTop:10,fontWeight:'bold'}}>Feeds</Text>

                          </TouchableOpacity>
                           <TouchableOpacity style={styles.eventsbox} onPress={()=>Actions.Calender()}>
                             <Image source={require("../../../../assets/images/hindi7.png")} style={{width:35,height:35}} /> 
                             <Text style={{color:"#707070", fontSize:12,paddingTop:10,fontWeight:'bold'}}>Events</Text>

                          </TouchableOpacity>
                           <TouchableOpacity style={styles.eventsbox} onPress={()=>Actions.Teacherquiz()}>
                             <Image source={require("../../../../assets/images/hindi8.png")} style={{width:35,height:35}} />
                             <Text style={{color:"#707070", fontSize:12,paddingTop:10,fontWeight:'bold'}}>Assignments</Text>

                          </TouchableOpacity>
                 
                        
                 </View>
               </View>          
           </Content>
          <Footernew />
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
     schoolboardcaste:(data,schoolid)=>dispatch(schoolboardcaste(data,schoolid)),
    
     
       
   
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(SchoolHome);
