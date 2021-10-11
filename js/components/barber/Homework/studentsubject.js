import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,AsyncStorage,BackHandler} from "react-native";
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
import { bysubjectassignmentslist } from "../../../actions/common/signin";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import SyncStorage from 'sync-storage';

const XDate = require('xdate');
import  Footer  from "../../../components/footer";
import config from "../../../../config.js";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    studenthomework:state.driver.user.studenthomework,
    user: state.driver.user,
    userid:state.driver.user.studentlogin.studentid,
    appointmentList: state.booking.appointmentList,
    profileUrl: state.driver.user.profileUrl,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    homeworkdata:state.driver.user.homework,
    username:state.driver.user.student, 
    // renderassignments:state.driver.user.renderassignments,

  };
}
class Subjectliststudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Subjectdata:[],
      details:'',
      studenthomework:[],
    }
  }


  
  componentDidMount() {
     
     fetch(`${config.serverSideUrl}/studentinfo/${this.props.userid}`, {
          method: "GET",
         headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Cookie:'token='+this.props.jwtAccessToken
      }

    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.error){
           dispatch(loginfail(data))
         
            
        }else if(data){
             this.setState({details:data})
             this.getclassid();
        }
      })
      .catch(e => {
             alert('something went wrong')
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
  
getclassid(){
      
       SyncStorage.set('classid',this.state.details.classid)
       
         
        fetch(`${config.serverSideUrl}/studentallsubject/${this.state.details.classid}`, {
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
                  
                  this.setState({studenthomework:data});
              }
         })
        .catch(e => {

                 
        });
        
    }

 
 


  opensubject = async (subjectname) =>{
        await AsyncStorage.setItem('subjectname',subjectname);
        Actions.Homework()
    }
 

  rendersubject = ({item, index}) => {
        var uri= 'http://wesmart.in/backend/public/files/subject/'
        
        // var result = item.icon.replace(/ /g, "%20");
        let colors = ['#ffd3ca',  '#feb5c0', '#b6f8f4','#95bff9',];

        return (
            
            <TouchableOpacity onPress={()=> this.opensubject(item.subject)} style={{width:deviceWidth/2.3,margin:5}}>
                 <View style={{backgroundColor: '#fff',
                              elevation: 5,shadowColor: '#000',
                              shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,
                              shadowRadius: 1,height:160, 
                              borderRadius: 10,marginTop:10, padding:10,
                              justifyContent:'center',
                               alignItems:'center'}}>
                    <Image source={{ uri: item.icon}} style={{width:80,height:80}} /> 
                    <Text style={styles.textheading}>{item.subject}</Text>  
                    <Text style={styles.subtext}>{item.class}</Text> 
                </View>
                 
            </TouchableOpacity>  
                
        )
    };

   
  render() {
     
     //  var time=moment( this.state.renderassignments && this.state.renderassignments[0].created_at).format('hh:mm')
     //  var title= (this.state.renderassignments ?this.state.renderassignments[0].title:'' )
     // const Timeend=(this.state.renderassignments ?  moment(this.state.renderassignments.end).format('hh:mm-ddd'): '')
    return (
      <Container>
      
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Button transparent onPress={() => Actions.BarberHome()} style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
            <Text style={styles.textheadingnewdata}>Subject</Text>                          
            </Button>
            
            </View>
         
        <Content style={{  backgroundColor:'#ffffff'}}>
          
         <View style={{backgroundColor:'#fff',marginTop:0,marginBottom:110}}>
               <FlatList
                     
                       style={{ margin:10}}
                       data={this.state.studenthomework}
                       extraData={this.state}
                       numColumns={2}
                       renderItem={this.rendersubject}
                   />
             
        </View> 
        
       </Content>
       
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    bysubjectassignmentslist: (date,id) => dispatch(bysubjectassignmentslist(date,id))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Subjectliststudent);
