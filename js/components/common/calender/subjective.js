import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, 
         Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
import ImagePicker from "react-native-image-picker";
import SyncStorage from 'sync-storage';
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
import { createchapter} from "../../../actions/common/signin";
import config from "../../../../config.js";
const XDate = require('xdate');
import  Footer  from "../../../components/footer";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import RNFS from 'react-native-fs';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid,    
    schoolid:state.driver.user.teacherlogin.schoolid,    
  };
}
class Subjective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       data2:[{month:'jan'},{month:'Feb'},{month:'March'},{month:'April'},{month:'May'},{month:'june'},{month:'july'},{month:'Aug'},{month:'Sep'},{month:'Oct'},{month:'Nov'},{month:'Dec'}],
       Chapter:'',
       questions:'',
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      marks:'',
      selectedCal: undefined,
      classid:'',
      subjectid:'',
      chapterlistdata:[],
      chapterName:'',
      chapterfill:false,
      filedata:''
      
    }
  }




componentDidMount() {
    this.retriveid();
     var that = this;
       setTimeout( function(){
        that.chapterdropdowndata();
        },1500)
 
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  retriveid(){
    const classid=SyncStorage.get('classid');
    const subjectid=SyncStorage.get('subjectid');
    this.setState({classid:classid});
    this.setState({subjectid:subjectid})
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
        if(response.uri!=undefined){
          this.setState({filedata: response.uri });
            var data = RNFS.readFile( response.uri, 'base64').then(res => { 
              this.setState({filedata: 'data:image/png;base64,'+res });
            })
        }
    });
  }

chapterdropdowndata(){
  fetch(`${config.serverSideUrl}/chapter/byclasssubject/${this.props.schoolid}/${this.state.classid}/${this.state.subjectid}`, {
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
          
            this.setState({chapterlistdata:data})
            
            //dispatch(subjectlist(data))
        } 
    })
    .catch(e => {
             
    });
}

   savedata(){
      
   
      if(this.state.Chapter==""){
          alert('Chapter name is required');
      }else if(this.state.questions==""){
        alert('questions is required');
      }else if(this.state.marks==""){
        alert('marks required')
      }else {
           var field= [];
           //field.class=this.state.class;
           //field.Subject=this.state.Subject;
            field.Chapter=this.state.Chapter;
            field.questions=this.state.questions;
            field.schoolid=this.props.schoolid;
            field.teacherid=this.props.userid;
            field.marks=this.state.marks;
            field.classid=this.state.classid;
            field.subjectid=this.state.subjectid;
            field.filedata=this.state.filedata;
            this.props.dispatch(createchapter(this.props.jwtAccessToken,field)); 
            alert('Chapter added successfully!')
            Actions.Subject();
        }
  }
  save(){
      
   
      if(this.state.Chapter==""){
          alert('Chapter name is required');
      }else if(this.state.questions==""){
        alert('questions is required');
      }else if(this.state.marks==""){
        alert('marks required')
      }else {
           var field= [];
           //field.class=this.state.class;
           //field.Subject=this.state.Subject;
            field.Chapter=this.state.Chapter;
            field.questions=this.state.questions;
            field.schoolid=this.props.schoolid;
            field.teacherid=this.props.userid;
            field.marks=this.state.marks;
            field.classid=this.state.classid;
            field.subjectid=this.state.subjectid;
            field.filedata=this.state.filedata;
            this.props.dispatch(createchapter(this.props.jwtAccessToken,field)); 
            alert('Chapter added successfully!')
            Actions.Subjective(); 
        }
  }
  save1(){
      
   
      if(this.state.Chapter==""){
          alert('Chapter name is required');
      }else if(this.state.questions==""){
        alert('questions is required');
      }else if(this.state.marks==""){
        alert('marks required')
      }else {
           var field= [];
           //field.class=this.state.class;
           //field.Subject=this.state.Subject;
            field.Chapter=this.state.Chapter;
            field.questions=this.state.questions;
            field.schoolid=this.props.schoolid;
            field.teacherid=this.props.userid;
            field.marks=this.state.marks;
            field.classid=this.state.classid;
            field.subjectid=this.state.subjectid;
            field.filedata=this.state.filedata;
            this.props.dispatch(createchapter(this.props.jwtAccessToken,field)); 
            alert('Chapter added successfully!')
            this.setState({questions:'',marks:''})
            //Actions.Subjective(); 
        }
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }

  callTimeScreen() {
    
    if(this.state.selectedDate && this.state.selectedDate >= moment().format('YYYY-MM-DD')){
      this.setState({ error: false })
      this.props.setBookingStep1(moment(this.state.selectedDate).format('YYYY-MM-DD'))  
    } else {
      this.setState({ error: true })
    }    
  }
  
  setDateFunction(dateString){
    this.setState({ selectedDate: dateString })
  }

  selectedMonth(months) {
    
    this.setState({ selectedCal:months[0].dateString })
  }

  getvaluechange(itemValue){
    if(itemValue=='add'){
      this.setState({ chapterfill:true });
    }else {
      this.setState({ chapterfill:false });
    }
    this.setState({Chapter: itemValue })
  }
 
  
  
   
  render() {
    

    return (
      <Container style={{ backgroundColor:'#ffffff'}}>
        <Header style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}>
          <Left>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent onPress={()=>Actions.Subject()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
               
            </View>
          </Left>
          <Body>
              <View style={{flexDirection:'row',marginLeft:40,marginTop:15,}}>
                   <TouchableOpacity  onPress={() => Actions.Subjective()}>
                    <View style={{backgroundColor:'#6D63D9',borderTopLeftRadius: 10,borderTopRightRadius: 10,width:90,height:50,paddingTop:15}}>
                       <Text style={{textAlign:'center',color:'#fff', fontSize:14}}>Subjective</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={() => Actions.Objective()}>
                  <View style={{backgroundColor:'#F0EFF9',width:110,height:40,paddingTop:10,borderTopRightRadius: 10,marginTop:10}}>
                     <Text style={{color:'#000000',textAlign:'center', fontSize:14}}>Objective</Text>
                  </View>
                  </TouchableOpacity>
               </View>
          </Body>
          <Right></Right>
        </Header>
        <Content style={{ backgroundColor: "#F9F9F9",marginBottom:120}}>
              
           
          <View style={{backgroundColor:'#fff', borderColor:'gray',elevation: 5,shadowColor: '#e6e6e6',shadowOffset: { width: 0, height: 1 },
                           shadowOpacity: 1.1,shadowRadius: 1,borderRadius:10,marginTop:10,height:50,justifyContent:'center',marginLeft:'5%',marginRight:'5%'}}>
            
            <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={styles.input}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center',marginRight:20}}
                        selectedValue={this.state.Chapter}  
                        onValueChange={(itemValue, itemPosition) =>  
                        this.getvaluechange(itemValue) }  
                  >  
                    <Picker.Item label={'Select Chapter'} value='' style={{color:'#000000'}}  />
                        {this.state.chapterlistdata && this.state.chapterlistdata.map(function(item,index){
                          return(
                             <Picker.Item label={item.chapter} value={item.chapter} style={{color:'#000000'}} />
                            )
                        })}
                        <Picker.Item label={'Add New'} value={'add'} style={{color:'#000000'}} />
                    </Picker>
           </View>  
          { this.state.chapterfill == true &&
           <View style={{backgroundColor:'#fff', borderColor:'gray',elevation: 5,shadowColor: '#e6e6e6',shadowOffset: { width: 0, height: 1 },
                           shadowOpacity: 1.1,shadowRadius: 1,borderRadius:10,marginTop:10,height:50,justifyContent:'center',marginLeft:'5%',marginRight:'5%'}}>
              <Input  placeholder='Type your Chapter here'
                    style={{ color:'#000', height:50, fontSize:16, padding:5,borderRadius:5}}
                    placeholderTextColor="#777"
                    onChange={(event) => this.setState({Chapter: event.nativeEvent.text})}
            />
          </View> 
        }

          <View style={{backgroundColor:'#fff',
                           
                           borderColor:'gray',
                           elevation: 5,shadowColor: '#e6e6e6',
                           shadowOffset: { width: 0, height: 1 },
                           shadowOpacity: 1.1,
                           shadowRadius: 1,marginLeft:20,marginRight:20,borderRadius:10,marginTop:20,}}>

          <Input 
                   placeholder='questions type your question' 
                   style={{fontSize:16,height:200,}} 
                   multiline={true}
                   numberOfLines={3}
                   onChange={(event) => this.setState({questions: event.nativeEvent.text})}
                    value={this.state.questions}
    
            />
          </View> 
          
           <TouchableOpacity onPress={ ()=> this._pickImage() }>
          <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
             <Text style={{color:'#000',marginRight:10}}> Add Media</Text>
             <Image                      
                      source={require("../../../../assets/icon/Group_17257.png")}
                      style={{ width:20, height: 20}}
                    /> 
          </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'center',}}>
             <Text style={{color:'#000',fontWeight:'300',fontSize:18}}> Give marks to this questions</Text>
             <View style={{backgroundColor:'#E8E8E8',width:50,height:40,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                 <Input 
                   placeholder='00' 
                   placeholderTextColor="#999"
                   style={{fontSize:14,textAlign:'center'}} 
                   onChange={(event) => this.setState({marks: event.nativeEvent.text})}
                    value={this.state.marks}
    
                 />
             </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
              <TouchableOpacity style={{borderColor:'#2680EB',width:200,height:50,borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center'}} onPress={()=>this.save1()}>
                  <Text style={{color:'#000',textAlign:'center',fontSize:14}}>Save & Add New</Text>
              </TouchableOpacity>
               <TouchableOpacity style={{backgroundColor:'#470B63',width:100,height:50,borderWidth:1,borderRadius:5,marginLeft:10,justifyContent:'center',alignItems:'center'}} onPress={()=>this.savedata()}>
                  <Text style={{color:'#ffffff',textAlign:'center',fontSize:16}}>Save</Text>
              </TouchableOpacity>
          </View>
          <View style={{ borderRadius:10, marginTop:10,marginBottom:10}}>
            <Image                      
              source={{ uri: this.state.filedata }}
              style={{ width:100, height: 100,marginLeft:10, borderRadius:10 }}
            />
          </View>
       </Content>
       <Footer />
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    
    createchapter:(token,data) => dispatch(createchapter(token,data)),
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Subjective);
