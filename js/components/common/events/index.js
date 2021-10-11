import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,
  TouchableOpacity, Image, CheckBox,
Modal,
KeyboardAvoidingView,
   TouchableWithoutFeedback ,FlatList,BackHandler,ScrollView,SectionList,ActivityIndicator,Alert} from "react-native";
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
import * as Progress from 'react-native-progress';



import moment from "moment/moment";

const XDate = require('xdate');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const chart_wh = 250
const series = [123, 321, 123, 789, 537]
const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
 

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.studentlogin.studentid,    
    userType: state.driver.user.userType,    
  };
}

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showmodal:false,
      loading: true,
      selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      Events:[],
    }
  }


 componentDidMount() {
   this.displayevents();
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






 displayevents(){
  var userid=this.props.userid;
  var jwtAccessToken=this.props.jwtAccessToken;
      fetch(`${config.serverSideUrl}/studentevents/${userid}`,{
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
                 
                this.setState({Events:data});
                //dispatch(getteacherhomeworks(data))
             }
            
    })
    .catch(e => {
      
    });
     //this.props.TeachersubjectList(this.props.jwtAccessToken,this.props.userid,itemValue)
  
  
  }
  
 
  

  renderItem(item,index){
  var Time=moment(item.item.start).format("hh:mm")
     var start=moment(item.item.start).format("dddd")
      let colors = "#FAD2E4";
    return(
           <View style={{flexDirection:'row',}}>
           <View style={{backgroundColor:item.item.color,width:'20%',justifyContent:'center',
                         alignItems:'center',marginTop:10,borderRadius:5,backgroundColor: colors}}>
                 <Text style={{color:'#000'}}>{Time}</Text>
                  <Text style={{color:'#000'}}>{start}</Text>
                   
            </View>
               <View style={{backgroundColor:item.item.Color,marginTop:10,width:'80%',borderRadius:5,backgroundColor:'#D7EFD8'}}>
               <View style={{margin:10,}}>
                 <Text style={{color:'#000',fontWeight:'700'}}>{item.item.title}</Text>
                  <Text>{item.item.className}</Text>
                   <Text style={{color:'#000',fontWeight:'200'}}>{item.item.details}</Text>
                   </View>
               </View>

              

           </View>
      
      )
  }
  
showmodal(){
  this.setState({
     showmodal:true
  })
}


  render() {
    var heightvalue= deviceHeight/4; 
    var uri= 'http://wesmart.in/backend/public/files/subject/'
    var marginTOP= 20;    
        if(Platform.OS === 'ios'){
           heightvalue=deviceHeight/6,
           marginTOP=30
        } 
  

    return (
      <Container style={{backgroundColor: "#FFDDDC" }}>
      <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle}> 
       <View style={{marginTop:marginTOP, flexDirection:'row'}}>
                
                  <Button transparent onPress={() => Actions.pop()}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: "#000000" }}
                  />
                                                
                </Button>
                <View style={{ justifyContent:'center', marginLeft:0 }} >
                   
                    <Text style={{ color:"#000", fontSize:deviceHeight/38,fontWeight:'bold' }}>
                      Events list
                    </Text>                    
                  </View>
                   
                
          </View>
          </ImageBackground>
        <Content style={{ backgroundColor: "#F7F8FB"}}>
            {this.state.Events ?  
              
              <View style={{backgroundColor:'#F7F8FB',}}>

                    <FlatList
                 
                   style={{ margin:10}}
                   data={this.state.Events}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   keyExtractor={(item, index) => index}

                   />
                   
              </View>
              :
              <ActivityIndicator size="large"  color="#0000ff" />
            }
</Content>

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
)(Events);
