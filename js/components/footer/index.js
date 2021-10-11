import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox, TouchableWithoutFeedback ,FlatList} from "react-native";
import ImagePicker from "react-native-image-picker";

import { Container, Header,Content,Button, Icon, Card,CardItem,Thumbnail,Text,Item,Title,Left,Right,Spinner,Body,Label, Input } from "native-base";
import { Actions } from "react-native-router-flux";
import commonColor from '../../../native-base-theme/variables/commonColor';
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
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state={
      opacity:1,
      activevalue:0,
    }
  }
   

   mouseEnter() {
    Actions.Addhomework()
   }

nextscreen(value){

  this.setState({activevalue:value})
  let that=this;
  setTimeout( function(){
that.setState({activevalue:value})
  },100)
  if(value==1){
  Actions.CustomerHome()
}else if(value==2){
  Actions.Teacherchatlist()
} else if(value==3){
  Actions.Task()
}else if(value==4){
  Actions.Attendance()
}
}

  render() {
    
   
    return (
     <View style={{ width: deviceWidth, backgroundColor: commonColor.brandSecondry,height: 66,flexDirection:'row', borderTopWidth:2,borderTopColor:'#e6e6e6',justifyContent:'center', marginTop: 5, position:'absolute', bottom:0}} >
                
                <TouchableWithoutFeedback onPress={() => this.nextscreen(1)}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.CustomerHome() } >
                   
                    <Image
                      source={require("../../../assets/bottom_icon/homegray.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                 
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback> 

                
                <TouchableWithoutFeedback onPress={() => this.nextscreen(2)}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
               
                    <Image
                      source={require("../../../assets/menuicons/chatlight.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                  
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#000000',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback> 

                 

                <TouchableOpacity onPress={()=>this.mouseEnter()} style={{elevation: 5,shadowColor: '#000',
                                                                          shadowOffset: { width: 0, height: 1 },
                                                                          shadowOpacity: 0.8,
                                                                          shadowRadius: 1,}}>
                <View style={{ justifyContent:'center',marginTop:-40,alignItems:'center', width:deviceWidth/5 ,}}>
                    <Image
                      source={require("../../../assets/images/ellipse.png")}
                      style={{ width:80, height: 80 , }}
                    />
                    <View style={{ position:'absolute',marginLeft:-20,marginTop:-20,zIndex:1001}}>
                     <Text style={{color:'#ffffff',fontSize:40,marginTop:-10, fontWeight:'400'}}>+</Text>
                    </View>
                </View>     
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() => this.nextscreen(3)}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}>
                   
                    <Image
                      source={require("../../../assets/bottom_icon/eventgray3.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                    
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Event</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => this.nextscreen(4)}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                    
                    <Image
                      source={require("../../../assets/bottom_icon/attandance.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                    
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Attendance</Text>
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
