import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,
        TouchableOpacity, Image, CheckBox, TouchableWithoutFeedback ,FlatList,Modal,BackHandler,Alert} from "react-native";
import ImagePicker from "react-native-image-picker";
import SplashScreen from "react-native-splash-screen";
import { Container, Header,Content,Button, Icon, Card,CardItem,Thumbnail,Text,Item,Title,Left,Right,Spinner,Body,Label, Input } from "native-base";
import { Actions } from "react-native-router-flux";
import moment from "moment/moment";
import { InputAutoSuggest } from 'react-native-autocomplete-search';
import config from "../../../config.js";
import SyncStorage from 'sync-storage';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType, 
    schoolid:state.driver.user.teacherlogin.schoolid,
     userid:state.driver.user.teacherlogin.teacherid,   
  };
}
class Searchfooter extends Component {
  constructor(props) {
    super(props);
    this.state={
      opacity:1,
      showmodal:false,
      data:'',
    }
  }
   

   // mouseEnter() {
   //  Actions.Addhomework()
   // }


showmodal(){
  this.setState({
     showmodal:true
  })
}
selectdata(value){
  
  if(value!=null){
     
     SyncStorage.set('otherteacherId',value.id);
     SyncStorage.set('otherteacherName',value.name);
     SyncStorage.set('otherclassName',value.classid);
     this.setState({
      showmodal:false
     })
      setTimeout(function(){ 
         Actions.Teacherchat()

         },1000 );
     
  }

      
    
  // Actions.Teacherchatlist()
  //   this.setState({
  //    showmodal:false
  // })
}
componentDidMount() {
  fetch(`${config.serverSideUrl}/allstudentlistdata/${this.props.schoolid}/${this.props.userid}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
             Cookie:'token='+this.props.jwtAccessToken
          }

        })
        .then(resp => resp.json())
        .then(data => {

         
          if(data!=null){
              this.setState({data:data})
            } 
        })
        .catch(e => {
               //alert('something went wrong')
        });
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }


nextscreen(value){

  this.setState({activevalue:value})
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
     <View style={{ width: deviceWidth, backgroundColor: '#fff',height: 66,flexDirection:'row', borderTopWidth:2,borderTopColor:'#e6e6e6',justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                 <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}
                onRequestClose={() => {
                
                this.setState({showmodal:false});
               }}
            >
            <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
              <View style={{marginTop:'40%', height:'100%', borderRadius:30,  borderColor:'#000', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8, shadowRadius: 1,backgroundColor: '#ffffff', }}>
            
            <TouchableOpacity
                 style={{justifyContent:'flex-end',flexDirection:'row',marginTop:20,marginRight:30}}
                 onPress={() => this.setState({showmodal:false})}
            >
             
                                      <Image
                                          
                                          source={require("../../../assets/images/Group_17138.png")}
                                          style={{ width:20, height: 20, borderRadius:20 }}
                                          
                                        /> 
                                        
           </TouchableOpacity>
          <View>
                <InputAutoSuggest
                  style={{ flex: 1 }}
                  inputStyle={{
                    borderWidth:1,
                    margin:30,height:50,
                    borderRadius:5,

                  }}
                  itemTextStyle={{
                    fontSize:16,
                    marginLeft:30,
                    marginRight:30,
                    marginTop:10,
                    height:40,
                    borderBottomWidth:1,
                    borderColor:'#333333',
                    backgroundColor:'#ffffff',
                    textAlign:'center',
                  }}
                  flatListStyle={{
                    height:deviceHeight/1.3,

                  }}
                  onDataSelectedChange={value => this.selectdata(value)}

                  staticData={this.state.data}
                   


                />
    
          </View>

        </View>
        </View>
      </Modal>
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
                      source={require("../../../assets/bottom_icon/chatblue.png")}
                      style={{ width:30, height: 30  }}
                    />
                  
                    
                  
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#000000',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback> 

                 

                <TouchableOpacity onPress={()=>this.showmodal()} style={{elevation: 5,shadowColor: '#000',
                                                                          shadowOffset: { width: 0, height: 1 },
                                                                          shadowOpacity: 0.8,
                                                                          shadowRadius: 1,}}>
                <View style={{ justifyContent:'center',marginTop:-35,alignItems:'center', width:deviceWidth/5 ,}}>
                    <Image
                      source={require("../../../assets/images/ellipse.png")}
                      style={{ width:80, height: 80 , }}
                    />
                    <View style={{ position:'absolute',zIndex:1001,}}>
                     <Image
                      source={require("../../../assets/images/search.png")}
                      style={{ width:20, height: 20 , color:'#fff',alignItems:'center' }}
                    />
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
)(Searchfooter);
