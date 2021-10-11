import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions,ScrollView, FlatList,TextInput, TouchableHightLight ,Image,ImageBackground,TouchableOpacity,BackHandler,TouchableWithoutFeedback} from "react-native";
import {
  Tab,
  Tabs, 
  ScrollableTab,
  TabHeading,
  Container,
  Header,
  Content,
  Badge,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
  Text,
  Item,
  Title,
  Left,
  Right,
  Label,
  Body,
  Spinner,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';
import SyncStorage from 'sync-storage';

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setFeedbackData } from "../../../actions/common/booking";
import Modal from "react-native-modal";
import moment from "moment";
const { width } = Dimensions.get("window");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { openChatWindow } from "../../../actions/common/chat";
import Search from 'react-native-search-box';
import  Footernew  from "../../../components/footernew";
import SplashScreen from "react-native-splash-screen";
import config from "../../../../config.js";
import RazorpayCheckout from 'react-native-razorpay';

 
function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    chatlist: state.chat.chatlist,
    user_id: state.driver.user._id,
    username:state.driver.user.student,
    userid:state.driver.user.studentlogin.studentid,
    data:state.driver.user.student,
    userdata: state.driver.user,
    //email:state.driver.user.studentlogin.email,
  };
}

class Fees extends Component { 
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    loadSpinner: PropTypes.bool,
    appointmentlist: PropTypes.array,
    pending_appointment: PropTypes.array,
    archive_appointment: PropTypes.array,
    afterFocus: PropTypes.func,
  };

  constructor(props) {
    super(props);
    
    this.state = {
      submit: false,
      image: null,
      render: false,
      showmodal:false,
      amount:1,
      jwtAccessToken: this.props.jwtAccessToken,
      user_id: this.props.user_id,
      feesdata:[],
      data:[{todat:'today',fee:'15000',time:'12:30',pending:'15000'},{todat:'today',fee:'15000',time:'12:30',pending:'15000'},{todat:'today',fee:'15000',time:'12:30',pending:'15000'},{todat:'today',fee:'15000',time:'12:30',pending:'15000'}]
    }; 
  }

   componentDidMount() {

    this.callfeedata();
  }

 callfeedata(){
  fetch(`${config.serverSideUrl}/getfeesByStudent/${this.props.userid}`, {
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
                  this.setState({feesdata:data});
              }
         })
        .catch(e => {

                
        });
 }

 async getpopdata(id){
    // alert(id)
   SyncStorage.set('feedetail', id);

    

   Actions.Feedetail();
 }

 showmodal(){
  this.setState({
     showmodal:true,
     amount: 1
  })
  
}

  renderItem = ({item, index}) => {
    var Datevalnew=moment(item.duedate).format('MMMM, YYYY')
    return (
      <TouchableOpacity onPress={()=>this.getpopdata(item.id)}>
          <View style={{backgroundColor:'#ECF1F2',width:deviceWidth-30,borderRadius:10,padding:10,marginLeft:5,marginBottom:20}}>
                <Text  style={{ fontSize:18, color: "#000000",fontWeight:'700',marginTop:10}}>{item.title}</Text>
                <Text  style={{ fontSize:15, color: "#828282",fontWeight:'400',marginTop:10}}>{Datevalnew}</Text>
              <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                <Text  style={{ fontSize:15, color: "#828282",fontWeight:'400',marginRight:20}}>Fees: {item.fee}</Text>
                <Text  style={{ fontSize:15, color: "#828282",fontWeight:'400',marginRight:20}}>Paid: {item.paid}</Text>
                <Text  style={{ fontSize:15, color: "#828282",fontWeight:'400'}}>Due: {item.due}</Text>
              </View>
          </View>
      </TouchableOpacity>            
    )
  };

  render() {
    
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
          <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: width,  resizeMode:'cover',height:160}}> 
                       <View style={{marginTop:30, flexDirection:'row'}}>
                        <Button transparent onPress={()=>Actions.pop()}>
                          <Icon
                            name="md-arrow-back"
                            style={{ fontSize: 28, color: "#000000" }}
                          />
                          <Text style={{color:'#000000',fontSize:22,fontWeight:'bold',marginLeft:30,paddingTop:5}}> Fees</Text>
                                                        
                        </Button>
                       
                      </View>   
                      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginHorizontal:20,alignItems:'center'}}>
                          <Text  style={{ fontSize:18, color: "#484347",fontWeight:'700' }}> Hi, {this.props.username.name}</Text>
                        </View>
                        <View style={{marginLeft:25,marginTop:8,flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{ fontSize:18, color: "#484347",fontWeight:'300' }}>Your Fees</Text>
                        
                 
                  </View> 
          </ImageBackground>

         
            <View style={{justifyContent:'center',alignItems:'center'}}> 
              <View style={{ marginTop:10,height:deviceHeight-300}}>
                  <FlatList
                    data={this.state.feesdata}
                   extraData={this.state}
                   renderItem={this.renderItem}
                 />
                
              </View>
            </View>
         
          <View style={{ width: deviceWidth, backgroundColor:'#470B63',height: 70,flexDirection:'row', borderTopWidth:1,borderTopColor:'#470B63',justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                
                <TouchableWithoutFeedback onPress={() => Actions.Fees()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Fees() } >
                    <Image
                      source={require("../../../../assets/bottom_icon/feegray.png")}
                       style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Fees</Text>
                </View>     
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={() => Actions.chatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                    <Image
                      source={require("../../../../assets/bottom_icon/chatblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback>  

                
                <TouchableWithoutFeedback onPress={() => Actions.BarberHome()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.BarberHome() } >
                    <Image
                      source={require("../../../../assets/bottom_icon/homeblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback>  


                <TouchableWithoutFeedback onPress={() => Actions.Studentresult()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Studentresult() }>
                    <Image
                      source={require("../../../../assets/bottom_icon/resultblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Results</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.Calender()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                   <Image
                      source={require("../../../../assets/bottom_icon/attandancegray.png")}
                      style={{ width:30, height: 30  }}
                    />
                    <Text style={{fontSize:12,fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Attendance</Text>
                </View>   
                </TouchableWithoutFeedback>                 
            </View>
              


      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setFeedbackData: (data) => dispatch(setFeedbackData(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Fees);