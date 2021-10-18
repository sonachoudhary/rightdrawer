import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions, FlatList,StatusBar, TouchableHightLight,TouchableOpacity,Image,ScrollView } from "react-native";
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
  Spinner
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
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 
import Footer from "../footer";
import {DstATopComposition} from 'react-native-image-filter-kit';
import UserAvatar from 'react-native-user-avatar';
import {CustomCachedImage} from "react-native-img-cache";
import CustomImage from 'react-native-image-progress';
import config from "../../../../config";

import { openChatWindow } from "../../../actions/common/chat";
import Search from 'react-native-search-box';
import IconBadge from 'react-native-icon-badge';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    chatlist: state.chat.chatlist,
    user_id: state.driver.user._id,
    userDetail: state.driver.user,
    trainerProfileId: state.driver.user.trainerProfileId
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
   const idLogedid =  this.props.userDetail._id;
    this.state = {
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
      loggedInUserId: idLogedid,
      notcount:0,
      chatlist:[{username:'abc'},{username:'abc'},{username:'abc'},{username:'abc'},{username:'abc'},{username:'abc'},]
    };
    
    //this.props.dispatch(getProfileData(this.state.trainerProfileId));    
  }

  async componentDidMount() {
    await this.props.fetchChatListAsync(); 
    //await this.props.fetchHistory();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
    //this.props.fetchHistory();
    this.notificationcount(this.props.user_id);
  }
  
   notificationcount(user_id){
      var today = new Date();
      const userEmail = { user_id: user_id,time:today  };
      fetch(`${config.serverSideUrl}:${config.port}/api/users/unreadnotificaitoncount`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail)
      })
      .then(response => response.json())
      .then(data => { 
        this.setState({notcount:data.notificationdatalist.length});
      })
      .catch(error => { });
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
    Actions.Chat();
    this.props.openChatWindow(userId);
  }

  openConfirmPopup(item) { 
    
    this.setState({
      trainerName: item.tlname+" "+item.tfname, 
      trainer_id: item.trainerprofileid,
      appointment_id: item._id,
      appointment_time: item.time ,        
    })
    this.setModalVisible(true)
  }

  renderRow = ({ item }) => {  
     console.log('item',item);
    return (
      <TouchableOpacity onPress={() => this.openChatWindow(item._id)} >
      <View style={styles.listcustom} >
        <View style={styles.listContainer}> 
           
             { (item.image!="" && item.image!=null) ?
              <DstATopComposition 
                  dstImage={
                    <Image
                        style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                        resizeMode="contain"
                        source={{ uri: item.image }}
                      />
                  }
                  srcImage={
                    <Image
                      style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                      resizeMode="contain"
                      source={require("../../../../assets/images/heptagon4-01.png")}
                      
                    />
                  }
                />
                :
                <DstATopComposition 
                  dstImage={
                    <Image
                      style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                      resizeMode="contain"
                      source={require("../../../../assets/images/user/screenprofile.png")}
                    />
                    
                  }
                  srcImage={
                    <Image
                      style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                      resizeMode="contain"
                      source={require("../../../../assets/images/heptagon4-01.png")}
                      
                    />
                  }
                />
              }

          
          <View style={styles.lextText}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.textColor}>username</Text>
              <View style={styles.rightText}>            
                  <Text style={styles.dateColor}>12:40 pm</Text>
                  
              </View>
            </View>
            <Text style={styles.msgTextColor} ellipsizeMode='tail' numberOfLines={1}>{item.message}</Text>            
          </View>

          
        </View>
      </View>
     </TouchableOpacity>
    );
  };

  search(text) {
    
    this.props.fetchChatListAsync(text);
  }

  render() {
    console.log('this.props.chatlist',this.props.chatlist);
    return (
      <Container style={{ backgroundColor: "#ed1e79" }}>
      <StatusBar barStyle="light-content" />
        
        <TouchableOpacity style={{width: deviceWidth-100,paddingLeft:20,marginTop:deviceHeight/16,flexDirection:'row',}} onPress={()=>Actions.Home()}>

                      <Icon
                        name="md-arrow-back"
                        style={{ fontSize: 28, color: "#ffffff" }}
                      />
                                                   
                    
            <Text style={{color:'#ffffff',fontSize:24,fontFamily:'ProximaNova-Bold',marginLeft:'10%'}}>Chat</Text>
           
        </TouchableOpacity>
       
        <Content style={{ backgroundColor: "#ffffff",marginTop:20,marginBottom:10 }}>          
          <View>
            
              <FlatList
                data={this.state.chatlist}
                renderItem={this.renderRow}
              />  
             
          </View>          
        </Content> 
        
        

       

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