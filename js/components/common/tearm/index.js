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
  };
}

class Tearm extends Component {
  

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      data:[{image:"../../../../assets/icon/Group_16379.png",subject:'Math',Class:'Class1'},{image:"../../../../assets/icon/Group_16379.png",subject:'Hindi',Class:'Class2'},{image:"../../../../assets/icon/Group_16379.png",subject:'English',Class:'Class3'},{image:"../../../../assets/icon/Group_16379.png",subject:'Science',Class:'Class5'},],
      data2:[{color:"#FFDCD6",Title:'AssignmentTittle',class:'class v',Time:'14:00-mon',desc:' this is project based on react and react js ,node and angular'},{color:"#FFE5AC",Title:'Assignment Tittle',class:'class v',Time:'14:00-mon',desc:' this is project based on react and react js ,node and angular'},{color:"#E6F6E2",Title:'Assignment Tittle',class:'class v',Time:'14:00-mon',desc:' this is project based on react and react js ,node and angular'},{color:"#E6F6E2",Title:'Assignment Tittle',class:'class v',Time:'14:00-mon',desc:' this is project based on react and react js ,node and angular'},{Title:'Assignment Tittle',class:'class v',Time:'14:00-mon',desc:' this is project based on react and react js ,node and angular'},{Title:'Assignment Tittle',class:'class v',Time:'14:00-mon',desc:' this is project based on react and react js ,node and angular'}],
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
      <TouchableOpacity onPress={()=>Actions.BarberHome()}>
       <View style={styles.Smallbox}>
                  <Image
                        source={require("../../../../assets/icon/Group_16379.png")}
                        style={{width:35,height:35}}
                    />

                 </View>
           <Text style={styles.textheading}>{item.subject}</Text>  
           <Text style={styles.subtext}>{item.Class}</Text>  
        </TouchableOpacity>         
               
    )
  };
  renderItem2 = ({item, index}) => {
    
    return (
      <TouchableOpacity onPress={()=>Actions.Task()} style={{backgroundColor:item.color,margin:10,width:154.13,height:152,borderRadius:10}}>
           
           <Text style={{fontSize:11,marginLeft:10,marginTop:10}}>{item.Time}</Text>  
           <Text style={{fontSize:14,fontWeight:'bold',color:'#000',marginLeft:5}}>{item.Title}</Text> 
            <Text style={{fontSize:11,marginLeft:10,marginTop:10}}>{item.class}</Text> 
            <Text style={{fontSize:11,marginLeft:10,marginTop:10}}>{item.desc}</Text>  
        </TouchableOpacity>         
               
    )
  };

  
  
  render() { 
   
    return(
      <Container style={{ backgroundColor: "#470B63" }}>
          
          <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "#fff", }} ref={(ref) => { this.scrollListReftop = ref; }}>
              <View style={{ backgroundColor: "#470B63", }}>
              <View style={{ marginTop:45,}} >
               <View style={{ flexDirection:'row', justifyContent:'flex-start',marginLeft:20}} >
                 
                  <View style={{ justifyContent:'center', marginLeft:10 }} >
                    <Text style={{ color:"#E8E8E8", fontSize:18, fontFamily:'Cabin-Bold'  }}>
                      Hi ,{this.props.user.name}
                    </Text> 
                    <Text style={{ color:"#E8E8E8", fontSize:13, fontFamily:'Cabin-Bold'  }}>
                      Welcome Back
                    </Text>                    
                  </View>
                </View>
                  <TouchableWithoutFeedback onPress={() => this.props.navigation.openDrawer() }>
                    <Image                      
                      source={require("../../../../assets/menu.png")}
                      style={{ width:30, height: 17, position:'absolute', right:10 , backgroundColor:'#470B63',}}
                    />                          
                  </TouchableWithoutFeedback>
                  
                  
              </View>

              <View style={{ flexDirection:'row', justifyContent:'center', marginTop:5, marginBottom:30,borderColor:'#fff',backgroundColor:'#fff',marginLeft:40,marginRight:20,borderRadius: 10,}} >
                  <Input value = "Search..." style={{  color:'#707070', height:34, width:336, marginLeft:20, marginRight:20, fontSize:14, fontFamily:"Cabin-Regular", opacity:0.7,marginBottom:10 ,}} />
                  <Icon style={{paddingRight:20,paddingTop:7}} name="ios-search" size={20} color="#000"/>             
              </View>
              <View>

              <Text style={{ color:"#E8E8E8", fontSize:14,fontFamily:'Cabin-Regular' ,fontWeight:'bold',marginLeft:30,marginTop:-5 }}>
                          All Feeds                    
              </Text>
              </View>

                 <View style={styles.box}>
                 <View style={{width:'60%'}}>
                       <Text style={styles.textheading}>
                          School                      
                        </Text>
                         <Text style={{color:"#484347", fontSize:15,fontWeight:'bold',marginLeft:30}}>
                          BoardCast                     
                        </Text>
                        <Text style={styles.subtext}>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing elit  Lorem ip                 
                        </Text>
                         <Button
                          style={{backgroundColor:'#DB4C7B',width:88,borderRadius:90,height:26,marginLeft:20,marginTop:10,paddingBottom:5}}
                          onPress={ ()=> Actions.feedback() }
                          >
                         <Text style={{ color: "#fff", fontSize: 11,textalign:'center', }}> View All</Text>
                        </Button>
                 </View>
                 <View style={{width:'40%'}}>
                  <Image
                         source={require("../../../../assets/images/Group_16982.png")}
                         style={{ width:148.04, height: 100.71 }}
                    />

                  </View>
                </View>
               
                <View style={styles.text} onPress={()=>Actions.CustomerHome()}>
                <Text style={{ color:"#000", fontSize:14,fontWeight:'bold',marginLeft:30,marginTop:100,}}>My Subject</Text>
               
                <FlatList
                   
                  style={{ margin:10}}
                  data={this.state.data}
                  extraData={this.state}
                  numColumns={4}
                   renderItem={this.renderItem}
                  
                  
                />
                  <View style={{borderTopWidth:1,borderColor:'gray',}}>
                  <Text style={{ color:"#000", fontSize:14,fontWeight:'bold',marginLeft:30,marginTop:5,}}>Submitted Assigment</Text>
                  <FlatList
                  horizontal={true}
                  style={{ margin:10}}
                  data={this.state.data2}
                  extraData={this.state}
                   renderItem={this.renderItem2}
                  
                />
                
                 </View>
                </View>
                
              </View>     

            </ScrollView>
            

            <View style={{ width: deviceWidth, height: 66, backgroundColor: "#2A3439", flexDirection:'row', justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                
                <TouchableWithoutFeedback onPress={() => Actions.CustomerHome()}>
                <View style={{ justifyContent:'center', borderRightWidth:1, borderRightColor:'#000000', backgroundColor: "#392F2A",alignItems:'center', width:deviceWidth/2 }} onPress={() => Actions.CustomerHome() } >
                    <Image
                      source={require("../../../../assets/icon/home.png")}
                      style={{ width:20, height: 18  }}
                    />
                    <Text style={{fontSize:10, color:'#FFFFFF',paddingTop:10,fontWeight:"bold"}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.profile()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/2 }} >
                    <Image
                      source={require("../../../../assets/icon/usercopy.png")}
                      style={{ width:20, height: 20  }}                       
                    />
                    <Text style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>My Profile</Text>
                </View>   
                </TouchableWithoutFeedback>                 
            </View>                

          </View>
          
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Tearm);
