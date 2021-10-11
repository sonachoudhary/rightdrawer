import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,
        TouchableOpacity, Image, CheckBox,
       TouchableWithoutFeedback ,FlatList,BackHandler,Modal,Alert} from "react-native";
import ImagePicker from "react-native-image-picker";
import SyncStorage from 'sync-storage';
import {
  Container,
  Header,
  Content,
  Button,
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
  Input,Radio,Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { setBookingStep1 } from "../../../actions/common/booking";
import { Calendar,Agenda } from 'react-native-toggle-calendar';
import  Footer  from "../../../components/footer";
import SplashScreen from "react-native-splash-screen";
 import config from "../../../../config.js";
import moment from "moment/moment";
// import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
import CalendarStrip from "react-native-calendar-strip";
import RadioButtonRN from "../../../components/radio-buttons-react-native";



const XDate = require('xdate');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const that = this;
const radiodata = [
{
  label: 'P'
 }
];

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid,
    schoolid:state.driver.user.teacherlogin.schoolid, 
       
    userType: state.driver.user.userType,    
  };
}
class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: 0,
        selecteddate:moment(new Date()).format("yyyy-MM-DD"),
        selectedIndex: 0,
        attendece:[],
        leaverequest:[],
        studentattendece:[],
        classattendance:[],
        getclassId:22,
        showmodal:false,
        presentCount:0,
        AbsentCount:0,
        LateCount:0,
        studentarr:[],
        attendecemany:[],

      };
      this.colors = [
        {
          label: 'p'
        },
        {
          label: 'a'
        },
        {
          label: 'l'
        }
      ];
      this.colors1 = [
        {
          label: 'p'
        }
      ];
      this.colors2 = [
        {
          label: 'a'
        }
      ];
      this.colors3 = [
        {
          label: 'l'
        }
      ];
    
    this.renderItem = this.renderItem.bind(this);
  }

 componentDidMount() {
  this.attendencelist();
  //this.classattendance();
  this.leaverequestbyInchargeId();
 // this.teacherattendancecount();
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
   deleteleaverequest(id){
  
    fetch(`${config.serverSideUrl}/studnetleaverequest/delete`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
           body: JSON.stringify({
            id:id

              
        })
        })
        .then(resp => resp.json())
        .then(data => {
          
         
            alert('delete successfully')
         })
        .catch(e => {
                 
        });
         this.setState({
            showmodal:false
          })
  } 
   statuschange(id,studentid,title,reason,startdate,enddate,status,description){
    
    
    fetch(`${config.serverSideUrl}/studentleaverequests/updatestatus`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
           body: JSON.stringify({
            studentid:studentid,
            title:title,
            reason:reason,
            startdate:startdate,
            enddate:enddate,
            status:'Accept',
            classid:this.state.getclassId,
            description:description,
            schoolid:this.props.schoolid,
            id:id
        })
        })
        .then(resp => resp.json())
        .then(data => {
          
          
            //alert('delete successfully')
         })
        .catch(e => {
                 
        });
        this.setState({
            showmodal:false
          })
  } 
  attendencelist(){
    userid=this.props.userid;

    var that = this;
    fetch(`${config.serverSideUrl}/dataclassstudentlistdatas/${userid}`, {
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
                if(data.stidentlist.length>0){
                  
                   this.setState({getclassId:data.classid });
                 this.setState({studentarr:data.stidentlist})
                setTimeout(function(){ that.classattendance() },1000 );
                } else{
                  alert('You are not authorised to take Attendance')
                }
                
              }
         })
        .catch(e => {
                
        });
  }
  
  teacherattendancecount(){
    userid=this.props.userid;

    fetch(`${config.serverSideUrl}/teacherattendancecount/${userid}`, {
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
                this.setState({attendece:data});
              }
         })
        .catch(e => {
                 
        });
  }

  selected = (day) => {
       
      const _selectedDay = moment(day).format("yyyy-MM-DD");
     
       this.setState({selecteddate:_selectedDay})
       var that = this;
       setTimeout(function(){ that.classattendance();},1000);
    } 

  classattendance(){
    schoolid=this.props.schoolid;
     

    fetch(`${config.serverSideUrl}/classattendance/${schoolid}/${this.state.getclassId}/${this.state.selecteddate}`, {
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
                this.setState({classattendance:data});
                this.getattcount();
              }
         })
        .catch(e => {
                
        });
  }

  getattcount(){
      //var enddate = moment(new Date()).format("yyyy-MM-DD");
      fetch(`${config.serverSideUrl}/attdcountdata`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
           body: JSON.stringify({
            schoolid:this.props.schoolid,
            classid:this.state.getclassId,
            date:this.state.selecteddate
        })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data!=null){
              this.setState({attendece:data.totals});
            }
         })
        .catch(e => {
                   
        });
  }

  leaverequestbyInchargeId(){
    userid=this.props.userid;

    fetch(`${config.serverSideUrl}/leaverequestbyInchargeId/${userid}`, {
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
                this.setState({leaverequest:data});
              }
         })
        .catch(e => {
                
        });
  }
 
createattd(classid,schoolid,studentid,status){
  
     
    if(status=="a"){
     this.studentnotifications()
      }
    
  
  
     SyncStorage.set('studentid',studentid)
     SyncStorage.set('status',status)
    var enddate = moment(new Date()).format("yyyy-MM-DD");
    fetch(`${config.serverSideUrl}/classattendance/create`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
           body: JSON.stringify({
            schoolid:schoolid,
            classid:classid,
            studentid:studentid,
            status:status,
            date:enddate
        })
        })
        .then(resp => resp.json())
        .then(data => {
          if(data!=null){

            this.setState({attendece:data.totals});
            // this.studentnotifications();
          }
         })
        .catch(e => {
               
        });
}

studentnotifications(){
  const studentid=SyncStorage.get('studentid')
 fetch(`${config.serverSideUrl}/getstudenttokenmsg/{studentid}`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
           
        })
        .then(resp => resp.json())
        .then(data => {
          if(data!=null){
          
            
          }
         })
        .catch(e => {
               
        });
}
createmany(status){
  // alert(status)
   // alert('onPress={()=>this.createmany()}')
    var enddate = moment(new Date()).format("yyyy-MM-DD");
    fetch(`${config.serverSideUrl}/classattendance/createmany`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
           body: JSON.stringify({
            schoolid:this.props.schoolid,
            classid:this.state.getclassId,
            studentid:this.state.studentarr,
            status:status,
            date:enddate
        })
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({attendece:data.totals});
            this.classattendance();
            
         })
        .catch(e => {
                 
        });
}

renderclassattendance(data,index){
   
  return(

    <View>
             <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, borderBottomWidth:2,  borderColor:'#F5F6FA', paddingTop:10, paddingBottom:10,  alignItems:'center', width:deviceWidth-30 }}>
              <View style={{flexDirection:'row', }}>
                <Text style={{color:'#000',marginRight:15}}> {data.item.rollno}</Text>
                <Text style={{color:'#000'}}> {data.item.student}</Text>
              </View>
               <View style={{ flexDirection:'row',justifyContent:'space-between',width:150}}>
              <View  style={{width:32,height:32, borderColor:'#F5F6FA', backgroundColor:'#F5F6FA', borderRadius:20, justifyContent:'center', alignItems:'center', }}>
                         {data.item.attandance!= null && data.item.attandance.status=="p" &&
                         <View style={{backgroundColor:'#3BCAAC',width:32,height:32,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                           <Text style={{color:'#fff',textAlign:'center',paddingTop:5}}>P</Text>
                         </View>
                         }
               </View>
               <View  style={{width:32,height:32,  borderColor:'#F5F6FA', backgroundColor:'#F5F6FA',borderRadius:20, justifyContent:'center',alignItems:'center' }}>
                          {data.item.attandance!= null && data.item.attandance.status=="a" &&
                           <View style={{backgroundColor:'#F5F6FA',width:32,height:32,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                           <Text style={{color:'#fff',}}>A</Text>
                         </View>
                         }
               </View>
               <View  style={{width:32,height:32,borderColor:'#F5F6FA', backgroundColor:'#F5F6FA', borderRadius:20, justifyContent:'center', alignItems:'center' }}>
                           {data.item.attandance!= null && data.item.attandance.status=="l" &&
                           <View style={{backgroundColor:'#F5F6FA',width:32,height:32,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                           <Text style={{color:'#fff',textAlign:'center',paddingTop:5}}>L</Text>
                         </View>
                         }
               </View>
              </View>
           </View>
       </View>
    )
}

renderItem(data){
  const { item } = data;
  var getintial = '';
  if(item.attandance!=null && item.attandance.status=='p'){
    getintial = 1;
  }
  if(item.attandance!=null && item.attandance.status=='a'){
    getintial = 2;
  }
  if(item.attandance!=null && item.attandance.status=='l'){
    getintial = 3;
  }
  return(
       <View>
             <View style={{flexDirection:'row',justifyContent:'space-between', paddingTop:10, paddingBottom:10,  borderBottomWidth:2, borderColor:'#F5F6FA', width:deviceWidth-30 }}>
              
              <View style={{flexDirection:'row', }}>
                <Text style={{color:'#000',marginRight:15}}> {item.rollno}</Text>
                <Text style={{color:'#000'}}> {item.student}</Text>
              </View>
              <View style={{ flexDirection:'row',justifyContent:'space-between',width:170}}>
              { getintial!="" ?
              <RadioButtonRN
                data={this.colors}
                box={false}
                initial={getintial}
                selectedBtn={(e) => this.createattd(item.classid, item.schoolid, item.id, e.label)}
                circleSize={22}
                style={{flexDirection:'row'}}
                icon={
                  <Icon name="check-circle" size={6} color="#3BCAAC" />
                }
              /> 
              :
               <RadioButtonRN
                data={this.colors}
                box={false}
                selectedBtn={(e) => this.createattd(item.classid, item.schoolid, item.id, e.label)}
                circleSize={22}
                style={{flexDirection:'row'}}
                icon={
                  <Icon name="check-circle" size={6} color="#3BCAAC"  />
                }
              />
              } 
              </View> 
           </View>
       </View>
    )
}



rendermodaldata(item,index){
  var uri= 'http://wesmart.in/backend/public/documents/'
  startdate=moment(item.item.startdate).format("yyyy-MM-DD")
  return(
      <View style={{flexDirection:'row', margin:20, borderBottomWidth:2, borderColor:'#e6e6e6', marginRight:10,  alignItems:'center'}}>
           <View>
           {item.item.photo ?
            <Image
                    source={{uri:uri +item.item.photo}}
                    style={{ width:60, height: 60, borderRadius:30 }}
                    
                  />
                  :
              <Image
                    source={require("../../../../assets/images/dummy_profile.png")}
                    style={{ width:60, height: 60, borderRadius:30 }}
                    
                  /> 
           }
           </View>
           <View style={{margin:5}}>
              <Text style={{color:'#000',fontWeight:"600"}}>{item.item.name}</Text>
              <Text> {startdate}</Text>
              <Text> {item.item.title}</Text>
              <Text numberOfLines={2}style={{width:200,marginTop:10}}> {item.item.description} </Text>
           </View>
           <View style={{flexDirection:'row',justifyContent:'space-between', marginRight:10}}>
               <TouchableOpacity>
                <Image
                    source={require("../../../../assets/images/Group_17139.png")}
                    style={{ width:40, height: 40, borderRadius:20 }}
                    
                  /> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => that.deleteleaverequest(item.item.id)}>
                <Image
                    
                    source={require("../../../../assets/images/Group_17138.png")}
                    style={{ width:40, height: 40, borderRadius:20 }}
                    
                  /> 
                  </TouchableOpacity>
           </View>

      </View>
    )
}



onChangeCheck(){
  this.setState({checked: !this.state.checked})
}
showmodal(){
  this.setState({
     showmodal:true
  })
}

  render() {
  
       return (
      <Container style={{backgroundColor:'#4B0B72'}}>
         <View style={{ flexDirection:'row',marginTop:50, justifyContent:'space-between', alignItems:'center' }} >
            <View style={{ flexDirection:'row',  marginLeft:10  }}>
                <Button transparent onPress={() =>   Actions.CustomerHome() }>
                     <Icon
                            name="md-arrow-back"
                            style={{ fontSize: deviceHeight/30, color: "#FFF" }}
                          />                      
                  <Text style={{ color:"#FFF", fontSize:deviceHeight/35, marginLeft:20,padding:5,marginTop:8}}>
                    Attendance
                  </Text> 
                </Button>   
                </View>
                <TouchableOpacity onPress={()=>this.showmodal()}>
                    <Image                       
                      source={require("../../../../assets/images/user.png")}
                      style={{ width:25, height: 25,marginRight:20}}
                    /> 
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: commonColor.brandSecondry,borderRadius:40,marginTop:30}}>
            <View>

            

            </View>
                 <View style={{borderBottomWidth:2,borderColor:'#F5F6FA',marginBottom:5}}>
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
                 { /*<Calendar
                                       current={new Date()}
                                       minDate={"2021-03-01"}
                                       headerData={new Date()}
                                       markedDates={this.state.selecteddate}
                                       enableSwipeMonths={true}
                                       firstDay={1}
                                       onPressArrowRight={addMonth => addMonth()}
                                       onPressArrowLeft={subtractMonth => subtractMonth()}
                                       horizontal={true}
                                       horizontalEndReachedThreshold={50}
                                       horizontalStartReachedThreshold={0}
                                       loading={this.state.calendarLoading}
                                       showPastDatesInHorizontal={1}
                                       onDayPress={(day) => {this.selected(day)}}
                                       theme={{
                                         textDisabledColor: '#000',
                                         todayTextColor: '#ff000',
                                       }}
                                       
                                   />*/}

                 </View>
            


          <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10, paddingBottom:10, borderBottomWidth:2, borderColor:'#F5F6FA',  width:deviceWidth-30}}>
            
              
              <View style={{flexDirection:'row',}}>
                <Text style={{color:'#000',marginRight:5}}> Roll No</Text>
                <Text style={{color:'#000'}}>Student Name</Text>
              </View>
              <View style={{ flexDirection:'row',justifyContent:'space-between',width:150}}>
                <TouchableOpacity style={{width:40, height:30,  backgroundColor:'#3BCAAC', borderColor:'#3BCAAC', borderRadius:5,  justifyContent:'center', alignItems:'center' }} onPress={()=>this.createmany('p')}>
                  <Text style={{color:'#fff'}}>{this.state.attendece.p}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:40, height:30, backgroundColor:'#F65684',marginLeft:20, borderColor:'#F65684', borderRadius:5,justifyContent:'center', alignItems:'center' }} onPress={()=>this.createmany('a')}>
                <Text style={{color:'#fff'}}>{this.state.attendece.a}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:40, height:30,marginLeft:20, backgroundColor:'#F9AA68', borderColor:'#F9AA68', borderRadius:5, justifyContent:'center',alignItems:'center' }} onPress={()=>this.createmany('l')} >
                <Text style={{color:'#fff'}}>{this.state.attendece.l}</Text>
                </TouchableOpacity>
              </View>
       </View>
      
         {this.state.selecteddate==moment(new Date()).format("yyyy-MM-DD") ?
          <View style={{height:deviceHeight-400}}>
                <FlatList
                 
                   style={{ margin:10}}
                   data={this.state.classattendance}
                   extraData={this.state}
                   renderItem={this.renderItem}
                   />

          </View>
          :
           <View style={{height:deviceHeight-400}}>
                <FlatList
                 
                   style={{ margin:10}}
                   data={this.state.classattendance}
                   extraData={this.state}
                   renderItem={this.renderclassattendance}
                   />

          </View>
           }
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}
                onRequestClose={() => {
                
                this.setState({showmodal:false});
               }}
            >
            <View style={{backgroundColor: commonColor.brandSecondry, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
              <View style={{marginTop:110, height:'90%', borderRadius:30,  borderColor:'#000', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8, shadowRadius: 1,backgroundColor: commonColor.brandSecondry, }}>
            
            <TouchableOpacity
                 style={{justifyContent:'flex-end',flexDirection:'row',marginTop:20,marginRight:30}}
                 onPress={() => this.setState({showmodal:false})}
            >
             
                                      <Image
                                          
                                          source={require("../../../../assets/images/Group_17138.png")}
                                          style={{ width:20, height: 20, borderRadius:20 }}
                                          
                                        /> 
                                        
           </TouchableOpacity>
          <View>
                     <FlatList
                          
                          style={{ margin:10}}
                          data={this.state.leaverequest}
                          extraData={this.state}
                          
                           renderItem={({item})=>(
                             <View style={{flexDirection:'row', width:deviceWidth-200,  margin:10, borderBottomWidth:2,borderColor:'#e6e6e6',marginRight:10, alignItems:'center'}}>
                                 <View>
                                 {item.photo ?
                                  <Image
                                          source={{uri:uri +item.photo}}
                                          style={{ width:60, height: 60, borderRadius:30 }}
                                          
                                        />
                                        :
                                    <Image
                                          source={require("../../../../assets/images/dummy_profile.png")}
                                          style={{ width:60, height: 60, borderRadius:30 }}
                                          
                                        /> 
                                 }
                                 </View>
                                 <View style={{margin:5}}>
                                    <Text style={{color:'#000',fontWeight:"bold"}}>{item.name}</Text>
                                    <Text> {moment(item.startdate).format("yyyy-MM-DD")}</Text>
                                    <Text> {item.title}</Text>
                                    <Text numberOfLines={2}style={{width:200,marginTop:10}}> {item.description} </Text>
                                 </View>
                                 { item.status=='Pending' ?
                                 <View style={{flexDirection:'row',   
                                               justifyContent:'space-between',
                                               marginLeft:-40
                                             }}>
                                     <TouchableOpacity onPress={()=>this.statuschange(item.id,item.studentid,item.title,item.reason,item.startdate,item.enddate,item.description,item.status)}>
                                      <Image
                                          source={require("../../../../assets/images/Group_17139.png")}
                                          style={{ width:40, height: 40, borderRadius:20 }}
                                          
                                        /> 
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.deleteleaverequest(item.id)}>
                                      <Image
                                          
                                          source={require("../../../../assets/images/Group_17138.png")}
                                          style={{ width:40, height: 40, borderRadius:20 }}
                                          
                                        /> 
                                        </TouchableOpacity>
                                 </View>
                                :
                                <View>
                                  <Text>{item.status}</Text>
                                </View>
                               }
                           </View>


                           )}
                         />
          </View>

        </View>
        </View>
      </Modal>
      </View>
             
       
         <View style={{ width: deviceWidth, backgroundColor: commonColor.brandSecondry,height: 66,flexDirection:'row', borderTopWidth:2,borderTopColor:'#e6e6e6',justifyContent:'center', marginTop: 5, position:'absolute', bottom:0}} >
                
                <TouchableWithoutFeedback onPress={() =>  Actions.CustomerHome()}>
                <View style={{ justifyContent:'center', alignItems:'center', width:deviceWidth/5 }} onPress={() => Actions.CustomerHome() } >
                   
                    <Image
                      source={require("../../../../assets/bottom_icon/homegray.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                 
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Home</Text>
                </View>     
                </TouchableWithoutFeedback> 

                
                <TouchableWithoutFeedback onPress={() => Actions.Teacherchatlist()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}  >
                
                    <Image
                      source={require("../../../../assets/menuicons/chatlight.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                  
                    <Text style={{fontSize:12, fontWeight:'bold',color:'#000000',paddingTop:5}}>Chat</Text>
                </View>     
                </TouchableWithoutFeedback> 

                 

                <TouchableOpacity onPress={()=>Actions.Addhomework()} style={{elevation: 5,shadowColor: '#000',
                                                                          shadowOffset: { width: 0, height: 1 },
                                                                          shadowOpacity: 0.8,
                                                                          shadowRadius: 1,}}>
                <View style={{ justifyContent:'center',marginTop:-40,alignItems:'center', width:deviceWidth/5 ,}}>
                    <Image
                      source={require("../../../../assets/images/ellipse.png")}
                      style={{ width:80, height: 80 , }}
                    />
                    <View style={{ position:'absolute',marginLeft:-20,marginTop:-20,zIndex:1001}}>
                     <Text style={{color:'#ffffff',fontSize:40,marginTop:-10, fontWeight:'400'}}>+</Text>
                    </View>
                </View>     
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() =>  Actions.Task()}>
                <View style={{ justifyContent:'center',alignItems:'center', width:deviceWidth/5 }}>
                   
                    <Image
                      source={require("../../../../assets/bottom_icon/eventgray3.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                    
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Event</Text>
                </View>     
                </TouchableWithoutFeedback>               

                <TouchableWithoutFeedback onPress={() => Actions.Attendance()}>
                <View style={{ justifyContent:'center', alignItems:'center',  width:deviceWidth/5 }} >
                    
                     <Image
                      source={require("../../../../assets/bottom_icon/attandanceblue.png")}
                      style={{ width:30, height: 30  }}
                    />
                    
                    
                    <Text style={{fontSize:12, color:'#000',paddingTop:5,fontWeight:'bold'}}>Attendance</Text>
                </View>   
                </TouchableWithoutFeedback>                 
            </View> 
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
)(Attendance);
