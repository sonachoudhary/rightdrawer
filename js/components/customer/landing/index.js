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
  TouchableOpacity,BackHandler
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

import commonColor from '../../../../native-base-theme/variables/commonColor';

import { setActiveLogin } from "../../../actions/common/entrypage";
import { teacherhomeworks,teacherboardcaste ,getprofileteacherdata,teacherAllboardcaste,TeacherClassesList} from "../../../actions/common/signin";

import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import  Footer  from "../../../components/footer";
import SyncStorage from 'sync-storage';
import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import config from "../../../../config.js";


  
function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    user: state.driver.user,
     userid:state.driver.user.teacherlogin.teacherid,
    schoolid:state.driver.user.teacherlogin.schoolid,
    
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    username:state.driver.user.teacherinfo,
    teacherboard:state.driver.user.teacherboardcaste,
    homework:state.driver.user.homework,
    allteacherboardcaste:state.driver.user.Allboardcaste,
  };
}

class CustomerHome extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      allteacherboardcaste:[],
      teacherboard:[],
      homework:[],
      allsubassignment:[],
      loading: true,
      managehomework:[],
      value:'',
      data:[],
      allhomework:this.props.homework,
    };
    

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
    async componentDidMount(){
         this.tokenexpire();
        if(this.props.userid!=""){
           this.props.getprofileteacherdata(this.props.jwtAccessToken,this.props.userid)
            this.props.teacherhomeworks(this.props.jwtAccessToken,this.props.userid)
           //this.props.teacherboardcaste(this.props.jwtAccessToken,this.props.userid,this.props.schoolid)
           //this.props.teacherAllboardcaste(this.props.jwtAccessToken,this.props.userid,this.props.schoolid)
           this.props.TeacherClassesList(this.props.jwtAccessToken,this.props.userid)
        }
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
          if(data.error){
                     Actions.signIn();
                   dispatch(loginfail(data))
                   
                   
                   }else if(data){
                  that.setState({allsubassignment:data});
                  that.setState({homework:data});
                 }
            
            
         })
        .catch(e => {

                  
        });

         fetch(`${config.serverSideUrl}/teacherbroadcastfeeds/${this.props.schoolid}/${this.props.userid}`, {
                  method: "get",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Cookie:'token='+this.props.jwtAccessToken
                  },
                 
                })
                .then(resp => resp.json())
                .then(data => {

                  if(data.error){
                   dispatch(loginfail(data))
                   
            
                   }else if(data){
                  that.setState({teacherboard:data})
                 }
                    

               })
                .catch(e => {
                          
                });
         SplashScreen.hide();
         BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  
        
    }

     tokenexpire(){
       fetch(`${config.serverSideUrl}/teacherbroadcastfeeds/${this.props.schoolid}/${this.props.userid}`, {
                  method: "get",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Cookie:'token='+this.props.jwtAccessToken
                  },
                 
                })
                .then(resp => resp.json())
                .then(data => {

                  if(data.error && data.error.massage){
                      alert('Token Expired')
                   const email=SyncStorage.get('data:email');
                   const password=SyncStorage.get('data:password');
               
              var values:[];
              values.email=email;
              values.password=password;

               this.props.dispatch(signinAsync(values));
              }
                    

               })
                .catch(e => {
                        
                });
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

    opensubject = async (subjectname) =>{
        await AsyncStorage.setItem('subjectname',subjectname);
        Actions.Homework2()
    }

    quizview = async (id) =>{
          try {
            await AsyncStorage.setItem('id',id);
            Actions.Viewquizassignments(id)
          } catch (error) {}
    }
    

    rendersubject = ({item, index}) => {
        var uri= 'http://wesmart.in/backend/public/files/subject/'
        
        // var result = item.icon.replace(/ /g, "%20");
        
        return (
            <TouchableOpacity onPress={()=> this.opensubject(item.subject)}>
                <View style={styles.Smallbox}>
                    <Image source={{ uri: item.icon}} style={{width:40,height:40}} /> 
                    
                </View>
                <Text style={styles.textheading}>{item.subject}</Text>  
                <Text style={styles.subtext}>{item.class}</Text>  
            </TouchableOpacity>         
        )
    };

    renderboarcaste=({item,index})=>{
    
    return(
     <View style={{backgroundColor: commonColor.brandSecondry,borderRadius:20,width:300,height:deviceHeight/6,marginLeft:30,flexDirection:'row'}}>
          <View style={{width:'40%',marginTop:10}}>
               { item.teacherid==null ?
                   <View>
                   <Text style={{color:"#484347", fontSize:13,fontWeight:'600',marginLeft:20}}>
                      Teacher                  
                    </Text>
                    <Text style={{color:"#484347", fontSize:13,fontWeight:'600',marginLeft:20}}>
                       Broadcast                    
                    </Text>
                   </View>
               :
                 <View>
                   <Text style={{color:"#484347", fontSize:13,fontWeight:'600',marginLeft:20}}>
                      School                    
                    </Text>
                    <Text style={{color:"#484347", fontSize:13,fontWeight:'600',marginLeft:20}}>
                       Broadcast                   
                    </Text>
                </View>
                }
                <View style={{height:40, overflow:'hidden',marginTop:10}}>
                    <Text style={{color:"#484347", fontSize:13,fontWeight:'400',marginLeft:20}} numberOfLines={2} ellipsizeMode='tail'>
                           {item.title}                     
                    </Text>
                </View>
               <TouchableOpacity onPress={()=>Actions.Feedback()}>
                    <View style={{backgroundColor:'#DB4C7B',width:88,borderRadius:90,height:35, marginLeft:20,marginTop:5}}>
                      <Text style={{ color: "#fff", fontSize: 14,paddingBottom:5,paddingTop:10, paddingLeft:14}}> View All</Text>
                    </View>
                </TouchableOpacity>
            </View>
           <View style={{width:'40%',marginTop:15}}>
            { item.teacherid==null ?
                <Image source={require("../../../../assets/images/teachboradcast.png")} style={{ width:148.04, height: 100.71 }} />
            :
                <Image source={require("../../../../assets/images/Group_16982.png")} style={{ width:148.04, height: 100.71 }} />
            }
           </View>        

      </View> 
    )
  }

    nextscreen(homeworkid,time,title){
        SyncStorage.set('time',time);
         SyncStorage.set('title',title);
      SyncStorage.set('homeworkid',homeworkid);
       Actions.Viewquizassignments()
    }
    renderItem2 = ({item, index}) => {
      
      var color='#D9E8FB';
        var Time=moment(item.created_at).format('hh:mm-ddd')
        if(index%2==0){
          color='#DCEEE0'
        }
        return (
           <TouchableOpacity onPress={()=> this.nextscreen(item.id,Time,item.title)}>
            <View style={{backgroundColor:color,margin:10,width:150,height:152,borderRadius:10,paddingLeft:10}}>
               
                      <Text style={{fontSize:14,marginTop:20,fontWeight:'bold',color:'#000',marginLeft:10}}>{item.subject}</Text> 
                      <Text style={{fontSize:12,marginLeft:10,marginTop:10,color:'#000000'}}>{Time}</Text> 
                      <Text style={{fontSize:12,marginLeft:10,marginTop:10,color:'#000000'}}>{item.description}</Text>  
                          
            </View>
            </TouchableOpacity> 
        )
    };


render() { 

      
     return(
         <Container style={{ backgroundColor: commonColor.brandSecondry}}>

        
         <View style={{width: deviceWidth, height: (Platform.OS === 'ios' ? deviceHeight/2.7: deviceHeight/2.7), resizeMode:'cover',backgroundColor:'#4E1C5E',borderBottomLeftRadius:30,borderBottomRightRadius:30}}> 
                  
                    <View style={Platform.OS === 'ios' ?styles.ios:styles.head}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{width:70,height:70}}  >
                       <Image                      
                            source={require("../../../../assets/images/Group_16692.png")}
                            style={{ width:50.08, height: 50.08, position:'absolute', right:10 , }}
                        />  
                    </TouchableOpacity>
                    </View>
                    <View style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle,{flexDirection:'row',justifyContent:'space-between',marginhorizontal:20,}}>
                    <View style={{width:'40%'}}>
                         {this.props.username &&
                          <Text style={{ color:"#FFF", fontSize:18, fontFamily:'Cabin-Bold',marginLeft:20  }}>
                            Hi <Text></Text> {this.props.username.name}
                          </Text> 
                          }
                        <Text style={{ color:"#FFF", fontSize:16, fontFamily:'Cabin-Bold' ,marginLeft:20  }}>
                          Welcome Back
                        </Text> 
              <View>
                <View style={{marginTop:10,width:deviceWidth/2}}> 
                  { this.state.teacherboard.length>0 && this.state.teacherboard[0].teacherid==null ?
                   <View>
                   <Text style={{color:"#fff", fontSize:13,fontWeight:'600',marginLeft:20}}>
                      Teacher  Broadcast                
                    </Text>
                    
                   </View>
               :
               <View>
                   <Text style={{color:"#fff", fontSize:13,fontWeight:'600',marginLeft:20}}>
                      School  Broadcast                   
                    </Text>
                    
                </View>
                }
                {this.state.teacherboard.length>0 &&
                <View style={{height:100, overflow:'hidden',marginTop:10,width:'100%',}}>
                    <Text style={{color:"#ffffff", fontSize:13,fontWeight:'400',marginLeft:20}} numberOfLines={4} ellipsizeMode='tail'>
                            {this.state.teacherboard[0].title}                   
                    </Text>
                </View>
              }
                  </View>
              </View>
                  </View>  
                  <View style={{width:deviceWidth,}}>
                        <Image source={require("../../../../assets/images/bus22.jpg")}
                               style={{ width:deviceHeight/3,height:deviceHeight/5}}
                        />
                       </View>              
                    </View>
                      
                    </View>
                
                 <View>
                            <Text style={{ color:"#000000", fontSize:24,fontWeight:'bold', marginLeft:15,marginTop:15 }}>
                                Dashboard
                            </Text>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5 ,marginLeft:'3%'}}>
                        

                        <TouchableOpacity style={{backgroundColor:'#ffd3ca',
                                                 justifyContent:'center',
                                                 alignItems:'center',
                                                 width:'46%',margin:5,
                                                 height:deviceHeight/5.5,borderRadius:20
                                               }}
                                          onPress={()=>Actions.Feedback()}
                                               >
                          <Image source={require("../../../../assets/images/bus.png")}
                               style={{ width:deviceHeight/10, height: deviceHeight/10,borderRadius:50 }}
                        />
                         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:0}}>
                         <Text style={{color:'#000',fontSize:deviceHeight/40}}>Feed</Text>
                         
                        </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={{backgroundColor:'#95bff9',
                                                  justifyContent:'center',
                                                  alignItems:'center',width:'46%',
                                                  margin:5,height:deviceHeight/5.5,borderRadius:20,marginLeft:15
                                                }}
                                                onPress={()=>Actions.Subjectlist()}
                                                >
                          <Image source={require("../../../../assets/images/feedpic.png")}
                               style={{ width:deviceHeight/10, height: deviceHeight/10,borderRadius:50 }}
                        />
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:0}}>
                         <Text style={{color:'#000',fontSize:deviceHeight/40}}>Homework</Text>
                         
                        </View>
                        </TouchableOpacity>

                                
                        </View> 
                        <View style={{flexDirection:'row', marginHorizontal:5 ,marginLeft:'3%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f3f5cb',
                                                 justifyContent:'center',
                                                 alignItems:'center',
                                                 width:'46%',margin:5,
                                                 height:deviceHeight/5.5,borderRadius:20
                                               }}
                                          onPress={()=>Actions.Viewassignments()}
                                               >
                          <Image source={require("../../../../assets/images/homework.png")}
                               style={{ width:deviceHeight/10, height: deviceHeight/10,borderRadius:50 }}
                        />
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:0}}>
                         <Text style={{color:'#000',fontSize:deviceHeight/40}}>Post Homework</Text>
                        
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#b6f8f4',
                                                 justifyContent:'center',
                                                 alignItems:'center',width:'46%',
                                                 margin:5,height:deviceHeight/5.5,borderRadius:20,marginLeft:15}}
                                                 onPress={()=>Actions.Quizdashboard()}
                                                 >
                          <Image source={require("../../../../assets/images/assignments.png")}
                               style={{ width:deviceHeight/10, height: deviceHeight/10,borderRadius:50 }}
                        />
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:0}}>
                         <Text style={{color:'#000',fontSize:deviceHeight/40}}>Assignments</Text>
                         
                        </View>
                        </TouchableOpacity>

                                
                        </View> 

                       
                 <View style={{ width: deviceWidth, backgroundColor: commonColor.brandSecondry,height: 66,flexDirection:'row', borderTopWidth:2,borderTopColor:'#e6e6e6',justifyContent:'center', marginTop: 5, position:'absolute', bottom:0}} >
                
                <TouchableWithoutFeedback onPress={() =>  Actions.CustomerHome()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.CustomerHome() } >
                   
                    <Image
                      source={require("../../../../assets/bottom_icon/homeblue.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                 
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback> 

                
                <TouchableWithoutFeedback onPress={() => Actions.Teacherchatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                
                    <Image
                      source={require("../../../../assets/menuicons/chatlight.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                  
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#000000',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback> 

                 

                <TouchableOpacity onPress={()=>Actions.Addhomework()} style={{elevation: 5,shadowColor: '#000',
                                                                          shadowOffset: { width: 0, height: 1 },
                                                                          shadowOpacity: 0.8,
                                                                          shadowRadius: 1,}}>
                <View style={{ justifyContent:'center',marginTop:-40,alignItems:'center', width:deviceWidth/5 ,}}>
                    <Image
                      source={require("../../../../assets/images/ellipse.png")}
                      style={{ width:80, height: 80 , }}
                    />
                    <View style={{ position:'absolute',marginLeft:-20,marginTop:-20,zIndex:1001}}>
                     <Text style={{color:'#ffffff',fontSize:40,marginTop:-10, fontWeight:'400'}}>+</Text>
                    </View>
                </View>     
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() =>  Actions.Task()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}>
                   
                   <Image
                      source={require("../../../../assets/bottom_icon/eventgray3.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                    
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Event</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.Attendance()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                    
                   <Image
                      source={require("../../../../assets/bottom_icon/attandance.png")}
                      style={{ width:30, height: 30  }}
                    />
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Attendance</Text>
                </View>   
                </TouchableWithoutFeedback>                 
            </View>           
                         
             
           
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
     teacherAllboardcaste:(data,userid,schoolid)=>dispatch(teacherAllboardcaste(data,userid,schoolid)),
     getprofileteacherdata:(data,userid) => dispatch(getprofileteacherdata(data,userid)), 
    teacherhomeworks:(data,userid)=> dispatch(teacherhomeworks(data,userid)),
    teacherboardcaste:(data,userid,schoolid)=>dispatch(teacherboardcaste(data,userid,schoolid)),
    TeacherClassesList:(data,userid)=>dispatch(TeacherClassesList(data,userid)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(CustomerHome);
