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
  Linking,TextInput,KeyboardAvoidingView,
  BackHandler,
  ActivityIndicator
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

import SearchableDropdown from 'react-native-searchable-dropdown';
import DatePicker from 'react-native-datepicker'; 
import { setActiveLogin } from "../../../actions/common/entrypage";
import {createhomeworksbyteacher,TeacherClassesList,TeachersubjectList } from "../../../actions/common/signin";
import { checkSubscription } from "../../../actions/common/all";
import { acceptAppointment, rejectAppointment, upcomingBooking, setUserLocationNew, startWalkForAppointment, deleteAppointment, getNotificationList } from "../../../actions/common/booking";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import moment from "moment/moment";
import { connectionState } from "../../../actions/network";
import ImagePicker from "react-native-image-picker";
import SplashScreen from "react-native-splash-screen";
import MultiSelect from 'react-native-multiple-select';
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
import RNFS from 'react-native-fs';
import Modal from "react-native-modal";
import FilePickerManager from 'react-native-file-picker';

function mapStateToProps(state) {
  return {
    user: state.driver.user,
    user:state.driver.user.teacherinfo,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid, 
    classlist:state.driver.user.classlist,
    schoolid:state.driver.user.teacherlogin.schoolid,
     
    subjectlist:state.driver.user.homework,
   };
}

class Addhomework extends Component {
  constructor(props) {
    super(props);
   
    this.state = {

      subjectlist:[],
      classlist:this.props.classlist,
    //  selectedItems: this.props.classlist,
       selectsubject:this.props.subjectlist,
      checked:1,
      schoolid:this.props.schoolid,
      teacherid:this.props.userid,
      classid:'',
      subjectid:'',
      submitable:1,
      title:'',
      description:'',
      class:'',
      refrence2:'',
      refrence1:'',
      Subject:'',
      Homeworktitle:'',
      time:'',
      filedata:[],
      Date:new Date(),
      deleteimage:'',
      selectedItems:[],
      showloader:false,
      video:false,
      showmodal:false,
     };
    
  }
  
  componentDidMount(){
    
      // this.props.createhomeworksbyteacher(this.props.jwtAccessToken)
      this.props.TeacherClassesList(this.props.jwtAccessToken,this.props.userid)
      
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

  clearSelectedCategories = () => {
   this._multiSelect._removeAllItems();
};

  showmodal(){
    this.setState({ showmodal:true })
  }

   _pickImage() {
    this.setState({showloader:false,video:false,showmodal:false})
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      mediaType: 'photo',
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

  _pickImage1() {
    if(this.state.filedata.length >0){
        alert('You only attach one video, please remove added files to continue')
    }else {
      this.setState({showmodal:false})
      var options = {
        title: "Select Video",
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        mediaType: 'video',
        videoQuality: 'low',
        durationLimit:180,
      };
      ImagePicker.launchImageLibrary(options, response => {
        
          this.setState({showloader:true,video:true})
          if(response.uri!=undefined){
             var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                  let tempArray = this.state.filedata;
                  tempArray.push('data:video/mp4;base64,'+res);
                  this.setState({filedata:tempArray });
                  this.setState({showloader:false})
              })
          }else {
            this.setState({showloader:false})
          }
      });
    }
  }

   _pickImage2(){
    if(this.state.filedata.length >0){
        alert('You only attach one file, please remove added files to continue')
    }else {
      this.setState({showmodal:false,video:true})

    FilePickerManager.showFilePicker(null, (response) => {
          if (response.didCancel) {
            
          }
          else if (response.error) {
           
          }else {
              if(response.type=='application/pdf'){
                  if(response.uri!=undefined){
                     var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                          let tempArray = this.state.filedata;
                          tempArray.push('data:application/pdf;base64,'+res);
                          this.setState({filedata:tempArray });
                      })
                  }                  
              }else {
                alert('Only pdf file allowed')
              }
         }
        
      });
    }
  }

  _pickImage3(){

    if(this.state.filedata.length >0){
        alert('You only attach one file, please remove added files to continue')
    }else {
      this.setState({showmodal:false,video:true})

    FilePickerManager.showFilePicker(null, (response) => {
          if (response.didCancel) {
            
          }
          else if (response.error) {
            
          }else {
              if(response.type=='audio/mpeg'){
                  this.setState({showloader:true,video:true})
                  if(response.uri!=undefined){
                     var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                      
                          let tempArray = this.state.filedata;
                          tempArray.push('data:video/mp3;base64,'+btoa(res));
                          this.setState({filedata:tempArray });
                          this.setState({showloader:false})
                      })
                  }else {
                    this.setState({showloader:false})
                  }
              }else {
                alert('Only mp3 file allowed')
              }
         }
        
      });
     }
  }
  
  _pickImage4(){

    if(this.state.filedata.length >0){
        alert('You only attach one file, please remove added files to continue')
    }else {
      this.setState({showmodal:false,video:true}) 

    FilePickerManager.showFilePicker(null, (response) => {
          if (response.didCancel) {
           
          }
          else if (response.error) {
            
          }else {
              if(response.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
                  if(response.uri!=undefined){
                     var data = RNFS.readFile( response.uri, 'base64').then(res => { 
                          let tempArray = this.state.filedata;
                          tempArray.push('data:application/doc;base64,'+res);
                          this.setState({filedata:tempArray });
                      })
                  }
              }else {
                alert('Only document file allowed')
              }
         }
        
      });

     }

  }
 
  savedata(){
      if(this.state.title==""){
          alert('Title is required');
      }else if(this.state.description==""){
        alert('Description is required');
      }else if(this.state.class==""){
        alert('Class is required');
      }else if(this.state.Subject==""){
        alert('Subject is required');
      }else {
          if(this.state.selectedItems.length>0){
             for(var i=0;i < this.state.selectedItems.length;i++){
                var field= [];
                field.title=this.state.title;
                field.description=this.state.description;
                field.filedata=this.state.filedata;
                field.refrencedata='1';
                field.refrencedata2='2';
                field.checked=this.state.checked;
                field.Date=this.state.Date;
                field.schoolid=this.state.schoolid;
                field.teacherid=this.state.teacherid;
                field.classid=this.state.selectedItems[i];
                field.subjectid=this.state.Subject;
                field.submitable = 1;
                
                this.props.dispatch(createhomeworksbyteacher(this.props.jwtAccessToken,field)); 
              }
          }
            alert('Homework added successfully!')
            Actions.CustomerHome();
        }
  }


  checkBoxtTest(){
    this.setState( { isSelected:!this.state.isSelected} )
  }
   
   deleteimagedata(filedata){
    
   if(this.state.filedata.includes(filedata) == true){
     this.state.filedata.pop(filedata);
     this.setState({filedata:this.state.filedata});
    }
    
   }

   onSelectedItemsChange = selectedItems => {
    
    this.setState({ selectedItems });
    this.subjectselectlist(selectedItems[0]);
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
     //this.props.TeachersubjectList(this.props.jwtAccessToken,this.props.userid,itemValue)
  }
  
  renderimage=(item,index)=>{
   
    return(
               <View style={{height:50}}>
                { this.state.video==true ?
                   <Image source={require("../../../../assets/images/play_icon.png")} style={{ width:40, height: 40,marginLeft:10, }} /> 
                :
                  <Image source={{ uri: item.item }} style={{ width:40, height: 40,marginLeft:10, }} /> 
                } 
                  {item.item.length>0 &&
                    <TouchableOpacity onPress={()=>this.deleteimagedata(item.item)} style={{position:'absolute',top:0,right:0}}>
                  <Image
                         source={require("../../../../assets/images/Group_17099.png")}
                         style={{ width:13.04, height: 13.71 }}
                         
                    />
                    </TouchableOpacity>
                  }
               </View>
               )
  }
  
  render() { 
  const { selectedItems } = this.state;


    return(
      <Container style={{ backgroundColor: '#F8FAFA'}}>
      <Content style={{backgroundColor:'#e6e6e6'}}>
             <View style={{marginTop:10,}}>
                   <Button transparent onPress={() => Actions.pop()}>
                      <Icon
                        name="md-arrow-back"
                        style={{ fontSize: 28, color: "#000000" }}
                      />
                        <Text style={{color:'#000',fontSize:deviceHeight/50}}> Add Homework </Text>                            
                    </Button>
              </View>
              <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center',backgroundColor:'#F8FAFA'}} behavior="padding"  keyboardVerticalOffset={70}>
              <ScrollView style={{marginBottom:120}}>
              
              <View style={{marginTop:10}}>
             
                 <MultiSelect
                  hideTags
                  ref={c => this._multiSelect = c}
                  items={this.state.classlist}
                  uniqueKey="id"
                  ref={(component) => { this.multiSelect = component }}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="Select Class"
                  searchInputPlaceholderText="Search class..."
                  onChangeInput={ (text)=> console.log(text)}
                  tagRemoveIconColor="#FFFFFF"
                  styleTextDropdown={{paddingLeft:'5%'}}
                  styleTextDropdownSelected={{paddingLeft:'5%'}}
                  tagBorderColor="#7FBD7B"
                  tagContainerStyle={{backgroundColor:'#7FBD7B'}}
                  tagTextColor="#fff"
                  selectedItemTextColor="#000"
                  selectedItemIconColor="#7FBD7B"
                  itemTextColor="#000"
                  displayKey="class"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#7FBD7B"
                  submitButtonText="Submit"
                  styleMainWrapper={{margin:5}}
                  styleDropdownMenu={{borderColor:'red'}}
              />
              
              
              { selectedItems.length>0 &&
                  <View style={{margin:5,}}>
                    {this.multiSelect.getSelectedItemsExt(selectedItems)}
                  </View>
              }
              
              <View style={{borderColor:'#000',borderWidth:1,marginLeft:'2%',marginRight:'8%',borderRadius:5,marginTop:10,width:'95%'}}>
              
                <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={{ marginLeft: 10, color: '#000000',}}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
                        selectedValue={this.state.Subject}  
                        onValueChange={(itemValue) =>  
                        this.setState({Subject: itemValue })}  
                  >  
                    <Picker.Item label={'Subject'} value='' style={{color:'#000000'}}  />
                  {this.state.subjectlist && this.state.subjectlist.map(function(item,index){
                    
                    return(
                       <Picker.Item label={item.name} value={item.id} style={{color:'#000000'}} />
                      )
                  })}
                   
                    </Picker>
                
         </View>
                   
                     <View style={{ flexDirection:'row', marginLeft:10,marginTop:20,width:'95%'}} >
                        <TextInput
                          placeholder='Homework title'
                          style={{ borderColor:'#2A3439', borderWidth:1,  color:'#000', height:40, width:deviceWidth-20, fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                           onChange={(event) => this.setState({title: event.nativeEvent.text})}
                           value={this.state.title}
                          
                        />            
                     </View>
                     <View style={{ flexDirection:'row',marginLeft:10, marginTop:20,width:'95%',height:100}}>
                        <TextInput
                          placeholder='Homework description'
                          style={{ borderColor:'#2A3439', borderWidth:1,  color:'#000', width:deviceWidth-20, fontSize:16,borderRadius:5,}}
                          multiline
                          numberOfLines={1}
                          placeholderTextColor="#777"
                          editable={true}
                           onChange={(event) => this.setState({description: event.nativeEvent.text})}
                           value={this.state.description}
                          
                        />            
                     </View>
                     {this.state.showloader==true ?
                            <View style={{width:deviceWidth,alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator
                              size="large"
                              color={"#E91E63"}
                              style={{
                                 marginTop:110,
                                alignItems: "center",justifyContent: 'center',
                              }}
                            />
                             <Text style={{color:'#000', fontSize:16, }}>Video Uploading...</Text>
                            </View>
                           :
                          <TouchableOpacity onPress={()=>this.showmodal()}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                                 <Text style={{color:'#000',marginRight:10}}> Add Media</Text>
                                 <Image                      
                                          source={require("../../../../assets/icon/Group_17257.png")}
                                          style={{ width:20, height: 20}}
                                        /> 
                               </View>
                            </TouchableOpacity>
                          } 

                     <View>
                      <FlatList
                       style={{ margin:10}}
                       data={this.state.filedata}
                       extraData={this.state}
                       horizontal={true}
                       renderItem={this.renderimage}
                        />
                     </View>
                     
                     

                    
                     
                      
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
                      <View style={{backgroundColor:'#470B63',width:deviceWidth-20,justifyContent: 'center',alignItems: 'center',margin:10,borderRadius:5,}}>
                          <Button 
                            transparent 
                            onPress={() => this.savedata()}>
                      
                               <Text style={{color:'#fff',textAlign:'center',width:deviceWidth-40}}> Send </Text>                            
                          </Button>
                      </View>
                     
                      
              </View>
              </ScrollView>
          </KeyboardAvoidingView> 
              
                
           </Content> 
           <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}
                onRequestClose={() => {
                this.setState({showmodal:false});
               }}
            >
            <View>
              <View style={{ height:260, borderRadius:30,  borderColor:'#000', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8, shadowRadius: 1,backgroundColor: '#ffffff', }}>
            
            <TouchableOpacity
                 style={{justifyContent:'flex-end',flexDirection:'row',marginTop:20,marginRight:30}}
                 onPress={() => this.setState({showmodal:false})}
            >
              <Image
                   source={require("../../../../assets/images/Group_17138.png")}
                   style={{ width:20, height: 20, borderRadius:20 }}
              />                         
           </TouchableOpacity>
           <View style={{ width:deviceWidth-150, marginLeft:55}}>
                 
            <TouchableOpacity onPress={()=>this._pickImage()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:140}}> Select Photo</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage1()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:140}}> Select Video</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage2()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:140}}> Select PDF</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage3()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:140}}> Select Audio</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this._pickImage4()}>
              <View style={{flexDirection:'row',justifyContent:'center',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
                   <Text style={{color:'#000',marginRight:10,width:140}}> Select Document</Text>
                   <Image                      
                            source={require("../../../../assets/icon/Group_17257.png")}
                            style={{ width:20, height: 20}}
                          /> 
                 </View>
              </TouchableOpacity>

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
   TeachersubjectList:(data,userid,classid)=>dispatch(TeachersubjectList(data,userid,classid)),
    TeacherClassesList:(data,userid)=>dispatch(TeacherClassesList(data,userid)),
    createhomeworksbyteacher:(token,data) => dispatch(createhomeworksbyteacher(token,data)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Addhomework);
