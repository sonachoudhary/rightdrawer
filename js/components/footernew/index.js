import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox, TouchableWithoutFeedback ,FlatList} from "react-native";
import ImagePicker from "react-native-image-picker";

import { Container, Header,Content,Button, Icon, Card,CardItem,Thumbnail,Text,Item,Title,Left,Right,Spinner,Body,Label, Input } from "native-base";
import { Actions } from "react-native-router-flux";

import moment from "moment/moment";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,    
  };
}
class Footernew extends Component {
  constructor(props) {
    super(props);
   
  }
   
  render() {
    return (
     <View style={{ width: deviceWidth, backgroundColor:'#470B63',height: 70,flexDirection:'row', borderTopWidth:1,borderTopColor:'#470B63',justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                
                <TouchableWithoutFeedback onPress={() => Actions.Fees()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Fees() } >
                    <Image
                      source={require("../../../assets/bottom_icon/homegray.png")}
                      style={{ width:30, height: 30  }}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Fees</Text>
                </View>     
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={() => Actions.chatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                   <Image
                      source={require("../../../assets/bottom_icon/chatblue.png")}
                       style={{ width:20, height: 20  }}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback>  

                
                <TouchableWithoutFeedback onPress={() => Actions.BarberHome()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.BarberHome() } >
                    <Image
                      source={require("../../../assets/menuicons/home.png")}
                      style={{ width:20, height: 20  }}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback>  


                <TouchableWithoutFeedback onPress={() => Actions.Studentresult()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Studentresult() }>
                   <Image
                      source={require("../../../assets/bottom_icon/eventgray3.png")}
                      style={{ width:30, height: 30  }}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Results</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.Calender()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                    <Image
                      source={require("../../../assets/bottom_icon/attandance.png")}
                      style={{ width:30, height: 30  }}
                    />
                    <Text style={{fontSize:12,fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Attendance</Text>
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
)(Footernew);
