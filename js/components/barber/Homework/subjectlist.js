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
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid,   
    userType: state.driver.user.userType, 
    assignments:state.driver.user.assignments, 
    // renderassignments:state.driver.user.renderassignments,

  };
}
class Subjectlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Subjectdata:[],
    }
  }


  
  componentDidMount() {
     this._retrieveid();
    
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
  


 
  _retrieveid = () => {
       fetch(`${config.serverSideUrl}/teacherallsubjects/${this.props.userid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
          if(data.error){
                     Actions.signIn();
                   dispatch(loginfail(data))
                   
                   
                   }else if(data){
                  this.setState({Subjectdata:data});
                  this.setState({homework:data});
                 }
            
            
         })
        .catch(e => {

                
        });
        // this.props.bysubjectassignmentslist(this.props.jwtAccessToken,this.state.assignmentsid)
     
  
};


  opensubject = async (subjectname) =>{
        await AsyncStorage.setItem('subjectname',subjectname);
        Actions.Homework2()
    }
 

  rendersubject = ({item, index}) => {
        var uri= 'http://wesmart.in/backend/public/files/subject/'
       
        // var result = item.icon.replace(/ /g, "%20");
        let colors = ['#ffd3ca',  '#feb5c0', '#b6f8f4','#95bff9',];

        return (
            
            <TouchableOpacity onPress={()=> this.opensubject(item.subject)} style={{width:deviceWidth/2.3,margin:5,}}>
                <View style={{backgroundColor: '#fff',
                              elevation: 5,shadowColor: '#000',
                              shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,
                              shadowRadius: 1,height:160, 
                              borderRadius: 10,marginTop:10, padding:10,
                              justifyContent:'center',
                               alignItems:'center'}}>
                    <Image source={{ uri: item.icon}} style={{width:60,height:60}} /> 
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
            <Button transparent onPress={() => Actions.CustomerHome()} style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: deviceHeight/30, color: "#000000" }}
              />
            <Text style={styles.textheadingnewdata}>Subject</Text>                          
            </Button>
            
            </View>
         
        <Content style={{  backgroundColor:'#ffffff'}}>
          
         <View style={{backgroundColor:'#fff',marginTop:0,marginBottom:110}}>
               <FlatList
                     
                       style={{ margin:10}}
                       data={this.state.Subjectdata}
                       extraData={this.state}
                       numColumns={2}
                       renderItem={this.rendersubject}
                   />
             
        </View> 
        
       </Content>
       <Footer />
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
)(Subjectlist);
