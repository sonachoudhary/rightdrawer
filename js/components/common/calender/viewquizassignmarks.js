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
  Input
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
import  Footer  from "../../../components/footer";
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
class Viewquizassignmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       data2:[{month:'jan'},{month:'Feb'},{month:'March'},{month:'April'},{month:'May'},{month:'june'},{month:'july'},{month:'Aug'},{month:'Sep'},{month:'Oct'},{month:'Nov'},{month:'Dec'}],
       
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      question:[],
      marks:0,
      totalmarks:0,
      Studentid:'',
      answerArr:[],
      showchecked:[]
    }
  }

 componentDidMount() {
  console.log(this.props.jwtAccessToken,'access token')
  this._retrivedata();
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
  _retrivedata(){
     const Studentid=SyncStorage.get('Studentid');
     this.setState({Studentid:Studentid}) 
     const marks=SyncStorage.get('marks'); 
      const assignmentid=SyncStorage.get('paperid')
     this.setState({marks:marks})
     
     fetch(`${config.serverSideUrl}/studentpapersubmition/${assignmentid}/${Studentid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
            
            if(data.error && data.error.message=="Token Expired"){
           dispatch(loginfail(data))
         
            
        }else if(data){
                var gettotal = 0;
                var getdata = data.questions;
                 for(var i=0; i<getdata.length;i++){
                     if(getdata[i].type==true){ 
                        for(var j=0; j< getdata[i].options.length;j++){
                          var setitem = getdata[i].options[j];
                          if(setitem.id==setitem.studentans && setitem.iscorrect==true){
                              gettotal = gettotal+getdata[i].answer.marks;
                              this.setdataanswers(setitem.questionid,getdata[i].answer.marks);
                             // console.log('answermarks',getdata[i].answer.marks);
                              //console.log('questionid',setitem.questionid);
                          }
                        }
                    }else {
                      if(getdata[i].answer!=null){
                        gettotal = gettotal+ getdata[i].answer.marks;
                      }
                    }
                 }
                 //item.answer.marks
                 console.log('data',data)
                 this.setState({question: data });
                 this.setState({totalmarks: gettotal });
              }
         })
        .catch(e => {

                 
        });

  }
   savedata(){
     // alert('assignment saved successfully')
    const paperId= SyncStorage.get('paperid');
    var bodyData = {};
    bodyData.totalmarks = this.state.totalmarks;
    bodyData.studentid = this.state.Studentid;
    bodyData.paperid = paperId;
    bodyData.questions = this.state.answerArr;
    console.log('bodyData',bodyData);
    
    fetch(`${config.serverSideUrl}/paper/result/create`, {
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
            
            console.log('bodyData',data);
            if(data.status==true){
              this.resultstaus();
            }else {
              
              //Actions.CustomerHome();
               alert(data.message)
            }
            
         })
        .catch(e => {
          console.log(e,'errerr')
            this.resultstaus();
            //alert('Assigned marks not possible',e)
            
        });

  }

  resultstaus(){
    const paperId= SyncStorage.get('paperid');
    console.log('aasa',paperId);
     console.log('this.state.Studentid',this.state.Studentid);
    fetch(`${config.serverSideUrl}/resultstatusupdate2/${paperId}/${this.state.Studentid}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
        })
        .then(resp => resp.json())
        .then(data => {
          alert('Marks Assigned successfully')
            console.log('aasa',data);
            Actions.Quizdashboard();  
         })
        .catch(e => {

        });
  }


  renderItem2 = ({item, index}) => {
    console.log(item,'itme')
    return (
      <View style={{margin:20,backgroundColor:'#ffffff',flex:1, width:deviceWidth-30, borderRadius:10}}>
      <View style={{backgroundColor:'#ffffff', borderRadius:10,padding:10}}>
                    <Text style={{ color:"#000", fontSize:15, marginLeft:10,fontWeight:'bold'}}> {item.question}? </Text>
                   {item.options!=null &&
                   <View style={{margin:5,}}>
                   <FlatList
                   data={item.options}
                   extraData={this.state}
                   renderItem={this.renderoptions}
                   />
                   </View>
                   }
                   {item.answer!=null &&
                   <View>
                     <Text style={{marginLeft:10,color:'#000'}}>{item.answer.answer}</Text>
                   </View>
                 }

                 
                   <View style={{flexDirection:'row',justifyContent:'flex-start',marginRight:10,padding:10}}>
                      { item.answer!=null ?
                        <Text>Marks Obtain:{item.answer.marks}</Text>

                      :
                        <Text>Marks Obtain:0</Text>
                      }
                     </View>
                 
                 <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:10,padding:10}}>
                 {item.type==false &&
                  <Text>Marks:</Text>
                  }
                  
                  {item.type==false &&
                     <View style={{width:50,height:20,backgroundColor:'#e6e6e6',aliginItems:'center'}}>
                     <TextInput 
                         placeholder='marks'
                         name={item.id}
                         style={{fontSize:12,width:'100%',paddingVertical:0,paddingLeft:5}} 
                         onBlur={(event) => this.setanswers(item.id)}
                         onChangeText={(text) => this.setState({getans: text})}
                         value={item.marks}
                      />
                      </View>

                   }
                 </View>

          </View>            
      </View>        
    )
  };
  
  setdataanswers(qusid,marks){
      var getans = {"questionid":qusid,"marks":parseFloat(marks),"obtained":parseFloat(marks)}
      this.state.showchecked.push(qusid);
      selectedAnsdata = this.state.answerArr;
      selectedAnsdata.push(getans);
      selectedAnsdata.reverse();
      var getunique = this.getUnique(selectedAnsdata,'questionid');
      this.setState({answerArr:getunique})
      var sum = 0;
      for( var i = 0; i < getunique.length; i++ ){
          sum += parseFloat(getunique[i]['marks']);
      }
      this.setState({totalmarks:sum})
  }

  setanswers(qusid){
      var getans = {"questionid":qusid,"marks":parseFloat(this.state.getans),"obtained":parseFloat(this.state.getans)}
      this.state.showchecked.push(qusid);
      selectedAnsdata = this.state.answerArr;
      selectedAnsdata.push(getans);
      selectedAnsdata.reverse();
      var getunique = this.getUnique(selectedAnsdata,'questionid');
      this.setState({answerArr:getunique})
      var sum = 0;
      for( var i = 0; i < getunique.length; i++ ){
          sum += parseFloat(getunique[i]['marks']);
      }
     // this.setState({totalmarks:sum})
  }

   getUnique(arr, index) {
          const unique = arr
               .map(e => e[index])

               // store the keys of the unique objects
               .map((e, i, final) => final.indexOf(e) === i && i)

               // eliminate the dead keys & store unique objects
              .filter(e => arr[e]).map(e => arr[e]);      

           return unique;
    }


   renderoptions=({item,index})=>{
    console.log(item,'rgt answere')
    if(index==0){
      value="A."
    }else if(index==1){
      value="B."
    } else if(index==2){
      value="C."
    }else if(index==3){
      value="D."
    }
    //this.setdataanswers();
    return(
             <View style={{marginTop:5,padding:5,}}>
             <View style={{flexDirection:'row'}}>
             <Text> {value}{item.optionvalue} </Text>
             {item.id==item.studentans &&
                    
                        <View>
                        {item.iscorrect==true ?
                            <Image                      
                                source={require("../../../../assets/images/righticon.png")}
                                style={{ width:25, height: 25,left:3 ,borderRadius:20,}}
                              /> 
                          :
                           <Image                      
                              source={require("../../../../assets/images/wrongicon.png")}
                              style={{ width:25, height: 25,left:3 ,borderRadius:20,}}
                            /> 
                        }
                        </View>
                            
                      
                    }
                    {item.id!=item.studentans &&
                      <View>
                      {item.iscorrect==true &&
                      <Text> Correct Answere :{item.optionvalue}</Text>
                    }
                      </View>
                    }


              </View>
              </View>
      )

   }
  render() {

    return (
      <Container style={{ backgroundColor:rgb(237,204,202)}}>
        
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent onPress={()=>Actions.Viewquiz()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
              <Text style={styles.textheadingnewdata}> Check Assignment</Text>                           
            </Button>
           
            </View>
          
        <Content style={{ backgroundColor:rgb(237,204,202),marginBottom:10}}>
              
              
                 <View style={{}}>
                  <FlatList
                  data={this.state.question.questions}
                   extraData={this.state}
                   renderItem={this.renderItem2}
                   />
                </View>
                 <View style={{flexDirection:'row',justifyContent:'center',padding:20}}>
                  <Text style={{marginLeft:5}}> Total Given Marks: {this.state.totalmarks}</Text>
                 
                 
                 
                 </View>
                <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center',width:deviceWidth}} onPress={() => this.savedata()}>
                         <View style={{backgroundColor:'#470B63',margin:10,borderRadius:5,justifyContent: 'center',alignItems: 'center'}}>
                         <Text style={{color:'#fff',padding:10}}> Assign Marks </Text>                            
                         </View>
                </TouchableOpacity>
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
)(Viewquizassignmarks);
