import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Image, Platform, Dimensions, FlatList, TouchableNativeFeedback as TouchableNative, TouchableOpacity,StatusBar } from "react-native";
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
import moment from "moment";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { fetchNotification, deleteNotification} from "../../../actions/common/all";
import Modal from "react-native-modal";
import Swipeout from 'react-native-swipeout';
import config from "../../../../config";


const {OS} = Platform;

export const TouchableNativeFeedback = (OS === 'ios') ? TouchableOpacity : TouchableNative;

const { width } = Dimensions.get("window");
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    user_id: state.driver.user._id,
    userType: state.driver.appState.userType,
    notification_list: state.all.notification_list
  };
}

class Notifications extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchNotification: PropTypes.func,
    loadSpinner: PropTypes.bool,
    newslist: PropTypes.array,    
  };

  constructor(props) {
    super(props); 

    this.state = {
      submit: false,
      image: null,
      render: false,
      jwtAccessToken: this.props.jwtAccessToken,
      user_id: this.props.user_id,
      notification_list:this.props.notification_list
    };
  }

  async componentDidMount() {
    await this.props.fetchNotification(this.state.user_id);
    this.getallnotifiction();
  }

  getallnotifiction(){
      var bodyData = {};
      bodyData.user_id = this.state.user_id;
      
      fetch(`${config.serverSideUrl}:${config.port}/api/users/getnotification`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })
        .then(resp => resp.json())
        .then(data => {
          this.setState({notification_list:data.notificationdatalist}); 
        })
        .catch(e => {
                   
        });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  deleteinvitation(notification_id){
    this.props.deleteNotification(notification_id);
    this.getallnotifiction();
  }

  renderEmptyContainer = () => {
    return (        
      <Text style={ styles.emptyMessageStyle }>No Notifications</Text>                  
    );
  };

  renderRow = ({ item }) => {
     var setdate = moment(new Date(item.time)).utc(false).format("DD MMM YYYY");
     const swipeoutBtns = [
          {
            text: 'Delete', 
            backgroundColor:'#c53e3e',
            color:'#FFFFFF',
            onPress: () => { this.deleteinvitation(item._id) }
          }
        ] 
    return (
      <Swipeout right={swipeoutBtns}  autoClose='true' backgroundColor= 'transparent' style={{ marginTop:8 }}>
        <View style={styles.notificationtab} > 
           <Text style={styles.tabdate} >{setdate}</Text>
           <Text style={styles.tabtitle}>Seven App Update</Text> 
           <Text style={styles.tabsubtitle} ellipsizeMode='tail' numberOfLines={1}>{item.message}</Text>           
        </View>
      </Swipeout>
    );
  };


  render() {
  	
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
          <StatusBar barStyle="light-content" />
               <View style={Platform.OS === "ios" ? styles.gettopheaderios : styles.gettopheaderandroid}> 
                 <View style={{width:40}}>
                  <TouchableOpacity onPress={() => Actions.pop()}>
                    <View style={{marginLeft:10}}>
                      <Image source={require("../../../../assets/images/leftarrow.png")} style={{width:23,height:16,zIndex:3005}} />
                    </View>
                  </TouchableOpacity>
                  </View>
                  <View style={{width: deviceWidth-40,justifyContent:'center',alignItems:'center',marginLeft:-15}}>
                      <Text style={{color:'#ffffff',fontSize:20,fontFamily:'ProximaNova-Bold'}}>Notification</Text>
                  </View>
                </View>
          <View style={{ flex: 1 }}>
            <Content style={{ backgroundColor: "#1A1A1A"}}>
                
            <View style={{width:deviceWidth,justifyContent:'center',alignItems:'center'}}>
              <View style={{width:deviceWidth-10,marginTop:30}}>
                <FlatList
                  data={this.state.notification_list}
                  renderItem={this.renderRow}
                 
                  ListEmptyComponent={this.renderEmptyContainer()}
                />
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
    fetchNotification: user_id => dispatch(fetchNotification(user_id)),
    deleteNotification: notification_id => dispatch(deleteNotification(notification_id))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Notifications);