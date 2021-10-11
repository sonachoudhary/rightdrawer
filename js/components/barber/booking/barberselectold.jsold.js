import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox } from "react-native";
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
import SearchableDropdown from 'react-native-searchable-dropdown';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,
    barberList: state.booking.barberList   
  };
}

class BookingSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      items : this.props.barberList,
      selectedBaberId: undefined,
      selectedBaberName: undefined,
      error: false 
    };
  }
  
  callBookingService(){    
    if(this.state.selectedBaberId){
      this.setState({ error: false })
      this.props.setBookingStep3(this.state.selectedBaberId, this.state.selectedBaberName);    
    } else {
      this.setState({ error: true })
    } 
  }

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
                    <Text onPress={()=>Actions.BookingTime()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
                      
                </View>
              </View>
              <View style={{ flexDirection:'row', marginTop:40 }} >

                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:28, marginLeft:10, fontWeight:'600' }}>
                    Barber
                  </Text>     

                </View>
              </View>

              <View style={{ flexDirection:'row', marginTop:5,  color:'#707E85', padding:5 }} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16 }} >Next, give us the name of the barbershop and your favorite barber.</Text>
              </View>

              {this.state.error && 
              <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor:"#B14C60", width: deviceWidth-40, marginTop:30 }}>
                  <Text style={{ textAlign:'center',alignSelf:'center', padding:5, color:'#E8E8E8', fontSize:14, fontFamily:'Cabin-Regular' }}>
                    Please select a barber.
                  </Text>
                </View>
              </View>
              }

              <View style={{ flexDirection:'row', marginTop:5}} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16 }} >Barbershop</Text>
              </View>
              <View style={{ flexDirection:'row', marginLeft:10, marginRight:10 }} >
                  <Input  value = "Type or select barber" style={{ borderColor:'#2A3439', borderWidth:1, backgroundColor:"#2A3439", color:'#E8E8E8', height:50, width:317, fontSize:16, padding:12}} />             
              </View>

              <View style={{ flexDirection:'row', marginTop:20}} >
                <Text style={{ marginBottom: 10, color: "#E8E8E8", marginLeft: 15, fontSize:16 }} >Name of Barber</Text>
              </View>
              <View style={{ flexDirection:'row', marginLeft:10, marginRight:10 }} >
                  <SearchableDropdown
                      onItemSelect={(item) => {
                        
                        
                        this.setState({ selectedBaberId: item.id, selectedBaberName: item.name });
                      }}
                      containerStyle={{ padding:5, backgroundColor:"#2A3439", width: deviceWidth-20, color:'#FFFFFF', fontSize:16 }}
                      onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                        this.setState({ selectedItems: items });
                      }}
                      itemStyle={{
                         backgroundColor:"#2A3439", color:'#FFFFFF', height:38, width:deviceWidth-20, fontSize:16
                      }}
                      itemTextStyle={{ color: '#FFFFFF',fontSize:16 }}
                      placeholder={'Select barber'}
                      placeholderTextColor={'#FFFFFF'}
                      itemsContainerStyle={{ maxHeight: 140 }}
                      items={this.state.items}
                      
                      resetValue={false}
                      textInputProps={
                        {
                          placeholder: "Type or select barber",
                          underlineColorAndroid: "transparent",
                          style: {
                              padding: 12,
                              color:'#FFFFFF',
                              fontSize:16                              
                          },
                          onTextChange: text => console.log(text)
                        }
                      }
                      listProps={
                        {
                          style: {
                              padding: 12,
                              color:'#FFFFFF'                              
                          },
                          nestedScrollEnabled: true,
                        }
                      }
                    />          
              </View>
              
              

               <View style={{ flexDirection:'row',justifyContent:'center', alignItems: 'center', marginTop:60 }} >

                <Button
                  block
                  onPress={ ()=> this.callBookingService() }
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
    setBookingStep3: (barber_id,baberName) => dispatch(setBookingStep3(barber_id, baberName)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BookingSelect);
