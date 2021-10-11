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
import { setBookingStep1, getBarberList } from "../../../actions/common/booking";
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
    this.props.getBarberList();
  }
  
  callBookingService() {
    if(this.state.selectedBaberId){
      this.setState({ error: false })
      this.props.setBookingStep1(this.state.selectedBaberId, this.state.selectedBaberName);
    } else {
      this.setState({ error: true })
    }
  }

  selectedBarber(item) {
    
    this.setState({ selectedBaberId: item.barber_id, selectedBaberName: item.barber_name });
  }

  renderBarberList = ({item, index}) => {
    if(item.barber_name.trim()!='null'){
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft:10, marginRight:10, padding:5 }} >
          <Text style={{ borderColor:'#707E85', padding:10, borderWidth:1, backgroundColor:((this.state.selectedBaberId == item.barber_id) ? "#707E85" : "#2A3439"), color:'#E8E8E8', height:38, width:deviceWidth-40, fontSize:16}} onPress={()=> this.selectedBarber(item)} >{item.barber_name}</Text>             
        </View>
      )  
    }    
  };

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
                           
             <View style={{ flexDirection:'row', marginTop:20 }} >
                <TouchableOpacity onPress={()=>Actions.CustomerHome()}>
                  <View style={{  marginLeft:5 }} >
                    <Button transparent>
                      <Icon
                        name="md-arrow-back"
                        style={{ fontSize: 28, color: "#fff" }}
                      />
                      <Text onPress={()=>Actions.CustomerHome()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                      Back
                    </Text> 
                    </Button>                        
                  </View>
                </TouchableOpacity>
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
              
              <FlatList
                data={this.state.items}
                extraData={this.props && this.state}
                renderItem={this.renderBarberList} />

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
    setBookingStep1: (barber_id,baberName) => dispatch(setBookingStep1(barber_id, baberName)),    
    getBarberList:() => dispatch(getBarberList())
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BookingSelect);
