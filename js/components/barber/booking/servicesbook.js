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
import { setBookingStep4 } from "../../../actions/common/booking";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,
    barberService: state.booking.barberService
  };
}
class BookingService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      checkboxes : [],
      services:this.props.barberService,
      checkedId: undefined,
      servicename: undefined,
      serviceprice: undefined,
      error: false 
    };
  }

  callBooking(){
    
    if(this.state.checkedId){
      this.setState({ error: false })
      this.props.setBookingStep4(this.state.checkedId, this.state.servicename, this.state.serviceprice)
    } else {
      this.setState({ error: true })
    } 
  }

  setCheckBox(id,name,price) {    
    this.setState({ checkedId: id, servicename: name, serviceprice: price })    
  }

  renderFeedItem = ({item, index}) => {
    
    return (
      <View style={{ flexDirection:'row', color:'#707E85', paddingLeft:5 }} >
        {/*<CheckBox style={{ marginTop:10 }} onPress={() => this.setCheckBox(item.id) } checked={(this.state.checkedId.includes(item.id)) ? true : false  } />*/}
        <CheckBox style={{ marginTop:10 }} onPress={() => this.setCheckBox(item.id, item.name, item.price) } checked={(this.state.checkedId == (item.id)) ? true : false  } />
        <Text style={{  color: "#E8E8E8",marginTop:10, marginLeft:20, fontSize:16 }} >{item.name} (${item.price})</Text>
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
                    <Text onPress={()=>Actions.BookingSelect()}  style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
                      
                </View>
                </View>
                 <View style={{ flexDirection:'row', marginTop:20 }} >

                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:28, marginLeft:10, fontWeight:'600' }}>
                    Services
                  </Text>     
                </View>
              </View>

              <View style={{ flexDirection:'row', marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16 }} >Terrific! Now select the services{"\n"} that you need.</Text>
              </View>

              {this.state.error && 
              <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor:"#B14C60", width: deviceWidth-40, marginTop:30 }}>
                  <Text style={{ textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular' }}>
                    Please select the service
                  </Text>
                </View>
              </View>
              }

              <FlatList
                data={this.state.services}
                extraData={this.state}
                renderItem={this.renderFeedItem} />
                            
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
    setBookingStep4: (service,servicename, serviceprice) => dispatch(setBookingStep4(service,servicename, serviceprice)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BookingService);
