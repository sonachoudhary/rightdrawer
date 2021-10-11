import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler,TextInput,Alert,Keyboard} from "react-native";
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
    userid:state.driver.user.studentlogin.studentid,   
  };
}
class Quiztwo extends Component {
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
      selQus:[],
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
 
    const paperId= SyncStorage.get('paperid');
    fetch(`${config.serverSideUrl}/student/assignment/${paperId}`, {
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
    if(this.state.selQus.includes(questionsid) == true){
          selectedAnsdata = this.state.selectedAns;
          var getans = {"questionid":questionsid,"type":1,"optionid":answerid}
          if(this.state.showchecked.includes(answerid) == true){
            this.state.showchecked.pop(answerid);
            this.state.selQus.pop(questionsid);
            selectedAnsdata.pop(getans);
            this.setState({selectedAns:selectedAnsdata})
          }else {
            alert('Only one option can be selected, please unseleted previous one');
          }

    }else {
          this.state.selQus.push(questionsid);
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
  }

  gettextarea(questionsid){
     if(this.state.selQus.includes(questionsid) == true){ } else {
      this.state.selQus.push(questionsid);
      var getans = {"questionid":questionsid,"type":0,"answer":this.state.getans,"file":[] }
      selectedAnsdata = this.state.selectedAns;
      //selectedAnsdata.pop(getans);
      selectedAnsdata.push(getans);
      this.setState({selectedAns:selectedAnsdata})
      
    }
  }

  showConfirmDialog() {
    Keyboard.dismiss();
    return Alert.alert(
      "Are your sure?",
      "you want to submit this assignment?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            this.savequs();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  savequs(){
     // alert('assignment saved successfully')
    
    const paperId= SyncStorage.get('paperid');
    var bodyData = {};
    var questions=[];
    bodyData.studentid = this.props.userid;
    bodyData.paperid = paperId;
    bodyData.questions = this.state.selectedAns;
    
      fetch(`${config.serverSideUrl}/student/assignment/submit`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
          body: JSON.stringify(bodyData)
        })
        .then(resp => resp.json())
        .then(data => {
            
            if(data.status==true){
              alert('Assignment submitted successfully')
              Actions.BarberHome();
            }else {
              alert('Something went wrong')
            }
            
         })
        .catch(e => {
                  
        });
      
  }

  _pickImage() {
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
        //alert(response.uri );
        if(response.uri!=undefined){
          this.setState({ seletedImg:response.uri })
          //this._sendFileMessage(response.uri);
        }
    });
  }
  removeimg(){
     this.setState({ seletedImg:'' })
  }
  renderItem1 = ({item, index}) => {
    
    return (
      <View>
        <TouchableOpacity onPress={ ()=> this.selectedanswers(item.id,item.questionid) }>
          { this.state.showchecked.includes(item.id) == true ?
          <View style={{marginLeft:30,marginRight:30,borderRadius:60,flexDirection:'row',marginTop:10,backgroundColor:'green',}}>
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
          <View style={{marginLeft:30,marginRight:30,borderRadius:20,flexDirection:'row',marginTop:10,}}>
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
               <View style={{marginTop:10,justifyContent:'center',alignItems:'center',marginBottom:10}}>
                  <TextInput multiline={true}
                      numberOfLines={10}
                      onBlur={() => this.gettextarea(item.id)}
                      onChangeText={(text) => this.setState({getans: text})}
                      placeholder="Write here" 
                      style={{backgroundColor:'#fff',
                        elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.2,
                        shadowRadius: 1,paddingLeft:30,paddingTop:10, width:'85%', height:150,paddingBottom:10
                  }} /> 
                  
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
                  <View style={{position:'absolute',zIndex:3,right:30,bottom:10,marginTop:20}}>
                      <TouchableOpacity style={styles.sendButton1} onPress={() => this._pickImage()}>
                      <View>
                         <Image
                            source={require("../../../../assets/images/attachment.png")}
                            style={{ width:28, height: 28 }}
                          />
                          </View>
                      </TouchableOpacity>
                  </View>
                </View>
              }
           </View>
    )
  };
  
   
  render() {
    

    return (
      <Container style={{backgroundColor: "#ffd3ca"}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20, width:deviceWidth-50}}>
            <Button transparent onPress={() => Actions.Teacherquiz()} style={{width:deviceWidth-150}}>
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
             <View style={{ width:deviceWidth/2, justifyContent:'center',textAlign:'center',paddingLeft:deviceWidth/3,paddingBottom:10}}>
                <Button style={{borderRadius:30,height:40,width:120,marginTop:10}} onPress={() => this.showConfirmDialog()}>
                      <Text style={{ color:"#000000", fontSize:18, marginLeft:15,fontWeight:'bold'}}>
                      Submit
                    </Text>                        
                </Button>
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
)(Quiztwo);
