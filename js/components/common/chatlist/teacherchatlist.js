import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions, FlatList, 
        TouchableHightLight ,Image,
        ImageBackground,BackHandler,
        TouchableOpacity,Alert,Modal} from "react-native";
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
import moment from "moment";
const { width } = Dimensions.get("window");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { openChatWindow2 } from "../../../actions/common/chat";
import Search from 'react-native-search-box';
import  Searchfooter  from "../../../components/footersearch";
import SplashScreen from "react-native-splash-screen";
import config from "../../../../config.js";
import SyncStorage from 'sync-storage';
import Swipeout from 'react-native-swipeout';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    chatlist: state.chat.chatlist,
    user_id: state.driver.user._id,
    trainerProfileId: state.driver.user.trainerProfileId,
    userid:state.driver.user.teacherlogin.teacherid,
  };
}

class Teacherchatlist extends Component {
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
      listdata:[],
      submit: false,
      image: null,
      render: false,
      //trainerProfileId: this.props.trainerProfileId,
      jwtAccessToken: this.props.jwtAccessToken,
      user_id: this.props.user_id,
       showmodal:false,
      modalVisible: false,
      trainerName: undefined,
      trainer_id: undefined,
      appointment_id: undefined,
      appointment_time: undefined,
      blockuserlist:[],
    };
    
    //this.props.dispatch(getProfileData(this.state.trainerProfileId));    
  }

  async componentDidMount() {
    

    await this.props.fetchChatListAsync();
  }

componentDidMount() {
  
    this.getstudentlist();
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }
  getstudentlist(){
    fetch(`${config.serverSideUrl}/getallchatlists/${this.props.userid}`, {
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
              this.setState({listdata:data})
            } 
        })
        .catch(e => {
               //alert('something went wrong')
        });
  }
  getblockuserlist(){
    fetch(`${config.serverSideUrl}/blockuserlist/${this.props.userid}`, {
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
              this.setState({blockuserlist:data})
            } 
        })
        .catch(e => {
               //alert('something went wrong')
        });
  }

showmodal(){
  this.setState({
     showmodal:true
  })
  this.getblockuserlist();
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

  openChatWindow2(userId){
    
    this.props.openChatWindow2(userId);
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


  renderRow = ({ item }) => {  
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.openChatWindow2(item._id)} 
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
  blockperson(senderId,message_id){
      fetch(`${config.serverSideUrl}/blockuser`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
             Cookie:'token='+this.props.jwtAccessToken
          },
          body: JSON.stringify({
               user_id:senderId,
               block_by:this.props.userid
           
        })

        })
        .then(resp => resp.json())
        .then(data => {
         
         
           
        })
        .catch(e => {
               //alert('something went wrong')
        });
  }
  unblockperson(senderId,message_id){
      fetch(`${config.serverSideUrl}/unblockuser`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
             Cookie:'token='+this.props.jwtAccessToken
          },
          body: JSON.stringify({
               user_id:senderId,
               block_by:this.props.userid
           
        })

        })
        .then(resp => resp.json())
        .then(data => {
         this.setState({
           showmodal:false
         })
         
           
        })
        .catch(e => {
               //alert('something went wrong')
        });
  }
  deleteperson(id){
    
     fetch(`${config.serverSideUrl}/deletechat`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
             Cookie:'token='+this.props.jwtAccessToken
          },
          body: JSON.stringify({
               userid:this.props.userid,
               id:id,
           
        })

        })
        .then(resp => resp.json())
        .then(data => {
          alert('delete succssfully')
         this.getstudentlist();
         
           
        })
        .catch(e => {
               //alert('something went wrong')
        });

  }


  openchatlist(id,name,className){
    
    SyncStorage.set('otherteacherId',id);
    SyncStorage.set('otherteacherName',name);
    SyncStorage.set('otherclassName',className);

    Actions.Teacherchat()
  }
  blockuserlist=({item,index})=>{
    const swipeoutBtns2 = [
              {
                text: 'UnBlock', 
                backgroundColor:'#40c353',
                color:'#FFFFFF',
                onPress: () => { Alert.alert(
                                  'Alert Title',
                                  'Are You Sure You Want To UnBlock this?',
                                  [
                                    {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
                                    {text: 'YES', onPress: () => this.unblockperson(item.senderId,item.message_id)},
                                  ]
                                ); }
              },
              
             ]
    var uri= 'http://wesmart.in/backend/public/documents/'
    
    return(
         <View style={{ backgroundColor:'#FFF',  color:'#707E85',height:80,borderBottomWidth:1,borderColor:'lightgray'}} >
              <Swipeout right={swipeoutBtns2}  autoClose='true' backgroundColor= 'transparent'>
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
                   <Text style={{fontSize:10,fontWeight:'700',marginTop:5}} >{item.time}</Text>
                  </View>
                   
                  </View>
                </View>  
                  </Swipeout>             
              </View> 
     
    )
  }

  renderItem = ({item, index}) => {
    
     const swipeoutBtns = [
              {
                text: 'Block', 
                backgroundColor:'#40c353',
                color:'#FFFFFF',
                onPress: () => { Alert.alert(
                                  'Alert Title',
                                  'Are You Sure You Want To Block this?',
                                  [
                                    {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
                                    {text: 'YES', onPress: () => this.blockperson(item.senderId,item.message_id)},
                                  ]
                                ); }
              },
              {
                text: 'Delete', 
                backgroundColor:'#c53e3e',
                color:'#FFFFFF',
                onPress: () => {  Alert.alert(
                                  'Alert Title',
                                  'Are You Sure You Want To Delete this?',
                                  [
                                    {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
                                    {text: 'YES', onPress: () => this.deleteperson(item.senderId)},
                                  ]
                                ); }
              }
             ]
    var uri= 'http://wesmart.in/backend/public/documents/'
    return (
   <View>
    { index==0 ?
      
       <View style={{ backgroundColor:'#FFF',  color:'#707E85',borderTopLeftRadius:20,borderTopRightRadius:20,height:'auto',borderBottomWidth:1,borderColor:'lightgray',marginTop:30,elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 1}} >
               <Swipeout right={swipeoutBtns}  autoClose='true' backgroundColor= 'transparent'>
                <TouchableOpacity onPress={()=> this.openchatlist(item.senderId,item.senderName,item.className)}>
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
                    <Text style={{fontSize:10,fontWeight:'700',marginTop:5}} > Class:{item.className}</Text>
                    <Text style={{fontSize:10,fontWeight:'700',marginTop:5}} > {item.time}</Text>
                  </View>
                   
                  </View>
                </View> 
                </TouchableOpacity>
            </Swipeout>
              </View>

        :
      <View style={{ backgroundColor:'#FFF',  color:'#707E85',height:'auto',elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 1,borderBottomWidth:1,borderColor:'lightgray'}} >
               <Swipeout right={swipeoutBtns}  autoClose='true' backgroundColor= 'transparent'>
                <TouchableOpacity onPress={()=> this.openchatlist(item.senderId,item.senderName,item.className)}>
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
                     <Text style={{fontSize:10,fontWeight:'700',marginTop:5}} > Class:{item.className}</Text>
                   <Text style={{fontSize:10,fontWeight:'700',marginTop:5}} >{item.time}</Text>
                  </View>
                   
                  </View>
                </View> 
                </TouchableOpacity> 
                </Swipeout>                
              </View> 
        }
   </View>
             
    )
  };

  render() {

    return (
      <Container style={{ backgroundColor: "#FFF" }}>
          
          <View style={{ flex: 1 }}>
            <Content style={{marginBottom:110}}>
              <ImageBackground source={ require('../../../../assets/images/Mask_Group_37.png')} style={{width: deviceWidth,  resizeMode:'cover',}}> 
                       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'10%',marginBottom:'5%'}}>
                        <Button transparent onPress={()=>Actions.pop()}>
                          <Icon
                            name="md-arrow-back"
                            style={{ fontSize: deviceHeight/35, color: "#fff" }}
                          />
                          <Text style={{color:'#fff',fontSize:22,fontWeight:'bold',marginLeft:30,paddingTop:5}}> Chat</Text>
                                                        
                        </Button>
                       <TouchableOpacity onPress={()=>this.showmodal()}>
                                <Image                      
                                  source={require("../../../../assets/images/Path_12802.png")}
                                  style={{ width:40, height: 40,marginRight:10}}
                                 onPress={()=>this.showmodal()}
                                /> 
                        </TouchableOpacity>
                        </View>
          
              <View>
               <FlatList
                   data={this.state.listdata}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   />
              
              </View>
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
                                          
                                          source={require("../../../../assets/images/Group_17138.png")}
                                          style={{ width:20, height: 20, borderRadius:20 }}
                                          
                                        /> 
                                        
           </TouchableOpacity>
          <View>
                 <FlatList
                   data={this.state.blockuserlist}
                   extraData={this.state}
                   renderItem={this.blockuserlist}
                   />
    
          </View>

        </View>
        </View>
      </Modal>
            </ImageBackground>
        </Content>
    </View>
          <Searchfooter/>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    openChatWindow2: user_id => dispatch(openChatWindow2(user_id)),    
    fetchChatListAsync: text => dispatch(fetchChatListAsync(text)),
    setFeedbackData: (data) => dispatch(setFeedbackData(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Teacherchatlist);