import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,
  TouchableOpacity, Image, CheckBox, 
  TouchableWithoutFeedback ,FlatList,
  BackHandler
} from "react-native";
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

import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";

const XDate = require('xdate');
import  Footernew  from "../../../components/footernew";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,    
  };
}
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[{color:"#FF9800",Color:"F9E1C1",Day:'15 May',StartTime:"10:30",EndTime:"20:30",Title:'English Quiz',subtitle:'Total Questions : 20',Marks:'Marks = 9/10',timeintrvel:'10:20-11:20'},
     
      {color:"#53B958",Color:"DCEEE0",Day:'15 May',StartTime:"10:30",EndTime:"03:30",Title:'English Quiz',subtitle:'Total Questions : 20',Marks:'Marks = 9/10',timeintrvel:'10:20-11:20'},
      {color:"#007BFF",Color:"D9E8FB",Day:'15 May',StartTime:"10:30",EndTime:"03:30",Title:'English Quiz',subtitle:'Total Questions : 20',Marks:'Marks = 9/10',timeintrvel:'10:20-11:20'},
      {color:"#982477",Color:"F3C8DE",Day:'15 May',StartTime:"10:30",EndTime:"03:30",Title:'English Quiz',subtitle:'Total Questions : 20',Marks:'Marks = 9/10',timeintrvel:'10:20-11:20'},
      {color:"#FF9800",Color:"F9E1C1",Day:'15 May',StartTime:"10:30",EndTime:"03:30",Title:'English Quiz',subtitle:'Total Questions : 20',Marks:'Marks = 9/10',timeintrvel:'10:20-11:20'},],
      
       data2:[{month:'jan'},{month:'Feb'},{month:'March'},{month:'April'},{month:'May'},{month:'june'},{month:'july'},{month:'Aug'},{month:'Sep'},{month:'Oct'},{month:'Nov'},{month:'Dec'}],
        data3:[{date:'24',day:'fri',Time:'10:20'},{date:'25',day:'sat',Time:'01:20'},{date:'26',day:'sun',Time:'07:20'},{date:'27',day:'mon',Time:'09:30'},{date:'28',day:'tues',Time:'06:30'},{date:'29',day:'wed',Time:'06:50'}],
       data4:[{Time:'10:30'},{Time:'12:30'},{Time:'14:23'}],
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined
    }
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


  callTimeScreen() {
    
    if(this.state.selectedDate && this.state.selectedDate >= moment().format('YYYY-MM-DD')){
      this.setState({ error: false })
      this.props.setBookingStep1(moment(this.state.selectedDate).format('YYYY-MM-DD'))  
    } else {
      this.setState({ error: true })
    }    
  }
  
  setDateFunction(dateString){
    this.setState({ selectedDate: dateString })
  }

  selectedMonth(months) {
   
    this.setState({ selectedCal:months[0].dateString })
  }

 renderItem = ({item, index}) => {
    
    return (
      <View style={{flexDirection:'row'}}>
      <View>
      <Text style={styles.textheading,{marginTop:10}}>{item.StartTime}</Text>
      <Text style={styles.textheading,{marginTop:50}}>{item.EndTime}</Text>
      </View > 
      <View style={{backgroundColor:'#fff',flexDirection:'row',margin:5,borderRadius:10,height:135}}>
      <TouchableOpacity onPress={()=>Actions.Quiztwo()} style={{backgroundColor:item.color,margin:10,width:73.13,height:123,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
           <Text style={styles.subtext,{color:'#fff'}}>{item.StartTime}</Text> 
           <Text style={styles.textheading,{color:'#fff'}}>{item.Day}</Text>  
            
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>Actions.Quiztwo()} style={{width:237.13,height:83,borderRadius:10,marginTop:10,padding:3}}>
           
           <Text style={styles.textheading,{color:'#000'}}>{item.Title}</Text>  
           <Text style={styles.subtext}>{item.subtitle}</Text> 
           <Text style={styles.subtext,{marginTop:10}}>{item.timeintrvel}</Text>  
           
        </TouchableOpacity> 
                <Image
                         source={require("../../../../assets/images/Rectangle_1809.png")}
                         style={{ width:20, height: 20,right:30,marginTop:20 }}
                    />
     </View>
     <View>
            <Button
                style={{backgroundColor:'#DB4C7B',width:76,borderRadius:20,height:29,right:90,marginTop:100,justifyContent:'center',alignItems:'center'}}
                onPress={ ()=> Actions.Quiztwo() }
            >
              <Text style={{ color: "#fff", fontSize: 11,}}> Start</Text>
             </Button>
           </View>
       </View>        
    )
  };
  renderItem2 = ({item, index}) => {
    
    return (
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>Actions.Quiztwo()} style={{margin:5,backgroundColor:'#F7F8FB',width:70,height:50,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
           
           <Text style={styles.textheading}>{item.month}</Text>  
             
        </TouchableOpacity> 
        

       </View>        
    )
  };
  renderItem3 = ({item, index}) => {
    
    return (
      <View style={{flexDirection:'row',marginBottom:20}}>
      <TouchableOpacity onPress={()=>Actions.Quiztwo()} style={{margin:5,width:56.13,height:94,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'#F7F8FB'}}>
          
           <Text style={styles.textheading,{color:'#000'}}>{item.date}</Text> 
           <Text style={styles.textheading}>{item.day}</Text>  
             
        </TouchableOpacity> 
        

       </View>        
    )
  };
   
  render() {
    

    return (
      <Container style={{backgroundColor: "#ffffff"}}>
         
          <View style={{flexDirection:'row',}}>
            <Button transparent onPress={()=>Actions.Homework()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> Assignments</Text>
            </View>
          
        <Content style={{ backgroundColor: "#F7F8FB",marginBottom:120}}>
       
              
              
              
                 <View style={{backgroundColor:'#FFFEFE'}}>
                  <FlatList
                  horizontal={true}
                   style={{ margin:10}}
                   data={this.state.data2}
                   extraData={this.state}
                   renderItem={this.renderItem2}
                   />
              </View>
               <View style={{backgroundColor:'#FFFEFE',borderBottomLeftRadius:20,borderBottomRightRadius: 20,elevation:2}}>
                  <FlatList
                  horizontal={true}
                   style={{ margin:10}}
                   data={this.state.data3}
                   extraData={this.state}
                   renderItem={this.renderItem3}
                   />
              </View>

              <View style={{flexDirection:'row',margin:10}}>
                 <Text style={styles.textheading,{color:'#000'}}>Time</Text>
                 <Text style={styles.textheading,{color:'#000',marginLeft:40}}>Assignments List</Text>
               </View>
               <View style={{backgroundColor:'#F7F8FB',flexDirection:'row'}}>
               
                   
                  <FlatList

                   style={{ margin:10}}
                   data={this.state.data}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   />
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
)(Quiz);
