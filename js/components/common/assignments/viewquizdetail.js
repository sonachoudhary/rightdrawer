import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler,Linking} from "react-native";
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
import { setBookingStep1 } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import  Footer  from "../../../components/footer";
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import SyncStorage from 'sync-storage';
import config from "../../../../config.js";

const XDate = require('xdate');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,    
  };
}
class Viewquizdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       data:[{Time:'14:00-mon',Title:'Assignments title'},{Time:'14:00-mon',Title:'Assignments title'},{Time:'14:00-mon',Title:'Assignments title'},{Time:'14:00-mon',Title:'Assignments title'},],
       
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      homework_title:'',
    }
  }

  callTimeScreen() {
    
    if(this.state.selectedDate && this.state.selectedDate >= moment().format('YYYY-MM-DD')){
      this.setState({ error: false })
      this.props.setBookingStep1(moment(this.state.selectedDate).format('YYYY-MM-DD'))  
    } else {
      this.setState({ error: true })
    }    
  }
  
  setDateFunction(dateString){
    this.setState({ selectedDate: dateString })
  }

  selectedMonth(months) {
    
    this.setState({ selectedCal:months[0].dateString })
  }

componentDidMount() {
     this.getdata();
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
  

  
 
 getdata(){

  const homeworkid =  SyncStorage.get('homeworkid');
   const studentid = SyncStorage.get('studentid');
   const title=SyncStorage.get('title');
   this.setState({homework_title:title})
 
     fetch(`${config.serverSideUrl}/homework/sumbition/${homeworkid}/${studentid}`, {
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
            console.log(data,'check homework')
            this.setState({submitions:data})
          }
        })
        .catch(e => {
                
        });
        //this.props.bysubjectassignmentslist(this.props.jwtAccessToken,this.state.assignmentsid)
     
  } catch (error) {
   
  }
  
 
  
   
  render() {
     const homeworkid =  SyncStorage.get('homeworkid');
     const url=`https://wesmart.in/backend/public/files/homework/${homeworkid}/submition/`
     
    return (
      <Container>
       
          <View style={{flexDirection:'row',}}>
            <Button transparent onPress={() => Actions.Viewquizassignments()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> View Homework</Text>
            </View>
          
        <Content style={{  backgroundColor:'#ffffff'}}>
              
          
           <View style={{width:'90%',margin:10,borderRadius:10,marginLeft:20,padding:10}}>
                <Text style={styles.subtextheead}> {this.state.homework_title}</Text>
                   
           </View>
           
              
           
           {this.state.submitions &&
           <View style={{backgroundColor:'#fff',marginTop:0,margin:20,backgroundColor:'#F6F8F8',borderRadius:10}}>
                <Text style={{padding:20, lineHeight:25,fontSize:15, color:'#000000'}}>
                 {this.state.submitions.homework}
                </Text>
            </View> 
          }

          { this.state.submitions && this.state.submitions.files.length>0 && this.state.submitions.files.map((item)=>{
            console.log(url+item.file,'check console')
            return(
                  <TouchableOpacity onPress={() => Linking.openURL(url+item.file)}>
                  <Image source={{uri:url+item.file}}
                               style={{ width:deviceWidth-100,height:deviceHeight/4,marginHorizontal: '10%'}}
                               resizeMode={'cover'}
                        />
              </TouchableOpacity>

            )
               
           })}
        
       </Content>
        <Footer />
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Viewquizdetail);
