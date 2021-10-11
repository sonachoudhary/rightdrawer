import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,AsyncStorage,BackHandler} from "react-native";
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
import { bysubjectassignmentslist } from "../../../actions/common/signin";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import SyncStorage from 'sync-storage';
const XDate = require('xdate');
import  Footer  from "../../../components/footer";
import config from "../../../../config.js";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid,   
    userType: state.driver.user.userType, 
    assignments:state.driver.user.assignments, 
    renderassignments:state.driver.user.renderassignments,

  };
}
class Unviewquizassignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentsid:'',
      renderassignments:this.props.renderassignments,
      schoolid:'',
      classid:'',
      subjectid:'',
       data:[{Time:'14:00-mon',Title:'Assignments title'},{Time:'14:00-mon',Title:'Assignments title'},{Time:'14:00-mon',Title:'Assignments title'},{Time:'14:00-mon',Title:'Assignments title'},],
       
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined
    }
  }


 
   _retdata = () => {
    const homeworkid = SyncStorage.get('id');
    alert(homeworkid)
    fetch(`${config.serverSideUrl}/teacherhomeworksubmitions/${this.props.userid}/${homeworkid}`, {
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
            
            this.setState({renderassignments:data})
             
          }
        })
        .catch(e => {
                  
        });
    };
  componentDidMount() {
    this._retdata();
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
  


 
  
 
  renderItem = ({item, index}) => {
    
    
    return (
      <TouchableWithoutFeedback onPress={() => Actions.Viewquizdetail()}>
      <View style={styles.Smallbox1}>
        <View style={{ flexDirection:'row'}}>
          <View style={{marginRight:10}}>
              <Image                      
                  source={require("../../../../assets/images/iconsimg.png")}
                  style={{ width:50, height: 50}}
              /> 
          </View>
          <View style={{width:300,paddingTop:10}}>
              <Text style={styles.subtextnew}>Ravinder</Text>
              <Text style={styles.subtextnew}>Roll Number: 2853</Text>
          </View> 
        </View>       
      </View>  
      </TouchableWithoutFeedback>      
    )
  };
  
   
  render() {
     
     const Time = (this.state.renderassignments ? moment(this.state.renderassignments.start).format('hh:mm-ddd'): '')
     const Timeend=(this.state.renderassignments ?  moment(this.state.renderassignments.end).format('hh:mm-ddd'): '')
    return (
      <Container>
       <Header style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}>
          <Left>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent onPress={() => Actions.Viewassignments()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}>Homework</Text>
            </View>
          </Left>
          <Body>
          <Title> </Title>
            </Body> 
            <Right>
               <TouchableOpacity style={{backgroundColor:'#fff',borderWidth:1, borderColor:'#ffffff',width:150,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',marginRight:20}} onPress={()=>Actions.Viewquizassignments()}>
                    <Text style={{ color:'#000000'}}>submitted by</Text>
                 </TouchableOpacity>
            </Right>        
        </Header>
        <Content style={{  backgroundColor:'#ffffff'}}>
                
        
                 <View style={{backgroundColor:'#FFCB7F',width:370,margin:10,height:75,borderRadius:10,marginLeft:20,padding:10}}>
                  
                
                     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <Text style={styles.subtext}>14:30-mon</Text>
                      <Text style={styles.subtext}>Homework Title</Text>
                      </View>
                       <Text> This is my homeworks title ,details,massage</Text>
                 
                   </View>
                   {this.state.renderassignments &&
                   <Text style={styles.textheading}>{this.state.renderassignments.title}</Text>
                 }
                   
           
           
           <View style={{backgroundColor:'#fff',marginTop:0}}>
               <FlatList
                     
                       style={{ margin:10}}
                       data={this.state.data}
                       extraData={this.state}
                       numColumns={1}
                       renderItem={this.renderItem}
                   />
             
        </View> 
        
       </Content>
       <Footer />
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    bysubjectassignmentslist: (date,id) => dispatch(bysubjectassignmentslist(date,id))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Unviewquizassignments);
