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
  StyleSheet,
  TouchableOpacity,TouchableHighlight
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
  Col,
  Input,
  CheckBox
} from "native-base";
import PropTypes from "prop-types";
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
import CalendarPicker from 'react-native-calendar-picker';
import CalendarStrip from "react-native-calendar-strip";
import { getTimeSlotsBarber,setAvailabilityBarber } from "../../../actions/common/booking";
import moment from "moment";
import RNPickerSelect from 'react-native-picker-select';
import { getApponmentList } from "../../../actions/common/booking";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    alignItems:'center',
    justifyContent:'center',
    color: '#FFF',
    width:150,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    alignItems:'center',
    justifyContent:'center',
    borderColor: 'purple',
    borderRadius: 8,
    color: '#FFF',
    width:150,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

function mapStateToProps(state) {
  return {
    user: state.driver.user,
    time_slots: state.booking.slots,
    barberAppointmentSlots: state.booking.barberAppointmentSlots
  };
}

class Availabilty extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func,
    selectRole:PropTypes.func,
   
  };

  constructor(props) {
    selected_day = moment().format('YYYY-MM-DD');
    super(props);
    this.state = {
      loading: true,
      selectedDay:[],
      selshow:true,
      selected_day: moment().format('YYYY-MM-DD'),
      customer: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      repeat: 'weekly',
      checkedId:[],
      daySlots:['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      startTime: undefined,
      endTime: undefined,
      bookingType: 'single',
      listdata:0,
      barberAppointmentSlots: this.props.barberAppointmentSlots
    };
    
  }

  state = {
    activeLogin: null
  };
  
  async deleteSession(){
    try {
      await AsyncStorage.removeItem('customerRegistration');
      await AsyncStorage.removeItem('customerRegistration.name');
      await AsyncStorage.removeItem('customerRegistration.pass');
      await AsyncStorage.removeItem('driverRegistration.name');
      await AsyncStorage.removeItem('driverRegistration.pass');
      await AsyncStorage.removeItem('driverRegistration.phone');
      await AsyncStorage.removeItem('driverRegistration.address');
      await AsyncStorage.removeItem('driverRegistration.rates');
      await AsyncStorage.removeItem('driverRegistration.exp');
      await AsyncStorage.removeItem('driverRegistration.cpr');
      await AsyncStorage.removeItem('driverRegistration.insurance');
      await AsyncStorage.removeItem('driverRegistration.license');
      await AsyncStorage.removeItem('driverRegistration.background');
      await AsyncStorage.removeItem('driverRegistration.cert');
      await AsyncStorage.removeItem('driverRegistration.speaciality');

    } catch (error) {
      
    }
  } 

  componentDidMount(){
    
    this.deleteSession().then((data) => {
       
    }).catch((error) => {
       
    }); 

    // NetInfo.isConnected.addEventListener(
    //   "change",
    //   this._handleConnectionChange
    // );

    this.props.getApponmentList();
  }
  // updateTimeslots=(item)=>{
  //  this.setState({selshow:item.show})
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeLogin !== null) {
      this.setState({
        activeLogin: nextProps.activeLogin
      });
    } else if (nextProps.activeLogin === null) {
      this.setState({
        activeLogin: null
      });
    }
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

  callScreen(){
    
    this.props.currentLocationUser();
    Actions.names()
  }


  getMyAppointmentDate() {
    let date = this.selected_day;
   
    if (date === undefined) {
      date = moment(new Date).format('YYYY-MM-DD');
    }
   
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Taxi App needs access to your GPS "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
      } else {
        
      }
    } catch (err) {
     
    }
  }

  setCheckBox(id) {
    //this.setState({ checkedId: id })

    if(this.state.checkedId.indexOf(id) > -1) {
      var index = this.state.checkedId.indexOf(id);
      this.state.checkedId.splice(index, 1);
      this.setState({  checkedId: this.state.checkedId })
    } else {
      this.setState({
          checkedId: [...this.state.checkedId, id]
      })
    }
  }

  setRepeatFrequency(repeat) {
    this.setState({ repeat: repeat })
  }

  setBookingType(type) {
    this.setState({ bookingType: type })
  }


  

  renderFeedItem = ({item, index}) => {
   
    return (
      <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5, marginTop:5, width:deviceWidth }} >
        <Text style={{  color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:16, width:deviceWidth - 80 }} >{item.start_time}{"-"}{item.end_time}</Text>
        <CheckBox 
          style={{ marginTop:10 }} 
          onPress={ () => this.setCheckBox(item.id) } 
          checked={ (this.state.checkedId.indexOf(item.id) > -1) ? true : false } />
      </View>
    )
  };

  renderDayItem = ({item}) => {
    var color = '#F2F2F2';
    if(this.state.selectedDay.indexOf(item) > -1) {
      color = '#392F2A';
    }
    return (
      <TouchableOpacity onPress={()=>this.updateDay(item)}>
        <View style={{ borderWidth:1, borderColor:"#000", backgroundColor:color, margin:10, width:40, height:40, alignItems:'center', justifyContent:'center' }}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  };
  renderapponmentdata = ({item}) => {
    
    return(
      <TouchableOpacity>
        <View style={{backgroundColor:'#fff'}}>
          <Text style={{color:'#fff'}}>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  setAvailability() {
    if(this.state.selectedDay.length <1){
      Toast.show({
        text: 'Please select any day.',
        position: "top",
        duration: 3000,
        textStyle: { textAlign: "center", width: deviceWidth - 50}
      });
      return false;
    }
    if(this.state.startTime == undefined){
      Toast.show({
        text: 'Start time is required.',
        position: "top",
        duration: 3000,
        textStyle: { textAlign: "center", width: deviceWidth - 50}
      });
      return false;
    }

    if(this.state.endTime == undefined){
      Toast.show({
        text: 'End time is required.',
        position: "top",
        duration: 3000,
        textStyle: { textAlign: "center", width: deviceWidth - 50}
      });
      return false;
    }

    //alert(parseInt(this.state.startTime) +"--"+ parseInt(this.state.endTime))
    if(parseInt(this.state.startTime) >= parseInt(this.state.endTime)){

      Toast.show({
        text: 'End time should be greater.',
        position: "top",
        duration: 3000,
        textStyle: { textAlign: "center", width: deviceWidth - 50}
      });
      return false;
    } 

    
    this.props.setAvailabilityBarber(this.state.selectedDay, this.state.repeat, this.state.startTime, this.state.endTime, this.state.bookingType);

    var that = this; 
    setTimeout(function(){
      that.props.getApponmentList();
    },3000)
  }

  updateDay(day){
    
    this.setState({
      day: day
    })
    if(this.state.selectedDay.indexOf(day) > -1) {
      var index = this.state.selectedDay.indexOf(day);
      this.state.selectedDay.splice(index, 1);
      this.setState({  selectedDay: this.state.selectedDay })
    } else {
      this.setState({
          selectedDay: [...this.state.selectedDay, day]
      })
    }
  }

  updateTimeslots(item,index){
    
    for (var i = 0; i < this.state.barberAppointmentSlots[index].length; i++) {
        if(this.state.barberAppointmentSlots[index][i].show == false){
          this.state.barberAppointmentSlots[index][i].show = true  
        } else {
          this.state.barberAppointmentSlots[index][i].show = false
        }
        
        this.forceUpdate()      
    }    
    this.setState({
      listdata: index
    })
    
  }

 renderTimeSlots = ({item, index}) => {
     
      return (
       <View>
          {
            item.show == true && 
            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginLeft:10, marginRight:10, padding:5, flexDirection:'row' }} >
              <Text> Start date:{item.start_time}</Text> 
               <Text> End date:{item.end_time}</Text> 
            </View>
          }
       </View>
      )          
  };  

  renderBarberList = ({item, index}) => {
      const date = moment(item[0].date); // Thursday Feb 2015
      const dow = date.day();
      let dayString = date.day(dow).format("ddd");
     
      return (
        <View style={{ marginLeft:10, marginRight:10, padding:5,}} >
           <View style={{ justifyContent: 'space-between', marginLeft:10, marginRight:10, paddingLeft:10, paddingRight:10, flexDirection:'row' ,backgroundColor:'#e6e6e6', borderWidth:1, borderColor:'#333' }}>
              <Text style={{fontSize:20,fontFamily:'Cabin-Regular'}}>{item[0].date}</Text>
              <Text style={{fontSize:20,fontFamily:'Cabin-Regular'}}>{dayString}</Text>

              {(item[0].bookingType==0)?
              <Text style={{fontSize:20, fontFamily:'Cabin-Regular'}}>Single</Text>:
              <Text style={{fontSize:20, fontFamily:'Cabin-Regular'}}>Multiple</Text>
              }

              <TouchableOpacity onPress={()=>this.updateTimeslots(item,index)}>
                {(!item[0].show==true)?
                 <Icon
                      name="md-arrow-dropdown"
                      style={{ fontSize: 28, color: "#c6c6c6" }}
                    />
                    :
                <Icon
                  name="md-arrow-dropup"
                  style={{ fontSize: 28, color: "#c6c6c6" }}
                />
                }
               </TouchableOpacity>
           </View>
            <View>
              <FlatList
                data={item}
                extraData={this.state}
                renderItem={this.renderTimeSlots} />      
            </View>
            
        </View>
      )  
        
  };  

  render() {
    
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2021, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    const placeholderStart = {
      label: 'Start Time',
      value: null,
      color: '#FFF',
      fontSize:18,
      justifyContent:'center',
      alignItems:'center'
    };

    const placeholderEnd = {
      label: 'End Time',
      value: null,
      color: '#FFF',
      fontSize:18,
      justifyContent:'center',
      alignItems:'center'      
    };

    return(
      <Container style={{ backgroundColor: "#fff" }}>
          
          <View style={{ flex: 1 }}>
            <Content style={{ backgroundColor: "#0D1214"}}>
                

              <View style={{ flexDirection:'row', marginTop:20 }} >
                 <Button transparent onPress={()=>Actions.BarberHome()}>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text onPress={()=>Actions.BarberHome()} style={{ color:"#E8E8E8", fontSize:18 }}>
                    Back
                  </Text> 
                  </Button>

                  <View style={{ flexDirection:'row', width:deviceWidth-180, justifyContent:'center', alignItems: 'center', }}>
                    <View style={{ marginTop:0 }} >
                      <Text style={{ color: "#E8E8E8", fontSize:18, fontFamily:'Cabin-Regular'}}>
                        Set Availabilty
                      </Text>   
                    </View>
                   </View>
              </View>              

              <View style={{ backgroundColor: '#392F2A', marginTop: 10, marginLeft:10, marginRight:10, flexDirection:'row', borderRadius:5, padding:10 }}>
                <Text>Note: Updating the availabilty slots again will overwrite all the previous availabilty slots! So select all needed slots again while updating.</Text>
              </View>
              <View style={{ backgroundColor: '#F2F2F2', marginTop: 10, flexDirection:'row', marginTop:20, marginLeft:10, marginRight:10 }}>

                <FlatList
                  data={this.state.daySlots}
                  horizontal={true}
                  extraData={this.state}
                  renderItem={this.renderDayItem} />                

              </View>

              <View style={{ flexDirection:'row', marginTop:50 }}>

                <View style={{ marginLeft:30 }}>
                  <RNPickerSelect style={pickerSelectStyles} placeholder={placeholderStart} onValueChange={(value) => this.setState({ startTime: value }) }
                    items={[
                      { label: '7:00', value: '7:00', color:'#000000' },
                      { label: '8:00', value: '8:00', color:'#000000' },                        
                      { label: '9:00', value: '9:00', color:'#000000' },
                      { label: '10:00', value: '10:00', color:'#000000' },
                      { label: '11:00', value: '11:00', color:'#000000' },
                      { label: '12:00', value: '12:00', color:'#000000' },
                      { label: '13:00', value: '13:00', color:'#000000' },
                      { label: '14:00', value: '14:00', color:'#000000' },
                      { label: '15:00', value: '15:00', color:'#000000' },
                      { label: '16:00', value: '16:00', color:'#000000' },
                      { label: '17:00', value: '17:00', color:'#000000' },
                      { label: '18:00', value: '18:00', color:'#000000' },
                      { label: '19:00', value: '19:00', color:'#000000' },
                      { label: '20:00', value: '20:00', color:'#000000' },
                      { label: '21:00', value: '21:00', color:'#000000' },
                      { label: '22:00', value: '22:00', color:'#000000' },
                      { label: '23:00', value: '23:00', color:'#000000' },
                      { label: '24:00', value: '24:00', color:'#000000' }
                    ]}
                  />
                </View>

                <View style={{ marginLeft:60  }}>
                  <RNPickerSelect style={pickerSelectStyles} placeholder={placeholderEnd} onValueChange={(value) => this.setState({ endTime: value })}
                    items={[
                      { label: '7:00', value: '7:00', color:'#000000' },
                      { label: '8:00', value: '8:00', color:'#000000' },                        
                      { label: '9:00', value: '9:00', color:'#000000' },
                      { label: '10:00', value: '10:00', color:'#000000' },
                      { label: '11:00', value: '11:00', color:'#000000' },
                      { label: '12:00', value: '12:00', color:'#000000' },
                      { label: '13:00', value: '13:00', color:'#000000' },
                      { label: '14:00', value: '14:00', color:'#000000' },
                      { label: '15:00', value: '15:00', color:'#000000' },
                      { label: '16:00', value: '16:00', color:'#000000' },
                      { label: '17:00', value: '17:00', color:'#000000' },
                      { label: '18:00', value: '18:00', color:'#000000' },
                      { label: '19:00', value: '19:00', color:'#000000' },
                      { label: '20:00', value: '20:00', color:'#000000' },
                      { label: '21:00', value: '21:00', color:'#000000' },
                      { label: '22:00', value: '22:00', color:'#000000' },
                      { label: '23:00', value: '23:00', color:'#000000' },
                      { label: '24:00', value: '24:00', color:'#000000' }
                    ]}
                  />
                </View>                  
              </View>

              {/*<View style={{ flex: 1, backgroundColor: '#000', marginTop: 10 }}>
                <CalendarStrip
                  ref={(ref) => this.calenderStrip = ref}
                  daySelectionAnimation={{
                    type: 'border',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: '#f2e6ff'
                  }}
                  style={Platform.select({
                    android: {height: 115},
                    ios: {height: 115}
                  })}
                  calendarHeaderStyle={{color: '#FFF', width: deviceWidth, marginTop:10}}
                  calendarColor={{backgroundColor: '#400807'}}
                  dateNumberStyle={{color: '#FFF'}}
                  responsiveSizingOffset={-12}
                  dateNameStyle={{color: '#FFF'}}
                  highlightDateNumberStyle={{color: '#EAC39B'}}
                  highlightDateNameStyle={{color: '#EAC39B'}}
                  iconLeft={require('../../../../assets/icon/left-arrow.png')}
                  iconRight={require('../../../../assets/icon/right-arrow.png')}
                  iconContainer={{flex: 0.1}}
                  styleWeekend={false}
                  selectedDate={moment(this.selected_day)}
                  onWeekChanged={this.onWeekChanged}
                  onDateSelected={(date) => {
                    this.setState({
                      selected_day: moment(date).format('YYYY-MM-DD')
                    })
                  }}
                />
              </View>

              <View style={{ flex:1, color:'#707E85',justifyContent:'center', alignItems:'center', width:deviceWidth }} >              
                <FlatList
                  data={this.props.time_slots}
                  extraData={this.props && this.state}
                  renderItem={this.renderFeedItem} />
              </View>*/}

              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5, marginTop:5, width:deviceWidth, marginTop:10 }} >
                  <Text style={{ color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:18 }} >Schedule</Text>
              </View>

              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5, marginTop:5, width:deviceWidth, marginTop:10 }} >
                <View style={{ width: 150 }}>
                  <Text style={{  color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:16, width: 80 }} >This Week</Text>
                  <CheckBox style={{ marginTop:10, marginLeft:20 }} onPress={() => this.setRepeatFrequency('weekly') } checked={( this.state.repeat == 'weekly') ? true : false  } />
                </View>

                <View style={{ width: 150 }}>
                  <Text style={{  color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:16, width: 80 }} >Month</Text>
                  <CheckBox style={{ marginTop:10, marginLeft:20 }} onPress={() => this.setRepeatFrequency('month') } checked={(this.state.repeat == 'month') ? true : false  } />
                </View>
              </View>


              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5, marginTop:5, width:deviceWidth, marginTop:10 }} >
                  <Text style={{ color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:18 }} >Booking Type</Text>
              </View>

              <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5, marginTop:5, width:deviceWidth, marginTop:10 }} >
                <View style={{ width: 150 }}>
                  <Text style={{  color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:16, width: 150 }} >Single booking</Text>
                  <CheckBox style={{ marginTop:10, marginLeft:20 }} onPress={() => this.setBookingType('single') } checked={( this.state.bookingType == 'single') ? true : false  } />
                </View>

                <View style={{ width: 150 }}>
                  <Text style={{  color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:16, width: 150 }} >Multiple booking</Text>
                  <CheckBox style={{ marginTop:10, marginLeft:20 }} onPress={() => this.setBookingType('multiple') } checked={(this.state.bookingType == 'multiple') ? true : false  } />
                </View>
              </View>


              <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:10, marginBottom:20 }} >
                <Button
                  block
                  onPress={ ()=> this.setAvailability() }
                  style={{ padding: 10, height: 55, marginHorizontal: 5, marginTop:10, marginBottom:10, bottom: 0, backgroundColor:"#392F2A", width:316 }}
                  >
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}> Save</Text>
                </Button>
              </View>  
               <View style={{ backgroundColor: '#F2F2F2',flexDirection:'row', marginTop:10, }}>

                <FlatList
                  data={this.state.barberAppointmentSlots}
                  extraData={this.state}
                  renderItem={this.renderBarberList} />                            

              </View>          

            </Content>                          

          </View>
          
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    setAvailabilityBarber: (selectedDay, repeat, startTime, endTime, bookingType) => dispatch(setAvailabilityBarber(selectedDay, repeat, startTime, endTime, bookingType)), 
    getTimeSlotsBarber:() => dispatch(getTimeSlotsBarber()),   
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status)),
    currentLocationUser: () => dispatch(currentLocationUser()),
    clearEntryPageFields: () => dispatch(clearEntryPageFields()),
    selectRole:(role) => dispatch(selectRole(role)),
     getApponmentList:() => dispatch(getApponmentList())
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Availabilty);
