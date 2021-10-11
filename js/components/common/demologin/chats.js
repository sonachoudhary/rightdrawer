import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions, FlatList, TouchableHightLight ,Image,TextInput} from "react-native";
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

class Chats extends Component {
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
              
              <View style={{ flexDirection:'row', marginBottom:15,backgroundColor:'#000000',paddingTop:50,paddingBottom:10}}>
                  <Button transparent onPress={() => Actions.classes()}>
                    <Image
                        source={require('../../../../assets/sevenicon/left-arrow.png')}
                      />

                  </Button>
                  <Image
                    source={require("../../../../assets/sevenicon/user.png")}
                    style={{ width:50, height: 50, borderRadius:25 }}
                  />
                  <Text style={styles.maintitle}>Timothy Lynch{"\n"} <Text style={styles.subtitle}>last seen 15m ago</Text></Text>
                  
               
              </View>

              <View style={styles.chatright}> 
               
               <Text  style={{ color: '#FFFFFF',lineHeight:25,fontSize: 16}}>Hey what’s up? did you manage to sleep?</Text>            
              </View>
              <Text style={[styles.tabdate, {marginRight:20,marginTop:5}]} >09.40am</Text>
              <View style={{ flexDirection:'row',alignSelf: "center",justifyContent: 'center'}}>
               
                  <Text style={styles.chatdate}>16 September 2016</Text>
                             
              </View>

              <View style={{ flexDirection:'row', marginTop:40, marginBottom:15}}>
                  
                  <Image
                    source={require("../../../../assets/sevenicon/user.png")}
                    style={{ width:50, height: 50, borderRadius:25, marginLeft:20 }}
                  />
                   <View style={styles.chatleft}>
                      <Text style={{ color: '#FFFFFF',lineHeight:25,fontSize: 16}} >Heey good morning! Yes i was home quite late but I had a good a good rest</Text>

                  </View>
              </View>

               <Text style={styles.tabdateleft}>09.42am</Text>
              <View style={styles.chatright}>
               
                <Text  style={{ color: '#FFFFFF',lineHeight:25,fontSize: 16}}>Hey what’s up? did you manage to sleep?</Text>            
              </View>
              <Text style={[styles.tabdate, {marginRight:20,marginTop:5}]} >09.50am</Text>

              <View style={{flexDirection:'row', marginTop:30,backgroundColor:'#000000',fontSize:16}}>
                <TextInput style = {styles.inputbar}
                   placeholder = "Type your message.."
                   placeholderTextColor = "#FFFFFF"
                   autoCapitalize = "none"
                   />
                 <Button transparent onPress={() => Actions.classes()}>
                      <Image
                          source={require('../../../../assets/sevenicon/send.png')}
                        />
                  </Button>
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
)(Chats);
