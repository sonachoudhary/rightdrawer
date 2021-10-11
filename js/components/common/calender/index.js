import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,
  TouchableOpacity, Image, CheckBox,
Modal,
KeyboardAvoidingView,
   TouchableWithoutFeedback ,FlatList,BackHandler,ScrollView,Alert} from "react-native";
import ImagePicker from "react-native-image-picker";
import config from "../../../../config.js";

import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Spinner,
  Body,
  Label,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep1 } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import  Footernew  from "../../../components/footernew";
import SplashScreen from "react-native-splash-screen";

import DatePicker from 'react-native-datepicker'; 
//import * as Progress from 'react-native-progress';

import PieChart from 'react-native-pie-chart';


import moment from "moment/moment";

const XDate = require('xdate');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const chart_wh = 150
const series = [100,123, 134]
const sliceColor = ['#3BCAAC','#F65684','#F9AA68']
 
 

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
     userid:state.driver.user.studentlogin.studentid,   
    userType: state.driver.user.userType,
        
  };
}

class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showmodal:false,
      selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      Title:'',
      Descriptions:'',
      Date:'',
      status:false,
      reason:'',
      attdlist:[],
      series : [100,123, 134],
      p:0,
      a:0,
      l:0,
    }
  }

 componentDidMount() {
  this.setState({
     showmodal:false
  })
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
    this.getstudentattendance();
    this.getstudentattendancelist();
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
  
  getstudentattendancelist(){
     fetch(`${config.serverSideUrl}/studentattendancelist1/${this.props.userid}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
       Cookie:'token='+this.props.jwtAccessToken,
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if(data!=null){
        this.setState({ attdlist:data })
      }
    })
    .catch(e => {       
    });
 }

 getstudentattendance(){
     fetch(`${config.serverSideUrl}/studentattendanceinfo/${this.props.userid}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
       Cookie:'token='+this.props.jwtAccessToken,
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if(data!=null){
        this.setState({
          series:[data.p,data.a,data.l],
          p:[data.p],
          a:[data.a],
          l:[data.l],
        })
      
        
      }
    })
    .catch(e => {
                
    });
 }
  
showmodal(){
  this.setState({
     showmodal:true
  })
}

savebtn(){
    if(this.state.reason==""){
      alert('Subject required')
    } else if(this.state.Descriptions==""){
      alert('Descriptions required')
    } else  if (this.state.Date==""){
      alert('Date connot be empty')
    } else {
      
    fetch(`${config.serverSideUrl}/leaverequest/create`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
       Cookie:'token='+this.props.jwtAccessToken,
      },
      body: JSON.stringify({
            //teacherid:27,
            studentid:this.props.userid,
            title:this.state.Title,
            reason:this.state.reason,
            startdate:this.state.Date,
            enddate:this.state.Date,
            description:this.state.Descriptions,
            status:'Pending',
           })
      
    })
    .then(resp => resp.json())
    .then(data => {
      if(data!=null){
        alert('Leave Request has been created successfully')
      }else{
        alert('error')
      }
    })
    .catch(e => {
             
    });
    this.setState({showmodal:false})
     //this.props.TeachersubjectList(this.props.jwtAccessToken,this.props.userid,itemValue)
  }
  
  }
  
  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#FFDDDC"}}>
              
             <View style={{marginTop:'5%', flexDirection:'row'}}>
              <Button transparent onPress={() => Actions.pop()}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: "#000000" }}
                  />
                                                
                </Button>
                  <View style={{ justifyContent:'center', marginLeft:0 }} >
                   
                    <Text style={{ color:"#000", fontSize:deviceHeight/38,fontWeight:'bold' }}>
                      Attendance List
                    </Text>                    
                  </View>
              </View>
                
              

              <Calendar
                 
                  markingType={'period'}
                  current={this.state.selectedDate}
                  markedDates={this.state.attdlist}
                  style={{backgroundColor:'#fff',borderRadius:30,marginTop:1}}
                  
                />
                


                <View style={{flexDirection:'row'}}>
                  <View style={{margin:10}}>
                    <PieChart
                      chart_wh={chart_wh}
                      series={this.state.series}
                      sliceColor={sliceColor}
                      doughnut={true}
                      coverRadius={0.75}
                      coverFill={'#FFF'}
                    />
                  </View>
                  <View style={{ marginRight:10,marginTop:40}}>
                      <View style={{ flexDirection:'row',marginBottom:20}}>
                        <View style={{width: 20,height: 20,borderRadius: 20/2,backgroundColor: '#3BCAAC',marginRight:10}}></View>
                        <Text>Present:{this.state.p} </Text>
                      </View>
                      <View style={{ flexDirection:'row',marginBottom:20}}>
                        <View style={{width: 20,height: 20,borderRadius: 20/2,backgroundColor: '#F65684',marginRight:10}}></View>
                        <Text>Absent: {this.state.a} </Text>
                      </View>
                      <View style={{ flexDirection:'row'}}>
                        <View style={{width: 20,height: 20,borderRadius: 20/2,backgroundColor: '#F9AA68',marginRight:10}}></View>
                        <Text>Leave:{this.state.l} </Text>
                      </View>
                  </View>
                </View>

              <TouchableOpacity style={{backgroundColor:'#470B63',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        marginTop:0,
                                        marginLeft:30,
                                        marginRight:30,
                                        height:50
                                      }}
                                      onPress={()=>this.showmodal()}
                                      >
                <Text style={{color:'#fff'}}> Leave Request</Text>
               
              </TouchableOpacity>
               <Modal
                   animationType="slide"
                   transparent={true}
                   visible={this.state.showmodal}
                   onRequestClose={() => {
                  
                   this.setState({showmodal:false});
                   }}
              >
              <View   style={{backgroundColor:'#fff',
                      backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
         
              <View   style={{marginTop:110,
                              height:'90%',
                              borderRadius:30,
                              borderColor:'#000',
                              elevation: 5,
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 1 },
                              shadowOpacity: 0.8,
                              shadowRadius: 1,
                              backgroundColor:'#F8FAFA'
                            }}>
            
            <TouchableOpacity
                      style={{justifyContent:'flex-end',
                              flexDirection:'row',
                              marginTop:20,
                              marginRight:30}}
                              onPress={() => this.setState({showmodal:false})}
            >
            <Text style={styles.textStyle}>close</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#FFFFFF'}} behavior="padding"  keyboardVerticalOffset={70}>
             
              <ScrollView>

      <View style={{backgroundColor:'#FFFFFF'}}>
        
          <View style={{height:700,backgroundColor:'#fff',borderRadius:20}}>
            <Text style={{color:'#000',fontWeight:'500',margin:30,fontSize:20}}>Create Leave</Text>
            <Item style={{marginLeft:30,marginRight:30,borderColor:'lightgray'}}>
                <Input placeholder="Title" 
                         onChange={(event) => this.setState({Title: event.nativeEvent.text})}
                         value={this.state.Title}
                 
                />
            </Item>
            <Item style={{marginLeft:30,marginRight:30,borderColor:'lightgray'}}>
                <Input placeholder="Subject" 
                         onChange={(event) => this.setState({reason: event.nativeEvent.text})}
                         value={this.state.reason}
                 
                />
            </Item>

            
            <Item regular  style={styles.inputvalue}>

                <Input   placeholder='Leave reason'
                            style={{ color:'#000', height:156, width:deviceWidth-150, fontSize:16, padding:5,borderRadius:5,}}
                            multiline
                           
                            placeholderTextColor="#777"
                            editable={true}
                            onChange={(event) => this.setState({Descriptions: event.nativeEvent.text})}
                            value={this.state.Descriptions}
                        />  
            </Item>

            <View style={{borderWidth:1,borderColor:'gray', width:deviceWidth-150,marginTop:10,marginLeft:20,marginRight:20,borderColor:'lightgray'}}> 
                              
                               <DatePicker
                                  
                                  placeholder="Start Date"
                                  textStyle={'#000'}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  placeHolderTextStyle={'#000'}
                                  onDateChange={Date => {
                                      this.setState({ Date: Date });
                                  }}
                                  date={this.state.Date}
                                  customStyles={{
                                      dateInput: {
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        
                                      },
                                      dateText:{
                                        color: "#000000",
                                        fontSize: 15,
                                        alignSelf:'center', 
                                        textAlign:'center',                
                                      }
                                    }}
                               />
                         </View>
                         
                   <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:30}}>
                             <TouchableOpacity style={{backgroundColor:'#DAD9DF',
                                                       width:90,height:40,
                                                       justifyContent:'center',
                                                       alignItems:'center',borderRadius:5
                                                     }} onPress={()=>Actions.pop()}>
                                <Text style={{color:'#000'}}> Cancel</Text>
                             </TouchableOpacity>
                              <TouchableOpacity style={{backgroundColor:'#D22D80',
                                                        width:90,
                                                        height:40,
                                                        marginLeft:10,
                                                        justifyContent:'center',
                                                        alignItems:'center',
                                                        borderRadius:5}}
                                                onPress={()=>this.savebtn()}
                              >
                              <Text style={{color:'#fff'}}> Send</Text>
                              </TouchableOpacity>

                    </View>
          </View>
        </View>
      </ScrollView>
      </View>
    </View>
   </View>
 </Modal>
</Content>
<View style={{ width: deviceWidth, backgroundColor:'#470B63',height: 70,flexDirection:'row', borderTopWidth:1,borderTopColor:'#470B63',justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                
                <TouchableWithoutFeedback onPress={() => Actions.Fees()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Fees() } >
                    <Image
                      source={require("../../../../assets/bottom_icon/feeblue.png")}
                       style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Fees</Text>
                </View>     
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={() => Actions.chatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                   <Image
                      source={require("../../../../assets/bottom_icon/chatblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback>  

                
                <TouchableWithoutFeedback onPress={() => Actions.BarberHome()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.BarberHome() } >
                    <Image
                      source={require("../../../../assets/bottom_icon/homeblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback>  


                <TouchableWithoutFeedback onPress={() => Actions.Studentresult()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Studentresult() }>
                    <Image
                      source={require("../../../../assets/bottom_icon/resultblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Results</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.Calender()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                    <Image
                      source={require("../../../../assets/bottom_icon/attandance.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12,fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Attendance</Text>
                </View>   
                </TouchableWithoutFeedback>                 
            </View>
</Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Calender);
