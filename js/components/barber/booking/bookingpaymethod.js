import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, FlatList } from "react-native";
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
  CheckBox 
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep5 } from "../../../actions/common/booking";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,
    barberService: state.booking.barberService
  };
}
class BookingPayMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      checkboxes : [],
      checkedPayId: undefined,
      payMethodName: undefined,
      error: false, 
      paymethod: [
        {
          name: "Cash",
          id: 1          
        },
        {
          name: "Credit Card",
          id: 2          
        },
        {
          name: "Venmo",
          id: 3          
        },
        {
          name: "Online transfer",
          id: 4          
        },
        {
          name: "Other",
          id: 5          
        }
      ]
    };
  }

  callBooking(){
    if(this.state.checkedPayId){
      this.setState({ error: false })
      this.props.setBookingStep5(this.state.payMethodName)
    } else {
      this.setState({ error: true })
    } 
  }

  setCheckBoxPayMethod(id,name) {    
    
    this.setState({ checkedPayId: id, payMethodName: name })    
  }

  renderPayItem = ({item, index}) => {
    
    return (
      <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
        {/*<CheckBox style={{ marginTop:10 }} onPress={() => this.setCheckBox(item.id) } checked={(this.state.checkedId.includes(item.id)) ? true : false  } />*/}
        <CheckBox style={{ marginTop:10 }} onPress={() => this.setCheckBoxPayMethod(item.id, item.name) } checked={(this.state.checkedPayId == (item.id)) ? true : false  } />
        <Text style={{  color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:16 }} >{item.name}</Text>
      </View>
    )
  };

  render() {
   
    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
              
              <View style={{ flexDirection:'row', marginTop:20 }} >

                <View style={{  marginLeft:5 }} >
                  <Button transparent>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text onPress={()=>Actions.BookingService()}  style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
                      
                </View>
                </View>
                 <View style={{ flexDirection:'row', marginTop:20 }} >

                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:28, marginLeft:10, fontWeight:'600' }}>
                    Pay Method
                  </Text>     
                </View>
              </View>

              <View style={{ flexDirection:'row', marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16 }} >Please select you payment method.</Text>
              </View>

              {this.state.error && 
              <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor:"#B14C60", width: deviceWidth-40, marginTop:30 }}>
                  <Text style={{ textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular' }}>
                    Please select the payment method
                  </Text>
                </View>
              </View>
              }

              <FlatList
                data={this.state.paymethod}
                extraData={this.state}
                renderItem={this.renderPayItem} />
                            
               <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:20 }} >
                <Button
                  block
                  onPress={ ()=> this.callBooking() }
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
    setBookingStep5: (service,servicename, serviceprice) => dispatch(setBookingStep5(service,servicename, serviceprice)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BookingPayMethod);