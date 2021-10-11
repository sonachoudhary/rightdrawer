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

class Chatlists extends Component {
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
      <Container style={{ backgroundColor: "#1A1A1A" }}>
          
          <View style={{ flex: 1 }}>
            <Content style={{ backgroundColor: "#1A1A1A"}}>
              
              <View style={{ flexDirection:'row', marginTop:60, marginBottom:15}}>
               
            


              </View>
               <Text style={styles.chattitle}>Chat</Text>
               <View style={{alignSelf: 'flex-end',}}>
               <Image
                    source={require("../../../../assets/sevenicon/notification.png")}
                    style={{ marginTop:-24, marginRight:20 }}
                   
                  />
                </View>

               <View style={{ flexDirection:'row', marginTop:60, marginBottom:15}}> 
                  <Image
                    source={require("../../../../assets/sevenicon/chatuser.png")}
                    style={{marginLeft:20}}
                  />
                  <Text style={styles.headtitle}>Alice Vargas{"\n"} <Text style={styles.subheadtitle}>Sodales viverra</Text></Text>

                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right',marginRight:20,marginTop:12,color:'#959595'}}>2:30 PM</Text>
                  </View>
               
              </View>
               <View style={{ flexDirection:'row', marginTop:30, marginBottom:15}}> 
                  <Image
                    source={require("../../../../assets/sevenicon/chatuser1.png")}
                    style={{marginLeft:20}}
                  />
                  <Text style={styles.headtitle}>Roy Ellis{"\n"} <Text style={styles.subheadtitle}>Gravida commodo tellus</Text></Text>

                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right',marginRight:20,marginTop:12,color:'#959595'}}>2:30 PM</Text>
                  </View>
               
              </View>
               <View style={{ flexDirection:'row', marginTop:30, marginBottom:15}}> 
                  <Image
                    source={require("../../../../assets/sevenicon/chatuser2.png")}
                    style={{marginLeft:20}}
                  />
                  <Text style={styles.headtitle}>Anthony Chavez{"\n"} <Text style={styles.subheadtitle}>Nisi ipsum</Text></Text>

                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right',marginRight:20,marginTop:12,color:'#959595'}}>2:30 PM</Text>
                  </View>
               
              </View>
               <View style={{ flexDirection:'row', marginTop:30, marginBottom:15}}> 
                  <Image
                    source={require("../../../../assets/sevenicon/chatuser1.png")}
                    style={{marginLeft:20}}

                  />
                  <Text style={styles.headtitle}>Chris Smith{"\n"} <Text style={styles.subheadtitle}>Interdum pulvinar sodales</Text></Text>

                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right',marginRight:20,marginTop:12,color:'#959595'}}>2:30 PM</Text>
                  </View>
               
              </View>

              <View style={{ flexDirection:'row', marginTop:30, marginBottom:15}}> 
                  <Image
                    source={require("../../../../assets/sevenicon/chatuser2.png")}
                    style={{marginLeft:20}}
                  />
                  <Text style={styles.headtitle}>Vincent Palmer{"\n"} <Text style={styles.subheadtitle}>Eget etiam</Text></Text>

                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right',marginRight:20,marginTop:12,color:'#959595'}}>2:30 PM</Text>
                  </View>
               
              </View>
              

            </Content>

             <View style={{ width: deviceWidth, height: 70,  flexDirection:'row', justifyContent:'center', marginTop: 5, position:'absolute', bottom:33}} >
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/4 }} >
                  <Button
                      transparent>
                      <Image
                          source={require("../../../../assets/sevenicon/home.png")}
                         
                      />                   
                  </Button>
                </View>                    

                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/4, paddingLeft:15 }} >
                <Button
                    transparent>
                   <Image
                      source={require("../../../../assets/sevenicon/chat.png")}
                     
                    />
                </Button>
                   
                </View>                    

                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/4, paddingLeft:25 }} >
                <Button
                      transparent >
                    <Image
                      source={require("../../../../assets/sevenicon/user(1).png")}
                      
                    />
                  </Button>
                </View>                    
            </View>   
                          

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
)(Chatlists);
