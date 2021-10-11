import { Actions, ActionConst } from "react-native-router-flux";
import React, { Component, } from "react";
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
  Linking,BackHandler,
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
  Col,Input
} from "native-base";
import PropTypes from "prop-types";


import { setActiveLogin } from "../../../actions/common/entrypage";
import {homeworksliststudent } from "../../../actions/common/signin";
import { checkSubscription } from "../../../actions/common/all";
import { acceptAppointment, rejectAppointment, upcomingBooking, setUserLocationNew, startWalkForAppointment, deleteAppointment, getNotificationList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import SplashScreen from "react-native-splash-screen";

import {
  clearEntryPage,
  clearEntryPageFields
} from "../../../actions/common/entrypage";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { selectRole } from '../../../actions/common/register';
import GetLocation from 'react-native-get-location'
import config from "../../../../config.js";
import SyncStorage from 'sync-storage';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.studentlogin.studentid,
    
   };
}



class EBookstudent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // home_work_data:this.props.homeworkdata,
      ebook:[]
    };
    
  }
   componentDidMount() {
    this.displayebooks();
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
  
  displayebooks(){
    const id=SyncStorage.get('id');
  var userid=this.props.userid;

  var jwtAccessToken=this.props.jwtAccessToken;
      fetch(`${config.serverSideUrl}/student/subjectebookall/${userid}/${id}`,{
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
     })
    .then(resp => resp.json())
    .then(data => {
        if(data!=null){
                 
                this.setState({ebook:data.data});
                //dispatch(getteacherhomeworks(data))
             }
            
    })
    .catch(e => {
      
    });

  
  
  }
  
nextscreen = async (id) =>{
   
    try {
     await AsyncStorage.setItem(
      'selectid:id',id
    );
     Actions.Schoolassignments()
  } catch (error) {
    // Error saving data
  }}
 

  
  
  renderItemdata=({item,index})=>{
     console.log(item,'check image path')
     var uri= 'http://wesmart.in/backend/public/files/subject/'
    return (
      
      <TouchableOpacity style={styles.box}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <View style={{width:'80%',flexDirection:'row'}}>
             <Image        
                      source={require("../../../../assets/images/ebookimage.png")}              
                     
                      style={{ width:30, height: 30,marginTop:10}}
                      />
           <Text style={styles.textheading}>{item.name}</Text>  
                 

         </View>
         <TouchableOpacity onPress={() => Linking.openURL(item.file)}>
            <Image        
                      source={require("../../../../assets/images/dowmload.png")}              
                     
                      style={{ width:30, height: 30,marginTop:10}}
                      />
         </TouchableOpacity>        
         </View>   

        </TouchableOpacity>         
               
    )
  };
  
  render() { 

    var heightvalue= deviceHeight/4.3; 
   var marginTOP= 0;    
        if(Platform.OS === 'ios'){
           heightvalue=deviceHeight-800,
           marginTOP=30
        } 
    console.log(this.state.ebook,'check this.state.ebook')
  
    return(
      <Container style={{ backgroundColor: '#fff' ,}}>
          <StatusBar
            animated={true}
            backgroundColor="#470B63"
            barStyle="light-content"
            showHideTransition="none"
          />
           <ImageBackground source={ require('../../../../assets/images/bac1.png')}  style={{width: deviceWidth, height: heightvalue, resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray' }}> 
              <View style={{marginTop:marginTOP,}}>
              <Button transparent onPress={() => Actions.Ebook()} style={{marginTop:'20%',}}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: deviceHeight/25, color: "#470B63",backgroundColor:'#fff',borderRadius:25,width:35,paddingLeft:5}}
                  />
                                               
                </Button>
               
               </View>
              </ImageBackground> 
                <View style={{borderBottomWidth:1,borderColor:'#fddbdc',width:deviceWidth/4,marginLeft:'5%',justifyContent:'center',alignItems:'center',height:50}}>
                     <Text style={{color:'#f7b5b7',fontSize:deviceHeight/33}}>Chapters</Text> 
               </View>
                <ScrollView style={{ backgroundColor: "#fff",marginBottom:30 }} ref={(ref) => { this.scrollListReftop = ref; }}>
                    <View>
                       
                            
                        <FlatList
                               style={{margin:10}}
                               data={this.state.ebook}
                               extraData={this.state}
                               renderItem={this.renderItemdata}
                            />
                   </View>
                </ScrollView>
            
         
   
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
)(EBookstudent);
