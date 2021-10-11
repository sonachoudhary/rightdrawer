import { Actions, ActionConst } from "react-native-router-flux";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo,
  AsyncStorage,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Item,
  Body,
  Toast,
  Spinner,
  Thumbnail,
  Grid,
  Col
} from "native-base";
import PropTypes from "prop-types";

import moment from "moment/moment";
import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";

import { connectionState } from "../../../actions/network";

import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { selectRole } from '../../../actions/common/register';

function mapStateToProps(state) {
  
  return {
    notificationList: state.booking.notificationList,
    userType: state.driver.appState.userType,
  };
}

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,      
    };    
  }

  renderItemAppointment = ({item, index}) => {

    return (
      <TouchableWithoutFeedback>
        <View style={{ backgroundColor:'#0D1214', borderBottomWidth:1, borderColor:'#2A3439', color:'#707E85', padding:5 }} >
          <View style={{ flexDirection:'row', width:deviceWidth, margin:10 }} >
            
            {item && item.userData && item.userData.profile_url ?
            <Image
              source={{uri: item.userData.profile_url}}
              style={{ width:40, height: 40, borderRadius:20 }}
            />
            :
            <Image
              source={require("../../../../assets/images/dummy_profile.png")}
              style={{ width:40, height: 40, borderRadius:20 }}
            />
            }

            <View style={{ flexDirection:'row', marginLeft:10 }} >
            <Text style={{ fontSize:14, color: "#E8E8E8", opacity:0.5, width: deviceWidth-140 }}>{item.message}</Text>
            <Text style={{ right:5, marginLeft:10, fontSize:13, color:"#FFFFFF", opacity:0.3 }} >{ moment(item.time).format('LT') }</Text> 
            </View>
          </View>                  
        </View>
      </TouchableWithoutFeedback>
    )
  };

  renderItem = ({item, index}) => {
    
    return (
      <TouchableWithoutFeedback>
      <View>
        <View style={{ flex:1, flexDirection:'row', width:deviceWidth, height:50 }} >
          <View style={{ position:'absolute', right:10, borderColor:'#2A3439', color:'#707E85', marginTop:30 }} >
            <Text style={{ color:"#FFFFFF", fontSize: 10 }}>{ moment(item.date).format('MMMM DD')}</Text>
          </View>
        </View>
      
        <FlatList
          data={item.notifcation_list}
          extraData={item.notifcation_list}
          renderItem={this.renderItemAppointment} 
          ListEmptyComponent={this.renderEmptyContainer()}
        />        
      </View>
      </TouchableWithoutFeedback>
    )
  };

  renderEmptyContainer = () => {
    return (        
      <Text style={{ textAlign: 'center', color: "#FFF", marginTop: deviceHeight/3 }}>No Notifcation</Text>                  
    );
  };
  
  render() {
   
    return(
      <Container style={{ backgroundColor: "#fff" }}>
          
          <View style={{ flex: 1 }}>
            <Content style={{ backgroundColor: "#0D1214"}}>
              
              <View style={{ flexDirection:'row', justifyContent:'center', marginTop:20 }} >
                  <Text style={{ color: "#E8E8E8", fontSize:14, left:10, position:'absolute' }} onPress={() => { (this.props.userType == 'Teacher') ?  Actions.CustomerHome() : Actions.BarberHome() } } >
                    Back
                  </Text>

                  <Text style={{ color: "#E8E8E8", fontSize:16 }}>
                    Notifications
                  </Text>       
                  <Image
                    source={require("../../../../assets/icon/notifications.png")}
                    style={{ width:12, height: 17, position:'absolute', right:20  }}
                  />                          
              </View>
             
              <View style={{ marginBottom:80 }} >
                <FlatList
                  data={this.props.notificationList}
                  extraData={this.props}
                  renderItem={this.renderItem} 
                  ListEmptyComponent={this.renderEmptyContainer()}
                />
              </View>
                    
            </Content>

            {this.props.userType == "barber" && 
            <View style={{ width: deviceWidth, height: 66, backgroundColor: "#2A3439", flexDirection:'row', justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/2 }} >
                    <Image
                      source={require("../../../../assets/icon/home.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.BarberHome() } 
                    />
                    <Text  onPress={() => Actions.BarberHome() }  style={{fontSize:10, color:'#FFFFFF',paddingTop:10,fontWeight:"bold"}}>Home</Text>
                </View>                    

                {/*<View style={{ justifyContent:'center', borderRightWidth:1, borderRightColor:'#000000', backgroundColor: "#392F2A",alignItems:'center', width:deviceWidth/4 }} >                
                    <Image
                      source={require("../../../../assets/icon/speechbubble.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.chatlist()}
                    />
                   <Text onPress={() => Actions.chatlist()} style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>Inbox</Text>
                </View>                    

                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/4 }} >
                    <Image
                      source={require("../../../../assets/icon/bill.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.barbersales() } 
                    />
                    <Text onPress={() => Actions.barbersales() } style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>Sales</Text>
                </View>   */}                 

                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/2 }} >
                    <Image
                      source={require("../../../../assets/icon/usercopy.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.profile() } 
                    />
                    <Text onPress={() => Actions.profile() }  style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>My Profile</Text>
                </View>                    
            </View> 
            }
                           

          </View>
          
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status)),
    currentLocationUser: () => dispatch(currentLocationUser()),
    clearEntryPageFields: () => dispatch(clearEntryPageFields()),
    selectRole:(role) => dispatch(selectRole(role))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Notifications);
