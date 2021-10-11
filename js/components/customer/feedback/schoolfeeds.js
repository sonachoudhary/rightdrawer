import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
        Image, CheckBox, TouchableWithoutFeedback ,FlatList,
        BackHandler,ScrollView,Modal,Linking

      } from "react-native";
import ImagePicker from "react-native-image-picker";
import SplashScreen from "react-native-splash-screen";
import  Footernew  from "../../../components/footernew";
import {FlatListSlider,ChildItem} from '../../../components/customer/flatlist_slider';
import Hyperlink from 'react-native-hyperlink'
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
const XDate = require('xdate');
import config from "../../../../config.js";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import VideoPlayer from 'react-native-video-controls';
const  uri= 'http://wesmart.in/backend/public/files/broadcast/'


function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,
    userid:state.driver.user.studentlogin.studentid,  
  };
}
class Schoolfeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentboarddata:[],
      selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      showmodal:false,
      images:[]
    }
  }

  componentDidMount() {
    this.getbroadcaste();
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
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

 renderItem = ({item, index}) => {
   
    var Time=moment(item.created_at).format('hh:mm ddd')
    var Dateval=moment(item.created_at).format('ll')
   
    return (
      <View  style={{backgroundColor:'#FFE2E6',width:deviceWidth-20,borderRadius:10,padding:10,marginTop:10,elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 1}}>
           <View style={{flexDirection:'row',justifyContent:'space-between',}}>
             <Text style={{color:"#484347", width:deviceWidth-120,fontSize:20, marginTop:10 ,fontWeight:'400',marginLeft:10}}>{item.title}</Text>  
             <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,marginRight:10}}>{Time}</Text>  
           </View>

           <View style={{paddingBottom:10}}>
               <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,marginLeft:10}}>{Dateval}</Text> 
               <Hyperlink linkStyle={ { color: "blue" } } linkDefault={ true }  >
                <Text style={{marginTop:5,marginLeft:10}}>{item.message}</Text>
              </Hyperlink>
               
               
           </View>
           <TouchableOpacity onPress={()=>this.slider(item.files)}>
           {item.files!=null &&
            <FlatList
                   data={item.files}
                   
                   numcolumns={1}
                   extraData={this.state}
                   renderItem={this.renderItemdata2}
                   />
          
           }
           </TouchableOpacity>
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
        </View>     
    )
  };
  
  renderItemdata2=({item,index})=>{
    
     var uri= 'http://wesmart.in/backend/public/files/broadcast/'
    
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
   
  render() {
    

    return (
      <Container>
       
              <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={Platform.OS === "ios" ? styles.contentstyleios : styles.contentstyle}> 
              <View style={{ flexDirection:'row', marginTop:'5%' ,justifyContent:'space-between',alignItems:'center'}} >
                <View style={{  flexDirection:'row',marginBottom:10}} >
                  <Button transparent onPress={() => { (this.props.userType == 'Teacher') ?Actions.CustomerHome()  : Actions.BarberHome() } }>
                     <Icon
                      name="md-arrow-back"
                      style={{ fontSize: deviceHeight/30, color: "#000000" }}
                    />                          
                  </Button>
                  <View style={{ flexDirection:'row',}} >
                   
                  <Text style={{ color:"#000", fontSize:deviceHeight/44,fontWeight:'bold',marginLeft:10,marginTop:10}}>
                    Feeds
                  </Text>     
                  </View>
                  
                </View>
               
              </View>
             </ImageBackground>
              <Content style={{ backgroundColor: "#FFFFFF",}}>
                 <ScrollView style={{backgroundColor:'#FFFFFF',marginBottom:0,marginLeft:10,width:deviceWidth-20}}>
                 { this.state.studentboarddata.length>0 &&
                  <FlatList
                   data={this.state.studentboarddata}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   />
                 }
              </ScrollView>
               </Content>

              
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
                       source={{uri: uri+encodeURIComponent(this.state.images[0].file)}}
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
                    
                    indicatorStyle={{color:'#BA043D'}}
                    component={<ChildItem />}/>
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
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Schoolfeedback);
