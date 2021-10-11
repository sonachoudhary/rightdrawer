import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image } from "react-native";
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
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStepFinal } from "../../../actions/common/booking";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    user_id: state.driver.user._id,
    bookingBarberName: state.booking.bookingBarberName,
    bookingDate: state.booking.bookingDate,
    bookingTime: state.booking.bookingTime,
    bookingTimeSlot: state.booking.bookingTimeSlot,
    bookingBarberId: state.booking.bookingBarberId,
    bookingServiceId: state.booking.bookingServiceId,    
    bookingServiceName: state.booking.bookingServiceName,
    bookingBarberPrice: state.booking.bookingBarberPrice,
    bookingBarberPayMethod: state.booking.bookingBarberPayMethod,
  };
}
class BookingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      hidebtn:false,
    };
  }

  submitData() {
    
    this.setState({ hidebtn:true });
    this.props.setBookingStepFinal(this.state.user_id);
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
              
              <View style={{ flexDirection:'row', marginTop:20 }} >

                <View style={{  marginLeft:5 }} >
                  <Button transparent onPress={() => Actions.pop()}>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text onPress={()=>Actions.BookingService()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
                      
                </View>
              </View>
              <View style={{ flexDirection:'row', marginTop:40 }} >

                <View style={{  marginLeft:10, marginBottom:50 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:16, fontFamily:'Cabin-Regular', marginLeft:10, fontWeight:'600' }}>
                    Check your booking details
                  </Text>     
                </View>
              </View>

              <View style={{ marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular', opacity:0.5 }} >Date</Text>
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular' }} >{this.props.bookingDate}</Text>
              </View>

              <View style={{ marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular', opacity:0.5 }} >Time</Text>
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular' }} >{this.props.bookingTimeSlot}</Text>
              </View>

              <View style={{ marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular', opacity:0.5 }} >Barber Shop</Text>
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular' }} >{this.props.bookingBarberName}</Text>
              </View>

              <View style={{ marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular', opacity:0.5 }} >Barber</Text>
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular' }} >{this.props.bookingBarberName}</Text>
              </View>

              <View style={{ marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular', opacity:0.5 }} >Service</Text>
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular' }} >{this.props.bookingServiceName}</Text>
              </View>

              <View style={{ marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular', opacity:0.5 }} >Price</Text>
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular' }} >{this.props.bookingBarberPrice}</Text>
              </View>

              <View style={{ marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular', opacity:0.5 }} >Payment Method</Text>
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16, fontFamily:'Cabin-Regular' }} >{this.props.bookingBarberPayMethod}</Text>
              </View>

              <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:60 }} >
                <Button
                  block
                  disabled={this.state.hidebtn}
                  onPress={ ()=> this.submitData() }
                  style={{ padding: 10, height: 55, marginHorizontal: 5, marginTop:10, marginBottom:10, bottom: 0, backgroundColor:"#392F2A", width:316 }}
                  >
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}> Confirm Booking</Text>
                </Button>
              </View>
              
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setBookingStepFinal: user_id => dispatch(setBookingStepFinal(user_id)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BookingDetail);
