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
import { editSubjective} from "../../../actions/common/signin";

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
class Editchapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       
       Chapter:'',
       questions:'',
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      marks:'',
      selectedCal: undefined,
      classid:'',
      subjectid:'',
      id:'',
      type:0,
      
    }
  }




componentDidMount() {
    this.retriveid();
 
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  retriveid(){
    const id=SyncStorage.get('id');
    const question=SyncStorage.get('question');
    const type=SyncStorage.get('type');
    const marks=SyncStorage.get('marks');
    this.setState({id:id});
    this.setState({questions:question})
    this.setState({type:type})
    this.setState({marks:marks})
  }


   savedata(){
      
   
      if(this.state.questions==""){
        alert('questions is required');
      }else if(this.state.marks==""){
        alert('marks required')
      }else {
           var field= [];
           //field.class=this.state.class;
           //field.Subject=this.state.Subject;
            
            field.questions=this.state.questions;
            
            field.marks=this.state.marks;
            field.type=0;
            field.id=this.state.id;
            
            this.props.dispatch(editSubjective(this.props.jwtAccessToken,field)); 
           
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
            field.questions=this.state.questions;
            
            field.marks=this.state.marks;
            field.type=this.state.type;
            field.id=this.state.id;
            this.props.dispatch(editSubjective(this.props.jwtAccessToken,field)); 
            alert('Chapter updated successfully!')
            Actions.Subjective();
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
            </View>
          </Left>
          
        </Header>
        <Content style={{ backgroundColor: "#F9F9F9",marginBottom:120}}>
              
           
            
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
          
          
          <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:40,alignItems:'center',marginTop:10,marginBottom:10}}>
             <Text style={{color:'#000',marginRight:10}}> Add Media</Text>
             <Image                      
                      source={require("../../../../assets/icon/Group_17257.png")}
                      style={{ width:20, height: 20}}
                    /> 
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:50, marginBottom:50}}>
             <Text style={{color:'#000',fontWeight:'300'}}> Give marks to this questions</Text>
             <View style={{backgroundColor:'#E8E8E8',width:60,height:30,borderRadius:5,marginLeft:3,justifyContent:'center',alignItems:'center'}}>
                 <Input 
                   placeholder='25' 
                   style={{fontSize:16}} 
                   onChange={(event) => this.setState({marks: event.nativeEvent.text})}
                    value={this.state.marks}
    
                 />
             </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
              <TouchableOpacity style={{borderColor:'#2680EB',width:200,height:50,borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center'}} onPress={()=>this.save()}>
                  <Text style={{color:'#000',textAlign:'center',fontSize:14}}>Save & Add New</Text>
              </TouchableOpacity>
               <TouchableOpacity style={{backgroundColor:'#470B63',width:100,height:50,borderWidth:1,borderRadius:5,marginLeft:10,justifyContent:'center',alignItems:'center'}} onPress={()=>this.savedata()}>
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
    
    editSubjective:(token,data) => dispatch(editSubjective(token,data)),
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Editchapter);
