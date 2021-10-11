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
  Linking,TextInput,KeyboardAvoidingView,BackHandler
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
  Col,Input,CheckBox,
  Picker
} from "native-base";
import PropTypes from "prop-types";
import DatePicker from 'react-native-datepicker'; 
import SplashScreen from "react-native-splash-screen";


import { setActiveLogin } from "../../../actions/common/entrypage";
import { edithomeworksbyteacher,teacherhomeworks,TeachersubjectList,TeacherClassesList } from "../../../actions/common/signin";
import { checkSubscription } from "../../../actions/common/all";
import { acceptAppointment, rejectAppointment, upcomingBooking, setUserLocationNew, startWalkForAppointment, deleteAppointment, getNotificationList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import ImagePicker from "react-native-image-picker";

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
import  Footer from "../../../components/footer";
import config from "../../../../config.js";

function mapStateToProps(state) {
  return {
    user: state.driver.user,
    user:state.driver.user.teacherinfo,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    //homework:state.driver.user.homework,
    userid:state.driver.user.teacherlogin.teacherid,
    // classid:state.driver.user.classlist[0].id,
    // subjectid:state.driver.user.subjectlist[0].id,
    // subjectlist:state.driver.user.subjectlist,
    classlist:state.driver.user.classlist,
   };
}

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classlist:this.props.classlist,
      subjectlist:[],
      checked:false,
      schoolid:'',
      teacherid:'',
      classid:'',
      subjectid:'',
      submitable:'',
      title:'',
      description:'',
      class:'',
      refrence2:'',
      refrence1:'',
      Subject:'',
      filedata:'',
      classname:'Select Class',
      subjectname:'Select Subject',
      Date:new Date(),
    };
    
  }
   
  componentDidMount(){
    //this.props.TeacherClassesList(this.props.jwtAccessToken,this.props.userid)
    this._retrieveid()
    // this.props.createhomeworksbyteacher(this.props.jwtAccessToken)
  
      
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


_pickImage() {
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
        //alert(response.uri );
        
        this.setState({filedata: response.uri });
    });
  }


_retrieveid = async () => {
  try {
    const value = await AsyncStorage.getItem('selectid:id');
    const title = await AsyncStorage.getItem('selectid:title');
    const description = await AsyncStorage.getItem('selectid:description');
    const classid = await AsyncStorage.getItem('selectid:classid');
    const subjectid = await AsyncStorage.getItem('selectid:subjectid');
    const schoolid = await AsyncStorage.getItem('selectid:schoolid');
    const teacherid = await AsyncStorage.getItem('selectid:teacherid');
    const classname = await AsyncStorage.getItem('selectid:classname');
    const subjectname = await AsyncStorage.getItem('selectid:subjectname');
    
    this.setState({homeworkid:value})
    this.setState({title:title})
    this.setState({description:description})
    this.setState({class:classid})
    this.setState({Subject:subjectid})
    this.setState({schoolid:schoolid})
    this.setState({teacherid:teacherid})
    this.setState({classname:classname})
    this.setState({subjectname:subjectname})
    this.subjectselectlist(classid);
  } catch (error) {
    // Error retrieving data
  }
};

 subjectselectlist(itemValue){
      this.setState({class: itemValue })
    
     fetch(`${config.serverSideUrl}/homework/TeacherSubjectByClass/${this.props.userid}/${itemValue}`, {
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
            this.setState({subjectlist:data})
            
            //dispatch(subjectlist(data))
        } 
    })
    .catch(e => {
              
    });
  }
 
   savedata(id){

   var field= [];
   field.id=id
   if(this.state.title==""){
          alert('Title is required');
      }else if(this.state.description==""){
        alert('Description is required');
      } else {
           field.title=this.state.title;
           field.description=this.state.description;
           field.filedata=this.state.filedata;
           field.submitable = 1;
           field.Date=this.state.Date;
           field.schoolid=this.state.schoolid;
           field.teacherid=this.state.teacherid;
           field.classid=this.state.class;
           field.subjectid=this.state.Subject;
            
           this.props.dispatch(edithomeworksbyteacher(this.props.jwtAccessToken,field)); 
            alert('Homework updated successfully');
          Actions.CustomerHome();
    }
  }
  checkBoxtTest(){
    this.setState(
        {isSelected:!this.state.isSelected}
        )}
  

  
  render() { 
   
//alert(this.state.class)
    return(
      <Container style={{ backgroundColor: '#F8FAFA' ,}}>
      <Content style={{marginBottom:120}}>
             <View style={{marginTop:10,}}>
                   <Button transparent onPress={() => Actions.pop()}>
                      <Icon
                        name="md-arrow-back"
                        style={{ fontSize: 28, color: "#000000" }}
                      />
                        <Text style={{color:'#000',  fontSize:deviceHeight/38,paddingTop:5}}> Edit Homework </Text>                            
                    </Button>
              </View>
              <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center',backgroundColor:'#F8FAFA'}} behavior="padding"  keyboardVerticalOffset={70}>
              <ScrollView>
              <View style={{backgroundColor:"#fff"}}>
                     <View style={{borderColor:'gray',borderWidth:1,marginLeft:'2%',width:deviceWidth-30,borderRadius:5}}>
                    
                     <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={{ marginLeft: 10,  }}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
                        selectedValue={this.state.class}
                        onValueChange={(itemValue, itemPosition) => this.subjectselectlist(itemValue)}  
                    >  
                   <Picker.Item label={this.state.classname} value={this.state.class} style={{color:'#000000'}}  />
                    { this.state.classlist && this.state.classlist.map(function(item,index){
                       return(
                             <Picker.Item label={item.class} value={item.id} style={{color:'#000000'}}/>
                             )
                     })}
                    
                    </Picker>
                  </View>
                  
                    
               <View style={{borderColor:'gray',borderWidth:1,marginLeft:'2%',width:deviceWidth-30,borderRadius:5,marginTop:10}}>
                    <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={{ marginLeft: 10, width: '92%', borderColor:'#000',borderWidth:1,marginTop:10 }}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
                        selectedValue={this.state.Subject}
                        onValueChange={(itemValue, itemPosition) =>  
                        this.setState({Subject: itemValue })}  
                  > 
                   <Picker.Item label={this.state.subjectname} value={this.state.Subject} style={{color:'#000000'}}  /> 
                  { this.state.subjectlist && this.state.subjectlist.map(function(item,index){

                    return(
                       <Picker.Item label={item.name} value={item.id} style={{color:'#000000'}} />
                      )
                  })}
                   
                    </Picker>
                </View>
                  
                
                     <View style={{ flexDirection:'row', width:deviceWidth,margin:10}} >
                        <TextInput
                          placeholder='Homework title'
                          style={{ borderColor:'#2A3439', borderWidth:1,  color:'#000', height:50,  fontSize:16, padding:5,borderRadius:5,width:deviceWidth-30}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                           onChange={(event) => this.setState({title: event.nativeEvent.text})}
                           value={this.state.title}
                          
                        />            
                     </View>
                     <View style={{ flexDirection:'row', width:deviceWidth,margin:10}} >
                        <TextInput
                          placeholder='Homework description'
                          style={{ borderColor:'#2A3439', borderWidth:1,  color:'#000', height:100, fontSize:16, padding:5,borderRadius:5,width:deviceWidth-30}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                           onChange={(event) => this.setState({description: event.nativeEvent.text})}
                           value={this.state.description}
                          
                        />            
                     </View>
                     <TouchableOpacity onPress={() => this._pickImage()} style={{width:50,height:50}}>
                     <View style={{ flexDirection:'row', marginLeft:10, marginRight:40 ,marginTop:20,marginBottom:20}} >
                        <Text style={{  color:'#000',fontSize:20, padding:5,width:'95%'}}>Attach file</Text> 
                         
                         <Image                      
                          source={require("../../../../assets/images/greenplus.png")}
                          style={{ width:20, height: 20, position:'absolute', right:10 ,marginTop:5}}
                         />  
                                  
                     </View>
                    </TouchableOpacity>  
                      
                      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,marginLeft:10,marginRight:20,marginTop:20}}>

                        <View style={{flexDirection:'row'}}>
                            <CheckBox
                                checked={this.state.checked}
                                onPress={() => this.setState({checked: !this.state.checked})}
                            />
                            <Text style={{marginLeft:20}}>Submitable</Text>
                        </View>
                         <View style={{borderWidth:1,borderColor:'gray',marginTop:-10}}> 
                              
                               <DatePicker
                                  defaultDate={new Date()}
                                  placeholder="Start"
                                  textStyle={'#000'}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  placeHolderTextStyle={'#000'}
                                  onDateChange={time => {
                                      this.setState({ Date: time });
                                  }}
                                  date={this.state.Date}
                                  customStyles={{
                                      dateInput: {
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        borderWidth: 0,
                                      },
                                      dateText:{
                                        color: "#000000",
                                        fontSize: 15,
                                        alignSelf:'center', 
                                        textAlign:'center',                
                                      }
                                    }}
                               />
                         </View>
                      </View>
                      <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center', backgroundColor:'#470B63',margin:10,borderRadius:5,height:50}}  onPress={() => this.savedata(this.state.homeworkid)}>
                          <Text style={{color:'#fff',}}> Send </Text>                            
                       </TouchableOpacity>
                     <View>
                        <Image                      
                          source={{ uri: this.state.filedata }}
                          style={{ width:300, height: 150,marginLeft:30, }}
                        /> 
                     </View>

              </View>
              </ScrollView>
          </KeyboardAvoidingView> 
              
                
           </Content> 
          <Footer/>

      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    teacherhomeworks:(data,userid)=>dispatch(teacherhomeworks(data,userid)),
    TeachersubjectList:(data,userid,classid)=>dispatch(TeachersubjectList(data,userid,classid)),
     TeacherClassesList:(data,userid)=>dispatch(TeacherClassesList(data,userid)),
    edithomeworksbyteacher:(token,data) => dispatch(edithomeworksbyteacher(token,data)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Edit);
