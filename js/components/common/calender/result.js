import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
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
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import CalendarStrip from "react-native-calendar-strip";
import SyncStorage from 'sync-storage';

const XDate = require('xdate');
import  Footer  from "../../../components/footer";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,
    userid:state.driver.user.teacherlogin.teacherid,     
  };
}
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      resulthisory:[],
      datesel:false,
    }
  }

 componentDidMount() {
  var getdate = moment().format('YYYY-MM-DD');
        this.setState({selectedDate:getdate})
   var that = this;
     
        
       fetch(`${config.serverSideUrl}/getpapersubmitions/${that.props.userid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+that.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
             
            if(data!=null){
                  that.setState({resulthisory:data});
                 
              }
         })
        .catch(e => {
      
        });
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
  
  nextscreen(id,title,time){
    SyncStorage.set('time',time);
    SyncStorage.set('title',title);
    SyncStorage.set('paperid',id);
  
     Actions.Viewquiz()
  }


getselected(date){
     var getdate = moment(date).format('YYYY-MM-DD');
     this.setState({selectedDate:getdate})
     this.setState({ datesel:true })
  }
 renderItem = ({item, index}) => {
     const StartTime=moment(item.start).format('hh:mm');
     const EndTime=moment(item.end).format('hh:mm');
     const day=moment(item.start).format('ddd DD');
     var color="#FFD3CA";
     if(index%2==0){
      color="#95BFF9"
     }
    return (
      <View style={{flexDirection:'row',width:deviceWidth}}>
      <View style={{borderRightWidth:1,borderColor:'lightgray',width:60,marginRight:10}}>
      <Text style={styles.textheading,{marginTop:10}}>{StartTime}</Text>
      <Text style={styles.textheading,{marginTop:50}}>{EndTime}</Text>
      </View> 
      <View style={{backgroundColor:'#fff',width:deviceWidth-100,flexDirection:'row',margin:5,borderRadius:10,}}>
      <TouchableOpacity  style={{backgroundColor:color,margin:10,width:73.13,height:83,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
           <Text style={styles.subtext,{color:'#fff'}}>{StartTime}</Text> 
           <Text style={styles.textheading,{color:'#fff'}}>{day}</Text>  
            
        </TouchableOpacity> 
        <TouchableOpacity style={{height:83,borderRadius:10,marginTop:10,padding:3}}>
           
           <Text style={styles.textheading,{color:'#000'}}>{item.title}</Text>  
           <Text style={styles.subtext}>Subject:{item.subject}</Text> 
           <Text style={styles.subtext,{marginTop:10}}>Questions:{item.questions}</Text>  
        </TouchableOpacity> 
            <TouchableOpacity
                style={{backgroundColor:'#470B63',width:60,borderRadius:20,height:29,right:10,justifyContent:'center',alignItems:'center',position:'absolute',bottom:5}}
                onPress={ ()=> this.nextscreen(item.id,item.title,item.start) }
            >
              <Text style={{ color: "#fff", fontSize: 11}}> View</Text>
             </TouchableOpacity>
     </View>
       </View>        
    )
  };
   renderItem2 = ({item, index}) => {
     var getcurrentdate = moment(item.start).format('YYYY-MM-DD');
     const StartTime=moment(item.start).format('hh:mm');
     const EndTime=moment(item.end).format('hh:mm');
     const day=moment(item.start).format('ddd DD');
     var color="#FFD3CA";
     if(index%2==0){
      color="#95BFF9"
     }
     
    return (
      <View style={{flexDirection:'row',width:deviceWidth}}>
       { getcurrentdate == this.state.selectedDate &&
      <View style={{flexDirection:'row',width:deviceWidth}}>
      <View style={{borderRightWidth:1,borderColor:'lightgray',width:60,marginRight:10}}>
          <Text style={styles.textheading,{marginTop:10}}>{StartTime}</Text>
          <Text style={styles.textheading,{marginTop:50}}>{EndTime}</Text>
      </View> 

      <View style={{backgroundColor:'#fff', flexDirection:'row',margin:5,borderRadius:10,width:deviceWidth-100}}>
         <TouchableOpacity  style={{backgroundColor:color,margin:10,width:73.13,height:83,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
           <Text style={styles.subtext,{color:'#fff'}}>{StartTime}</Text> 
           <Text style={styles.textheading,{color:'#fff'}}>{day}</Text>  
            
        </TouchableOpacity> 
        <TouchableOpacity style={{height:83,borderRadius:10,marginTop:10,padding:3}}>
           
           <Text style={styles.textheading,{color:'#000'}}>{item.title}</Text>  
           <Text style={styles.subtext}>Subject:{item.subject}</Text> 
           <Text style={styles.subtext,{marginTop:10}}>Questions:{item.questions}</Text>  
        </TouchableOpacity> 
            <TouchableOpacity
                style={{backgroundColor:'#470B63',width:60,borderRadius:20,height:29,right:10,justifyContent:'center',alignItems:'center',position:'absolute',bottom:5}}
                onPress={ ()=> this.nextscreen(item.id,item.title,item.start) }
            >
              <Text style={{ color: "#fff", fontSize: 11}}> View</Text>
             </TouchableOpacity>
     </View>
       </View> 
       }
       </View>       
    )
  };
  
  render() {
    

    return (
      <Container style={{ backgroundColor:'#ffffff'}}>
       
              <View style={{backgroundColor:'#4D1C5D',padding:0}}>
              <View style={{ flexDirection:'row', marginTop:20 ,backgroundColor:'#4D1C5D'}} >
                <View style={{  flexDirection:'row', marginLeft:10 , paddingTop:20, paddingBottom:20}} >
                  <Button transparent onPress={() => Actions.Quizdashboard()}>
                      <Icon
                        name="md-arrow-back"
                        style={{ fontSize: 28, color: "#ffffff" }}
                      />                          
                  </Button>
                  <View style={{ flexDirection:'row', marginLeft:10 ,marginTop:10}} >
                  <Text style={{ color:"#ffffff", fontSize:deviceHeight/38}}>
                    Result History
                  </Text>     
                  </View>
                </View>
              </View>
              
                 <View style={{backgroundColor:'#F7F8FB',borderTopLeftRadius:20,borderTopRightRadius: 20,elevation:2,}}>
                  <CalendarStrip
                  ref={(ref) => this.calenderStrip = ref}
                  daySelectionAnimation={{
                    type: 'background',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: '#470B63',
                    
                  }}
                  style={Platform.select({
                    android: {height: 115},
                    ios: {height: 115}
                  })}

                  calendarHeaderStyle={{color: '#e6000', width: deviceWidth, marginTop:10,fontSize:20}}
                  calendarColor={{backgroundColor: '#470B63'}}
                  dateNumberStyle={{color: '#000',fontSize:18,}}
                  responsiveSizingOffset={-12}
                  dateNameStyle={{color: '#000',fontSize:13}}
                  highlightDateNumberStyle={{color: '#fff',fontSize:18,width:40,height:40,backgroundColor:'#FDDADC',borderRadius:20,paddingTop:10}}
                  highlightDateNameStyle={{color: '#fff',fontSize:13,}}
                  iconLeft={require('../../../../assets/img/left-arrow-black.png')}
                  iconRight={require('../../../../assets/img/right-arrow-black.png')}
                  iconContainer={{flex: 0,}}
                  iconStyle={{width:20,height:20}}
                  styleWeekend={false}
                  onWeekChanged={this.onWeekChanged}
                  onDateSelected={(date) => {this.getselected(date)}}
                />
              </View>
              </View>
               <Content style={{ backgroundColor: "#F2EFF4",marginBottom:'15%'}}>
              

              <View style={{flexDirection:'row',margin:10,backgroundColor:'#F2EFF4'}}>
                 <Text style={styles.textheading,{color:'#000', fontWeight:'bold',paddingTop:5}}>Time</Text>
                 <Text style={styles.textheading,{color:'#000',marginLeft:40,fontWeight:'bold',paddingTop:5}}>Assignments List</Text>
               </View>
               <View style={{backgroundColor:'#F2EFF4',flexDirection:'row',}}>
               
                    { this.state.datesel == false ?
                   <FlatList

                   style={{ margin:10}}
                   data={this.state.resulthisory}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   />
                  :
                  <FlatList
                   style={{ margin:10}}
                   data={this.state.resulthisory}
                   extraData={this.state}
                   renderItem={this.renderItem2}
                   />
                }
                  
              </View>
       </Content>
       <Footer />
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
)(Result);
