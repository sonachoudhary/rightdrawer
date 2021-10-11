import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler,TextInput} from "react-native";
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
Textarea,
  Input,
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep1 } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import SyncStorage from 'sync-storage';
const XDate = require('xdate');
import  Footernew  from "../../../components/footernew";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import config from "../../../../config.js";

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,   
      
  };
}
class Paperdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      papers:[],
      questions:[],
      selectedAns:[],
      showchecked:[],
      showselectedqus:[],
      getans:'',
      seletedImg:''
    }
  }
componentDidMount() {
    this.getpaperdetails();
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  getpaperdetails(){
 
    const paperId= SyncStorage.get('paperId');
    fetch(`${config.serverSideUrl}/paperassignment1/${paperId}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
        })
        .then(resp => resp.json())
        .then(data => {
            
            if(data.status!=false){
                this.setState({papers:data.paper});
                this.setState({questions:data.questions});
            }
         })
        .catch(e => {
                
        });
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  
  selectedanswers(answerid,questionsid){
      selectedAnsdata = this.state.selectedAns;
      var getans = {"questionid":questionsid,"type":1,"optionid":answerid}
      if(this.state.showchecked.includes(answerid) == true){
        this.state.showchecked.pop(answerid);
        selectedAnsdata.pop(getans);
        this.setState({selectedAns:selectedAnsdata})
      }else {
        this.state.showchecked.push(answerid);
        selectedAnsdata.push(getans);
        this.setState({selectedAns:selectedAnsdata})
      }
      
  }
  
  
  
  renderItem1 = ({item, index}) => {
    
    return (
      <View>
        <TouchableOpacity onPress={ ()=> this.selectedanswers(item.id,item.questionid) }>
          { this.state.showchecked.includes(item.id) == true ?
          <View style={{marginLeft:30,marginRight:30,borderRadius:20,flexDirection:'row',marginTop:10}}>
            <View style={{backgroundColor:'#fff',width:40,height:40,borderRadius:20,justifyContent:'center',alignItems:'center',margin:5}}>
              { index==0 && <Text style={{fontSize:18,color:'#000'}}>A</Text> }
              { index==1 && <Text style={{fontSize:18,color:'#000'}}>B</Text> }
              { index==2 && <Text style={{fontSize:18,color:'#000'}}>C</Text> }
              { index==3 && <Text style={{fontSize:18,color:'#000'}}>D</Text> }
              { index==4 && <Text style={{fontSize:18,color:'#000'}}>E</Text> }
            </View>
             <Text style={{ color:"#000", fontSize:18,marginTop:10,marginLeft:10}}> {item.optionvalue} </Text>
          </View>
          :
          <View style={{marginLeft:30,marginRight:30,borderRadius:20,flexDirection:'row',marginTop:10}}>
            <View style={{backgroundColor:'#fff',width:40,height:40,borderRadius:20,justifyContent:'center',alignItems:'center',margin:5}}>
              { index==0 && <Text style={{fontSize:18,color:'#000'}}>A</Text> }
              { index==1 && <Text style={{fontSize:18,color:'#000'}}>B</Text> }
              { index==2 && <Text style={{fontSize:18,color:'#000'}}>C</Text> }
              { index==3 && <Text style={{fontSize:18,color:'#000'}}>D</Text> }
              { index==4 && <Text style={{fontSize:18,color:'#000'}}>E</Text> }
            </View>
             <Text style={{ color:"#000", fontSize:18,marginTop:10,marginLeft:10}}> {item.optionvalue} </Text>
          </View>
        }
        </TouchableOpacity>
        </View>
      )
  }


 renderItem = ({item, index}) => {
    
    return (
           <View style={{  backgroundColor:'#ffffff', borderRadius:10, width:deviceWidth-30,padding:10,marginTop:10,}}>
             <View style={{marginTop:30, paddingBottom:15, flexDirection:'row',width:deviceWidth-30,}}>
                <Text style={{ color:"#000", fontSize:16, marginLeft:30}}>({index +1 }/{this.state.questions.length})</Text>
                <Text style={{ color:"#000", fontSize:14, marginLeft:deviceWidth-200, justifyContent:'flex-end'}}>Mark: {item.marks}</Text>
              </View>
               <Text style={{ color:"#000", fontSize:20, marginLeft:10,fontWeight:'500',marginTop:10}}>{item.question}</Text>
           { item.type == true ?
              <View>
                  <FlatList
                     style={{ margin:10}}
                     data={item.options}
                     extraData={this.state}
                     renderItem={this.renderItem1}
                  />
              </View>
              :
               <View style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                   
                   { this.state.seletedImg!="" &&
                    <View style={{position:'absolute',zIndex:3,right:80,bottom:10,marginTop:20}}>
                    <TouchableOpacity style={styles.sendButton1} onPress={() => this.removeimg()}>
                    <View>
                         <Image                      
                            source={{ uri: this.state.seletedImg }}
                            style={{ width:50, height: 50,marginLeft:10, borderRadius:10 }}
                         />
                         </View>
                       </TouchableOpacity>
                    </View>
                  }
                  
                </View>
              }
           </View>
    )
  };
  
   
  render() {
    

    return (
      <Container style={{backgroundColor: "#ffd3ca"}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20, width:deviceWidth-50}}>
            <Button transparent onPress={() => Actions.Paper()} style={{width:deviceWidth-150}}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
              <Text style={styles.textheadingnewdata}> {this.state.papers.title}</Text>                           
            </Button>
             
            </View>
          
        
        <Content style={{ backgroundColor: "#ffd3ca"}}>
              <View>
              <FlatList
                   style={{ margin:10}}
                   data={this.state.questions}
                   extraData={this.state}
                   renderItem={this.renderItem}
              />
             </View>
       </Content>
       
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
)(Paperdetails);
