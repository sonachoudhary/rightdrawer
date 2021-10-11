import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
import ImagePicker from "react-native-image-picker";
import config from "../../../../config.js";
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
import SyncStorage from 'sync-storage';

import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep1 } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import Swipeout from 'react-native-swipeout';
import {deletepaper} from "../../../actions/common/signin";
const XDate = require('xdate');
import  Footer  from "../../../components/footer";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,  
    schoolid:state.driver.user.teacherlogin.schoolid,  
  };
}
class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      classid:'',
      subjectid:'',
       paperdata:[],
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined
    }
  }
componentDidMount() {
   this.retriveid();
       var that = this;
     
        
       fetch(`${config.serverSideUrl}/papers`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+that.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
             
            if(data!=null){
                  that.setState({paperdata:data});
                 
              }
         })
        .catch(e => {
     
        });
      

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
  retriveid(){
    const classid=SyncStorage.get('classid');
    const subjectid=SyncStorage.get('subjectid');
    this.setState({classid:classid});
    this.setState({subjectid:subjectid})
  }
  

  delete(deleteid){

      this.props.dispatch(deletepaper(this.props.jwtAccessToken,deleteid)); 

      var that = this;
       setTimeout( function(){
        alert('Paper deleted successfully!')
        fetch(`${config.serverSideUrl}/papers`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+that.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
             
            if(data!=null){
                  that.setState({paperdata:data});
                 
              }
         })
        .catch(e => {

                 
        });

       // that.props.teacherhomeworks(that.props.jwtAccessToken,that.props.userid)
      },1500)
  }
 
 
nextscreen(id){ 
  SyncStorage.set('paperId',id);
  Actions.Paperdetails()
}
 
  renderItem2 = ({item, index}) => {

     
     var start=moment(item.start).format("hh:mm")
      var end=moment(item.end).format("hh:mm")
    const swipeoutBtns = [
              
              {
                text: 'Delete', 
                backgroundColor:'#c53e3e',
                color:'#FFFFFF',
                onPress: () => { this.delete(item.id) }
              }
             ]
    return (
      <TouchableOpacity style={{margin:10}} >
              <Swipeout right={swipeoutBtns}  autoClose='true' backgroundColor= 'transparent'> 
                    <TouchableOpacity style={{backgroundColor:'#fff', borderColor:'gray',
                           elevation: 5,shadowColor: '#e6e6e6',
                           shadowOffset: { width: 0, height: 3 },
                           shadowOpacity: 1.1, shadowRadius: 1,
                           marginLeft:20,marginRight:20,borderRadius:10, padding:20 }}
                            onPress={()=>this.nextscreen(item.id)}
                           >

                        <Text style={{ color:'#000000',fontSize:18,paddingLeft:10}}>{item.title} </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                           <Text>start:{start}</Text>
                           <Text>end:{end}</Text>
                        </View>
                    </TouchableOpacity>
               </Swipeout>
      </TouchableOpacity>        
    )
  };
  
   
  render() {
   

    return (
      <Container style={{ backgroundColor:'#ffffff'}}>
         <Header style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}>
          <Left>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> View Paper</Text>
            </View>
          </Left>
          <Right>
               
          </Right>    
        </Header>
        <Content style={{ backgroundColor:rgb(237,204,202)}}>
            <View>
                  <FlatList
                  data={this.state.paperdata}
                   extraData={this.state}
                   renderItem={this.renderItem2}
                   />
          </View>
             
       </Content>
     
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    deletepaper:(data,deleteid)=>dispatch(deletepaper(data,deleteid)),
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Paper);
