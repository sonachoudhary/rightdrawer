import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { View, Platform, Dimensions, FlatList } from "react-native";
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
  Toast,
} from "native-base";
import { Actions } from "react-native-router-flux";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { fetchAppointmentListAsync } from "../../../actions/driver/history";
import { confirmAppointmentCall,declineAppointmentCall,completeAppointmentCall } from "../../../actions/common/booking";
import Modal from "react-native-modal";
import moment from "moment";

const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    appointmentlist: state.driver.history.appointmentlist,
    archive_appointment: state.driver.history.archive_appointment,
    pending_appointment: state.driver.history.pending_appointment,
    user_id: state.driver.user._id
  };
}

class TrainerAppointments extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchAppointmentListAsync: PropTypes.func,
    loadSpinner: PropTypes.bool,
    appointmentlist: PropTypes.array,
    pending_appointment: PropTypes.array,
    archive_appointment: PropTypes.array,
    confirmAppointmentCall: PropTypes.array,
    declineAppointmentCall: PropTypes.array,
    completeAppointmentCall:PropTypes.array,
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
      customerName: '',
      modalDataStatus: '',
      trainingTime:'',
      selectedAppoinmentId: undefined 
    };
    
    //this.props.dispatch(getProfileData(this.state.trainerProfileId));    
  }

  setModalVisible(visible) {
     this.setState({modalVisible: visible});
  }

  async componentDidMount() {
    await this.props.fetchAppointmentListAsync(this.state.user_id);
  }

  async fetchAppointmentList() {
    await this.props.fetchAppointmentListAsync(this.state.user_id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  openConfirmPopup(item,status){
     var currenttime = new Date();
     var curnewmmoment = moment(new Date(currenttime)).format("YYYY-MM-DD HH:mm:ss");
     var timedata = item.time.split('T');
     var getnewtime = timedata[1].split(':00');
     time = timedata[0]+' '+getnewtime[0];
     if(curnewmmoment>time){
        var expired = 1;
     }else {
        var expired = 0;
     }
    

    if(status=='appointment'){
      item.bookingCompleted =1;
    }
    this.setState({
      customerName: item.customer_id.fname+" "+item.customer_id.lname,
      modalDataStatus: status,
      trainingTime: moment(time).format('lll'),
      selectedAppoinmentId: item._id,
      bookingCompleted:item.bookingCompleted,
      expired:expired
    })
    this.setModalVisible(true)
  }

  confirmAppointment(){
    this.props.confirmAppointmentCall(this.state.selectedAppoinmentId);
    this.fetchAppointmentList();
    this.setModalVisible(false)
  }
  completeAppointment(){
    
    this.props.completeAppointmentCall(this.state.selectedAppoinmentId);
    this.fetchAppointmentList();
    this.setModalVisible(false)
  }

  rejectAppointment(){
    this.props.declineAppointmentCall(this.state.selectedAppoinmentId);
    this.fetchAppointmentList()
    this.setModalVisible(false)
  }

  archive_renderRow = ({ item }) => { 
    if(item.time){
    var timedata = item.time.split('T');
     var getnewtime = timedata[1].split(':00');
     time = timedata[0]+' '+getnewtime[0];
    return (
      <ListItem style={styles.listcustom} onPress={() => this.openConfirmPopup(item,'archive')} >
        <View style={styles.listContainer}>
          <View style={styles.lextText}>
          {(item.bookingCompleted==1)?
            <Text style={styles.textColor}>{item.customer_id.fname}{" "}{item.customer_id.lname}</Text>
          :
            <Text style={styles.unratedtextColor}>{item.customer_id.fname}{" "}{item.customer_id.lname}</Text>
          }
          </View>

          <View style={styles.rightText}>
            <Text style={styles.dateColor}>
              {moment(time).format('lll')}
              {"  "}
              <Icon
                name="arrow-forward"
                style={{
                  fontSize: 18,
                  marginLeft: 40,
                  paddingTop:7,
                  paddingLeft:40,
                  color: "#444" }}
              />
            </Text>
          </View>
        </View>
      </ListItem>
    );
  }
  };

  pending_renderRow = ({ item }) => { 
    if(item.time){
     var timedata = item.time.split('T');
     var getnewtime = timedata[1].split(':00');
     time = timedata[0]+' '+getnewtime[0];
      return (
        <ListItem
          style={styles.listcustom}
          onPress={() => this.openConfirmPopup(item,'pending')}
        >
          <View style={styles.listContainer}>
            <View style={styles.lextText}>
              <Text style={styles.textColor}>{item.customer_id.fname}{" "}{item.customer_id.lname}</Text>
            </View>

            <View style={styles.rightText}>
              <Text style={styles.dateColor}>
                {moment(time).format('lll')}
                {"  "}
                <Icon
                  name="arrow-forward"
                  style={{
                    fontSize: 18,
                    marginLeft: 40,
                    paddingTop:7,
                    paddingLeft:40,
                    color: "#444"
                  }}
                />
              </Text>
            </View>
          </View>
        </ListItem>
      );
    }
  };

  appointment_renderRow = ({ item }) => {

    if(item.time){
    var timedata = item.time.split('T');
     var getnewtime = timedata[1].split(':00');
     time = timedata[0]+' '+getnewtime[0];
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.openConfirmPopup(item,'appointment')}
      >
        <View style={styles.listContainer}>
          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.customer_id.fname}{" "}{item.customer_id.lname}</Text>
          </View>

          <View style={styles.rightText}>
            <Text style={styles.dateColor}>
              {moment(time).format('lll')}
              {"  "}
              <Icon
                name="arrow-forward"
                style={{
                  fontSize: 18,
                  marginLeft: 40,
                  paddingTop:7,
                  paddingLeft:40,
                  color: "#444"
                }}
              />
            </Text>
          </View>
        </View>
      </ListItem>
    );
  }
  };  

  render() {
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#fff" }}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Appointments
            </Title>
          </Body>
          <Right />
        </Header>
        
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          
          <View>
            <View style={{ backgroundColor:"#999", height: 40, padding:10 }}>
              <Text style={{color: "#000"}}>Pending</Text>
            </View>
            {
              this.props.pending_appointment && this.props.pending_appointment.length > 0 ? 
              <FlatList
                data={this.props.pending_appointment}
                renderItem={this.pending_renderRow}
                style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>: 
              <Text style={ styles.emptyMessageStyle }>No Pending Appointments</Text>
            }

          </View>
        
          <View>
            <View style={{ backgroundColor:"#999", height: 40, padding:10 }}>
              <Text style={{color: "#000"}}>Upcoming</Text>
            </View>
            {
              this.props.appointmentlist && this.props.appointmentlist.length > 0 ? 
              <FlatList
                data={this.props.appointmentlist}
                renderItem={this.appointment_renderRow}
                style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>: 
              <Text style={ styles.emptyMessageStyle }>No Upcoming Appointments</Text>
            }
          </View>
        
          <View>
            <View style={{ backgroundColor:"#999", height: 40, padding:10 }}>
              <Text style={{color: "#000"}}>Archive</Text>
            </View>
            {
              this.props.archive_appointment && this.props.archive_appointment.length > 0 ? 
              <FlatList
                data={this.props.archive_appointment}
                renderItem={this.archive_renderRow}
                style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>: 
              <Text style={ styles.emptyMessageStyle }>No Archive Appointments</Text>
            }
          </View>
          
          <Modal
              animationType="slide"
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
                <View style={styles.modalView}>
                  <Text style={{ position:'absolute', right:15, marginTop:15 }} onPress={() => this.setModalVisible(false) }>X</Text>
                  <Text style={{ color: "#000", fontSize:24, marginTop:20, textTransform: 'capitalize', textAlign:"center" }}>{this.state.customerName}</Text>
                  <Text style={{ color: "#000", fontSize:16, marginTop:10, textAlign:"center" }}>{this.state.trainingTime}</Text>

                  { this.state.modalDataStatus == 'pending' && 
                    <View>
                        { this.state.expired == 0 && 
                          <Text style={{ color: "#000", marginTop:10, textAlign:"center" }}> Please check and confirm for the appointment.</Text>
                        }
                        { this.state.expired == 1 && 
                          <Text style={{ color: "#000", marginTop:10, textAlign:"center" }}> Appointment has been expired.</Text>
                        }
                     
                          <View style={{ flexDirection: "row", justifyContent: "center", margin:10,  }}>
                           { this.state.expired == 0 && 
                              <View style={{ flexDirection: "row", justifyContent: "center"}}>
                              <Button
                                block
                                style={styles.completeBtn}
                                onPress={() => this.confirmAppointment() } >
                                  <Text style={{ alignSelf: "center", color: "#000" }}> Confirm </Text>
                              </Button>

                              <Button
                                block
                                style={[styles.completeBtn,{marginLeft:20}]}
                                onPress={() => this.rejectAppointment() } >
                                  <Text style={{ alignSelf: "center", color: "#000" }}> Reject </Text>
                              </Button>
                              </View>
                           }
                           { this.state.expired == 1 && 
                             <Button
                                block
                                style={styles.completeBtn}
                                onPress={() => this.setModalVisible(false) } >
                                  <Text style={{ alignSelf: "center", color: "#000" }}> Close </Text>
                              </Button> 
                          }
                      </View>
                      
                    </View>
                  }
                  

                  { this.state.modalDataStatus != 'pending' && 
                    <View>
                      { this.state.bookingCompleted != 1 && 
                        <Text style={{ color: "#000", marginTop:10, textAlign:"center" }}> Please mark it as complete.</Text>
                      }
                      <View style={{ flexDirection: "row", justifyContent: "center", margin:10,  }}>
                      { this.state.bookingCompleted != 1 && 
                        <Button
                          block
                           style={[styles.completeBtn,{marginRight:10}]}
                          onPress={() => this.completeAppointment() } >
                            <Text style={{ alignSelf: "center", color: "#000" }}> Complete </Text>
                        </Button>
                      }
                        <Button
                          block
                          style={styles.completeBtn}
                          onPress={() => this.setModalVisible(false) } >
                            <Text style={{ alignSelf: "center", color: "#000" }}> Close </Text>
                        </Button>                       
                      </View>
                    </View>
                  }
              </View>
          </Modal>
        </Content>        
        
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    fetchAppointmentListAsync: user_id =>dispatch(fetchAppointmentListAsync(user_id)),
    confirmAppointmentCall: appointment_id => dispatch(confirmAppointmentCall(appointment_id)),
    completeAppointmentCall: appointment_id => dispatch(completeAppointmentCall(appointment_id)),
    declineAppointmentCall: appointment_id => dispatch(declineAppointmentCall(appointment_id)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(TrainerAppointments);
