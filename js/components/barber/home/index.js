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
  TouchableOpacity
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
import { getprofilestudentdata,signinAsync} from "../../../actions/common/signin";

import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import { currentLocationUser } from '../../../actions/driver/home';
import { homeworksbystudent} from "../../../actions/common/signin";
import  Footernew  from "../../../components/footernew";
  import config from "../../../../config.js";
import SyncStorage from 'sync-storage';
function mapStateToProps(state) {
 
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    studenthomework:state.driver.user.studenthomework,
    user: state.driver.user,
    userid:state.driver.user.studentlogin.studentid,
    appointmentList: state.booking.appointmentList,
    profileUrl: state.driver.user.profileUrl,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    homeworkdata:state.driver.user.homework,
    username:state.driver.user.student,
    // classid:state.driver.user.student.classid

  };
  
}

class BarberHome extends Component {
  

  constructor(props) {
    super(props);
   
    this.state = {
      loading: true,
      studentboarddata:[],
      studenthomework:[],
      details:'',
    };
    
  }
  
  componentDidMount(){
         console.log(this.props.jwtAccessToken,'token')
        this.getbroadcaste();
        this.getbroadcaste22();
        if(this.props.userid!==""){
              this.props.getprofilestudentdata(this.props.jwtAccessToken,this.props.userid)
               this.props.homeworksbystudent(this.props.jwtAccessToken,this.props.userid)
        }
        
        
          
          fetch(`${config.serverSideUrl}/studentinfo/${this.props.userid}`, {
          method: "GET",
         headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Cookie:'token='+this.props.jwtAccessToken
      }

    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
             this.setState({details:data})
             this.getclassid();
        }
      })
      .catch(e => {
             alert('something went wrong')
      });
    
        
     
    }

    getclassid(){
      
       SyncStorage.set('classid',this.state.details.classid)
       
         
        fetch(`${config.serverSideUrl}/studentallsubject/${this.state.details.classid}`, {
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
                   var getunique = this.getUnique(data,'subject');
                  this.setState({studenthomework:data});
              }
         })
        .catch(e => {

                 
        });
        
    }

    getbroadcaste(){
        fetch(`${config.serverSideUrl}/schoolbroadcastsbystudent1/${this.props.userid}`, {
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
                this.setState({studentboarddata:data});
              }
         })
        .catch(e => {
                
        });
    }
    getbroadcaste22(){
          
        fetch(`${config.serverSideUrl}/schoolbroadcastsbystudent/${this.props.userid}`, {
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
        // await AsyncStorage.setItem('teachername',teachername);
         Actions.Homework()
    }

    
  
  renderItem = ({item, index}) => {
     
    var uri= 'http://wesmart.in/backend/public/files/subject/'
    return (
      <TouchableOpacity onPress={()=> this.opensubject(item.subject)} style={{ width:deviceWidth/4}}>
          <View style={styles.Smallbox}>
                <Image source={{uri:item.icon}} style={{width:50,height:50}} /> 
                

          </View>
           <Text style={{color:"#484347", fontSize:15,fontWeight:'600',marginLeft:30}}>{item.subject}</Text>  
           <Text style={{color:"#000", fontSize:11,fontWeight:'600',width:'60%',marginLeft:30,marginTop:10}}>{item.teacher}</Text>  
        </TouchableOpacity>         
       )
    };
 
 renderItem3 = ({item, index}) => {
    
    return (
      <View style={{backgroundColor:'#fff',borderRadius:20,width:300,height:150,marginLeft:30,flexDirection:'row'}}>
              <View style={{width:'40%',marginTop:10}}>
                        <View style={{height:80, overflow:'hidden'}}>
                          <Text style={{color:"#484347", fontSize:13,fontWeight:'600',marginLeft:20}}>
                            {item.title}                     
                          </Text>
                          <Text style={styles.subtext} numberOfLines={3} ellipsizeMode='tail'>
                           {item.message}             
                          </Text>
                        </View>
                        <TouchableOpacity onPress={()=>Actions.Schoolfeedback()}>
                            <View style={{backgroundColor:'#DB4C7B',width:88,borderRadius:90,height:35, marginLeft:20,marginTop:5}}>
                              <Text style={{ color: "#000", fontSize: 14,paddingBottom:5,paddingTop:10, paddingLeft:14}}> View All</Text>
                            </View>
                        </TouchableOpacity>
               </View>
                       <View style={{width:'40%',marginTop:15}}>
                        <Image source={require("../../../../assets/images/Group_16982.png")}
                               style={{ width:148.04, height: 100.71 }}
                        />
                       </View>        
      </View>
    )
  };
 


 render() { 

  
  var marginTOP = 0; 
  if(Platform.OS==='ios'){
     marginTOP= 20; 
  }
    return(
      <Container style={{ backgroundColor: commonColor.brandSecondry}}>

        
         <View style={{width: deviceWidth, height: (Platform.OS === 'ios' ? deviceHeight/2.8: deviceHeight/2.8), resizeMode:'cover',backgroundColor:'#FEDCDB',borderBottomLeftRadius:30,borderBottomRightRadius:30}}> 
                  
                    <View style={Platform.OS === 'ios' ?styles.iosLogoContainer:styles.aLogoContainer}>
                      <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{width:70,height:70}}  >
                       <Image                      
                            source={require("../../../../assets/images/Group_16692.png")}
                            style={{ width:50.08, height: 50.08, position:'absolute', right:10 , }}
                        />  
                    </TouchableOpacity>
                    </View>
                    <View style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle,{flexDirection:'row',justifyContent:'space-between',marginhorizontal:20}} >
                    <View style={{width:'40%'}}>
                         {this.props.username &&
                          <Text style={{ color:"#000", fontSize:18, fontFamily:'Cabin-Bold',marginLeft:20  }}>
                            Hi <Text></Text> {this.props.username.name}
                          </Text> 
                          }
                        
              <View>
                <View style={{marginTop:10,width:deviceWidth/2}}> 
                  { this.state.studentboarddata.length>0 && this.state.studentboarddata[0].userid==null ?
                   <View>
                   <Text style={{color:"#000", fontSize:13,fontWeight:'600',marginLeft:20}}>
                      Student Broadcast                  
                    </Text>
                    
                   </View>
               :
               <View>
                   <Text style={{color:"#000", fontSize:13,fontWeight:'600',marginLeft:20}}>
                      School  Broadcast                  
                    </Text>
                    
                </View>
                }
                {this.state.studentboarddata.length>0 &&
                <View style={{height:100, overflow:'hidden',marginTop:10,width:'100%',}}>
                    <Text style={{color:"#000", fontSize:13,fontWeight:'400',marginLeft:20}} numberOfLines={4} ellipsizeMode='tail'>
                            {this.state.studentboarddata[0].title}                   
                    </Text>
                </View>
              }
                  </View>
              </View>
                  </View>  
                  <View style={{width:deviceWidth}}>
                        <Image source={require("../../../../assets/images/busstudent.jpg")}
                              style={{ width:deviceHeight/3,height:deviceHeight/5}}
                        />
                       </View>             
                    </View>
                      
                    </View>
                
                 
                 

                  
                  
        
                        <View>
                            <Text style={{ color:"#000000", fontSize:18,fontWeight:'bold', marginLeft:15,marginTop:15 }}>
                                Dashboard
                            </Text>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5,marginLeft:'3%' }}>
                        <TouchableOpacity style={{backgroundColor:'#DDBDEB',
                                                 justifyContent:'center',
                                                 alignItems:'center',
                                                 width:'46%',margin:5,
                                                 height:deviceHeight/5.5,borderRadius:20
                                               }}
                                          onPress={()=>Actions.Schoolfeedback()}
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
                                                  margin:5,height:deviceHeight/5.5,borderRadius:20
                                                }}
                                                onPress={()=>Actions.Subjectliststudent()}
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
                                          onPress={()=>Actions.Events()}
                                               >
                          <Image source={require("../../../../assets/images/homework.png")}
                               style={{ width:deviceHeight/10, height: deviceHeight/10,borderRadius:50 }}
                        />
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:0}}>
                         <Text style={{color:'#000',fontSize:deviceHeight/40}}>Events</Text>
                        
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#b6f8f4',
                                                 justifyContent:'center',
                                                 alignItems:'center',width:'46%',
                                                 margin:5,height:deviceHeight/5.5,borderRadius:20}}
                                                 onPress={()=>Actions.Teacherquiz()}
                                                 >
                          <Image source={require("../../../../assets/images/assignments.png")}
                               style={{ width:deviceHeight/10, height: deviceHeight/10,borderRadius:50 }}
                        />
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:0}}>
                         <Text style={{color:'#000',fontSize:deviceHeight/40}}>Assignments</Text>
                         
                        </View>
                        </TouchableOpacity>

                                
                        </View> 

                       
                            
                         
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
                      source={require("../../../../assets/bottom_icon/homegray.png")}
                      style={{width:30,height: 30}}
                    />
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#ffffff',paddingTop:5}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback>  


                <TouchableWithoutFeedback onPress={() => Actions.Studentresult()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.Studentresult() }>
                     <Image
                      source={require("../../../../assets/bottom_icon/resultblue.png")}
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
     
      signinAsync:(data)=>dispatch(signinAsync(data)),
     homeworksbystudent:(data,userid)=>dispatch(homeworksbystudent(data,userid)),
     getprofilestudentdata:(data,userid)=>dispatch(getprofilestudentdata(data,userid)),
      
   
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(BarberHome);
