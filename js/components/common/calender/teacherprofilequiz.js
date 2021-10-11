import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, 
  Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
import ImagePicker from "react-native-image-picker";

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
import SplashScreen from "react-native-splash-screen";
import CalendarStrip from "react-native-calendar-strip";

import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import config from "../../../../config.js";
const XDate = require('xdate');
import  Footernew  from "../../../components/footernew";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import SyncStorage from 'sync-storage';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType, 
    userid:state.driver.user.studentlogin.studentid,   
  };
}
class Teacherquiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      datesel:false
    }
  }

  componentDidMount() {
      this.getquizlist();
      SplashScreen.hide();
      BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  getquizlist(){
        //alert(this.state.selectedDate);
        var getdate = moment().format('YYYY-MM-DD');
        this.setState({selectedDate:getdate})
        fetch(`${config.serverSideUrl}/student/papers/all`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
        })
        .then(resp => resp.json())
        .then(data => {
            
            if(data!=null){
                this.setState({data:data});
            }
         })
        .catch(e => {
                 
        });
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  
  openquizdetail(id){
    //alert(this.props.userid)
    SyncStorage.set('paperid',id);
    fetch(`${config.serverSideUrl}/student/assignment/CanStartstudent/${id}/${this.props.userid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
        })
        .then(resp => resp.json())
        .then(data => {
          
           
            if(data.status==false){
               alert(data.message)
            }else {
                Actions.Quiztwo();
            }
         })
        .catch(e => {
                 
        });
  }

  getselected(date){
     var getdate = moment(date).format('YYYY-MM-DD');
     this.setState({selectedDate:getdate})
     
     this.setState({ datesel:true })
  }
  questionscreen(id){
    SyncStorage.set('assignmentid',id);
   Actions.Quizresultcheck()
  }


  renderItem = ({item, index}) => {
    var getcurrentdate = moment(item.start).format('YYYY-MM-DD');
     
     var color="#FFD3CA";
     if(index%2==0){
      color="#95BFF9"
     }
     
    return (
      <View>
    { getcurrentdate == this.state.selectedDate &&
      <View style={{flexDirection:'row'}}>
        <View style={{borderRightWidth:1,borderColor:'lightgray',width:60,marginTop:5}}>
            <Text style={styles.textheading,{marginTop:10,marginRight:10}}>{ moment(item.start).format('hh:mm')}</Text>
            <Text style={styles.textheading,{marginTop:50,marginRight:10}}>{moment(item.end).format('hh:mm')}</Text>
        </View>
      <View style={{backgroundColor:'#fff',flexDirection:'row',margin:5,borderRadius:10, minHeight:120,width:deviceWidth-90}}>
        <TouchableOpacity style={{backgroundColor:color,margin:10,width:'25%',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
           <Text style={styles.subtext,{color:'#333333',fontSize:13}}>{moment(item.start).format('hh:mm A')}</Text> 
           <Text style={styles.textheading,{color:'#333333',fontSize:13}}>{moment(item.start).format('ddd DD')}</Text>  
            
        </TouchableOpacity> 
        <TouchableOpacity style={{height:83,borderRadius:10,marginTop:10,padding:3,width:deviceWidth/2}}>
           
           <Text style={styles.textheading,{color:'#000'}}>{item.title}</Text>  
           <Text style={styles.subtext}>{item.subject}: {item.class} </Text> 
           <Text style={styles.subtext,{marginTop:10}}>{  moment(item.start).format('hh:mm') } - {  moment(item.end).format('hh:mm') }</Text>  
           
        </TouchableOpacity> 
         
     </View>
      {item.Taken==0 && item.Expired==0 &&
          <View>
              <Button
                style={{backgroundColor:'#DB4C7B',width:76,borderRadius:20,height:29,right:90,marginTop:'20%',justifyContent:'center',alignItems:'center'}}
                onPress={ ()=> this.openquizdetail(item.id) }>
               
               <Text style={{ color: "#fff", fontSize: 11,paddingTop:5}}> Start</Text>
             </Button>
          </View>


        }
        {item.Taken==1 && 
          <View>
              <Button
                style={{backgroundColor:'#DB4C7B',width:76,borderRadius:20,height:29,right:90,marginTop:85,justifyContent:'center',alignItems:'center'}}
                onPress={ ()=>this.questionscreen(item.id) }>
                
               <Text style={{ color: "#fff", fontSize: 11,}}> View</Text>
             </Button>
          </View>


        }

       </View>  
     }
      </View>     
    )
  };
  

  renderItem2 = ({item, index}) => {
    var color="#FFD3CA";
     if(index%2==0){
      color="#95BFF9"
     }
    return (
      <View>
  
      <View style={{flexDirection:'row'}}>
        <View style={{borderRightWidth:1,borderColor:'lightgray',width:60,marginTop:5}}>
            <Text style={styles.textheading,{marginTop:10,marginRight:10}}>{ moment(item.start).format('hh:mm')}</Text>
            <Text style={styles.textheading,{marginTop:50,marginRight:10}}>{moment(item.end).format('hh:mm')}</Text>
        </View>
      <View style={{backgroundColor:'#fff',flexDirection:'row',margin:5,borderRadius:10, minHeight:120,width:deviceWidth-90}}>
        <TouchableOpacity style={{backgroundColor:color,margin:10,width:'25%',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
           <Text style={styles.subtext,{color:'#333333',fontSize:13}}>{moment(item.start).format('hh:mm A')}</Text> 
           <Text style={styles.textheading,{color:'#333333',fontSize:13}}>{moment(item.start).format('ddd DD')}</Text>  
            
        </TouchableOpacity> 
        <TouchableOpacity style={{height:83,borderRadius:10,marginTop:10,padding:3,width:deviceWidth/2}}>
           
           <Text style={styles.textheading,{color:'#000'}}>{item.title}</Text>  
           <Text style={styles.subtext}>{item.subject}: {item.class} </Text> 
           <Text style={styles.subtext,{marginTop:10}}>{moment(item.start).format('hh:mm') } - {  moment(item.end).format('hh:mm') }</Text>  
           
        </TouchableOpacity> 
         
     </View>
      {item.Taken==0 &&  item.Expired==0 ? 
          <View>
              <Button
                style={{backgroundColor:'#DB4C7B',width:76,borderRadius:20,height:29,right:90,marginTop:85,justifyContent:'center',alignItems:'center'}}
                onPress={ ()=> this.openquizdetail(item.id) }>
               
               <Text style={{ color: "#fff", fontSize: 11,}}> Start</Text>
             </Button>
          </View>
          :
          <View>
              <Button
                style={{backgroundColor:'#DB4C7B',width:76,borderRadius:20,height:29,right:90,marginTop:85,justifyContent:'center',alignItems:'center'}}
                onPress={ ()=>this.questionscreen(item.id) }>
                
               <Text style={{ color: "#fff", fontSize: 11,}}> View</Text>
             </Button>
          </View>
        }

       </View>
      </View>     
    )
  };
  
 
   
  render() {
    

    return (
      <Container style={{backgroundColor: "#F7F8FB"}}>
      
        
       
        <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: deviceWidth, height: deviceHeight/4.5, resizeMode:'cover' }}> 
          <View style={Platform.OS === 'ios' ?styles.iosassignments:styles.androidassignmentheader}>
            <Button transparent onPress={()=>Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: deviceHeight/30, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> Assignments</Text>
            </View>
            <View style={{backgroundColor:'#FFF6F6',margin:5,borderTopLeftRadius:15,borderTopRightRadius:15}}>
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
         
        </ImageBackground>
        
              <Content style={{ backgroundColor: "#F7F8FB",marginBottom:120}}> 

              <View  style={Platform.OS === "ios" ? styles.circleios : styles.ccirclestyle}>
                 <Text style={styles.textheading,{color:'#000',fontWeight:'bold'}}>Time</Text>
                 <Text style={styles.textheading,{color:'#000',marginLeft:40,fontWeight:'bold',}}>Assignments List</Text>
               </View>
               <View style={{backgroundColor:'#F7F8FB',flexDirection:'row'}}>
                { this.state.datesel == false ?
                  <FlatList
                   style={{ margin:10}}
                   data={this.state.data}
                   extraData={this.state}
                   renderItem={this.renderItem2}
                   />
                  :
                  <FlatList
                   style={{ margin:10}}
                   data={this.state.data}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   />
                }
              </View>
       </Content>
       <Footernew />
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
)(Teacherquiz);
