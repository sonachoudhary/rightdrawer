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
import SyncStorage from 'sync-storage';

import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep1 } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import Swipeout from 'react-native-swipeout';
import {deletechapter} from "../../../actions/common/signin";
const XDate = require('xdate');
import  Footer  from "../../../components/footer";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,  
    schoolid:state.driver.user.teacherlogin.schoolid,  
  };
}
class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      classid:'',
      subjectid:'',
       chapterdata:[],
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined
    }
  }
componentDidMount() {
   this.retriveid();
      
  this.getdata();
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
  retriveid(){
    const classid=SyncStorage.get('classid');
    const subjectid=SyncStorage.get('subjectid');
    this.setState({classid:classid});
    this.setState({subjectid:subjectid})
  }
  
  getdata(){
     var that = this;
      setTimeout( function(){

      if(that.state.classid !=" " && that.state.subjectid !=" "){
        
       fetch(`${config.serverSideUrl}/question/subject/${that.props.schoolid}/${that.state.classid}/${that.state.subjectid}`, {
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
               var manageassignment=[];
            var finalmanageassignment=[];
            for (let i = 0; i < data.length; i++){
                manageassignment.push(data[i].chapter);
            }
            const manageassignment1 = manageassignment.filter((x, i, a) => a.indexOf(x) == i)

            for (let j = 0; j < manageassignment1.length; j++){
                var getassignmentval = [];
                for (let k = 0; k < data.length; k++){
                    if(data[k].chapter == manageassignment1[j]){
                      getassignmentval.push(data[k]);
                    }
                }
                finalmanageassignment.push({'chapter':manageassignment1[j],'chapterquestions':getassignmentval});
            }
               that.setState({chapterdata: finalmanageassignment });
                  
                 
              }
         })
        .catch(e => {

                  
        });
      }
      },500)
  }

  delete(deleteid){
      
      this.props.dispatch(deletechapter(this.props.jwtAccessToken,deleteid)); 
      
       var that = this;
      setTimeout( function(){
 alert('Homework deleted successfully!')
      if(that.state.classid !=" " && that.state.subjectid !=" "){
        
       fetch(`${config.serverSideUrl}/question/subject/${that.props.schoolid}/${that.state.classid}/${that.state.subjectid}`, {
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
               var manageassignment=[];
            var finalmanageassignment=[];
            for (let i = 0; i < data.length; i++){
                manageassignment.push(data[i].chapter);
            }
            const manageassignment1 = manageassignment.filter((x, i, a) => a.indexOf(x) == i)

            for (let j = 0; j < manageassignment1.length; j++){
                var getassignmentval = [];
                for (let k = 0; k < data.length; k++){
                    if(data[k].chapter == manageassignment1[j]){
                      getassignmentval.push(data[k]);
                    }
                }
                finalmanageassignment.push({'chapter':manageassignment1[j],'chapterquestions':getassignmentval});
            }
               that.setState({chapterdata: finalmanageassignment });
                  
                 
              }
         })
        .catch(e => {

                 
        });
      }
      },500)
      
  }
 
  edit = async (id,question,type,marks,options) =>{
     
    try {
      if(type==0){
         setTimeout(function(){ Actions.Editchapter(); },500 );
       }else{
         setTimeout(function(){ Actions.Editobjective(); },500 );
       }

      
      SyncStorage.set('id',id );
      SyncStorage.set('question',question );
      SyncStorage.set('type',type );
      SyncStorage.set('marks',marks );
     
     

  } catch (error) {
    alert(error)
    // Error saving data
  }


}
renderquestions=({item,index})=>{
  
  const swipeoutBtns = [
              {
                text: 'Edit', 
                backgroundColor:'#40c353',
                color:'#FFFFFF',
                onPress: () => { this.edit(item.id,item.question,item.type,item.marks,) }
              },
              {
                text: 'Delete', 
                backgroundColor:'#c53e3e',
                color:'#FFFFFF',
                onPress: () => { this.delete(item.id) }
              }
             ]
  return(

          <Swipeout right={swipeoutBtns}  autoClose='true' backgroundColor= 'transparent'> 
          {item.id!=null &&
                    <View style={{backgroundColor:'#F5ddab', borderColor:'gray',
                           elevation: 5,shadowColor: '#e6e6e6',
                           shadowOffset: { width: 0, height: 3 },
                           shadowOpacity: 1.1, shadowRadius: 1,marginLeft:20,marginRight:20,borderRadius:10, padding:20,marginBottom:20 }}>

                        <Text style={{ color:'#000000'}}>Question:{item.question} </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                           <Text>Marks:{item.marks}</Text>
                           {item.type=="0" ?
                           <Text>Type:Subjective</Text>
                            :
                            <Text>Type:Objective</Text>
                          }
                        </View>
                    </View>
                  }
               </Swipeout>

    )
}
 
  renderItem2 = ({item, index}) => {
     
    
    return (
      <View style={{margin:10}}>
             
                    <View style={{justifyContent:'center',alignItems:'center',marginBottom:15}}>
                     <Text style={{ color:'#828282'}}> Chapter: {item.chapter} </Text>
                    </View>
                    <View>

                   <FlatList
                    data={item.chapterquestions}
                    renderItem={this.renderquestions}
                   />
                  </View>
                  
      </View>        
    )
  };
  
   
  render() {
   

    return (
      <Container style={{ backgroundColor:'#ffffff'}}>
         <Header style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}>
          <Left>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> Subject Name</Text>
            </View>
          </Left>
          <Right>
                <TouchableOpacity  onPress={() => Actions.Objective()}>
                      <Image                      
                      source={require("../../../../assets/icon/Group_17243.png")}
                      style={{ width:18, height: 18,marginTop:10,marginRight:20 }}
                    /> 
                  </TouchableOpacity>
          </Right>    
        </Header>
        <Content style={{ backgroundColor: "#ffffff",marginBottom:120}}>
            <View>
                  <FlatList
                  data={this.state.chapterdata}
                   extraData={this.state}
                   renderItem={this.renderItem2}
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
    deletechapter:(data,deleteid)=>dispatch(deletechapter(data,deleteid)),
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Subject);
