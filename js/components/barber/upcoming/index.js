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
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
  Alert
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


import { setActiveLogin } from "../../../actions/common/entrypage";
import { barberAppointments } from "../../../actions/common/signin";
import { acceptAppointment, rejectAppointment, bookingCompleted, loadUpcommingList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import ModalDropdown from 'react-native-modal-dropdown';
import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { selectRole } from '../../../actions/common/register';

const OPTIONS = ['Pending', 'Completed'];

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    user: state.driver.user,
    upcomingAppointmentList: state.booking.upcomingAppointmentList
  };
}

class BarberUpcoming extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      customer: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      bookings: this.props.upcomingAppointmentList,
      modalUserName: undefined,
      modalAppointmentId: undefined,
      status:0,
      pendingText: "Pending... ▼"
    };
  }
  
  componentDidMount(){
    // NetInfo.isConnected.addEventListener(
    //   "change",
    //   this._handleConnectionChange
    // );
    
    this.props.barberAppointments(this.props.user._id)
  }

  // componentWillUnmount() {
  //   NetInfo.isConnected.removeEventListener(
  //     "change",
  //     this._handleConnectionChange
  //   );
  // }

  _handleConnectionChange = isConnected => {
    this.props.connectionState({ status: isConnected });
  };

  updateUpcomingAppointment(appointment_id,id,value){
    
    let that = this
    if(id==1) {
      setTimeout(function(){
          Alert.alert(
            'Please Confirm',
            'Are you sure you want to commit this transaction',
            [
              {text: 'No', onPress: () => {
                that.loadUpcommingList();
              }, style: 'cancel'},
              {
                text: 'Yes', onPress: () => {
                  that.confirmCompleted(appointment_id);
                }
              },
            ],
            {cancelable: false}
          )

      },150)  
    } else {
      this.loadUpcommingList()
    }
  }

  loadUpcommingList(){
    this.props.loadUpcommingList()
  }
  confirmCompleted(appointment_id) {
    //this.refs.dropdown_2.select(0);
    this.props.bookingCompleted(appointment_id)    
  }

  renderDropDown(appointment_id){
    return(
      <ModalDropdown  
        style={{ justifyContent:'flex-end',borderWidth: 0,borderRadius: 3,backgroundColor: '#392F2A'}}
        textStyle={{marginVertical: 10, marginHorizontal: 6, fontSize: 18, color: 'white', textAlign: 'center', textAlignVertical: 'center'}}
        dropdownStyle={{ width: 150, height: 75, borderColor: '#392F2A', borderWidth: 2, borderRadius: 3 }}
        options={OPTIONS}
        onSelect={(idx, value) => this.updateUpcomingAppointment(appointment_id,idx,value)}
        defaultIndex={0}
        defaultValue={this.state.pendingText}
      />      
    )
  }
  renderItemAppointment = ({item, index}) => {
    
    return (
      <TouchableWithoutFeedback>
        <View style={{ borderBottomWidth:1, borderColor:'#707E85', color:'#707E85', marginLeft:20, marginRight:20 }} >
          <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10 }} >
            <Text style={{ fontSize:14, color: "#E8E8E8", width: deviceWidth-100,fontFamily:'Cabin-Regular' }}>{item.name}</Text>
            <Text style={{ justifyContent:'flex-end', fontSize:14, color:"#FFFFFF", fontFamily:'Cabin-Bold' }} >${(item.amount) ? item.amount : 0}</Text> 
          </View>  
          <View style={{ flexDirection:'row', width:deviceWidth, marginTop:10, marginBottom:10 }} >          
            <Text style={{ color: "#707E85", width: deviceWidth-160, fontSize:10, fontFamily:'Cabin-Regular' }}>{item.services}</Text>
            {this.renderDropDown(item.appointment_id)}
            
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  };

  
  
  renderItem = ({item, index}) => {
   
    return (
      <TouchableWithoutFeedback>
      <View>
        <View style={{ flexDirection:'row', marginTop:20, borderBottomWidth:1, borderColor:'#707E85', color:'#707E85', marginLeft:20, marginRight:20 }} >
          <Text style={{ marginBottom: 10, color: "#707E85", fontSize:10, fontFamily:'Cabin-Bold' }} >{ moment(item.date).format('MMMM DD')}</Text>
        </View>

        <FlatList
          data={item.appointment_list}
          extraData={item.appointment_list}
          renderItem={this.renderItemAppointment} 
          ListEmptyComponent={this.renderEmptyContainer()}
        />        
      </View>
      </TouchableWithoutFeedback>
    )
  };

  renderEmptyContainer = () => {
    return (        
      <Text style={{ textAlign: 'center', color: "#FFF", marginTop: deviceHeight/3 }}>No Upcoming Appointments</Text>                  
    );
  };
  
  render() {
    
    
    return(
      <Container style={{ backgroundColor: "#0D1214" }}>

          <View style={{ flex: 1 }}>
            <Content style={{ backgroundColor: "#0D1214", marginBottom:70}}>

              <View style={{ flexDirection:'row', marginTop:20 }} >
                <View style={{  marginLeft:5 }} >
                  <Button transparent>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text onPress={()=>Actions.BarberHome()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
                      
                </View>
              </View>
              
              <FlatList
                data={this.props.upcomingAppointmentList}
                extraData={this.props}
                renderItem={this.renderItem} 
                ListEmptyComponent={this.renderEmptyContainer()}
              />

              {/*<View style={{ flexDirection:'row', marginTop:20, borderBottomWidth:1, borderColor:'#707E85', color:'#707E85', marginLeft:20, marginRight:20 }} >
                <Text style={{ marginBottom: 10, color: "#707E85", fontSize:10, fontFamily:'Cabin-Bold' }} >March 2020</Text>
              </View>*/}                            

            </Content>

            <View style={{ width: deviceWidth, height: 66, backgroundColor: "#2A3439", flexDirection:'row', justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                <View style={{ justifyContent:'center', borderRightWidth:1, borderRightColor:'#000000', backgroundColor: "#392F2A",alignItems:'center', width:deviceWidth/2 }} onPress={() => Actions.BarberHome() } >
                    <Image
                      source={require("../../../../assets/icon/home.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.BarberHome() } 
                    />
                    <Text  onPress={() => Actions.BarberHome() }  style={{fontSize:10, color:'#FFFFFF',paddingTop:10,fontWeight:"bold"}}>Home</Text>
                </View>                    

                {/*
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/4 }}  onPress={() => Actions.notifications() }>
                    <Image
                      source={require("../../../../assets/icon/speechbubble.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.chatlist() }
                    />
                   <Text onPress={() => Actions.chatlist()} style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>Inbox</Text>
                </View>                    

                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/4 }} >
                    <Image
                      source={require("../../../../assets/icon/bill.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.barbersales() } 
                    />
                    <Text onPress={() => Actions.barbersales() }  style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>Sales</Text>
                </View>
              */}                    

                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/2 }} >
                    <Image
                      source={require("../../../../assets/icon/usercopy.png")}
                      style={{ width:20, height: 18  }}
                      onPress={() => Actions.profile() } 
                    />
                    <Text onPress={() => Actions.profile() }  style={{fontSize:10, color:'#707E85',paddingTop:10,fontWeight:"bold"}}>My Profile</Text>
                </View>                    
            </View>                

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
    selectRole:(role) => dispatch(selectRole(role)),
    barberAppointments:(user_id) => dispatch(barberAppointments(user_id)),
    acceptAppointment:(id) => dispatch(acceptAppointment(id)),
    rejectAppointment:(id) => dispatch(rejectAppointment(id)),
    bookingCompleted:(appointment_id) => dispatch(bookingCompleted(appointment_id)),
    
    loadUpcommingList:() => dispatch(loadUpcommingList()),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BarberUpcoming);
