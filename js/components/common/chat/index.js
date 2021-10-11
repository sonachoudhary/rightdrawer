import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Image, Platform, Dimensions, FlatList, Alert,
  TouchableNativeFeedback as TouchableNative, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard ,BackHandler,ImageBackground } from "react-native";
import {
  Tab,
  Tabs, 
  ScrollableTab,
  TabHeading,
  Container,
  Header,
  Content,
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
import SocketIOClient from 'socket.io-client';
import moment from "moment";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { savestudentChat, fetchHistory, updateReadStatus } from "../../../actions/common/chat";
import Modal from "react-native-modal";
import  Footernew  from "../../../components/footernew";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import SplashScreen from "react-native-splash-screen";
import config from "../../../../config.js";
import SyncStorage from 'sync-storage';
const {OS} = Platform;
import ImagePicker from "react-native-image-picker";
export const TouchableNativeFeedback = (OS === 'ios') ? TouchableOpacity : TouchableNative;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
const { width } = Dimensions.get("window");
const io = require('socket.io-client');
import RNFS from 'react-native-fs';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    user_id: state.driver.user._id,
    aboutus: state.all.aboutus,
    userDetail: state.driver.user,
    contact_user: state.chat.contact_user,    
    chat_history: state.chat.chat_history,
    userid:state.driver.user.studentlogin.studentid, 
  };
}

class Chat extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchAbout: PropTypes.func,
    loadSpinner: PropTypes.bool,
    newslist: PropTypes.array,    
  };

  constructor(props) {
    super(props);
    
    const { navigation } = this.props;
    const idLogedid =  this.props.userDetail._id;
    const idother = this.props.contact_user._id;
    const otherUserName = this.props.contact_user.fname;
    const otherUserImage = this.props.contact_user.profileUrl;
    
    this.state = {
      inputBarText: '',
      msg: '',
      loggedInUserId: this.props.userid,    
      otherUserId: 27,
      otherUserName: 'Lovleen Setia',
      otherUserImage: '',//this.props.contact_user.profileUrl,
      messages: this.props.chat_history,
    }
    
    this.socket = io('http://maneemergency.net:7889', {
      jsonp: false,
      transports: ['websocket'],
    });
    this.socket.emit('user_socket', this.state.loggedInUserId);    
    this.initEvents();    
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Image
                source={{uri: params.picture}}
                style={{width:80, height:80, borderRadius: 40, marginTop: 40, borderWidth:2, borderColor: "#333", backgroundColor:"#000" }}
            />
        </View>        
      ),
    }
  };

  //scroll to bottom when first showing the view
  componentDidMount() {
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))    
  }

  getMessageHistoryData() {
    let data = {
      user_id : this.props.user._id,
      other_user_id: this.props.contact_user._id
    };
    
    
    App.showLoader();
    this.props.getMessageHistory(data).then((response) => {
      this.setState({messages: response});
      App.hideLoader();
    }).catch(error => {
      showToast(error.message);
      App.hideLoader();
    })
  }

  updateReadStatusCall(){
    let data = {
      user_id : this.props.user._id,
      other_user_id: this.props.contact_user._id
    };
    
    this.props.updateReadStatus(data);

  }
  
  initEvents() { 
    this.socket.on('currentuser_socketid', this.onUserJoin);
    this.socket.emit('user_socket', this.state.loggedInUserId);    
  }

  onUserJoin = (value) => {    
    this.socket.on('send', this.onMessageSend);
    this.socket.on('receive', this.onMessageReceived);
  }

  onMessageSend = (message) => {
    const item = {id:Math.floor((Math.random() * 99999999999999999) + 1), sent: true, msg: this.state.msg }
    this.setState({ messages: this.state.messages.concat(item), inputValue: '' })
  }

  onMessageReceived = (message) => {
      
    if(message.receiverId==this.state.loggedInUserId && message.senderId==this.state.otherUserId){
      const item = { id:Math.floor((Math.random() * 99999999999999999) + 1), message_id:Math.floor((Math.random() * 99999999999999999) + 1) , sent: false, time: message.time, msg: message.message }
     
      var newMessage = this.state.messages.concat(item);
      this.setState({ messages: newMessage })  
    }
  }
 
  clicked = () => {  
    const dataObj = {
      action: 'click'
    };
    this.socket.emit('channel2', dataObj);
  }

  reply() {
    var messages = this.state.messages;
    messages.push({
      id:Math.floor((Math.random() * 99999999999999999) + 1),
      sent: false,
      msg: this.state.msg,
      image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'
    });
    this.setState({msg:'', messages:messages});
  }

  send() {
    if (this.state.msg.length > 0) {
      const item = {id:Math.floor((Math.random() * 99999999999999999) + 1), sent: true, msg: this.state.msg, image:'https://www.bootdey.com/img/Content/avatar/avatar1.png' }
      this.setState({ messages: this.state.messages.concat(item), msg: '' })
      this.socket.emit('chat message', this.state.loggedInUserId, this.state.otherUserId, this.state.msg);       
    }
  }


  //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
  //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
  keyboardDidShow (e) {
    this.scrollView.scrollToEnd();
  }

  //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
  keyboardDidHide (e) {
    this.scrollView.scrollToEnd();
  }

  

  //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but 
  //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
  componentDidUpdate() {
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  _sendMessage() {
    this.setState({
      messages: this.state.messages,
      inputBarText: ''
    });   
    
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var d = new Date();
    var n = month[d.getMonth()];
    var date = d.getDate();
    var hours = d.getHours();
    var mins = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var settime = n + " " +date+ ", " +hours+":"+mins;

     var month = d.getMonth() + 1;   
    var year = d.getFullYear();

    if (this.state.inputBarText.length > 0) {
      const item = {id:Math.floor((Math.random() * 99999999999999999) + 1), sent: false, time:settime, msg: this.state.inputBarText, image:'https://www.bootdey.com/img/Content/avatar/avatar1.png' }
      if(this.state.messages.length>0){
          this.setState({ messages: this.state.messages.concat(item), msg: '' })
      }else {
        this.setState({ messages: item, msg: '' })
      }
      
      
      this.socket.emit('chat message', this.state.loggedInUserId, this.state.otherUserId, this.state.inputBarText, settime); 
       
        if (month.length < 2) month = '0' + month;
        if (date.length < 2) date = '0' + date;
        var savetime = year+'-'+month+'-'+date+" "+hours+":"+mins;
        this.savechatApi(this.state.loggedInUserId,this.state.otherUserId, this.state.inputBarText,savetime);
    }

  }


  _sendFileMessage(url) {
    //alert(url)
    this.setState({
      messages: this.state.messages,
      inputBarText: ''
    });   
    
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var d = new Date();
    var n = month[d.getMonth()];
    var date = d.getDate();
    var hours = d.getHours();
    var mins = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var settime = n + " " +date+ ", " +hours+":"+mins;

     var month = d.getMonth() + 1;   
    var year = d.getFullYear();

    if (url!="") {
      const item = {id:Math.floor((Math.random() * 99999999999999999) + 1), sent: false, time:settime, msg: url, image:'https://www.bootdey.com/img/Content/avatar/avatar1.png' }
     if(this.state.messages.length>0){
          this.setState({ messages: this.state.messages.concat(item), msg: '' })
      }else {
        var getar = [];
        getar.push(item);
        this.setState({ messages: getar, msg: '' })
      }


      this.socket.emit('chat message', this.state.loggedInUserId, this.state.otherUserId, url, settime); 
       
        if (month.length < 2) month = '0' + month;
        if (date.length < 2) date = '0' + date;
        var savetime = year+'-'+month+'-'+date+" "+hours+":"+mins;
        //this.savechatApi(this.state.loggedInUserId,this.state.otherUserId, url,savetime);
        this.getbase64stringValue(this.state.loggedInUserId,this.state.otherUserId, url,savetime);
    }

  }

 getbase64stringValue(userId,otherUserId,url,time){
      var data = RNFS.readFile( url, 'base64').then(res => { 
           this.savechatApi(userId,otherUserId,'data:image/png;base64,'+res,time)
        })
  }

  savechatApi(userId,otherUserId,message,time){
    let data = {
      from: userId,
      to: otherUserId,
      message: message,
      individual_chat: 1,      
      time:time
    };
    
    this.props.savestudentChat(this.props.jwtAccessToken, data);
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  //This event fires way too often.
  //We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
  //We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
  //The real solution here is probably a fork of AutogrowInput that can provide this information.
  _onInputSizeChange() {
    setTimeout(function() {
      this.scrollView.scrollToEnd({animated: false});
    }.bind(this))
  }

  setModalVisible(visible,item) {
     this.setState({
     	modalVisible: visible,
     	customerName: item.SenderData.lname+" "+item.SenderData.fname,
     	message: item.message,
     	notification_id: item._id
     });
  }

  async componentDidMount() {
    this.getchatdata();
     this._retrieveid();
    await this.props.fetchHistory(this.props.jwtAccessToken,this.props.userid);
  }
  

_retrieveid = async () => {
  var that=this;
  try {
    const otheruserId = await SyncStorage.get('otheruserId');
    const otheruserName = await SyncStorage.get('otheruserName');
    this.setState({otherUserId:otheruserId})
    this.setState({otherUserName:otheruserName})
    setTimeout(function(){
      that.getchatdata();
    },1000)
  } catch (error) {
    // Error retrieving data
  }
};

_pickImage() {
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
        //alert(response.uri );
        if(response.uri!=undefined){
          this._sendFileMessage(response.uri);
        }
        //this.setState({filedata: response.uri });
    });
  }

  getchatdata(){
    // alert(this.state.otherUserId)
    fetch(`${config.serverSideUrl}/get_studentchat_history/${this.props.userid}/${this.state.otherUserId}`, {
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
              this.setState({messages:data})
            } 
        })
        .catch(e => {
               //alert('something went wrong')
        });
      
  }

  async fetchAppointmentList() {
    await this.props.fetchHistory(this.props.jwtAccessToken,this.props.userid);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  loadContent(){
    
  }

  

  render() {
    var messages = [];
    if(this.state.messages && this.state.messages.length>0){
      this.state.messages.forEach(function(message, index) {
          
          if (message.sent === true) {
          messages.push(
              <MessageBubble key={index} direction="left" text={message.msg} senderPic={message.senderPic} showtime={message.time} />
            );
        }else {
           messages.push(
              <MessageBubble key={index} direction="right" text={message.msg} senderPic={message.senderPic} showtime={message.time}/>
            );
        }        
      });  
    }
    
    return (
      <Container style={{ backgroundColor: "#FCC5C7" }}>
            <ImageBackground source={ require('../../../../assets/images/Mask_Group_37.png')} style={{width: width,  resizeMode:'cover',height:90}}> 
                       <View style={{marginTop:30, flexDirection:'row'}}>
                        <Button transparent onPress={()=>Actions.chatlist()}>
                          <Icon
                            name="md-arrow-back"
                            style={{ fontSize: deviceHeight/35, color: "#fff" }}
                          />
                          <Text style={{color:'#fff',fontSize:22,fontWeight:'bold',marginLeft:30,paddingTop:5}}> Chat</Text>
                                                        
                        </Button>
                        <Text style={{color:'#fff',fontSize:deviceHeight/40,marginLeft:30,paddingTop:7,fontWeight:'bold'}}>{this.state.otherUserName}</Text>
                      </View>    
          </ImageBackground>
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          
              <ScrollView 
                  ref={(ref) => { this.scrollView = ref }} 
                  //onMomentumScrollEnd={() => this.loadContent()} 
                  onScroll={({nativeEvent})=>{
                   
                }}
                style={styles.messages}>
                {messages}
              </ScrollView>
          <View style={styles.outer}>
              <InputBar onSendPressed={() => this._sendMessage()} 
                        onSizeChange={() => this._onInputSizeChange()}
                        onChangeText={(text) => this._onChangeInputBarText(text)}
                        onSubmitEditing={() => this._sendMessage()}
                        onSendFilePressed={() => this._pickImage()} 
                        text={this.state.inputBarText}/>           
          </View>            
        </Content>        
       
      </Container>
    );
  }
}



class MessageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
     showmodal:false,
     
    }
    
    
      
  }

  showmodal(){
  this.setState({
     showmodal:true
  })
 
}
  render() {

    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 120}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 150}}/> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft1 : styles.messageBubbleTextRight1;
 
    return (
      <View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {leftSpacer}
            <View style={{flexDirection:'row'}}>
            { this.props.direction === 'left' &&
                <View style={{justifyContent:'center', marginTop:10,borderRadius:20,padding:1,borderWidth:1,width:40, height: 40,borderColor:'#73503E'}}>
                    <Image
                      source={{uri: `${config.ImageURL}${this.props.senderPic}` }}
                      style={{ width:38, height: 38, borderRadius:20 }}
                    />
                </View>
             }
              { ( (this.props.text.substring(0, 4) === 'http') || (this.props.text.substring(0, 4) === 'file')) ?
                <TouchableOpacity style={{ borderRadius:10, marginTop:10,marginBottom:10}} onPress={()=>this.showmodal()}>
                  <Image                      
                    source={{ uri: this.props.text }}
                    style={{ width:150, height: 150,marginLeft:10, borderRadius:10 }}
                  />
                </TouchableOpacity>
              :
                <View style={bubbleStyles}>
                  <Text style={bubbleTextStyle}>
                    {this.props.text}
                  </Text>
                </View>
                } 
            </View>
            {rightSpacer}
          </View>
          <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}
                onRequestClose={() => {
                
                this.setState({showmodal:false});
               }}
            >
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)',height:deviceHeight/1.5,borderRadius:10 }}>
              
            
            <TouchableOpacity
                 style={{justifyContent:'flex-end',flexDirection:'row'}}
                 onPress={() => this.setState({showmodal:false})}
            >
             
                                      <Image
                                          
                                          source={require("../../../../assets/images/Group_17138.png")}
                                          style={{ width:20, height: 20, borderRadius:20 }}
                                          
                                        /> 
                                        
           </TouchableOpacity>
          <View>
                <Image                      
                  source={{ uri: this.props.text }}
                  style={{height:deviceHeight/1.5,borderRadius:10 }}
                /> 
    
          </View>

        </View>
        
      </Modal>
      </View>
      );
  }
}


class InputBar extends Component { 
  componentWillReceiveProps(nextProps) {
    if(nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }


  render() {
    return (
          <View style={styles.inputBar}>
          <View style={{width:'75%'}}>
            <AutogrowInput style={styles.textBox}
                        ref={(ref) => { this.autogrowInput = ref }} 
                        multiline={true}
                        defaultHeight={50}
                        placeholder="Type a message"
                        onChangeText={(text) => this.props.onChangeText(text)}
                        onContentSizeChange={this.props.onSizeChange}
                        onSubmitEditing={() => this.props.onSendPressed()}
                  />
            </View>
            <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
               
                 <Image
                    source={require("../../../../assets/images/chat-send-icon-1.jpeg")}
                    style={{ width:28, height: 28 }}
                  />
            </TouchableHighlight>
            <TouchableHighlight style={styles.sendButton1} onPress={() => this.props.onSendFilePressed()}>
                 <Image
                    source={require("../../../../assets/images/attachment.png")}
                    style={{ width:28, height: 28 }}
                  />
            </TouchableHighlight>
          </View> 
          ); 
  }
}

function bindActions(dispatch) {
  return {
    fetchAbout: user_id => dispatch(fetchAbout(user_id)),    
    savestudentChat:(jwtAccessToken,data) => dispatch(savestudentChat(jwtAccessToken,data)),
    fetchHistory: (jwtAccessToken,user_id) => dispatch(fetchHistory(jwtAccessToken,user_id)),
    updateReadStatus: data => dispatch(updateReadStatus(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Chat);