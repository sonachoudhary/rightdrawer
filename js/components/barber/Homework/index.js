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
  Linking,BackHandler,Modal
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
import Hyperlink from 'react-native-hyperlink'

import {FlatListSlider,ChildItem} from '../../../components/customer/flatlist_slider'

import { setActiveLogin } from "../../../actions/common/entrypage";
import {homeworksliststudent } from "../../../actions/common/signin";
import { checkSubscription } from "../../../actions/common/all";
import { acceptAppointment, rejectAppointment, upcomingBooking, setUserLocationNew, startWalkForAppointment, deleteAppointment, getNotificationList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import SplashScreen from "react-native-splash-screen";
import VideoPlayer from 'react-native-video-controls';

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
import  Footernew  from "../../../components/footernew";
  import SyncStorage from 'sync-storage';
 import config from "../../../../config.js";
function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user: state.driver.user,
    user:state.driver.user.student,
    hoeworklist:state.driver.user.hoeworklist,
     studenthomework:state.driver.user.studenthomework,
    // homeworkid:state.driver.user.studenthomework[0].id,
    userid:state.driver.user.studentlogin.studentid,
   };
}

class Homework extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // home_work_data:this.props.homeworkdata,
      loading: true,
      list:this.props.hoeworklist,
      studenthomework:this.props.studenthomeworkdata,
      itemteacher:'',
      itemsubject:'',
      subject:'',
      allstudenthomework:this.props.studenthomework,
      showmodal:false,
      images:[],
      homeworkseen:[],
    };
    
  }
   componentDidMount() {
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
  
  componentDidMount(){
     this.getresponselastseen()
     this.getclassid();
    this.props.homeworksliststudent(this.props.jwtAccessToken,this.props.userid,this.props.homeworkid)
    this._retrieveid()
 }


getresponselastseen(){
  
  fetch(`${config.serverSideUrl}/student/seenhomeworknew/${this.props.userid}`, {
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
                //this.setState({homeworkseen:data});
                //dispatch(getteacherhomeworks(data))
             }
            
              
           })
          .catch(e => {
                    
          });
}
submitable(){
  
  
}

_retrieveid = async () => {
    try {
      const subjectname = await AsyncStorage.getItem('subjectname');
      const teachername = await AsyncStorage.getItem('teachername');
      this.setState({itemsubject:subjectname})
      this.setState({itemteacher:teachername})
      //alert(this.state.subjectname)
    } catch (error) {
      // Error retrieving data
    }
  };

nextscreen = async (id,title) =>{
   
    try {
     await SyncStorage.set(
      'selectid:id',id
    );
     await SyncStorage.set(
      'title',title
    );
     fetch(`${config.serverSideUrl}/checkhomeworksubmit/${this.props.userid}/${id}`, {
            method: "get",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Cookie:'token='+this.props.jwtAccessToken
            },
           
          })
          .then(resp => resp.json())
          .then(data => { 
            
            if(data){
              if(data.length==0){
                Actions.Schoolassignments()
               
               
              }else{
                 alert('allready submitted')
              }

              
                //this.setState({homeworkseen:data});
                //dispatch(getteacherhomeworks(data))
             }else{
              
             }
            
              
           })
          .catch(e => {
                    
          });

      
  } catch (error) {
    // Error saving data
  }}
slider(value){
    
    this.setState({images:value})
    this.setState({showmodal:true})
  }
  
  homeworkrenderdata = ({item, index}) => {
     
     var color='#F7FBFF';
        var Time=moment(item.created_at).format('hh:mm-ddd')
        if(index%2==0){
          color='#F1F2F4'
        }
      if(item.subject == this.state.itemsubject){
        
         var Time= moment(item.created_at).format('hh:mm-ddd')
         var uri= 'http://wesmart.in/backend/public/documents/files'
         
        const url="https://google.com"
     
        return (
              <View style={{backgroundColor:color,width:'93%', borderRadius:10,marginLeft:15,marginTop:10, padding:20,height:'auto'}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                   <Text style={{color:"#484347", fontSize:18, marginTop:10 ,fontWeight:'400'}}>{item.title}</Text>  
                   <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,marginRight:10}}>{Time}</Text>  
                   </View>
                   <View style={{height:'auto'}}>
                   <Hyperlink linkStyle={ { color: "blue" } } linkDefault={ true }  >
                     <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,}}>{item.description}</Text>
                  </Hyperlink>
                       
                   </View>
                   <TouchableOpacity onPress={()=>this.slider(item.files)}>
                    {item.files.length>0 && 
                      <View>
                      <FlatList
                     data={item.files}
                   
                        numcolumns={1}
                     extraData={this.state}
                    renderItem={this.renderItemdata2}
                   />
                   </View>
                   
                     }
                     { item.files!=null  && item.files.length>=1 &&
                       <View style={{flexDirection:'row',justifyContent:'center',}}>
                           {item.files && item.files.map(function(item,index){
                                return(
                                 <View style={{marginTop:20,marginRight:10,}}>
                              <Image source={require("../../../../assets/images/dots.png")} style={{ width:6, height: 6 }}  resizeMode={'stretch'}/>
                               
                      </View>
                                  )
                              })}
                      </View>
                    }
                     </TouchableOpacity>
                     {(item.submitable==1) &&
                    <Button onPress={() =>this.nextscreen(item.id,item.title)}
                        style={{backgroundColor:'#DB4C7B',width:88,borderRadius:90,height:35,marginTop:5,paddingBottom:5,position:'absolute',right:10,bottom:10,flexDirection:'row',}}
                      >
                      <Text style={{ color: "#fff", fontSize: 13,textalign:'center',}}> Submit</Text>
                      
                     </Button>
                     }
                </View>        
               
        )
    }
  };
  

  renderItemdata2=({item,index})=>{
    

     var uri= `http://wesmart.in/backend/public/files/homework/${item.homeworkid}/`
    
    return(
           <View style={{marginRight:20,marginLeft:20}}>

              {index==0 &&
                 <View>
                { ( item.file.endsWith(".mp4") || item.file.endsWith(".mp3")) ?
                  <Image source={require("../../../../assets/images/play_icon.png")} style={{ width:'100%', height: 230,borderRadius:10 }} />
                :
                <View>
                    { ( item.file.endsWith(".pdf") || item.file.endsWith(".docx") || item.file.endsWith(".doc")) ?
                      <Hyperlink linkStyle={ { color: "blue" } } linkDefault={ true }  >
                          <Text style={{marginTop:5,marginLeft:10}}>{uri+item.file}</Text>
                      </Hyperlink>
                    :
                    <Image source={{uri:uri+item.file}} style={{ width:'100%', height: 230 ,borderRadius:10}} />
                    }
                </View>
                }
                 </View>
               }
             </View>
    )
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
  getclassid(){
      
      const classid=SyncStorage.get('classid')
       
         
        fetch(`${config.serverSideUrl}/studentallsubject/${classid}`, {
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
                  this.setState({studenthomework:getunique});
              }
         })
        .catch(e => {

                  
        });
        
    }
  opensubject = async (subjectname) =>{
        this.setState({itemsubject:subjectname})
        
    }
  renderItem = ({item,index}) => {
   
  var color='#E6F6E2';
        var Time=moment(item.created_at).format('hh:mm-ddd')
        if(index%2==0){
          color='#FFE5AC'
        }
    return (
      <TouchableOpacity style={{margin:10,width:121.13,height:77,borderRadius:10,backgroundColor:color}} onPress={()=> this.opensubject(item.subject)}>
           
           <Text style={styles.textheading}>{item.subject}</Text>  
           <Text style={styles.subtext}>{item.teacher}</Text>  
        </TouchableOpacity>         
               
    )
  };
  
  render() { 
  
    var heightvalue= deviceHeight/4; 
    var uri= 'http://wesmart.in/backend/public/files/subject/'
    var marginTOP= 0;    
        if(Platform.OS === 'ios'){
           heightvalue=deviceHeight/6,
           marginTOP=30
        } 
  

    return(
      <Container style={{ backgroundColor: '#fff'}}>
       
           <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')}  style={{width: deviceWidth, height: 'auto', resizeMode:'cover',borderBottomWidth:2,borderColor:'lightgray' }}> 
              <View style={{marginTop:marginTOP, flexDirection:'row'}}>
              <Button transparent onPress={() => Actions.pop()}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: "#000000" }}
                  />
                                                
                </Button>
               <View style={{ justifyContent:'center', marginLeft:0 }} >
                   
                    <Text style={{ color:"#000", fontSize:deviceHeight/38,fontWeight:'bold' }}>
                      Your Homework
                    </Text>                    
                  </View>
               </View>
                <View>
                   <FlatList
                               style={{margin:10}}
                               data={this.state.studenthomework}
                               horizontal={true} 
                               extraData={this.state}
                               renderItem={this.renderItem}
                            />
                      
                </View>
                </ImageBackground>
                <ScrollView style={{ backgroundColor: "#fff",marginBottom:0 }} ref={(ref) => { this.scrollListReftop = ref; }}>
                    <View>
                        { this.state.studenthomework &&
                            <FlatList
                               style={{margin:10}}
                               data={this.state.allstudenthomework}
                               extraData={this.state}
                               renderItem={this.homeworkrenderdata}
                            />
                        }
                   </View>
                </ScrollView>
            <Modal
                   animationType="slide"
                   transparent={true}
                   visible={this.state.showmodal}
                   onRequestClose={() => {
                  
                   this.setState({showmodal:false});
                   }}
              >
              <View   style={{backgroundColor:'#fff',
                      backgroundColor: 'rgba(247, 248, 251, 0.1)'}}>
         
              <View   style={{marginTop:'10%',
                              height:deviceHeight,
                              width:deviceWidth,
                              borderRadius:30,
                              borderColor:'#000',
                              elevation: 5,
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 1 },
                              shadowOpacity: 0.8,
                              shadowRadius: 1,
                              backgroundColor:'#F8FAFA'
                            }}>
            
            <TouchableOpacity
                      style={{justifyContent:'flex-end',
                              flexDirection:'row',
                              marginTop:20,
                              marginRight:30}}
                              onPress={() => this.setState({showmodal:false})}
            >
            <Text style={styles.textStyle}>close</Text>
            </TouchableOpacity>
               <View style={{marginTop: 48}}>
                  { (this.state.images.length==1 && (this.state.images[0].file.endsWith(".mp4") || this.state.images[0].file.endsWith(".mp3"))) ?
                  <View style={{ zIndex:3001, position:'absolute', width: deviceWidth-40,marginLeft:20}}>
                    <VideoPlayer
                       source={{uri: 'http://wesmart.in/backend/public/files/homework/'+this.state.images[0].homeworkid+'/'+encodeURIComponent(this.state.images[0].file)}}
                       disableVolume={true}
                       disableBack={true}
                       tapAnywhereToPause={true}
                       videoStyle={{height:deviceHeight/2}}
                       style={{height:deviceHeight/2}}
                    />
                  </View>
                :
                  <FlatListSlider 
                    data={this.state.images} 
                    imageKey={'file'}
                    height={500}
                    autoscroll={false}
                    homeworkid={'homeworkid'}
                    indicatorStyle={{color:'#BA043D'}}
                    component={<ChildItem2 />}/>
                }

         
              </View>
            
            </View>
           </View>
         </Modal>
         

      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    homeworksliststudent:(data,userid,homeworkid)=>dispatch(homeworksliststudent(data,userid,homeworkid)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Homework);
