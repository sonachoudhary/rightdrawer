import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,
  TouchableOpacity, Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
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
import { createchapterobjective} from "../../../actions/common/signin";
import config from "../../../../config.js";
const XDate = require('xdate');
import  Footer  from "../../../components/footer";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
   userid:state.driver.user.teacherlogin.teacherid,    
    schoolid:state.driver.user.teacherlogin.schoolid,   
  };
}
class Objective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Chapter:'',
      Questions:'',
      Option:'',
      Option1:'',
      Option2:'',
      Option3:'',
      data2:[{month:'jan'},{month:'Feb'},{month:'March'},{month:'April'},{month:'May'},{month:'june'},{month:'july'},{month:'Aug'},{month:'Sep'},{month:'Oct'},{month:'Nov'},{month:'Dec'}],
       marks:'',
      selected: '',
      selectedDate: moment().format('YYYY-MM-DD'),
      chapterlistdata:[],
      error: false,
      selectedCal: undefined,
      chapterfill:false
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

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }

  retriveid(){
    const classid=SyncStorage.get('classid');
    const subjectid=SyncStorage.get('subjectid');
    this.setState({classid:classid});
    this.setState({subjectid:subjectid})
  }

  savedata(){
    if(this.state.Chapter==""){
      alert('field required')
    } else if(this.state.Questions==""){
      alert("question field can't be empty")
    } else if(this.state.Option==""){
      alert('options required ')
    }else if(this.state.Option1==""){
      alert('options required ')
    }else if(this.state.Option2==""){
      alert('options required ')
    }else if(this.state.Option3==""){
      alert('options required ')
    }else if(this.state.marks==""){
      alert('marks required')
    }else {
           var field= [];
           if(this.state.selected==1){
            var optionarr=[{'optionvalue':this.state.Option,'iscorrect':true},{'optionvalue':this.state.Option1,'iscorrect':false},{'optionvalue':this.state.Option2,'iscorrect':false},{'optionvalue':this.state.Option3,'iscorrect':false}];
           } else if((this.state.selected==2)){
               var optionarr=[{'optionvalue':this.state.Option,'iscorrect':false},{'optionvalue':this.state.Option1,'iscorrect':true},{'optionvalue':this.state.Option2,'iscorrect':false},{'optionvalue':this.state.Option3,'iscorrect':false}];
           } else if((this.state.selected==3)){
               var optionarr=[{'optionvalue':this.state.Option,'iscorrect':false},{'optionvalue':this.state.Option1,'iscorrect':false},{'optionvalue':this.state.Option2,'iscorrect':true},{'optionvalue':this.state.Option3,'iscorrect':false}];
           } else if((this.state.selected==4)){
               var optionarr=[{'optionvalue':this.state.Option,'iscorrect':false},{'optionvalue':this.state.Option1,'iscorrect':false},{'optionvalue':this.state.Option2,'iscorrect':false},{'optionvalue':this.state.Option3,'iscorrect':true}];
           }
            
           

            
           //field.class=this.state.class;
           //field.Subject=this.state.Subject;
            field.Chapter=this.state.Chapter;
            field.questions=this.state.Questions;
            field.schoolid=this.props.schoolid;
            field.teacherid=this.props.userid;
            field.marks=this.state.marks;
            field.classid=this.state.classid;
            field.subjectid=this.state.subjectid;
            field.options=optionarr
            alert('Chapter added successfully!')
            this.props.dispatch(createchapterobjective(this.props.jwtAccessToken,field)); 
            
            Actions.Subject(); 
        }

  }
  savedata1(){
    if(this.state.Chapter==""){
      alert('field required')
    } else if(this.state.Questions==""){
      alert("question field can't be empty")
    } else if(this.state.Option==""){
      alert('options required ')
    }else if(this.state.Option1==""){
      alert('options required ')
    }else if(this.state.Option2==""){
      alert('options required ')
    }else if(this.state.Option3==""){
      alert('options required ')
    }else if(this.state.marks==""){
      alert('marks required')
    }else {
           var field= [];
           if(this.state.selected==1){
            var optionarr=[{'optionvalue':this.state.Option,'iscorrect':true},{'optionvalue':this.state.Option1,'iscorrect':false},{'optionvalue':this.state.Option2,'iscorrect':false},{'optionvalue':this.state.Option3,'iscorrect':false}];
           } else if((this.state.selected==2)){
               var optionarr=[{'optionvalue':this.state.Option,'iscorrect':false},{'optionvalue':this.state.Option1,'iscorrect':true},{'optionvalue':this.state.Option2,'iscorrect':false},{'optionvalue':this.state.Option3,'iscorrect':false}];
           } else if((this.state.selected==3)){
               var optionarr=[{'optionvalue':this.state.Option,'iscorrect':false},{'optionvalue':this.state.Option1,'iscorrect':false},{'optionvalue':this.state.Option2,'iscorrect':true},{'optionvalue':this.state.Option3,'iscorrect':false}];
           } else if((this.state.selected==4)){
               var optionarr=[{'optionvalue':this.state.Option,'iscorrect':false},{'optionvalue':this.state.Option1,'iscorrect':false},{'optionvalue':this.state.Option2,'iscorrect':false},{'optionvalue':this.state.Option3,'iscorrect':true}];
           }
           //field.class=this.state.class;
           //field.Subject=this.state.Subject;
            field.Chapter=this.state.Chapter;
            field.questions=this.state.Questions;
            field.schoolid=this.props.schoolid;
            field.teacherid=this.props.userid;
            field.marks=this.state.marks;
            field.classid=this.state.classid;
            field.subjectid=this.state.subjectid;
            field.options=optionarr
            alert('Chapter added successfully!')
            this.props.dispatch(createchapterobjective(this.props.jwtAccessToken,field)); 
            this.setState({Questions:'',Option:'',marks:'',Option1:'',Option2:'',Option3:''})
            //Actions.Subject(); 
        }

  }
  selectedoptions(value){
    // alert(value)
    this.setState({selected: value})
    
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


getvaluechange(itemValue){
  if(itemValue=='add'){
    this.setState({ chapterfill:true });
  }else {
    this.setState({ chapterfill:false });
  }
  this.setState({Chapter: itemValue })
}
  
  renderItem2 = ({item, index}) => {
    
    return (
      <View style={{height:120,margin:5,padding:10}}>
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text> Chapter 1 </Text>
                    </View>
                    <View style={{backgroundColor:'#fff',
                           
                           borderColor:'gray',
                           elevation: 5,shadowColor: '#e6e6e6',
                           shadowOffset: { width: 0, height: 1 },
                           shadowOpacity: 1.1,
                           shadowRadius: 1,marginLeft:20,marginRight:20,borderRadius:10}}>

                        <Text>Question 1</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:'60%'}}>
                           <Text>Marks</Text>
                           <Text>Type : Objective</Text>
                        </View>
                    </View>
      </View>        
    )
  };
  
   
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
                   <View style={{backgroundColor:'#F0EFF9',borderTopLeftRadius: 10,width:90,height:40,paddingTop:10,marginTop:10}}>
                     <Text style={{textAlign:'center',color:'#000', fontSize:14}}>Subjective</Text>

                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={() => Actions.Objective()}>
                  <View style={{backgroundColor:'#6D63D9',width:110,height:50,paddingTop:15,borderTopLeftRadius: 10,borderTopRightRadius: 10,}}>
                     <Text style={{color:'#fff',textAlign:'center', fontSize:14}}>Objective</Text>
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
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
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
                           shadowRadius: 1,borderRadius:10,marginTop:10,height:150,justifyContent:'center',marginLeft:'5%',marginRight:'5%'}}>

          <Input         placeholder='Type your question here'
                           style={{ color:'#000', height:100, fontSize:16, padding:5,borderRadius:5}}
                            multiline={true}
                             numberOfLines={3}
                            placeholderTextColor="#777"
                             editable={true}
                           onChange={(event) => this.setState({Questions: event.nativeEvent.text})}
                           value={this.state.Questions}
            />
          </View> 
          <Text style={{textAlign:'center',marginTop:20}}> Select correct answere from the multiple options </Text>
          {/*<View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:40,alignItems:'center',marginTop:30,marginBottom:10}}>
                       <Text style={{color:'#000',marginRight:10}}> Media</Text>
                       <Image                      
                                source={require("../../../../assets/icon/Group_17257.png")}
                                style={{ width:20, height: 20}}
                              /> 
                    </View>*/}
          <View style={{flexDirection:'row',marginLeft:22,marginTop:20}}>
               <TouchableOpacity onPress={()=>this.selectedoptions(1)}>
                 {this.state.selected == 1 ?
                  <Image                      
                      source={require("../../../../assets/icon/Rectangle_2203.png")}
                      style={{ width:40, height: 40}}
                    /> 
                    :
                    <Image                      
                      source={require("../../../../assets/icon/Rectangle_2200.png")}
                      style={{ width:40, height: 40}}
                    /> 
                  }
                  </TouchableOpacity>
              <Item regular  style={styles.input2}>
                 <Input         placeholder='Type your question here'
                           style={{ color:'#000', height:40,  width:deviceWidth-100, fontSize:16, padding:5,borderRadius:5}}
                             multiline
                            placeholderTextColor="#777"
                             editable={true}
                           onChange={(event) => this.setState({Option: event.nativeEvent.text})}
                           value={this.state.Option}
            />
             </Item>

          </View>
           <View style={{flexDirection:'row',marginLeft:22,marginTop:10}}>
                  <TouchableOpacity onPress={()=>this.selectedoptions(2)}>
                 {this.state.selected == 2 ?
                  <Image                      
                      source={require("../../../../assets/icon/Rectangle_2203.png")}
                      style={{ width:40, height: 40}}
                    /> 
                    :
                    <Image                      
                      source={require("../../../../assets/icon/Rectangle_2200.png")}
                      style={{ width:40, height: 40}}
                    /> 
                  }
                  </TouchableOpacity>
              <Item regular  style={styles.input2}>
                  <Input         placeholder='Type your question here'
                           style={{ color:'#000', height:40, width:deviceWidth-100, fontSize:16, padding:5,borderRadius:5}}
                             multiline
                            placeholderTextColor="#777"
                             editable={true}
                           onChange={(event) => this.setState({Option1: event.nativeEvent.text})}
                           value={this.state.Option1}
            />
          </Item>

          </View>
           <View style={{flexDirection:'row',marginLeft:22,marginTop:10}}>
                  <TouchableOpacity onPress={()=>this.selectedoptions(3)}>
                 {this.state.selected ==3 ?
                  <Image                      
                      source={require("../../../../assets/icon/Rectangle_2203.png")}
                      style={{ width:40, height: 40}}
                    /> 
                    :
                    <Image                      
                      source={require("../../../../assets/icon/Rectangle_2200.png")}
                      style={{ width:40, height: 40}}
                    /> 
                  }
                  </TouchableOpacity> 
              <Item regular  style={styles.input2}>
                  <Input         placeholder='Type your question here'
                           style={{ color:'#000', height:40,  width:deviceWidth-100, fontSize:16, padding:5,borderRadius:5}}
                             multiline
                            placeholderTextColor="#777"
                             editable={true}
                           onChange={(event) => this.setState({Option2: event.nativeEvent.text})}
                           value={this.state.Option2}
            />
          </Item>

          </View>
           <View style={{flexDirection:'row',marginLeft:22,marginTop:10}}>
                 <TouchableOpacity onPress={()=>this.selectedoptions(4)}>
                 {this.state.selected ==4 ?
                  <Image                      
                      source={require("../../../../assets/icon/Rectangle_2203.png")}
                      style={{ width:40, height: 40}}
                    /> 
                    :
                    <Image                      
                      source={require("../../../../assets/icon/Rectangle_2200.png")}
                      style={{ width:40, height: 40}}
                    /> 
                  }
                  </TouchableOpacity>
              <Item regular  style={styles.input2}>
                  <Input         placeholder='Type your question here'
                           style={{ color:'#000', height:40, width:deviceWidth-100, fontSize:16, padding:5,borderRadius:5}}
                             multiline
                            placeholderTextColor="#777"
                             editable={true}
                           onChange={(event) => this.setState({Option3: event.nativeEvent.text})}
                           value={this.state.Option3}
            />
          </Item>

          </View>
          
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
             <Text style={{color:'#000',fontWeight:'300',fontSize:18}}> Give marks to this questions</Text>
             <View style={{backgroundColor:'#E8E8E8',width:50,height:40,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                <Input 
                  placeholder='00' 
                  style={{fontSize:14,}} 
                  placeholderTextColor="#999"
                  onChange={(event) => this.setState({marks: event.nativeEvent.text})}
                  value={this.state.marks}
                />
             </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
              <TouchableOpacity style={styles.savebtn} onPress={()=>this.savedata1()}>
                  <Text style={{color:'#000',textAlign:'center',fontSize:14}}>Save & Add New</Text>
              </TouchableOpacity>
               <TouchableOpacity style={styles.savebtn2} onPress={()=>this.savedata()}>
                  <Text style={{color:'#ffffff',textAlign:'center',fontSize:16}}>Save</Text>
              </TouchableOpacity>
          </View>
              
       </Content>
       <Footer />
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    
    createchapterobjective:(token,data) => dispatch(createchapterobjective(token,data)),
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Objective);
