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
import  Footernew from "../../../components/footernew";
import config from "../../../../config.js";

function mapStateToProps(state) {
  return {
        userid:state.driver.user.studentlogin.studentid,
        jwtAccessToken: state.driver.appState.jwtAccessToken,
        studentimage:state.driver.user.student,
   };
}

class Studentresult extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      data:[{subject:'hindi',internal:'20',External:'60',total:'80'},{term:'first',subject:'hindi',internal:'20',External:'60',total:'80'},{term:'first',subject:'hindi',internal:'20',External:'60',total:'80'},{term:'first',subject:'hindi',internal:'20',External:'60',total:'80'}],
      studentdetail:[],
      studentresult:[],
     };
  }
  
  componentDidMount(){
       
        this.getresult();
      
    }

  
  getresult(){
   
    fetch(`${config.serverSideUrl}/result/bystudent/${this.props.userid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
          
           if(data!=null){
              this.setState({studentdetail:data.student});
              this.setState({studentresult:data.result});
            }
         })
        .catch(e => {
                   
        });
  }
  
  renderItem3(item,index){
      return(
          <View style={{justifyContent:'space-between',flexDirection:'row'}}>
              <Text style={styles.listtextstyle}>{item.subject}</Text> 
              <Text style={styles.listtextstyle}>{item.marks}</Text> 
              <Text style={styles.listtextstyle}>100</Text> 
          </View>
      )
   }


  renderItem2(newitem,index){
    let percentage = newitem.item.obtained / newitem.item.total;
    return(
        <View> 
             <View>
                 <View style={{justifyContent:'center',alignItems:'center',justifyContent:'space-between'}}>
                       <View style={{width:deviceWidth/2,backgroundColor:'#341F54',padding:10,textalign:'center',  alignItems:'center',justifyContent:'center'}}>
                          <Text style={{color:'#fff',fontSize:17,textalign:'center', alignItems:'center',justifyContent:'center'}}> {newitem.item.name} </Text>
                       </View>
                 </View>
                  <View style={{flexDirection:'row',padding:10,backgroundColor:'#341F54',marginTop:20,height:50,alignItems:'center'}}>
                       <Text style={styles.listtextstyle2}> Subjects</Text>
                       <Text style={styles.listtextstyle21}> Marks</Text>
                  </View>
                 <View>
                  {newitem.item.resultitems.map((itemval, key) => {
                     return (
                       <View style={{flexDirection:'row'}}>
                            <Text style={styles.listtextstyle}>{itemval.subject}</Text> 
                            <View style={styles.linebar}><Text>|</Text></View>
                            <Text style={styles.listtextstyle1}>{itemval.marks}</Text> 
                        </View>
                     );
                  })}
                  </View>
                  
             </View>
             <View style={{flexDirection:'row',marginTop:10,}}>
                <View style={{backgroundColor:'#E4E4E4',width:'100%',justifyContent:'space-between',flexDirection:'row',justifyContent:'center'}}> 
                    <Text style={{color:'#000',paddingLeft:10,fontSize:17,paddingTop:10,paddingBottom:10}}> Total Marks: </Text>
                    <Text style={{color:'#000',paddingLeft:10,fontSize:17,paddingTop:10,paddingBottom:10}}>  {newitem.item.obtained} / {newitem.item.total}</Text>
                </View> 
             </View>
             <View style={{flexDirection:'row',marginTop:10}}>
                 <View style={{width:'50%',backgroundColor:'#FDCE84',justifyContent:'space-between',flexDirection:'row',height:50,alignItems:'center'}}>
                   <Text style={{color:'#000',paddingLeft:30,fontSize:17}}> Grade</Text>
                   <Text style={{color:'#000',paddingRight:30,fontSize:17}}> A</Text>
                 </View>
                <View style={{width:'50%',backgroundColor:'#341F54',justifyContent:'space-between',flexDirection:'row',height:50,alignItems:'center'}}>
                    <Text style={{color:'#ffffff',paddingLeft:10,fontSize:17}}> Percentage</Text>
                    <Text style={{color:'#ffffff',paddingRight:10,fontSize:17}}>{percentage *100}%</Text>
                </View> 
             </View>
        </View>
      )
   }

  
  render() {
     
    return(
      <Container>
        
      
            <ImageBackground  source={ require('../../../../assets/images/MaskGroup_45.png')} style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle}>
                  <View style={{marginTop:'5%'}}>
                    <Button transparent onPress={() =>Actions.pop()} style={Platform.OS === "ios" ? styles.iosbackbtn : styles.abackbtn}>
                     
                     <Icon
                      name="md-arrow-back"
                      style={{ fontSize: deviceHeight/33, color: "#FFF" }}
                    />  
                      <Text style={{color:'#FFF',fontSize:deviceHeight/35,paddingTop:10,marginLeft:30}}> Result</Text>                        
                    </Button>
                     </View>
              
            
            <View style={Platform.OS === "ios" ? styles.iosresult : styles.aresult}>
                  <View style={{ flexDirection:'row',}}>
                          <Text style={{width:'50%',color:'#000000',textAlign:'right',paddingRight:10}}>Student Name : </Text>
                          <Text style={{ fontWeight:'bold',color:'#000000',width:'50%',paddingLeft:10}}>{this.state.studentdetail.name}</Text>
                  </View>
                   <View style={{ flexDirection:'row',}}>
                          <Text style={{width:'50%',color:'#000000',textAlign:'right',paddingRight:10}}>Class section : </Text>
                          <Text style={{ fontWeight:'bold',color:'#000000',width:'50%',paddingLeft:10}}>{this.props.studentimage.class}</Text>
                  </View>
                   <View style={{ flexDirection:'row',}}>
                          <Text style={{width:'50%',color:'#000000',textAlign:'right',paddingRight:10}}>Roll Number : </Text>
                          <Text style={{ fontWeight:'bold',color:'#000000',width:'50%',paddingLeft:10}}>{this.state.studentdetail.rollno}</Text>
                  </View>
                   <View style={{ flexDirection:'row',}}>
                          <Text style={{width:'50%',color:'#000000',textAlign:'right',paddingRight:10}}>Parent Name : </Text>
                          <Text style={{ fontWeight:'bold',color:'#000000',width:'50%',paddingLeft:10}}>{this.state.studentdetail.parentname}</Text>
                  </View>
                   <View style={{ flexDirection:'row',}}>
                          <Text style={{width:'50%',color:'#000000',textAlign:'right',paddingRight:10}}>Admission number : </Text>
                          <Text style={{ fontWeight:'bold',color:'#000000',width:'50%',paddingLeft:10}}>{this.state.studentdetail.admissionnumber}</Text>
                  </View>
              </View>
             
             </ImageBackground>
             
         
        <Content>
        <View style={{marginTop:'10%',height:deviceHeight/2}}>
                <FlatList
                    data={this.state.studentresult}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    renderItem={this.renderItem2}
                  />

         </View>
       </Content>
        
         
             
         

      <View style={{ width: deviceWidth, backgroundColor:'#470B63',height: 70,flexDirection:'row', borderTopWidth:1,borderTopColor:'#470B63',justifyContent:'center', marginTop: 20, position:'absolute', bottom:0 }} >
                
                <TouchableWithoutFeedback onPress={() => Actions.Fees()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Fees() } >
                    <Image
                      source={require("../../../../assets/bottom_icon/feeblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Fees</Text>
                </View>     
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={() => Actions.chatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                   <Image
                      source={require("../../../../assets/bottom_icon/chatblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback>  

                
                <TouchableWithoutFeedback onPress={() => Actions.BarberHome()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.BarberHome() } >
                    <Image
                      source={require("../../../../assets/bottom_icon/homeblue.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback>  


                <TouchableWithoutFeedback onPress={() => Actions.Studentresult()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Studentresult() }>
                    <Image
                      source={require("../../../../assets/bottom_icon/resultgray.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Results</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.Calender()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                     <Image
                      source={require("../../../../assets/bottom_icon/attandancegray.png")}
                      style={{ width:30, height: 30  }}
                    />
                    <Text style={{fontSize:12,fontWeight:'bold', color:'#ffffff',paddingTop:5}}>Attendance</Text>
                </View>   
                </TouchableWithoutFeedback>                 
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
)(Studentresult);
