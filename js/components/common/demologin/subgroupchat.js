import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions, FlatList, TouchableHightLight ,Image} from "react-native";
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
import { fetchClassshowAsync } from "../../../actions/common/chat";
import { setFeedbackData } from "../../../actions/common/booking";
import Modal from "react-native-modal";
import moment from "moment";
const { width } = Dimensions.get("window");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { openChatWindow } from "../../../actions/common/chat";
import Search from 'react-native-search-box';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    Classshow: state.chat.Classshow,
    user_id: state.driver.user._id,
    trainerProfileId: state.driver.user.trainerProfileId
  };
}

class Groupchat extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchClassshowAsync: PropTypes.func,
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
    await this.props.fetchClassshowAsync();
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


  renderRow = ({ item }) => {  console.log('itemdata',item);
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
    
    this.props.fetchClassshowAsync(text);
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
          
          <View style={{ flex: 1 }}>
            <Content style={{ backgroundColor: "#FFFFFF"}}>
              
              <View style={{ flexDirection:'row', marginTop:60, marginBottom:15}}>

                  <Button transparent onPress={() => Actions.classes()}>
                    <Image
                        source={require('../../../../assets/icon/left.png')}
                      />
                  </Button>
                    <View style={{ paddingLeft:deviceWidth/3}}>
                          <Image
                            source={require("../../../../assets/icon/usergrouplist.jpg")}
                            style={{ width:50, height: 50, borderRadius:25, marginLeft:-30 }}
                          />
                          <Text style={{ color: "#000000", fontSize:12, fontFamily:"SFProText-Regular", marginLeft:-40}}>Chem Brothers</Text>
                    </View>
                    <View  style={{right:10,position:'absolute'}}>
                    <Button transparent onPress={() => Actions.newsubgroup()}>
                      <Image
                          source={require('../../../../assets/icon/groupinfoicon.png')}
                          style={{ width:32, height: 32 }}
                        />
                    </Button>
                    </View>
              </View>
           
           
             
              
              <View style={{ backgroundColor:'#FFFFFF', borderTopWidth:1, borderColor:'#dadada', color:'#000000', padding:5 }} >
                <View style={{ flexDirection:'row', width:deviceWidth-10, margin:10 }} >
                   <Image
                          source={require("../../../../assets/images/profile_user.png")}
                          style={{ marginRight:12,width:50, height: 50, borderRadius:25}}
                      />

                  <View style={{ marginLeft:10 }} >
                    <View style={{flexDirection:'row'}}>
                      <Text style={{ fontSize:12, color: "#000000", width: deviceWidth-165,fontFamily:"SFProText-Medium", marginBottom:10}}>Ariana Hoffman</Text>
                       <Text style={{ right:10, color:"#8c8c8c",marginRight:10 }}>Yesterday</Text> 
                    </View>
                     <View>
                      <Text style={{ fontSize:16, color: "#000000", width: deviceWidth-120, flex:1}}>Guys I had an issue with question 4 on the pset, I attached my attempt but I'm so unsure about it, thanks</Text>
                    </View>
                  </View>
                </View>  
                <View style={{ flexDirection:'row', marginLeft:60 }} >
                 </View>                
              </View>


               <View style={{ backgroundColor:'#FFFFFF', borderTopWidth:1,borderColor:'#dadada', color:'#000000', padding:5 }} >
                <View style={{ flexDirection:'row', width:deviceWidth-10, margin:10 }} >
                   <Image
                          source={require("../../../../assets/images/profile_user.png")}
                          style={{ marginRight:12,width:50, height: 50, borderRadius:25}}
                      />

                  <View style={{  marginLeft:10 }} >
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize:12, color: "#000000", width: deviceWidth-165,fontFamily:"SFProText-Medium", marginBottom:10}}>Christopher Wall</Text>
                        <Text style={{ right:10, color:"#8c8c8c",marginRight:10 }} >Yesterday</Text> 
                      </View>
                      <View>
                     <Text style={{ fontSize:14, color: "#000000", width: deviceWidth-120, }}>Oh i skipped that question but I think I'm gonna see a TA instead, please let me know what happens! Thanks!</Text>
                    </View>
                  </View>
                  
                </View>  
                <View style={{ flexDirection:'row', marginLeft:60 }} >
                 </View>                
              </View>



              <View style={{ backgroundColor:'#FFFFFF', borderTopWidth:1, borderColor:'#dadada', color:'#000000', padding:5 }} >
                <View style={{ flexDirection:'row', width:deviceWidth-10, margin:10 }} >
                   <Image
                          source={require("../../../../assets/images/profile_user.png")}
                          style={{ marginRight:12,width:50, height: 50, borderRadius:25,opacity:0}}
                      />

                  <View style={{ marginLeft:10 }} >
                     <View style={{flexDirection:'row'}}>
                      <Text style={{ fontSize:12, color: "#000000", width: deviceWidth-165,fontFamily:"SFProText-Medium", marginBottom:10}}>You</Text>
                      <Text style={{ right:10, color:"#8c8c8c",marginRight:10 }} >9:52 AM</Text> 
                    </View>
                    
                    <View>
                    <Text style={{ fontSize:14, color: "#000000", width: deviceWidth-120, }}>I think I figured it out!</Text>
                      <Image
                          source={require("../../../../assets/icon/attachment.png")}
                          style={{ marginRight:12,width:deviceWidth-120}}
                      />
                    </View>
                  </View>
                  
                </View>  
                <View style={{ flexDirection:'row', marginLeft:60 }} >
                 </View>                
              </View>


              <View style={{ backgroundColor:'#FFFFFF', borderTopWidth:1, borderColor:'#dadada', color:'#000000', padding:5 }} >
                <View style={{ flexDirection:'row', width:deviceWidth-10, margin:10 }} >
                   <Image
                          source={require("../../../../assets/images/profile_user.png")}
                          style={{ marginRight:12,width:50, height: 50, borderRadius:25}}
                      />

                  <View style={{  marginLeft:10 }} >
                    <View style={{flexDirection:'row'}}>
                      <Text style={{ fontSize:12, color: "#000000", width: deviceWidth-165,fontFamily:"SFProText-Medium", marginBottom:10}}>Emily Wang</Text>
                      <Text style={{ right:10, color:"#8c8c8c",marginRight:10 }} >10:19 AM</Text> 

                    </View>
                    <View style={{margin:10}}>
                    <Image
                          source={require("../../../../assets/icon/voicenote.png")}
                         
                      />
                    </View>
                    
                  </View>
                  
                </View>  
                <View style={{ flexDirection:'row', marginLeft:60 }} >
                 </View>                
              </View>

               

              
              
               <View style={{ backgroundColor:'#FFFFFF', borderTopWidth:1, borderColor:'#dadada', marginTop:30 }} >
                 <View style={{flexDirection:'row',width:deviceWidth}}>
                    <View style={{ width:deviceWidth-60}}>
                      <Text style={{height:19,fontSize:16,color: '#898f9c',padding:20}}>Enter message here</Text>
                    </View>
                    <View style={{ paddingTop:20}}>
                      <Image
                          source={require("../../../../assets/icon/speakericon.png")}
                          style={{ marginRight:12,width:32,height:32}}
                      />
                    </View>
                 </View>

                  <View style={{flexDirection:'row',width:deviceWidth}}>
                      <View style={{flexDirection:'row',width:deviceWidth-130,paddingLeft:20}}>
                         <Image
                          source={require("../../../../assets/icon/addsimbol.png")}
                          style={{ marginRight:12,width:32,height:32}}
                          />

                          <Image
                              source={require("../../../../assets/icon/cameraicon.png")}
                              style={{ marginRight:12,width:32,height:32}}
                          />
                      </View>

                      <View style={{ borderRadius:20, width:96, borderColor:'#8c8c8c',borderWidth:1,height:28,marginTop:10,marginRight:20}}>
                        <Text style={{color:'#898f9c', fontSize:14,paddingTop:4, paddingLeft:30,fontFamily:"SFProText-Regular",}}>Send</Text>
                      </View>
                  </View>

              </View>
             

            
              

            </Content>

                          

          </View>
          
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    openChatWindow: user_id => dispatch(openChatWindow(user_id)),    
    fetchClassshowAsync: text => dispatch(fetchClassshowAsync(text)),
    setFeedbackData: (data) => dispatch(setFeedbackData(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Groupchat);
