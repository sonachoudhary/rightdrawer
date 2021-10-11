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
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Linking,TextInput,KeyboardAvoidingView,
  BackHandler,
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
  Col,Input,CheckBox,
  Picker
} from "native-base";
import PropTypes from "prop-types";

import SearchableDropdown from 'react-native-searchable-dropdown';
import DatePicker from 'react-native-datepicker'; 
import { setActiveLogin } from "../../../actions/common/entrypage";
import {createhomeworksbyteacher,TeacherClassesList,TeachersubjectList } from "../../../actions/common/signin";
import { checkSubscription } from "../../../actions/common/all";
import { acceptAppointment, rejectAppointment, upcomingBooking, setUserLocationNew, startWalkForAppointment, deleteAppointment, getNotificationList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import ImagePicker from "react-native-image-picker";
import SplashScreen from "react-native-splash-screen";
import styles from "./styles";

import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { selectRole } from '../../../actions/common/register';
import GetLocation from 'react-native-get-location'
import  Footer from "../../../components/footer";
import config from "../../../../config.js";

function mapStateToProps(state) {
  return {
    userType:state.driver.user.userType,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
   };
}

class Passchange extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
        oldpass:'',
        new_pass:'',
        confirm_pass:'',
      
     };
    
  }
  
  componentDidMount(){
    
     
      
   }
    componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }

  
 
  

   
updatepassword(){
    if(this.state.oldpass==''){
      alert(' Old Password required')
    } else  if(this.state.new_pass==''){
       alert(' Password required')
    }else if(this.state.confirm_pass==''){
      alert(' Password required')

    } else {
      var user;
       var userType=this.props.userType;
         if(userType=="Teacher"){
            user="teacher"
         }else if(userType=="Student"){
            user="student"
         }

    fetch(`${config.serverSideUrl}/${user}/update-password`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+this.props.jwtAccessToken
      },
      body: JSON.stringify({
             oldpassword:this.state.oldpass,
              password:this.state.new_pass,
              password_confirmation:this.state.confirm_pass,

              
        })
      
    })
    .then(resp => resp.json())
    .then(data => {
      
      if(data.message){
        
        alert('Password Change successfully')
         if(this.props.userType==="Teacher"){
          Actions.CustomerHome();
         } else if(this.props.userType=== "Student"){
          Actions.BarberHome();
         }
      }else  {
        alert('something went wrong')
      }
      
    })
    .catch(e => {
                
    });
     //this.props.TeachersubjectList(this.props.jwtAccessToken,this.props.userid,itemValue)
  }
  
  }
  render() { 
    return(
      <Container style={{ backgroundColor: '#F8FAFA' ,}}>
     
      <Header style={{ backgroundColor: commonColor.brandSecondry }} >
          <Left>
            <Button transparent onPress={() => { (this.props.userType == 'Teacher') ? Actions.CustomerHome() : Actions.BarberHome() } }>
              <Icon
                name="md-arrow-back"
                style={{
                  fontSize: 24,
                  marginLeft: 15,
                  fontWeight:'bold',
                  color: "#000"
                }}
              />
              <Text style={{ color: "#000", marginTop:3, fontSize:16 }}>{" "}Back</Text>
            </Button>
          </Left>
          <Body>
            <Title/>
          </Body>
          <Right />
        </Header>
             <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <Content style={{ backgroundColor: commonColor.brandSecondry }}>
            <View style={{ padding: 30 }}>

              <Text style={{ color:"#000", fontSize:28, fontWeight:'bold' }}>
                Change Password
              </Text>
              <Text style={{ color: "#000", fontSize:16, marginTop:10 }}>
                Write your new password
               </Text>

                                 

              <View style={styles.fieldContainer} >
              <View style={{marginTop:20}}>
                <Text style={styles.fieldContainerText}>
                  Current Password*
                </Text>

                <TextInput
                          placeholder="*******"
                          style={{ borderColor:'#e6e6e6', borderBottomWidth:1,  color:'#000', height:40, width:350, fontSize:16, padding:5,borderRadius:5}}
                          multiline
                         
                           placeholderTextColor={commonColor.placeholderColor}
                           editable={true}
                          onChange={(event) => this.setState({oldpass: event.nativeEvent.text})}
                          value={this.state.oldpass}
                          
                        /> 
                 </View>
                 <View style={{marginTop:20}}> 
                <Text style={styles.fieldContainerText}>
                  New Password*
                </Text>
                

               <TextInput
                          placeholder="*******"
                          style={{ borderColor:'#e6e6e6', borderBottomWidth:1,  color:'#000', height:40, width:350, fontSize:16, padding:5,borderRadius:5}}
                          multiline
                         
                           placeholderTextColor={commonColor.placeholderColor}
                           editable={true}
                           onChange={(event) => this.setState({new_pass: event.nativeEvent.text})}
                           value={this.state.new_pass}
                          
                        /> 
                 </View>
                 <View style={{marginTop:20}}> 
                <Text style={styles.fieldContainerText}>
                  Confirm Password*
                </Text>
                   <TextInput
                          placeholder="*******"
                          style={{ borderColor:'#e6e6e6', borderBottomWidth:1,  color:'#000', height:40, width:350, fontSize:16, padding:5,borderRadius:5}}
                          multiline
                        

                           placeholderTextColor={commonColor.placeholderColor}
                          editable={true}
                           onChange={(event) => this.setState({confirm_pass: event.nativeEvent.text})}
                           value={this.state.confirm_pass}
                          
                        /> 
                </View>
              </View>

              <Button
                  block
                  onPress={() => this.updatepassword()}
                  style={[styles.nameBtn,{backgroundColor:"#331A58", marginTop:50}]} >
                  <Image
                   source={require("../../../../assets/icon/login_prefix.png")}
                   style={{ width:7, height: 15 }}
                  />
                  <Text style={{ width:deviceWidth-160, marginLeft:20, fontSize:19, textAlign:"left", color: commonColor.brandSecondry }}>
                    Change Password
                  </Text>
                   <Image
                   source={require("../../../../assets/icon/forward.png")}
                   style={{ width:15, height: 15 }}
                   />
              </Button>
                            
            </View>
          </Content>
        </View>    
           
          <Footer/>

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
)(Passchange);
