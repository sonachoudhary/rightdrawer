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
  TouchableOpacity,BackHandler,Alert,Modal
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
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import {FlatListSlider,ChildItem2} from '../../../components/customer/flatlist_slider';
import { setActiveLogin } from "../../../actions/common/entrypage";
import {edithomeworksbyteacher,deletehomeworksbyteacher,teacherhomeworks} from "../../../actions/common/signin";
import SplashScreen from "react-native-splash-screen";
import VideoPlayer from 'react-native-video-controls';
import moment from "moment/moment";
import Swipeout from 'react-native-swipeout';
import Hyperlink from 'react-native-hyperlink'

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;
import config from "../../../../config.js";
import  Footer  from "../../../components/footer";
  
function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    user: state.driver.user,
     userid:state.driver.user.teacherlogin.teacherid,
    appointmentList: state.booking.appointmentList,
    profileUrl: state.driver.user.profileUrl,
    homework:state.driver.user.homework,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
  };
}

class Homework2 extends Component {
   constructor(props) {
    super(props)
    
    this.state = {
      loading: true,
      homework:this.props.homework,
      data:[{Text:'this is project of react native based on school and clz assignment submited online in period od covid',Title:'HomeWork Title',Time:'14:00-mon',color:"#F7FBFF",},{Text:'this is project of react native based on school and clz assignment submited online in period od covid',Title:'Home title',Time:'14:00-mon',color:"#F1F2F4",image:'require("../../../../assets/images/whyrcic.png")'},{Text:'this is project of react native based on school and clz assignment submited online in period od covid',Title:'HomeWork Title',Time:'14:00-mon',color:"#FFDCD6",},{Text:'this is project of react native based on school and clz assignment submited online in period od covid',Title:'Home title',Time:'14:00-mon',color:"#FFDCD6",}],
      homedata:this.props.homework,
      // id:this.props.homework[0].id,
      subjectname:'',
      showmodal:false,
      showmodalseen:false,
      images:[],
      seenarray:[]
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
slider(value){
    
    this.setState({images:value})
    this.setState({showmodal:true})
  }
  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  
  showmodalseen(seenarray){
    this.setState({showmodalseen:true,seenarray:seenarray})
  }
  componentDidMount(){
     this.props.teacherhomeworks(this.props.jwtAccessToken,this.props.userid)
     this._retrieveid()
  }

  _retrieveid = async () => {
    try {
      const subjectname = await AsyncStorage.getItem('subjectname');
      this.setState({subjectname:subjectname})
      //alert(this.state.subjectname)
    } catch (error) {
      // Error retrieving data
    }
  };
  

  delete(deleteid){
      
      this.props.dispatch(deletehomeworksbyteacher(this.props.jwtAccessToken,deleteid)); 

      var that = this;
       setTimeout( function(){
        alert('Homework deleted successfully!')
        fetch(`${config.serverSideUrl}/homeworks/${that.props.userid}`, {
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
                that.setState({homework:data});
                //dispatch(getteacherhomeworks(data))
             }
            
              
           })
          .catch(e => {
                   
          });

       // that.props.teacherhomeworks(that.props.jwtAccessToken,that.props.userid)
      },1500)
  }
 
  edit = async (id,classid,subjectid,teacherid,schoolid,title,description,classname,subjectname) =>{
   
    try {


      setTimeout(function(){ Actions.Edit(); },500 );
      AsyncStorage.setItem('selectid:id',id );
      AsyncStorage.setItem('selectid:title',title );
      AsyncStorage.setItem('selectid:description',description );
      AsyncStorage.setItem('selectid:classid',classid );
      AsyncStorage.setItem('selectid:subjectid',subjectid );
      AsyncStorage.setItem('selectid:schoolid',schoolid );
      AsyncStorage.setItem('selectid:teacherid',teacherid );
      AsyncStorage.setItem('selectid:classname',classname );
      AsyncStorage.setItem('selectid:subjectname',subjectname );
     

  } catch (error) {
    alert(error)
    // Error saving data
  }


}



     renderItemdata2=({item,index})=>{
     var uri=  `https://wesmart.in/backend/public/files/homework/${item.homeworkid}/`
     // var uri= 'http://wesmart.in/backend/public/files/homework/${item.id}/ '
    
    return(
           <View style={{marginRight:20,marginLeft:20,borderRadius:20, overflow:'hidden'}}>
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

  seenrenderdata=({item,index})=>{
    
    var uri= 'http://wesmart.in/backend/public/documents/'
    
    return(

      <View style={{ flexDirection:'row',backgroundColor:'#ffffff',width:'94%', borderRadius:10
                    ,paddingLeft:15,paddingRight:15, 
                    paddingTop:15, paddingBottom:30,justifyContent:'space-between',
                    height:'auto',margin:10,elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 1}}>
      
      <View style={{backgroundColor:'red',borderRadius:5}}>
      <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}
          style={{
            padding: 10,
            backgroundColor: 'red',
          }}
        >

           <Image source={{uri:uri+item.photo}} style={{ width:40, height: 40,borderRadius:10 }} />
 </ReactNativeZoomableView>
      </View>
    
        <Text style={{color:'#000'}}>{item.name}</Text>
       <Text style={{color:'#000'}}>{item.rollno}</Text>
    </View>
    )

  }
  renderItem = ({item, index}) => {
    
     var uri= 'http://wesmart.in/backend/public/documents/'
        
     if(this.state.subjectname==item.subject){

              const swipeoutBtns = [
              {
                text: 'Edit', 
                backgroundColor:'#40c353',
                color:'#FFFFFF',
                onPress: () => { this.edit(item.id,item.classid,item.subjectid,item.teacherid,item.schoolid,item.title,item.description,item.class,item.subject) }
              },
              {
                text: 'Delete', 
                backgroundColor:'#c53e3e',
                color:'#FFFFFF',
                onPress: () => {Alert.alert(
                                  'Alert Title',
                                  'Are You Sure You Want To Delete ?',
                                  [
                                    {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
                                    {text: 'YES', onPress: () =>  this.delete(item.id)},
                                  ]
                                ); }
              }
             ]
        var Time=moment(item.created_at).format("hh:mm-ddd")
        
        
        return (
       
          <View style={{backgroundColor:'#ffffff',width:'94%', borderRadius:10,paddingLeft:15,paddingRight:15, paddingTop:15, paddingBottom:30,height:'auto',margin:10,elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 1}}>
              <Swipeout right={swipeoutBtns}  autoClose='true' backgroundColor= 'transparent'>
               <View style={{flexDirection:'row',justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#e6e6e6'}}>
                  <Text style={{color:"#484347", fontSize:17, marginTop:10 ,fontWeight:'400',marginLeft:10,paddingBottom:10}}>{item.title}</Text>  
                  <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,marginRight:10}}>{Time}</Text>  
               </View>
                </Swipeout> 
               <View style={{height:'auto'}}>
                   <Hyperlink linkStyle={ { color: "blue" } } linkDefault={ true }  >
                     <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,}}>{item.description}</Text>
                  </Hyperlink>
                       
                   </View>
                   <View style={{flexDirection:'row',position:'absolute',right:10,bottom:0,}}>
                     { (item.seenby.length > 0) &&  
                      <View style={{backgroundColor:'#fff',borderRadius:20,borderWidth:5,width:40, height: 40,borderColor:'#e6e6e6',justifyContent:'center',alignItems:'center',marginLeft:-5}}>
                         <Image source={{uri:uri+item.seenby[0].photo}} style={{ width:20, height: 20,borderRadius:10 }} />
                         
                         
                       </View>

                     }
                     { (item.seenby.length > 0) &&  
                         <TouchableOpacity style={{backgroundColor:'#5B139A',
                                                   borderRadius:20,borderWidth:5,width:40, 
                                                   height: 40,justifyContent:'center',
                                                   alignItems:'center',borderColor:'#e6e6e6',}}
                                           onPress={()=>this.showmodalseen(item.seenby)}
                                                   >
                             <Text style={{color:'#fff',textAlign:'center'}}>+{item.seenby.length}</Text>
                         </TouchableOpacity>
                    }
                    </View>
              <TouchableOpacity onPress={()=>this.slider(item.files,)}>
           {item && item.files!=null &&
                 <FlatList
                   data={item.files}
                   
                   numcolumns={1}
                   extraData={this.state}
                   renderItem={this.renderItemdata2}
                   />
          
           }
           </TouchableOpacity>
         
           

        
            </View>         
              
        )
  }
  };

  
  
  render() { 
     
       return(
             <Container style={{ backgroundColor: "#f9f9f9" ,}}>
                  
                      <View style={Platform.OS === "ios" ? styles.headerIOS : styles.headerAndroid}>
                            <Button transparent onPress={()=>Actions.pop()}>
                                          <Icon
                                            name="md-arrow-back"
                                            style={{ fontSize: deviceHeight/30, color: "#000000" }}
                                          />
                            </Button>
                            <Text style={styles.textheadingnewdata}> {this.state.subjectname} Homework</Text>
                     </View>
                     
                    
                         
                  
                  <View style={{flex:1,marginBottom:100}}>
                   {this.state.homework &&   <FlatList
                            style={{margin:10}}
                            data={this.state.homework}
                            extraData={this.state}
                            renderItem={this.renderItem}
                          />
                  }
                  </View>
                  
                   <Modal
                   animationType="slide"
                   transparent={true}
                   visible={this.state.showmodal}
                   onRequestClose={() => {
                   
                   this.setState({showmodal:false});
                   }}
              >
              <View   style={{
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
                       source={{uri: 'https://wesmart.in/backend/public/files/homework/'+this.state.images[0].homeworkid+'/'+encodeURIComponent(this.state.images[0].file)}}
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
                    homeworkid={'homeworkid'}
                    height={500}
                    component={<ChildItem2 />}/>
                }
         

         
              </View>
            
            </View>
           </View>
         </Modal>

         <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodalseen}
                onRequestClose={() => {
                
                this.setState({showmodalseen:false});
               }}
            >
             <View style={{backgroundColor: 'rgba(197, 204, 237, 0.5)',height:deviceHeight}}>
         
              <View   style={{marginTop:deviceHeight/8, height:'auto', borderRadius:30,  borderColor:'#000', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8, shadowRadius: 1,backgroundColor: "#fff", }}>
            
            <TouchableOpacity
                      style={{justifyContent:'flex-end',
                              flexDirection:'row',
                              marginTop:20,
                              marginRight:30}}
                              onPress={() => this.setState({showmodalseen:false})}
            >
            <Text style={styles.textStyle}>close</Text>
            </TouchableOpacity>
                 <View >
                     {this.state.homework &&   <FlatList
                            style={{margin:10}}
                            data={this.state.seenarray}
                            extraData={this.state}
                            renderItem={this.seenrenderdata}
                          />
                  }
                 </View>

              </View>

            </View> 
      </Modal>
          <Footer/>
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    teacherhomeworks:(data,userid)=> dispatch(teacherhomeworks(data,userid)),
     deletehomeworksbyteacher:(data,deleteid)=>dispatch(deletehomeworksbyteacher(data,deleteid)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Homework2);
