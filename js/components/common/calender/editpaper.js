import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,
  TouchableOpacity, Image, CheckBox, TouchableWithoutFeedback ,
  FlatList,TextInput,BackHandler} from "react-native";
import ImagePicker from "react-native-image-picker";
import CalendarStrip from "react-native-calendar-strip";import {
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
import { createquizedbyteacher ,createpaper,editpaper} from "../../../actions/common/signin";
import SyncStorage from 'sync-storage';
import DatePicker from 'react-native-datepicker';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";

const XDate = require('xdate');
import  Footer  from "../../../components/footer";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid,    
    userType: state.driver.user.userType, 
    schoolid:state.driver.user.teacherlogin.schoolid,   
  };
}
class Editpaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      marks:'',
      questions:'',
      
       
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      questionsid:'',
      starttime:'',
      endtime:'',
      classid:'',
      subjectid:'',
      data:[],
      Id:'',
    }
  }

componentDidMount() {
    this._retrivedata();
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

_retrivedata(){
  const id=SyncStorage.get('id');
  
    this.setState({Id:id});
     const data=SyncStorage.get('selectedquestions');
  const classid=SyncStorage.get('classid');
  const subjectid=SyncStorage.get('subjectid');
  this.setState({classid:classid});
  this.setState({subjectid:subjectid});
  var getar = [];
  for(let i = 0; i < data.length; i++) {
           getar.push(data[i].value);

            //array2.push(data[i].id);
          }
    this.setState({questionsid:getar});
}
  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  savedata(){
      if(this.state.title==""){
        alert('Title required');
      } else if(this.state.questions==""){
        alert("questions required")
      } else if(this.state.marks==""){
        alert('marks required')
      } else if(this.state.starttime==""){
        alert('starttime required')
      }else if(this.state.endtime==""){
        alert('endtime required')
      }else {
           var field= [];
           var newarr=[];
            newarr.questions=this.state.questionsid;
            field.title=this.state.title;
            field.newarr=newarr;
            field.marks=this.state.marks;
            field.starttime=this.state.starttime;
            field.endtime=this.state.endtime;
            field.schoolid=this.props.schoolid;
            field.teacherid=this.props.userid;
            field.classid=this.state.classid;
            field.subjectid=this.state.subjectid;
            field.id=this.state.Id;
            
            
            this.props.dispatch(editpaper(this.props.jwtAccessToken,field)); 
            alert('edit added successfully!')
            Actions.CustomerHome();
        }
  }

selected = (day) => {
       
      const _selectedDay = moment(day).format("yyyy-MM-DD");
     
       this.setState({selecteddate:_selectedDay})
       
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
      <View style={{margin:10}}>
                
                  <View style={{margin:10}}>
                   <Text>{item.month}</Text>
                   <Text style={{marginTop:5}}>{item.date}</Text>
                   <Text style={{marginTop:5}}>{item.day}</Text>
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
            <Button transparent onPress={() => Actions.Selectquestions()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> Create Assignments</Text>
            </View>
          </Left>
          <Right>
                
          </Right>    
        </Header>
        <Content style={{ backgroundColor: "#F9F9F9",marginBottom:120}}>

        <CalendarStrip
                  ref={(ref) => this.calenderStrip = ref}
                  daySelectionAnimation={{
                    type: 'background',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: '#470B63',
                    
                  }}
                  style={Platform.select({
                    android: {height: 115},
                    ios: {height: 115}
                  })}

                  calendarHeaderStyle={{color: '#e6000', width: deviceWidth, marginTop:10,fontSize:20}}
                  calendarColor={{backgroundColor: '#470B63'}}
                  dateNumberStyle={{color: '#000',fontSize:18,}}
                  responsiveSizingOffset={-12}
                  dateNameStyle={{color: '#e6e6e6',fontSize:13}}
                  highlightDateNumberStyle={{color: '#fff',fontSize:18,width:40,height:40,backgroundColor:'#470B63',borderRadius:20,paddingTop:10}}
                  highlightDateNameStyle={{color: '#fff',fontSize:13,}}
                  iconLeft={require('../../../../assets/img/left-arrow-black.png')}
                  iconRight={require('../../../../assets/img/right-arrow-black.png')}
                  iconContainer={{flex: 0,}}
                  iconStyle={{width:20,height:20}}
                  styleWeekend={false}
                  selectedDate={moment(this.selected_day)}

                  onWeekChanged={this.onWeekChanged}
                  onDateSelected={(date) => {this.selected(date)}}
                />
           
         <Item regular  style={{width:380,marginTop:20,marginLeft:20}}>
         
                   <Input   placeholder='Quiz title here'
                            style={{ color:'#000', height:40, width:380, fontSize:16, padding:5,borderRadius:5}}
                            multiline
                            placeholderTextColor="#777"
                            editable={true}
                            onChange={(event) => this.setState({title: event.nativeEvent.text})}
                            value={this.state.title}
                        />  
          </Item>
           <View style={{flexDirection:'row',marginTop:20,width:380}}>

                   <TextInput
                          placeholder='Total Questions'
                          style={{ borderColor:'#2A3439', borderWidth:1,  color:'#000', height:40, width:180, fontSize:16,borderRadius:5,marginLeft:20,padding:5,}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                           onChange={(event) => this.setState({questions: event.nativeEvent.text})}
                           value={this.state.questions}
                          
                        />  
                        <TextInput
                          placeholder='Total Marks'
                          style={{ borderColor:'#2A3439', borderWidth:1,  color:'#000', height:40, width:180, fontSize:16,borderRadius:5,marginLeft:20,padding:5,}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                           onChange={(event) => this.setState({marks: event.nativeEvent.text})}
                           value={this.state.marks}
                          
                        />   
          </View>
          <View style={{flexDirection:'row',margin:20,justifyContent:'space-between'}}>
                <View style={{borderWidth:1,borderColor:'gray',marginTop:-10}}> 
                    <DatePicker
                                  defaultDate={new Date()}
                                  placeholder="Start"
                                  mode="datetime"
                                  textStyle={'#000'}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  placeHolderTextStyle={'#000'}
                                  onDateChange={time => {
                                      this.setState({ starttime: time });
                                  }}
                                  date={this.state.starttime}
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
                    <View style={{borderWidth:1,borderColor:'gray',marginTop:-10}}>  
                         <DatePicker
                                  defaultDate={new Date()}
                                  placeholder="End"
                                  textStyle={'#000'}
                                   mode="datetime"
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  placeHolderTextStyle={'#000'}
                                  onDateChange={time => {
                                      this.setState({ endtime: time });
                                  }}
                                  date={this.state.endtime}
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
          <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor:'#470B63',marginTop:20,marginLeft:120,marginRight:120,height:40}} onPress={()=>this.savedata()}>
            <Text style={{color:'#fff'}}>Save</Text>
          </TouchableOpacity>
             
       </Content>
       <Footer />
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    createquizedbyteacher:(data)=>dispatch(createquizedbyteacher(data)),
    createpaper:(token,data) => dispatch(createpaper(token,data)),
    editpaper:(token,data)=>dispatch(editpaper(token,data)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Editpaper);
