import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox, TouchableWithoutFeedback ,FlatList} from "react-native";
import ImagePicker from "react-native-image-picker";

import { Container, Header,Content,Button, Icon, Card,CardItem,Thumbnail,Text,Item,Title,Left,Right,Spinner,Body,Label, Input } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep1 } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
const XDate = require('xdate');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,    
  };
}
class Footer extends Component {
  constructor(props) {
    super(props);
   
  }
   
  render() {
    return (
     <View style={{ width: deviceWidth, height: 66,flexDirection:'row', borderTopWidth:2,borderTopColor:'#e6e6e6',justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                
                <TouchableWithoutFeedback onPress={() => Actions.CustomerHome()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.CustomerHome() } >
                    <Image
                      source={require("../../../../assets/icon/homeicon5.png")}
                      style={{ width:20, height: 18  }}
                    />
                    <Text style={{fontSize:12, color:'#000000',paddingTop:5}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={() => Actions.Quizdashboard()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Quizdashboard() } >
                    <Image
                      source={require("../../../../assets/icon/homeicon2.png")}
                      style={{ width:20, height: 18  }}
                    />
                    <Text style={{fontSize:12, color:'#000000',paddingTop:5}}>Assignments</Text>
                </View>     
                </TouchableWithoutFeedback>  

                <TouchableWithoutFeedback>
                <View style={{ justifyContent:'center',marginTop:-80,alignItems:'center', width:deviceWidth/5 }}>
                    <Image
                      source={require("../../../../assets/images/plusbottomicon.png")}
                      style={{ width:80, height: 80  }}
                    />
                   
                </View>     
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => Actions.Viewassignments()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Viewassignments() }>
                    <Image
                      source={require("../../../../assets/icon/homeicon3.png")}
                      style={{ width:20, height: 18  }}
                    />
                    <Text style={{fontSize:12, color:'#000000',paddingTop:5}}>Task</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.profile()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                    <Image
                      source={require("../../../../assets/icon/homeicon4.png")}
                      style={{ width:20, height: 20  }}                       
                    />
                    <Text style={{fontSize:12, color:'#000000',paddingTop:5}}>Attendance</Text>
                </View>   
                </TouchableWithoutFeedback>                 
            </View>
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
)(Footer);
