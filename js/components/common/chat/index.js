import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Image, Platform, StatusBar,Dimensions, FlatList, TouchableNativeFeedback as TouchableNative, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard  } from "react-native";
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
  Spinner
} from "native-base"; 
import { Actions } from "react-native-router-flux";
import SocketIOClient from 'socket.io-client';
import moment from "moment";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { saveChat, fetchHistory, updateReadStatus } from "../../../actions/common/chat";
import Modal from "react-native-modal";

import KeyboardSpacer from 'react-native-keyboard-spacer'; 
import AutogrowInput from 'react-native-autogrow-input';
import TimeAgo from 'react-native-timeago';

import UserAvatar from 'react-native-user-avatar';
import {CustomCachedImage} from "react-native-img-cache";
import CustomImage from 'react-native-image-progress';

const {OS} = Platform;

export const TouchableNativeFeedback = (OS === 'ios') ? TouchableOpacity : TouchableNative;

const { width } = Dimensions.get("window");
const io = require('socket.io-client');

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    user_id: state.driver.user._id,
    aboutus: state.all.aboutus,
    userDetail: state.driver.user,
    contact_user: state.chat.contact_user,    
    chat_history: state.chat.chat_history,
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
     // messages: messages,
      inputBarText: '',
      msg: '',
      loggedInUserId: idLogedid,    
      otherUserId: this.props.contact_user._id,
      otherUserName: this.props.contact_user.fname+" "+this.props.contact_user.lname,
      otherUserImage: this.props.contact_user.profileUrl,
      messages: this.props.chat_history,
      last_seen:this.props.contact_user.last_seen,
    }
    this.updateReadStatusCall();

   
    // this.send = this.send.bind(this);
    // this.reply = this.reply.bind(this);
    this.socket = io('http://maneemergency.net:7889', {
      jsonp: false,
      transports: ['websocket'],
      //query: `token=${storeObj.store.getState().driver.appState.jwtAccessToken}`,
      //query: `token=7rhe7wurheh9efh832ubfui`, //DDT TODO
    });
    this.socket.emit('user_socket', this.state.loggedInUserId);    
    this.initEvents();
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //if (prevState.messages == nextProps.chat_history) {
       return {
        messages: nextProps.chat_history,
       };
    //}
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
                style={{width:80, height:80, borderRadius: 40, marginTop: 40,  backgroundColor: "#EFEFEF" }}
            />
        </View>        
      ),
    }
  };

  //scroll to bottom when first showing the view
  componentDidMount() {
    if(this.state.loggedInUserId != undefined){ 
        setTimeout(function() { this.scrollView.scrollToEnd(); }.bind(this))
        this.props.fetchHistory();
    }  
  }

  getMessageHistoryData() {
    let data = {
      user_id : this.props.user._id,
      other_user_id: this.props.contact_user._id
    };
    
    
    App.showLoader();
    this.props.getMessageHistory(data).then((response) => {
     
      //this.initialLoad = false;
      this.setState({messages: response});
      App.hideLoader();
    }).catch(error => {
      //this.initialLoad = false;
      showToast(error.message);
      App.hideLoader();
    })
  }

  updateReadStatusCall(){  
    let data = {
      user_id : this.state.loggedInUserId,
      other_user_id: this.state.otherUserId
    };
    
    this.props.updateReadStatus(data);

  }
  
  initEvents() { 
    this.socket.on('currentuser_socketid', this.onUserJoin);
    //if (this.props.userDetail) {
      this.socket.emit('user_socket', this.state.loggedInUserId);
    //}
  }
  onUserJoin = (value) => {    
    this.socket.on('send', this.onMessageSend);
    this.socket.on('receive', this.onMessageReceived);
  }
  onMessageSend = (message) => {
    const item = {id:Math.floor((Math.random() * 99999999999999999) + 1), sent: true, msg: this.state.msg }
    this.setState({ messages: this.state.messages.concat(item), inputValue: '' })
    setTimeout(() => {
          // this.props.fetchHistory();
        },1000);
    
  }

  onMessageReceived = (message) => {
      
    if(message.receiverId==this.state.loggedInUserId && message.senderId==this.state.otherUserId){
      const item = { id:Math.floor((Math.random() * 99999999999999999) + 1), message_id:Math.floor((Math.random() * 99999999999999999) + 1) , sent: false, time: message.time, msg: message.message }
     
      var newMessage = this.state.messages.concat(item);
      this.setState({ messages: newMessage })  
     setTimeout(() => {
           this.props.fetchHistory();
        },1000);
      //this.updateReadStatusCall();
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
    setTimeout(() => {
           this.props.fetchHistory();
        },1000);

  }

  send() {
    if (this.state.msg.length > 0) {
      const item = {id:Math.floor((Math.random() * 99999999999999999) + 1), sent: true, msg: this.state.msg, image:'https://www.bootdey.com/img/Content/avatar/avatar1.png' }
      this.setState({ messages: this.state.messages.concat(item), msg: '' })
      this.socket.emit('chat message', this.state.loggedInUserId, this.state.otherUserId, this.state.msg);   

      setTimeout(() => {
           this.props.fetchHistory();
        },1000);

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
    if(this.state.loggedInUserId != undefined){ 
      setTimeout(function() {
        this.scrollView.scrollToEnd();
      }.bind(this))
    }
  }

  _sendMessage() {
    //this.state.messages.push({direction: "right", text: this.state.inputBarText});
    //if(this.state.messages && this.state.messages.length > 0) {
        this.setState({
          messages: this.state.messages,
          inputBarText: ''
        }); 
    /*}else {
      this.setState({
          messages: this.props.chat_history,
          inputBarText: ''
      }); 
    }*/ 
    
    var montharr = new Array();
    montharr[0] = "January";
    montharr[1] = "February";
    montharr[2] = "March";
    montharr[3] = "April";
    montharr[4] = "May";
    montharr[5] = "June";
    montharr[6] = "July";
    montharr[7] = "August";
    montharr[8] = "September";
    montharr[9] = "October";
    montharr[10] = "November";
    montharr[11] = "December";

    var d = new Date();
    var n = montharr[d.getMonth()];
    var date = d.getDate();
    var hours = d.getHours();
    var mins = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var settime = n + " " +date+ ", " +hours+":"+mins;

    if(hours>12){ var showhours = hours-12+':'+mins+'pm'; }
    else if(hours==12){ var showhours = hours+':'+mins+'pm'; }
    else { var showhours = hours+':'+mins+'am'; }

    var month = d.getMonth() + 1;   
    var year = d.getFullYear();

    var displaydate = date+' '+montharr[d.getMonth()]+' '+year;
    
    if (this.state.inputBarText.length > 0) {
      const item = {id:Math.floor((Math.random() * 99999999999999999) + 1), sent: true, displaydate:displaydate,time:showhours, msg: this.state.inputBarText, image:'https://www.bootdey.com/img/Content/avatar/avatar1.png' }
      this.state.messages.push(item);
      //this.setState({ messages: this.state.messages.concat(item), msg: '' })
      this.socket.emit('chat message', this.state.loggedInUserId, this.state.otherUserId, this.state.inputBarText, showhours); 
       
        if (month.length < 2) month = '0' + month;
        if (date.length < 2) date = '0' + date;
        var savetime = year+'-'+month+'-'+date+" "+hours+":"+mins;
        this.savechatApi(this.state.loggedInUserId,this.state.otherUserId, this.state.inputBarText,savetime);
        //this.savechatApi(this.state.otherUserId,this.state.loggedInUserId, this.state.inputBarText,savetime);
        console.log('sendmessage',this.state.messages);
    }

  }

  savechatApi(userId,otherUserId,message,time){
    let data = {
      from: userId,
      to: otherUserId,
      message: message,
      individual_chat: 1,      
      time:time
    };
    
    this.props.saveChat(data);
    //this.props.fetchHistory();
    //this.props.fetchHistory();
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
    await this.props.fetchHistory();
  }

  async fetchAppointmentList() {
    await this.props.fetchHistory();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
   // this.props.fetchHistory();
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }

  }

  loadContent(){
    
  }


  

  render() {
   // last_seen
  
    let timestamp = this.state.last_seen;
    var messages = [];
    var resultDateArray = [];
    var setuserImage = this.state.otherUserImage;
    var setuserName = this.state.otherUserName;
    if(this.state.messages && this.state.messages.length > 0) {
      this.state.messages.forEach(function(message, index) { console.log('message',message);
        if(resultDateArray.indexOf(message.displaydate) !== -1){ }else{ 
            messages.push(
                  <View style={styles.setcenter}><View style={styles.datetext}><Text style={{color:'#FFFFFF',fontSize:13}}> {message.displaydate} </Text></View></View>
            );
            resultDateArray.push(message.displaydate);
        }
        if (message.sent === false) {
          messages.push(
              <MessageBubble key={index} direction="left" text={message.msg} showtime={message.time} showimage={setuserImage} showName={setuserName} />
            );
        }else {
           messages.push(
              <MessageBubble key={index} direction="right" text={message.msg} showtime={message.time} showimage={setuserImage} showName={setuserName} />
            );
        }
      });  
    }
    
    return (
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',backgroundColor: "#ed1e79"}} behavior={Platform.OS === "ios" ? "padding" : null} enabled keyboardVerticalOffset={0}>

     
         <StatusBar barStyle="light-content" />
          <View style={Platform.OS === "ios" ? styles.topouter : styles.topouterand}>
              <Button transparent onPress={() => Actions.Chatlist()}>
               <Image
                source={require("../../../../assets/images/left-arrow.png")}
                style={{ width:23, height: 16 }}
              />
              </Button>
              { (this.state.otherUserImage!="" && this.state.otherUserImage!=null) ?
                <View style={{ width:34, height: 34, borderRadius:17,overflow:'hidden',marginTop:3 }}>
                <CustomCachedImage
                  component={CustomImage}
                  source={{ uri: this.state.otherUserImage }} 
                  style={{ width:34, height: 34, borderRadius:17 }} />
                </View>
              :
                <View>
                  <UserAvatar size={34} name={this.state.otherUserName} src={ this.state.otherUserImage} style={{ width:34, height: 34, borderRadius:17,marginTop:3 }}  />
                </View>
              }
              

              <Text style={styles.maintitle}>{this.state.otherUserName}{"\n"} 
                <Text style={styles.subtitle}>last seen <TimeAgo time={timestamp} interval={20000} /></Text>
              </Text>
              
          </View>

         
            <View style={Platform.OS === "ios" ? styles.outer : styles.outerand}>
                <ScrollView 
                    ref={(ref) => { this.scrollView = ref }} 
                    //onMomentumScrollEnd={() => this.loadContent()} 
                    onScroll={({nativeEvent})=>{
                     
                  }}
                  style={styles.messages}>
                  {messages}
                </ScrollView>
                           
            </View> 
          

          
            <View>
            <InputBar onSendPressed={() => this._sendMessage()} 
                    onSizeChange={() => this._onInputSizeChange()}
                    onChangeText={(text) => this._onChangeInputBarText(text)}
                    text={this.state.inputBarText}/>
            </View>
          

          
        </KeyboardAvoidingView>


    );
  }
}



class MessageBubble extends Component {
  render() {

   


    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 60}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 60}}/> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
      <View style={{marginRight:10}}> 
        { this.props.direction === 'left' ?
              <View style={{flexDirection: 'row',paddingLeft:10}}>
                {leftSpacer}
              { (this.props.showimage!="" && this.props.showimage!=null) ?
                <View style={{ width:33, height: 33, borderRadius:20,overflow:'hidden',marginTop:30 }}>
                <CustomCachedImage
                  component={CustomImage}
                  source={{ uri: this.props.showimage }} 
                  style={{ width:33, height: 33, borderRadius:20 }} />
                </View>
              :
                <View>
                  <UserAvatar size={40} name={this.props.showName} src={this.props.showimage} style={{ width:40, height: 40, borderRadius:40,marginTop:30 }}  />
                </View>
              }
                <View style={bubbleStyles}>
                  <Text style={bubbleTextStyle}>
                    {this.props.text}
                  </Text>
                </View>
               {rightSpacer}
            </View>
        :
          <View style={{justifyContent: 'space-between', flexDirection: 'row',paddingLeft:15}}>
                {leftSpacer}
                <View style={bubbleStyles}>
                  <Text style={bubbleTextStyle}>
                    {this.props.text}
                  </Text>
                </View>
                {rightSpacer}
          </View>
        }

          { this.props.direction === 'left' ?
          <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row',paddingLeft:65,paddingTop:5}}>
            <Text style={styles.showmessageBubble1}>
              {this.props.showtime}
            </Text>
          </View>
          :
          <View style={{flex:1,justifyContent: 'flex-end',flexDirection: 'row',paddingRight:10,paddingTop:5}}>
            <Text style={styles.showmessageBubble1}>
              {this.props.showtime}
            </Text>
          </View>
        }
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
          <View style={
                  Platform.OS === "ios"
                    ? styles.inputBar
                    : styles.inputBarand
                }>
            <AutogrowInput style={styles.textBox}
                        ref={(ref) => { this.autogrowInput = ref }} 
                        multiline={true}
                        defaultHeight={40}
                        onChangeText={(text) => this.props.onChangeText(text)}
                        onContentSizeChange={this.props.onSizeChange}
                        placeholder = "Type your message.."
                        placeholderTextColor = "#ed1e79"
                        value={this.props.text}/>
                        <View style={styles.sendButton}>
                            <TouchableOpacity onPress={() => this.props.onSendPressed()}>
                                 <Image
                                    source={require("../../../../assets/images/send.png")}
                                  />
                            </TouchableOpacity>
                        </View>
          </View> 
          );
  }
}

function bindActions(dispatch) {
  return {
    fetchAbout: user_id => dispatch(fetchAbout(user_id)),    
    saveChat: data => dispatch(saveChat(data)),
    fetchHistory: user_id => dispatch(fetchHistory(user_id)),
    updateReadStatus: data => dispatch(updateReadStatus(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Chat);