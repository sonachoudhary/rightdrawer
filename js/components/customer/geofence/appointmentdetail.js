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
  ImageBackground
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
  Col
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

function mapStateToProps(state) {
  return {
    userType: state.driver.user.userType,
  };
}

class CustomerAppointmentDetail extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,      
    };
    
  }

  state = {
    activeLogin: null
  };

  render() {
    return(
      <Container style={{ backgroundColor: "#0D1214" }}>
          
          <View style={{ flex: 1 }}>
            <Content>
              <View style={{  marginLeft:5 }} >
                <Button transparent onPress={() => { (this.props.userType == 'Teacher') ?Actions.CustomerHome() :  Actions.BarberHome() } }>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: "#fff" }}
                  />
                  <Text onPress={()=>Actions.BookingSelect()}  style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                  Back
                </Text> 
                </Button>
                    
              </View>

              <View
                  style={
                    Platform.OS === "ios"
                      ? { padding: 50, marginTop: 20,flexDirection:'row', justifyContent:'center' }
                      : { padding: 50, marginTop: 20,flexDirection:'row', justifyContent:'center' }
                  }
                >
                            
                <Text style={{ color:"#E8E8E8", fontSize:20, fontFamily:'Cabin-Bold' , width: 220, textAlign:'center'}}>
                  Haircut appointment at Bruno’s Barbers
                </Text>
                
              </View>

              <View style={{ flexDirection:'row', justifyContent:'center' }} >
                
                  <Image
                    source={ require("../../../../assets/images/beauty.png")}
                    style={{ width:125, height: 125, zIndex:1001, backgroundColor:'#FFF', borderRadius:62.5 }}
                  />
                
              </View>

              
              <View style={{ padding: 10, marginTop: 10,flexDirection:'row', justifyContent:'center' }} >                            
                <Text style={{ width:deviceWidth-150, color:"#E8E8E8", fontSize:24,flexDirection:'row', justifyContent:'center', textAlign:"center", fontSize:24, fontFamily:'Cabin-Bold'  }}>
                  2:00PM | Mar 24, 2020
                </Text>                
              </View>    

              <View style={{ marginTop: 10, width:deviceWidth, justifyContent:'center', alignItems:'center', marginBottom:10 }} >                            
                <View style={{ width: deviceWidth-40, justifyContent:'center', alignItems:'center'  }}>
                  <Text style={{ color:"#E8E8E8", fontSize:20, fontFamily:'Cabin-Regular',textAlign:"center", width:220, textDecorationLine: 'underline' }}>
                    Bruno’s Barbers
                  </Text>                
                  <Text style={{ color:"#E8E8E8", fontSize:20, marginTop:5, fontFamily:'Cabin-Regular',textAlign:"center", width:220  }}>
                    7148 South Highland St. Poughkeepsie, NY 12601
                  </Text>                
                </View>
              </View>    


              <Button
                  block
                  onPress={()=> Actions.signIn()}
                  style={[styles.nameBtn,{backgroundColor:"#392F2A"}]} >
                  <Text style={{ fontSize:20, fontFamily:'Cabin-Bold', color: "#FFFFFF" }}>
                      Show Location
                  </Text>
              </Button>      

              <Button
                  block
                  onPress={()=> Actions.signIn()}
                  style={[styles.nameBtn,{backgroundColor:"#392F2A", marginBottom:20}]} >
                  <Text style={{ fontSize:20, fontFamily:'Cabin-Bold', color: "#FFFFFF" }}>
                      Remind me in 5 min
                  </Text>
              </Button>          

            </Content>
          </View>
          
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(CustomerAppointmentDetail);
