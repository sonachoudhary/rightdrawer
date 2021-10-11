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
  Toast
} from "native-base";
import { Actions } from "react-native-router-flux";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { fetchCustAppointListAsync } from "../../../actions/driver/history";
import { setFeedbackData } from "../../../actions/common/booking";
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

class CustomerAppointments extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchCustAppointListAsync: PropTypes.func,
    loadSpinner: PropTypes.bool,
    appointmentlist: PropTypes.array,
    pending_appointment: PropTypes.array,
    archive_appointment: PropTypes.array,    
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
    await this.props.fetchCustAppointListAsync(this.state.user_id);
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

  openConfirmPopup(item) {
    
    
      var timedata = item.time.split('T');
      var getnewtime = timedata[1].split(':00');
      time = timedata[0]+' '+getnewtime[0]; 
    

    this.setState({
      trainerName: item.trainerprofileid.fname+" "+item.trainerprofileid.lname, 
      trainer_id: item.trainerprofileid._id,
      appointment_id: item._id,
      appointment_time: moment(time).format('lll'),
      rating: item.ratingCompleted,
      completed: item.bookingCompleted,
    })
    this.setModalVisible(true)
  }
  rendernewRow= ({ item }) => {
    if(item.time) {
    if(item.trainerprofileid!=undefined){

     var timedata = item.time.split('T');
     var getnewtime = timedata[1].split(':00');
     time = timedata[0]+' '+getnewtime[0];
                
    return (
      <ListItem style={styles.listcustom} >
        <View style={styles.listContainer}>
          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.trainerprofileid.fname}{" "}{item.trainerprofileid.lname}</Text>
          </View>

          <View style={styles.rightText}>
            <Text style={styles.dateColor}>
              {moment(time).format('lll')}
              {"  "}
            </Text>
          </View>
        </View>
      </ListItem>
    );
  }
}
  };

  renderRow = ({ item }) => {
    if(item.trainerprofileid!=undefined){
      if(item.time) {
        var timedata = item.time.split('T');
        var getnewtime = timedata[1].split(':00');
        time = timedata[0]+' '+getnewtime[0];
                    
        return (
          <ListItem style={styles.listcustom} >
            <View style={styles.listContainer}>
              <View style={styles.lextText}>
                <Text style={styles.textColor}>{item.trainerprofileid.fname}{" "}{item.trainerprofileid.lname}</Text>
              </View>

              <View style={styles.rightText}>
                <Text style={styles.dateColor}>
                  {moment(time).format('lll')}
                  {"  "}
                </Text>
              </View>
            </View>
          </ListItem>
        );
    }
     }
  };

  
  renderarchRow = ({ item }) => {  
    if(item.trainerprofileid!=undefined){
      if(item.time) {
        var timedata = item.time.split('T');
        var getnewtime = timedata[1].split(':00');
        time = timedata[0]+' '+getnewtime[0];
                    
        return (
          <ListItem
            style={styles.listcustom}
            onPress={() => this.openConfirmPopup(item)}
          >
            <View style={styles.listContainer}>
              <View style={styles.lextText}>
              {(item.bookingCompleted==1 && item.ratingCompleted!=1)?
                <Text style={styles.underratetextColor}>{item.trainerprofileid.fname}{" "}{item.trainerprofileid.lname}</Text>
              :
                <Text style={styles.textColor}>{item.trainerprofileid.fname}{" "}{item.trainerprofileid.lname}</Text>
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
                      color: "#444"
                    }}
                  />
                </Text>
              </View>
            </View>
          </ListItem>
        );
    }
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
                renderItem={this.rendernewRow}
                style={{ borderTopWidth: 2, borderTopColor: "#ddd" }} />  : 
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
                renderItem={this.renderRow}
                style={{ borderTopWidth: 2, borderTopColor: "#ddd" }} /> : 
              <Text style={ styles.emptyMessageStyle }>No Upcoming Appointments</Text>
            }
          </View>        
          
          <View>
            <View style={{ backgroundColor:"#999", height: 40, padding:10 }}>
              <Text style={{color: "#000"}}>Archive</Text>
            </View>
            {
              this.props.archive_appointment && this.props.archive_appointment !== undefined ? 
              <FlatList
                data={this.props.archive_appointment}
                renderItem={this.renderarchRow}
                style={{ borderTopWidth: 2, borderTopColor: "#ddd" }} /> : 
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

                  <Text style={{ color: "#000", fontSize:16, marginTop:20, textAlign:"center" }}>Your appointment with</Text>
                  <Text style={{ color: "#000", fontSize:24, textAlign:"center" }}>{this.state.trainerName}</Text>
                  <Text style={{ color: "#000", fontSize:16, textAlign:"center" }}>has finished.</Text>

                  <View>
                    { (this.state.rating != 1 && this.state.completed==1) && 
                    <Text style={{ color: "#000", marginTop:10, textAlign:"center" }}> Please review the training session with {this.state.trainerName}.</Text>
                  }
                    <View style={{ flexDirection: "row", justifyContent: "center", margin:10,  }}>
                    
                    { (this.state.rating != 1 && this.state.completed==1) && 
                      <Button
                        block
                        style={styles.completeBtn}
                        onPress={() => {
                          this.callScreenFeedback()
                        }}
                         >
                          <Text style={{ alignSelf: "center", color: "#000" }}> REVIEW </Text>
                      </Button>
                    }
                      <Button
                        block
                        style={[styles.completeBtn,{marginLeft:20}]}
                        onPress={() => this.setModalVisible(false) } >
                          <Text style={{ alignSelf: "center", color: "#000" }}> CLOSE </Text>
                      </Button>
                    </View>
                  </View>

              </View>
          </Modal>
        </Content>        
        
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    fetchCustAppointListAsync: user_id => dispatch(fetchCustAppointListAsync(user_id)),
    setFeedbackData: (data) => dispatch(setFeedbackData(data))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(CustomerAppointments);
