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
import { getProfile } from "../../../actions/common/all";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    user_id: state.driver.user._id,
    bookingBarberName: state.booking.bookingBarberName,
    userType: state.driver.appState.userType,
    acceptedCustomerName: state.booking.acceptedCustomerName
  };
}

class BarberAcceptSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null
    };
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
              
              <View style={{ flexDirection:'row', justifyContent:'center', marginTop:70 }} >
                  <Text style={{ color: "#E8E8E8", fontSize:28, fontWeight:'600' }} >
                    Successfully Booked
                  </Text>       
              </View> 
              <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >
                <Image
                      source={ require("../../../../assets/images/check-symbol.png")}
                  />
              </View>
               <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >

                  <Text style={{ color:"#E8E8E8", fontSize:18, marginLeft:10 }}>
                    You successfully accepted a booking with
                  </Text> 
              </View>
              <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center'}} >

                  <Text style={{ color:"#E8E8E8", fontSize:18, marginLeft:10 }}>
                   {this.props.acceptedCustomerName} 
              </Text> 
              </View>
               <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >

                <Button
                  block
                  onPress={()=> (this.props.userType=='barber') ? Actions.CustomerHome() : Actions.CustomerHome() }
                  style={{ padding: 10, height: 55, marginHorizontal: 5, marginTop:10, marginBottom:10, bottom: 0, backgroundColor:"#392F2A", width:316 }}
                  >
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}> View </Text>
                </Button>
              </View>
              <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >

                  <Text 
                    onPress={()=> (this.props.userType=='barber') ? Actions.CustomerHome() : Actions.CustomerHome() }
                    style={{ color:"#FFFFFF", fontSize:18, marginLeft:10, fontWeight:'600' }}>
                    Go to Home
                  </Text> 
              </View>
              
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    getProfile: user_id => dispatch(getProfile(user_id)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BarberAcceptSuccess);