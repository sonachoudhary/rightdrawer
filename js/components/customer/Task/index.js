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
  TouchableOpacity,BackHandler
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

import CalendarStrip from "react-native-calendar-strip";

import { setActiveLogin } from "../../../actions/common/entrypage";
import { barberAppointments } from "../../../actions/common/signin";
import { checkSubscription } from "../../../actions/common/all";
import { acceptAppointment, rejectAppointment, upcomingBooking, setUserLocationNew, startWalkForAppointment, deleteAppointment, getNotificationList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import SplashScreen from "react-native-splash-screen";
import { Calendar } from 'react-native-toggle-calendar';
import config from "../../../../config.js";

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

import  Footer  from "../../../components/footer";
  
function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    username:state.driver.user.teacherinfo,
     jwtAccessToken: state.driver.appState.jwtAccessToken,
     userid:state.driver.user.teacherlogin.teacherid,
     
   
  };
}

class Task extends Component {
  

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      Events:[],
      futureEvents:[],
      selectedDate: moment().format('YYYY-MM-DD'),
    };
    
  }
  
   componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  componentDidMount(){
   this.displayevents(this.state.selectedDate);
    
  }


 displayevents(date){

  var userid=this.props.userid;
  var jwtAccessToken=this.props.jwtAccessToken;

      fetch(`${config.serverSideUrl}/getteacherevents/${userid}/${date}`,{
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
     })
    .then(resp => resp.json())
    .then(data => {
      
        if(data!=null){
           this.setState({Events:data.current});
          this.setState({futureEvents:data.future});
        }
            
    })
    .catch(e => {
       //alert( e,'e errer')
                
    });
     // this.props.TeachersubjectList(this.props.jwtAccessToken,this.props.userid,itemValue)
  
  
  }
  

  renderItem = ({item, index}) => {
    
    return (
      <TouchableOpacity>
      
           <Text style={styles.textheading2}>{item.month}</Text>  
           <Text style={styles.textheading}>{item.date}</Text> 
           <Text style={styles.textheading2}>{item.day}</Text>  
        </TouchableOpacity>         
               
    )
  };
  renderItem2 = ({item, index}) => {
     var getcurrentdate = moment(item.start).format('YYYY-MM-DD');
     var color='#D9E8FB';
     var Time=moment(item.created_at).format('hh:mm-ddd')
     if(index%2==0){
       color='#DCEEE0'
     }
    
     var Time=moment(item.start).format("hh:mm-ddd")
     var start=moment(item.start).format("DD-MM-yyyy")

     
        
    return (
      <View>
     
      <TouchableOpacity  style={{backgroundColor:color,margin:10,width:154.13,height:152,borderRadius:10}}>
           
           <Text style={{fontSize:11,marginLeft:10,color:'#000',marginTop:10}}>{start}</Text>  
           <Text style={{fontSize:14,fontWeight:'bold',color:'#000',marginLeft:10,marginTop:10}}>{item.title}</Text> 
           <Text style={{fontSize:11,marginLeft:10,color:'#000',marginTop:20}}>{item.className}</Text> 
           <Text style={{fontSize:11,marginLeft:10,color:'#000',marginTop:20}}>{item.details}</Text>  
        </TouchableOpacity> 

        
         </View>       
               
    )
  
  };
renderItem3 = ({item, index}) => {
    
 
    var Time=moment(item.start).format("hh:mm")
    var Time1=moment(item.start).format("ddd")
    var start=moment(item.start).format("DD MMM");
    return (
      <View>
     
      <TouchableOpacity  style={styles.list1}>
          <View style={styles.innnerlist}>
              <Text style={styles.textstyle}>{Time}</Text>
              <Text style={styles.textstyle}>{Time1}</Text>  
              
           </View>
           <View style={{width:deviceWidth/1.5,}}>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={styles.textheading}>{item.title}</Text> 
                 <Text style={styles.textheading2}>{start}</Text> 
              </View>
              <Text style={{fontSize:11,marginLeft:10,color:'#000',marginTop:10,marginLeft:30}} >{item.details}</Text>
           </View> 
        </TouchableOpacity> 
         </View> 
    )
   
  };
  

  
  
  getselected(date){
     var getdate = moment(date).format('YYYY-MM-DD');
     this.setState({selectedDate:getdate})
     this.setState({ datesel:true })

     this.displayevents(getdate);
  }
  render() { 
  
     var start=moment(this.state.Events.start).format('DD-MM-yyyy')
      
   
    return(
      <Container style={{backgroundColor:'#fff'}}>

          <ImageBackground source={ require('../../../../assets/images/Mask_Group_37.png')} style={Platform.OS === "ios" ? styles.iosbackgroundimage : styles.abackgroundimage}> 
             <View style={{marginTop:30}}>
                <Button transparent onPress={()=>Actions.pop()}>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: deviceHeight/35, color: "#FFF" }}
                    />
                                            
                </Button>                         
                 
              <View style={{ }} >
               <View style={{ flexDirection:'row', justifyContent:'space-between',marginLeft:25}}>
                 
                  <View style={{ justifyContent:'center', marginLeft:10 }} >
                    <Text style={{ color:"#fff", fontSize:18, fontWeight:'bold'  }}>
                      Hi, {this.props.username.name}
                    </Text> 
                    <Text style={{ color:"#fff", fontSize:13, fontWeight:'bold'  }}>
                      Here is a list of Events
                    </Text>                    
                  </View>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:120}}>
                 
                  <TouchableWithoutFeedback onPress={() => Actions.Addtask() }>
                   
                    <Image                      
                      source={require("../../../../assets/images/plusicon.png")}
                      style={{ width:28, height: 28, position:'absolute', right:10 , backgroundColor:'#470B63',}}
                    />                          
                  </TouchableWithoutFeedback>
                  </View>
                  </View>
                </View>

                  
              </View>
              </ImageBackground>
           
               <View style={Platform.OS === "ios" ? styles.iostoday : styles.atoday}>
                  <CalendarStrip
                  ref={(ref) => this.calenderStrip = ref}
                  daySelectionAnimation={{
                    type: 'background',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: '#470B63',
                    backgroundColor:'red'
                  }}
                  style={Platform.select({
                    android: {height: 115},
                    ios: {height: 115}
                  })}

                  calendarHeaderStyle={{color: '#e6000', width: deviceWidth, marginTop:10,fontSize:20}}
                  calendarColor={{backgroundColor: '#470B63'}}
                  dateNumberStyle={{color: '#000',fontSize:18,}}
                  responsiveSizingOffset={-12}
                  dateNameStyle={{color: '#e6e6e6',fontSize:13}}
                  highlightDateNumberStyle={{color: '#fff',fontSize:18,width:40,height:40,backgroundColor:'#470B63',borderRadius:20,paddingTop:10}}
                  highlightDateNameStyle={{color: '#fff',fontSize:13,}}
                  iconLeft={require('../../../../assets/img/left-arrow-black.png')}
                  iconRight={require('../../../../assets/img/right-arrow-black.png')}
                  iconContainer={{flex: 0,}}
                  iconStyle={{width:20,height:20}}
                  styleWeekend={false}
                  selectedDate={moment(this.selected_day)}

                  onWeekChanged={this.onWeekChanged}
                  onDateSelected={(date) => {this.getselected(date)}}
                />
                <Text style={{ color:"#000", fontSize:14,fontWeight:'bold',marginLeft:30,marginTop:5,}}>Todays Events </Text>
              
               <ScrollView>
                  <FlatList
                  style={{ margin:10}}
                  data={this.state.Events}
                  extraData={this.state}
                   renderItem={this.renderItem3}
                  
                />
                </ScrollView>
               
                
              
               <Text style={{ color:"#000", fontSize:14,fontWeight:'bold',marginLeft:30,marginTop:5,}}>Upcoming Events</Text>
                
                <FlatList
                  horizontal={true}
                  style={{ margin:10}}
                  data={this.state.futureEvents}
                  extraData={this.state}
                   renderItem={this.renderItem2}
                  
                />
                
                
                </View>
               
              <View style={{ width: deviceWidth, backgroundColor: commonColor.brandSecondry,height: 66,flexDirection:'row', borderTopWidth:2,borderTopColor:'#e6e6e6',justifyContent:'center', marginTop: 5, position:'absolute', bottom:0}} >
                
                <TouchableWithoutFeedback onPress={() =>  Actions.CustomerHome()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.CustomerHome() } >
                   
                    <Image
                      source={require("../../../../assets/bottom_icon/homegray.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                 
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback> 

                
                <TouchableWithoutFeedback onPress={() => Actions.Teacherchatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                
                      <Image
                      source={require("../../../../assets/menuicons/chatlight.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                  
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#000000',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback> 

                 

                <TouchableOpacity onPress={()=>Actions.Addhomework()} style={{elevation: 5,shadowColor: '#000',
                                                                          shadowOffset: { width: 0, height: 1 },
                                                                          shadowOpacity: 0.8,
                                                                          shadowRadius: 1,}}>
                <View style={{ justifyContent:'center',marginTop:-40,alignItems:'center', width:deviceWidth/5 ,}}>
                    <Image
                      source={require("../../../../assets/images/ellipse.png")}
                      style={{ width:80, height: 80 , }}
                    />
                    <View style={{ position:'absolute',marginLeft:-20,marginTop:-20,zIndex:1001}}>
                     <Text style={{color:'#ffffff',fontSize:40,marginTop:-10, fontWeight:'400'}}>+</Text>
                    </View>
                </View>     
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() =>  Actions.Task()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}>
                   
                    <Image
                      source={require("../../../../assets/bottom_icon/eventblue.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                    
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Event</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.Attendance()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                    
                    <Image
                      source={require("../../../../assets/bottom_icon/attandance.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Attendance</Text>
                </View>   
                </TouchableWithoutFeedback>                 
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
)(Task);
