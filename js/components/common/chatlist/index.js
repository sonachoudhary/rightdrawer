import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions, FlatList, TouchableHightLight ,Image,BackHandler,TouchableOpacity,ImageBackground ,Alert,TouchableWithoutFeedback} from "react-native";
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

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { fetchChatListAsync } from "../../../actions/common/chat";
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
import SyncStorage from 'sync-storage';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    chatlist: state.chat.chatlist,
    user_id: state.driver.user._id,
    trainerProfileId: state.driver.user.trainerProfileId,
    userid:state.driver.user.studentlogin.studentid,
  };
}

class Chatlist extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchChatListAsync: PropTypes.func,
    loadSpinner: PropTypes.bool,
    appointmentlist: PropTypes.array,
    pending_appointment: PropTypes.array,
    archive_appointment: PropTypes.array,
    afterFocus: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      data:[],
      submit: false,
      image: null,
      render: false,
      //trainerProfileId: this.props.trainerProfileId,
      jwtAccessToken: this.props.jwtAccessToken,
      user_id: this.props.user_id,
      modalVisible: false,
      trainerName: undefined,
      trainer_id: undefined,
      appointment_id: undefined,
      appointment_time: undefined,
    };
    
    //this.props.dispatch(getProfileData(this.state.trainerProfileId));    
  }

  async componentDidMount() {
    await this.props.fetchChatListAsync();
  }
  componentDidMount() {
    fetch(`${config.serverSideUrl}/getallstudentchatlist/${this.props.userid}`, {
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
  

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }
  
  callScreenFeedback() {
    var bodyData = {};
    bodyData.customer_id = this.state.user_id;
    bodyData.trainer_id = this.state.trainer_id;
    bodyData.trainerName = this.state.trainerName;
    bodyData.appointment_id = this.state.appointment_id;
    bodyData.appointment_time = this.state.appointment_time;
    this.props.setFeedbackData(bodyData)
  }

  setModalVisible(visible) {
     this.setState({modalVisible: visible});
  }

  openChatWindow(userId){
    
    this.props.openChatWindow(userId);
  }

  openConfirmPopup(item) {
    
    this.setState({
      trainerName: item.tlname+" "+item.tfname, 
      trainer_id: item.trainerprofileid,
      appointment_id: item._id,
      appointment_time: item.time          
    })
    this.setModalVisible(true)
  }

  openchatlist(id,name){
    SyncStorage.set('otheruserId',id);
    SyncStorage.set('otheruserName',name);
    Actions.chat()
  }

  renderRow = ({ item }) => {  
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.openChatWindow(item._id)} 
      >
        <View style={styles.listContainer}>
          <Thumbnail
            source={{ uri: item.image }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 2
          }} />
          
          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.name}</Text>
            <Text style={styles.msgTextColor}>{item.message}</Text>            
          </View>

          <View style={styles.rightText}>            
            
            { 
              item.newMessage > 0 &&
              <Badge style={styles.messagecount}>
                <Text>{item.newMessage}</Text>
              </Badge> 
            }

            <Text style={styles.dateColor}>{item.time}</Text>
          </View>
        </View>
      </ListItem>
    );
  };

  search(text) {
    
    this.props.fetchChatListAsync(text);
  }

  renderItem = ({item, index}) => {
     var uri= 'http://wesmart.in/backend/public/documents/'
    return (
    <TouchableOpacity onPress={()=> this.openchatlist(item.senderId,item.senderName)}>
     <View>
    { index==0 ?
    <View style={{ backgroundColor:'#FFF',  color:'#707E85',borderTopLeftRadius:20,borderTopRightRadius:20,height:80,borderBottomWidth:1,borderColor:'lightgray',marginTop:30}} >
                <View style={{ flexDirection:'row',padding:20}} >
                  {item.senderPic ?
                  <Image
                    source={{uri:uri+item.senderPic}}
                    style={{ width:40, height: 40, borderRadius:20,margin:0}}
                   />
                   :
                   <Image
                    source={require("../../../../assets/images/dummy_profile.png")}
                    style={{ width:40, height: 40, borderRadius:20,margin:0}}
                   />
                 }

                  <View style={{ flexDirection:'row', marginLeft:10}} >
                  <View>
                    <Text style={{ fontSize:16, color: "#707070",fontWeight:'700' }}>{item.senderName}</Text>
                   <Text style={{fontSize:10,fontWeight:'700',marginTop:5}} > {item.time}</Text>
                  </View>
                   
                  </View>
                </View>                  
              </View>
        :
      <View style={{ backgroundColor:'#FFF',  color:'#707E85',height:80,borderBottomWidth:1,borderColor:'lightgray'}} >
                <View style={{ flexDirection:'row',padding:20}} >
                  <Image
                    source={require("../../../../assets/images/dummy_profile.png")}
                    style={{ width:40, height: 40, borderRadius:20,marign:10 }}
                  />

                  <View style={{ flexDirection:'row', marginLeft:10}} >
                  <View>
                    <Text style={{ fontSize:16, color: "#707070",fontWeight:'700' }}>{item.senderName}</Text>
                   <Text style={{fontSize:10,fontWeight:'700',marginTop:5}} > {item.time}</Text>
                  </View>
                   
                  </View>
                </View>                  
              </View> 
        }
        </View>  
      </TouchableOpacity>      
    )
  };

  render() {
    return (
      <Container style={{}}>
          
         
              
              
         <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: deviceWidth,  resizeMode:'cover',}}> 
                       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'15%'}}>
                        <Button transparent onPress={()=>Actions.pop()}>
                          <Icon
                            name="md-arrow-back"
                            style={{ fontSize: 28, color: "#000000" }}
                          /> 
                          <Text style={{color:'#000',fontSize:22,fontWeight:'bold',marginLeft:30,paddingTop:5}}> Chat</Text>
                                                        
                        </Button>
                       
                        </View>
            
             
              <View>
               <FlatList
                   data={this.state.data}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   />
              
              </View>
        </ImageBackground>
          <View style={{ width: deviceWidth, backgroundColor:'#470B63',height: 70,flexDirection:'row', borderTopWidth:1,borderTopColor:'#470B63',justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                
                <TouchableWithoutFeedback onPress={() => Actions.Fees()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Fees() } >
                    <Image
                      source={require("../../../../assets/bottom_icon/feeblue.png")}
                       style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Fees</Text>
                </View>     
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={() => Actions.chatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                   <Image
                      source={require("../../../../assets/bottom_icon/chatgray.png")}
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
    openChatWindow: user_id => dispatch(openChatWindow(user_id)),    
    fetchChatListAsync: text => dispatch(fetchChatListAsync(text)),
    setFeedbackData: (data) => dispatch(setFeedbackData(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Chatlist);