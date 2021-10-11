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
  Linking,BackHandler
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
  Col,Input,Form,Textarea
} from "native-base";
import PropTypes from "prop-types";


import { homeworksubmitbystudent } from "../../../actions/common/signin";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import ImagePicker from "react-native-image-picker";
import SplashScreen from "react-native-splash-screen";
import SyncStorage from 'sync-storage';
import config from "../../../../config.js";
import RNFS from 'react-native-fs';

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;

import  Footernew  from "../../../components/footernew";
  
function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    user: state.driver.user,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    appointmentList: state.booking.appointmentList,
    profileUrl: state.driver.user.profileUrl,
    userid:state.driver.user.studentlogin.studentid,
    username:state.driver.user.student,
  };
}

class Schoolassignments extends Component {
  

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      title:'',
      homeworkid:'',
      studentid:this.props.userid,
      filedata:[],
      Assignmenttitle:'',

      
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

getresponselastseen(){
  
  
  fetch(`${config.serverSideUrl}/student/seenhomework/${this.props.userid}/${this.state.homeworkid}`, {
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
              
                this.setState({homeworkseen:data});
                //dispatch(getteacherhomeworks(data))
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
  

   componentDidMount(){
    this._retrieveid()
    var that = this;
    setTimeout(() => {
        // that.getresponselastseen();
      }, 200);
    
     }

  _retrieveid = async () => {
  try {
    const value = await SyncStorage.get('selectid:id');
    const title=await SyncStorage.get('title');
    this.setState({Assignmenttitle:title})
     this.setState({homeworkid:value})
       
  } catch (error) {
    // Error retrieving data
  }
};


 _pickImage() {
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
        if(response.uri!=undefined){
           var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                let tempArray = this.state.filedata;
                tempArray.push('data:image/png;base64,'+res);
                this.setState({filedata:tempArray });
            })
        }
    });
  }
 
  deleteimagedata(filedata){
    
   if(this.state.filedata.includes(filedata) == true){
     this.state.filedata.pop(filedata);
     this.setState({filedata:this.state.filedata});
    }
    
   }
  Submit(){
      
      if(this.state.title==""){
          alert('Title is required');
      }else {
           var field= [];
           //field.class=this.state.class;
           //field.Subject=this.state.Subject;
            field.title=this.state.title;
            field.homeworkid=this.state.homeworkid;
            field.studentid=this.state.studentid;
            field.filedata=this.state.filedata;
            alert('Your assignment has been submitted successfully')
            
            this.props.dispatch(homeworksubmitbystudent(this.props.jwtAccessToken,field)); 
            Actions.BarberHome();
             
            
        }
  }

 
  renderItem2 = ({item, index}) => {
    
       

    return (
      <TouchableOpacity style={{backgroundColor:item.color,width:'93%', borderRadius:10,marginLeft:15,marginTop:10, padding:20}}>
           <View style={{flexDirection:'row',justifyContent:'space-between',}}>
           <Text style={{color:"#484347", fontSize:18, marginTop:10 ,fontWeight:'400'}}>{item.Title}</Text>  
           <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,marginRight:10}}>{item.Time}</Text>  
           </View>
           <View>
               <Text style={{color:"#707070", fontSize:12,fontWeight:'bold',marginTop:10,}}>{item.Text}</Text> 
           </View>
            <View>
                
            </View>
            <View style={{marginTop:10}}></View>

        </TouchableOpacity>        
               
    )
  };
 renderItem3 = ({item, index}) => {
    
    return (
      <View style={{backgroundColor:'red'}}>
      <View style={styles.box}>
               <View style={{width:373,height:175}}>
                       <Text style={styles.textheading}>
                          School                      
                        </Text>
                         <Text style={{color:"#484347", fontSize:15,fontWeight:'bold',marginLeft:30}}>
                          BoardCast                     
                        </Text>
                        <Text style={styles.subtext}>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing elit  Lorem ip                 
                        </Text>
                         <Button
                          style={{backgroundColor:'#DB4C7B',width:88,borderRadius:90,height:26,marginLeft:20,marginTop:10,paddingBottom:5}}
                          >
                         <Text style={{ color: "#fff", fontSize: 11,textalign:'center', }}> View All</Text>
                        </Button>
                 </View>
                 <View style={{width:'40%'}}>
                  

                  </View>
           </View>
        </View>         
               
    )
  };

renderimage=(item,index)=>{
   
    return(
               <View style={{height:50}}>

                  <Image                      
                    source={{ uri: item.item }}
                    style={{ width:40, height: 40,marginLeft:10, }}
                  /> 
                  {item.item.length>0 &&
                    <TouchableOpacity onPress={()=>this.deleteimagedata(item.item)} style={{position:'absolute',top:0,right:0}}>
                  <Image
                         source={require("../../../../assets/images/Group_17099.png")}
                         style={{ width:18.04, height: 18.71 }}
                         
                    />
                    </TouchableOpacity>
                  }
               </View>
               )
  }
 
  
  render() { 
   

    return(
      <Container style={{ backgroundColor: '#fff' ,}}>
       
           <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: deviceWidth, height: deviceHeight/5, resizeMode:'cover',}}> 
              <View style={{marginTop:30}}>
              <Button transparent onPress={() => Actions.pop()}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: "#000000" }}
                  />
                                                
                </Button>
               <View style={{ justifyContent:'center', marginLeft:30 }} >
                    <Text style={{ color:"#484347", fontSize:22, fontWeight:'bold' }}>
                      Hi ,{this.props.username.name}
                    </Text> 
                    <Text style={{ color:"#5A5A66", fontSize:17, marginTop:10 }}>
                      Submit Your Homework
                    </Text>                    
                  </View>
               </View>
               
               
               
                </ImageBackground>
                <View style={{borderRadius:10,backgroundColor:'#FFE3E5',height:40,justifyContent:'center',margin:20}}>
                   <Text style={{marginLeft:10,color:'#000'}}>{this.state.Assignmenttitle}</Text>
               </View>
                <View style={{marginTop:10,marginLeft:20,marginRight:20,height:140,backgroundColor:'#FFE3E5',borderRadius:10}}>
                 
                   <Textarea  
                              rowSpan={5} 
                              placeholder="Description" 
                              style={{margin:10}} 
                                onChange={(event) => this.setState({title: event.nativeEvent.text})}
                               value={this.state.title}
                              />

                    
                      <View style={{backgroundColor:'#D22D80',width:30,height:30,borderRadius:15,position:'absolute',bottom:10,right:10,padding:5}}>
                         <TouchableOpacity  onPress={() => this._pickImage()}>
                          <Image
                             source={require("../../../../assets/images/Group_17046.png")}
                             style={{ width:20, height: 20 }}
                          />
                          </TouchableOpacity>
                      </View>
                    
                    
               </View>
               <TouchableOpacity style={{borderRadius:10,backgroundColor:'#470B63',height:50,justifyContent:'center',marginLeft:20,marginRight:20,alignItems:'center',marginTop:20}} onPress={(value) => this.Submit()}  >
                   <Text style={{fontWeight:'300',color:'#FFFFFF',fontWeight:'bold',fontSize:18}}>Submit Now</Text>
               </TouchableOpacity>
             
               <View style={{flexDirection:'row',margin:30}}>
                
                 <View>
                 
                      <FlatList
                       style={{ margin:10}}
                       data={this.state.filedata}
                       extraData={this.state}
                       horizontal={true}
                       renderItem={this.renderimage}
                        />
                 </View>
                 
               
               </View>
             
            
          <Footernew />

      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    homeworksubmitbystudent:(token,data)=>dispatch(homeworksubmitbystudent(token,data))
   
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Schoolassignments);
