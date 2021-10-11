import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler,Modal,Alert} from "react-native";
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
  Input,Picker
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep1 } from "../../../actions/common/booking";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import { teacherhomeworks} from "../../../actions/common/signin";
import SyncStorage from 'sync-storage';
const XDate = require('xdate');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import  Footer  from "../../../components/footer";

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
     userid:state.driver.user.teacherlogin.teacherid,    
    userType: state.driver.user.userType,
    homework:state.driver.user.homework, 
     schoolid:state.driver.user.teacherlogin.schoolid,   
  };
}
class Quizdashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homework:this.props.homework,
      
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      showmodal:false,
      subject:'',
      chapter:'',
      resulthisory:'',
      homeworkdata2:[],
      subjectname:[],
      name:'',
    }
  }

 componentDidMount() {

  this.allsubjectdata();
     var that = this;
     
        
       fetch(`${config.serverSideUrl}/getpapersubmitions/${that.props.userid}`, {
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
                  that.setState({resulthisory:data});
                 
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


  getUnique(arr, index) {


          const unique = arr
               .map(e => e[index])

               // store the keys of the unique objects
               .map((e, i, final) => final.indexOf(e) === i && i)

               // eliminate the dead keys & store unique objects
              .filter(e => arr[e]).map(e => arr[e]);      

           return unique;
    }

    allsubjectdata(){
       var that = this;
        
        fetch(`${config.serverSideUrl}/teacherallsubjects/${this.props.userid}`, {
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
            
                  that.setState({allsubassignment:data});
                  var getunique = that.getUnique(data,'class');
                  
                  that.setState({homework:data});
                   that.setState({homeworkdata2:getunique});
                  that.allchapter();
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
 opensubject(classid,subjectid){
  // alert(subjectid)
   SyncStorage.set('classid', classid);
   SyncStorage.set('subjectid', subjectid);
  Actions.Subject();
 }
 showmodal(){

     this.setState({
       showmodal:true
     })
    }

viewscreen(id){
  SyncStorage.set('paperid',id);
   SyncStorage.set('taken',1);
  Actions.Viewquiz()
}
rendersubject = ({item, index}) => {
   var uri= 'http://wesmart.in/backend/public/files/subject/'
        
          // var result = item.icon.replace(/ /g, "%20");
                   return (
                        <TouchableOpacity onPress={()=>this.opensubject(item.classId,item.subjectId)}>
                          <View style={styles.Smallbox}>
                         <Image source={{ uri:item.icon}} style={{width:55,height:55}} /> 

                          </View>
                          <View style={{marginLeft:23}}>
                               <Text style={styles.textheading}>{item.subject}</Text>  
                               <Text style={styles.subtext}>{item.class}</Text> 
                          </View> 
                          </TouchableOpacity>         
                        )};

        nexdata(){
          SyncStorage.set('taken',0);
          Actions.Result()
        }
 renderItem = ({item, index}) => {
    
    var start=moment(item.start).format('hh:mm-dd')
    var color="#FFCB7F"
    if(index/2==0){
      color:''
    }
    return (
    <View>
    { item.Taken==1 &&
     <TouchableOpacity onPress={()=>this.nexdata()} style={{backgroundColor:'#FFCB7F',margin:10,padding:10,width:154.13,height:152,borderRadius:10}}>
           
           <Text style={{fontSize:11,marginLeft:10,marginTop:10,color:'gray'}}>{start}</Text>  
           <Text style={{fontSize:14,fontWeight:'bold',color:'#000',marginLeft:10,}}>{item.title}</Text> 
            <Text style={{fontSize:11,marginLeft:10,marginTop:10,color:'gray'}}>class:{item.class}</Text> 
            <Text style={{fontSize:11,marginLeft:10,marginTop:10,color:'gray'}}>{item.desc}</Text>  
        </TouchableOpacity>  
        }
        </View>       
    )
  };
  renderItemdata = ({item, index}) => {
    
     var start=moment(item.start).format('hh:mm-dd')
      SyncStorage.set('Taken',item.Taken);
    return (
    <View>
    { item.Taken==1 &&
     <TouchableOpacity onPress={()=>this.viewscreen(item.id)} style={{backgroundColor:'#FEE4C9',padding:10,margin:5,width:120.13,height:'auto',borderRadius:10}}>
           
           <Text style={{fontSize:11,marginLeft:10,marginTop:10,color:'gray'}}>{start}</Text>  
           <Text style={{fontSize:14,fontWeight:'bold',color:'#000',marginLeft:10,}}>{item.title}</Text> 
            <Text style={{fontSize:11,marginLeft:10,marginTop:10,color:'gray'}}>{item.class}</Text> 
            <Text style={{fontSize:11,marginLeft:10,marginTop:5,color:'gray'}}>{item.desc}</Text>  
        </TouchableOpacity>   

    }
    </View>
    )
  };
 
  

  subjectselectlist2(itemValue,itemPosition){
     
    var mynewarray=itemValue.split(',')
    
     var classid=mynewarray[1];
     var subjectid=mynewarray[2];

     SyncStorage.set('classid',classid);
     SyncStorage.set('subjectid',subjectid);
     this.setState({subject:itemValue})
     
    var that = this;
        fetch(`${config.serverSideUrl}/homework/TeacherSubjectByClass/${that.props.userid}/${classid}`, {
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
                  var getunique = this.getUnique(data,'name');
                  that.setState({name:getunique.name})
                  that.setState({subjectname:getunique});
              }
         })
        .catch(e => {
               
        });

        
  }

 subjectselectlist3(itemValue){
  
  var newvalue=itemValue.split(",")
     var namevalue=newvalue[0];
     var newid=newvalue[1];
     
     var mynewarray=this.state.subject.split(',')
    
     var classid=mynewarray[1];
     var subjectid=mynewarray[2];
       this.setState({name:itemValue})
    
     var that = this;
    fetch(`${config.serverSideUrl}/question/subject/${that.props.schoolid}/${classid}/${newid}`, {
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
              var getunique = that.getUnique(data,'chapter');
              
                  that.setState({chapterdata:getunique});
                 
              }
         })
        .catch(e => {

                  
        });
 }
  
  chapterselectlist(itemValue){
    
    var mynewarray=itemValue.split(',')
     var chapterid=mynewarray[1];
    this.setState({chapter:itemValue})
     SyncStorage.set('chapterid', chapterid);
      
    

  }
  nextscreen(){
      this.setState({showmodal:false})
      Actions.Selectquestions();
  }
  
   
  render() {
    

    return (
      <Container style={{ backgroundColor:'#ffffff'}}>
        <View style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}>
          <View style={{flexDirection:'row',}}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> Assignments</Text>
            </View>
          </View>
        <Content style={{ backgroundColor: "#F7F8FB",marginBottom:120}}>
              
             
              
                 <View style={{backgroundColor:'#FFFEFE'}}>
                 <Text style={styles.textheading,{color:'#000',marginLeft:20,paddingTop:20,paddingBottom:10}}>My Subjects</Text>
                   <View style={{flexDirection:'row', marginLeft:10, borderBottomWidth:1, borderColor:'lightgray' }}>
                                {this.state.homework &&  
                                   <FlatList
                                    horizontal={true}
                                    style={{ margin:10}}
                                    data={this.state.homework}
                                    extraData={this.state}
                                     renderItem={this.rendersubject}
                                   />
                                } 
                        </View> 
              </View>
              <View style={styles.uncheckassignmentsview}>
               <Text style={styles.uncheckassignments}>Create Assignments</Text>
                <View style={{flexDirection:'row',marginLeft:20}}>
                 <TouchableOpacity style={styles.select2} onPress={()=>this.showmodal()}>
                <Image                      
                      source={require("../../../../assets/images/Group_17228.png")}
                     style={styles.image}
                    />
                    <Text style={{ color:"#000", fontSize:13, marginLeft:10,fontWeight:'600'}}>Create Paper</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.select} onPress={()=>Actions.Paper()}>
                <Image                      
                      source={require("../../../../assets/images/Group_17229.png")}
                      style={styles.image}
                    />
                    <Text style={{ color:"#000", fontSize:13, marginLeft:10,fontWeight:'600'}}>View Paper</Text>
                 </TouchableOpacity>

                </View>
              </View>

               { /* <View style={{borderTopWidth:1,borderColor:'#e6e6e6',backgroundColor:'#FFFEFE',marginTop:0,padding:5}}>
                  <View style={styles.result}>
                      <Text style={styles.resultview}> Result History</Text>
                      <Text style={styles.allview}>View All</Text>
                  </View>
                <View style={styles.flatlistview}>
                <FlatList
                   horizontal={true}
                   style={{ margin:10}}
                   data={this.state.resulthisory}
                   extraData={this.state}
                   renderItem={this.renderItem}
                  />
               </View>
               </View> */}

               <View style={styles.uncheckassignmentsview}>
                  <Text style={styles.uncheckassignments}>Result History</Text>
                  <FlatList
                  horizontal={true}
                   style={{ margin:10}}
                   data={this.state.resulthisory}
                   extraData={this.state}
                   renderItem={this.renderItemdata}
                   />
              </View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}
                onRequestClose={() => {
                
                this.setState({showmodal:false});
               }}
            >
            <View style={{backgroundColor: commonColor.brandSecondry, backgroundColor: 'rgba(52, 52, 52, 0.1)' }}>
              <View style={{marginTop:110, height:'auto', borderRadius:30,  borderColor:'#000', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8, shadowRadius: 1,backgroundColor: commonColor.brandSecondry, }}>
             <View style={{marginTop:'10%'}}>
                 
               <View style={{borderColor:'gray',borderWidth:1,marginLeft:'2%',marginRight:'8%',borderRadius:5}}>
              <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={{ marginLeft: 10, color: '#000000',}}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
                        selectedValue={this.state.subject}  
                        onValueChange={(itemValue) =>this.subjectselectlist2(itemValue)}  
                    >  
                    <Picker.Item label={'Select Class'} value='' style={{color:'#000000'}}  />
                   {this.state.homeworkdata2 && this.state.homeworkdata2.map(function(item,index){
                    
                    return(
                       <Picker.Item label={item.class} value={item.class+","+item.classId+","+item.subjectId} style={{color:'#000000'}} />
                      )
                  })}
                   
                </Picker>
                </View>
                 <View style={{borderColor:'gray',borderWidth:1, marginTop:10,marginLeft:'2%',marginRight:'8%',borderRadius:5}}>
              <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={{ marginLeft: 10, color: '#000000',}}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
                        selectedValue={this.state.name}  
                        onValueChange={(itemValue) =>this.subjectselectlist3(itemValue)}   
                    >  
                    <Picker.Item label={'Select Subject'} value='' style={{color:'#000000'}}  />
                   {this.state.subjectname && this.state.subjectname.map(function(item,index){
                    
                    return(
                       <Picker.Item label={item.name} value={item.name+","+item.id} style={{color:'#000000'}} />
                      )
                  })}
                   
                </Picker>
                </View>
                <View style={{borderColor:'gray',borderWidth:1,marginLeft:'2%',marginRight:'8%',borderRadius:5,marginTop:10}}>
                <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={{ marginLeft: 10, color: '#000000',}}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
                        selectedValue={this.state.chapter}  
                        onValueChange={(itemValue, itemPosition) => this.chapterselectlist(itemValue)}  
                    >  
                    <Picker.Item label={'Select Chapter'} value='' style={{color:'#000000'}}  />
                   {this.state.chapterdata && this.state.chapterdata.map(function(item,index){
                    
                    return(
                       <Picker.Item label={item.chapter} value={item.chapter+","+item.chapterid} style={{color:'#000000'}} />
                      )
                  })}
                   
                </Picker>
                </View>
                <TouchableOpacity onPress={()=>this.nextscreen()} style={{ borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'#470B63',height:50,marginBottom:40,marginLeft:'15%',marginRight:'15%',marginTop:15}}>
                    <Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>Select Questions</Text>
                </TouchableOpacity>
              
                  
          </View>

        </View>
        </View>
      </Modal>
             
               
       </Content>
       <Footer />
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
     teacherhomeworks:(data,userid)=> dispatch(teacherhomeworks(data,userid)),
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Quizdashboard);
