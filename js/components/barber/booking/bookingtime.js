import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox, FlatList } from "react-native";
import ImagePicker from "react-native-image-picker";
import {
  Container,
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
import { setBookingStep3 } from "../../../actions/common/booking";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import moment from "moment/moment";

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,
    bookingDate: state.booking.bookingDate,
    bookingSlot: state.booking.bookingSlot,    
  };
}
class BookingTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      timeSlot: this.props.bookingSlot,
      timeSelectedSlot: undefined,
      timeSelected: undefined,
      error: false 
    };
  }

  callBookingSelect(){
    
    if(this.state.timeSelected){
      this.setState({ error: false })
      this.props.setBookingStep3(this.state.timeSelected, this.state.timeSelectedSlot)
    } else {
      this.setState({ error: true })
    } 
  }
  
  renderFeedItem = ({item, index}) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft:10, marginRight:10, padding:5 }} >
          <Text style={{ borderColor:'#707E85', padding:10, borderWidth:1, backgroundColor:((this.state.timeSelected == item.id) ? "#707E85" : "#2A3439"), color:'#E8E8E8', height:38, width:deviceWidth-40, fontSize:16}} onPress={()=> this.setState({ timeSelected:item.id, timeSelectedSlot: item.start_time+"-"+item.end_time }) } >{item.start_time}{"-"}{item.end_time}</Text>             
      </View>
    )
  };

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
                    <Text onPress={()=>Actions.BookingDate()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
              </View>
              <View style={{ flexDirection:'row', marginTop:40 }} >

                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:28, marginLeft:10, fontWeight:'600' }}>
                    Time
                  </Text>     

                </View>
              </View>

              <View style={{ flexDirection:'row', marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16 }} >Next, let’s choose an available time for {moment(this.props.bookingDate).format('ll')}.</Text>
              </View>
              

              {this.state.error && 
              <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor:"#B14C60", width: deviceWidth-40, marginTop:30 }}>
                  <Text style={{ textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular' }}>
                    Please select time slot
                  </Text>
                </View>
              </View>
              }

              <FlatList
                data={this.state.timeSlot}
                extraData={this.state}
                renderItem={this.renderFeedItem} />


              
              

               <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >
                <Button
                  block
                  onPress={ ()=> this.callBookingSelect() }
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
    setBookingStep3: (time,timeSelectedSlot) => dispatch(setBookingStep3(time,timeSelectedSlot)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BookingTime);
