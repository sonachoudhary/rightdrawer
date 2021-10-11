import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox, TouchableWithoutFeedback } from "react-native";
import ImagePicker from "react-native-image-picker";
import {
  Container,
  Toast,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Spinner,
  Body,
  Label,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep2, setUserLocationNew } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from "moment/moment";
import GetLocation from 'react-native-get-location'
import { checkSubscription } from "../../../actions/common/all";

const XDate = require('xdate');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    bookingDate: state.booking.bookingDateSlots
  };
}
class BookingDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false
    }
  }

  componentDidMount(){
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        this.props.setUserLocationNew(location)
    })
    .catch(error => {
        const { code, message } = error;
        console.warn('getCurrentPosition error-', message);
    })

    //this.props.checkSubscription()
    
  }

  callTimeScreen() {
   
    if(this.state.selectedDate && this.state.selectedDate >= moment().format('YYYY-MM-DD')){
      this.setState({ error: false })
      this.props.setBookingStep2(moment(this.state.selectedDate).format('YYYY-MM-DD'))  
    } else {
      this.setState({ error: true })
    }    
  }
  
  setDateFunction(dateString){
    if(this.props.bookingDate.indexOf(dateString) > -1){
      this.setState({ selectedDate: dateString })  
    } else {
      Toast.show({
        text: "No availability on this day",
        position: "top",
        duration: 1500,
        textStyle: { textAlign: "center", width: deviceWidth - 50}
      });
    }    
  }


  render() {
    
    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
              
              <View style={{ flexDirection:'row', marginTop:20 }} >
                <Button transparent>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text onPress={()=>Actions.BookingSelect()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
              </View>

              <View style={{ flexDirection:'row', marginTop:40 }} >
                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:28, marginLeft:10, fontFamily:'Cabin-Bold'}}>
                    Date
                  </Text>     
                  <Text style={{ color:"#E8E8E8", fontSize:16, marginLeft:10, fontFamily:'Cabin-Regular' }}>Let’s start with the date of appointment.</Text>
                </View>
              </View>
              
              {this.state.error && 
              <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor:"#B14C60", width: deviceWidth-40, marginTop:30 }}>
                  <Text style={{ textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular' }}>Date should not be a past date.</Text>
                </View>
              </View>
              }

              <Calendar
                style={{
                  marginTop: 1,
                  marginBottom: 10,
                }}
                
                monthFormat={'MMMM yyyy'}
                minDate={new Date()}
                theme={{
                  backgroundColor: 'transparent',
                  calendarBackground: 'transparent',
                  selectedDayBackgroundColor: "#FFFFFF",
                  selectedDayTextColor: "#E8E8E8",
                  todayTextColor: "#FFFFFF",
                  arrowColor: '#ffffff',
                  monthTextColor: '#ffffff',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16
                }}
                //onDayPress={(day) => { this.setState({ selectedDate: moment(day.timestamp).toDate()})}}

                
                markedDates={{[this.state.selectedDate]: {selected: true}}}
                
                dayComponent={({date, state}) => {
                  var dateDay = new XDate(date.dateString).toString('ddd');
                  if(this.props.bookingDate){
                     
                  }
                  
                  //checked={(this.props.bookingDate.indexOf(date.dateString) > -1) ? true : false  }
                  return (
                    
                    <TouchableWithoutFeedback onPress={() => { 
                      (date.dateString  >= moment().format('YYYY-MM-DD')) ? this.setDateFunction(date.dateString) : this.setDateFunction(undefined)
                      }} >
                      <View style={{backgroundColor:(this.props.bookingDate.indexOf(date.dateString) > -1) ? '#392F2A' : '#0D1214',height:50, width:50, borderRadius:3, boderWidth:1, borderColor:(this.state.selectedDate===date.dateString) ? '#707E85' : '#0D1214'}}> 
                          <View style={{margin:5}}>
                            <Text style={{textAlign: 'center', color: (this.state.selectedDate===date.dateString) ? '#ffffff' : '#707E85'}}>{date.day}</Text>
                            {((this.props.bookingDate.indexOf(date.dateString) > -1) && (this.state.selectedDate===date.dateString)) && <Text style={{textAlign: 'center',paddingTop:5, color:(this.state.selectedDate===date.dateString) ? '#FFFFFF' : '#707E85'}}>{dateDay}</Text>}
                          </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }}
                current={this.state.selectedDate}
                hideDayNames={true}
                disableMonthChange={false}
                hideArrows={false}
                hideExtraDays={true}
              />
              
              <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >
                <Button
                  block
                  onPress={ ()=> this.callTimeScreen() }
                  style={{ padding: 10, height: 55, marginHorizontal: 5, marginTop:10, marginBottom:10, bottom: 0, backgroundColor:"#392F2A", width:316 }}
                  >
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}> Next</Text>
                </Button>
              </View>

        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setBookingStep2: date => dispatch(setBookingStep2(date)),
    setUserLocationNew:(location) => dispatch(setUserLocationNew(location)),
    checkSubscription:() => dispatch(checkSubscription()),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BookingDate);
