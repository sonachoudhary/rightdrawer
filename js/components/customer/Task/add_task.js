import { Modal, View, Text,BackHandler,CheckBox ,FlatList,TouchableOpacity,KeyboardAvoidingView,Dimensions,ScrollView,Image} from "react-native";
import React, { Component } from "react";
import { Actions, ActionConst } from "react-native-router-flux";
import config from "../../../../config.js";
import{ Picker} from "native-base";
import styles from "./styles";
import SplashScreen from "react-native-splash-screen";
import DatePicker from 'react-native-datepicker'; 
import moment from "moment/moment";
import { connect } from "react-redux";
import {

  Container,
  Content,
  Header,
  
  Button,
  Icon,
  Title,
   Input,Item,
} from "native-base";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
   
    jwtAccessToken: state.driver.appState.jwtAccessToken,
      schoolid:state.driver.user.teacherlogin.schoolid,
      userid:state.driver.user.teacherlogin.teacherid,

   };
}
class Addtask extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      checked:'#FF9800',
      Title:'',
      Descriptions:'',
      start:'',
      end:'',
      Date:new Date(),
      Time:new Date(),
      updated_at:'',
      updated_at:'',
      groupId:'',
      className:'',
      classlist:[],

     };
    
  }

  componentDidMount() {
    this.getclasslist();
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
  selectedoptions(value){
     
    this.setState({selected: value})
   
  }
  savebtn(){
    if(this.state.Title==""){
      alert('Title required')
    } else if(this.state.className==''){
      alert('className required')
    }else if(this.state.Descriptions==""){
      alert('Descriptions required')
    }else if(this.state.start==''){
      alert('Time required')
    } else if(this.state.end==''){
      alert('Time required')
    } else {
      
    fetch(`${config.serverSideUrl}/teacher/event/create`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+this.props.jwtAccessToken,
      },
      body: JSON.stringify({
            schoolid:this.props.schoolid,
            title:this.state.Title,
            groupId:1,
            className:this.state.className,
            start:this.state.start,
            end:this.state.end,
            details:this.state.Descriptions,
            
              
        })
      
    })
    .then(resp => resp.json())
    .then(data => {
      // var tokenData = {};
       var   tokenData=data.token;
      

      for(var i=0; i<tokenData.length; i++){

         const userEmail = { message:data.message,
          token: tokenData[i]};
        
          fetch(`http://54.160.96.88:13678/callpushNotification`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmail)
        })
          .then(response => response.json())
          .then(data => {
            
          })
          .catch(error => {
            // alert('fa')
          });
      }

      if(data!=null){
        
        alert('Event Created successfully')
         Actions.Task();
      }
    })
    .catch(e => {
             
    });
     //this.props.TeachersubjectList(this.props.jwtAccessToken,this.props.userid,itemValue)
  }
  
  }

  getclasslist(){
    fetch(`${config.serverSideUrl}/teacherallsubjects/${this.props.userid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+this.props.jwtAccessToken
      },
      
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
           
            var getunique = this.getUnique(data,'class');
            
          this.setState({classlist:getunique})
            
        }
      
    })
    .catch(e => {

           
    });
  }
  
  setcolor(colorcode){
     this.setState({checked:colorcode})
     // alert(colorcode);
  }
  subjectselectlist(value){
    
    this.setState({className:value})
  }

  cancelbtn(){
    Actions.Task();
  }
  
  getUnique(arr, index) {

          const unique = arr
               .map(e => e[index])

               // store the keys of the unique objects
               .map((e, i, final) => final.indexOf(e) === i && i)

               // eliminate the dead keys & store unique objects
              .filter(e => arr[e]).map(e => arr[e]);      

           return unique;
    }
  render() {
    
    return (
      <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#fff'}} behavior="padding"  keyboardVerticalOffset={70}>
             <View style={Platform.OS === "ios" ? styles.contentstyleios1 : styles.contentstyle1} >
                <View style={{  flexDirection:'row',}} >
                    <Button transparent onPress={() =>Actions.Task()}>
                       <Icon
                            name="md-arrow-back"
                            style={{ fontSize: deviceHeight/30, color: "#000" }}
                          />                         
                    </Button>
                  <View style={{ flexDirection:'row'}} >
                    <Text style={{ color:"#000", fontSize:deviceHeight/35,fontWeight:'bold',marginTop:7}}>
                        Create Event
                      </Text>     
                  </View>
                </View>
            </View>
              <ScrollView>
      <View style={{backgroundColor:'#F0F0F0'}}>
        
          <View style={{backgroundColor:'#fff'}}>
            
            <Item style={{margin:10,marginLeft:30}}>
                <Input placeholder="Title" 
                         onChange={(event) => this.setState({Title: event.nativeEvent.text})}
                         value={this.state.Title}
                 
                />
            </Item>
            <View style={{ borderBottomWidth:1, borderColor:'#e6e6e6',margin:10}}>
            <Picker 
                        mode={'dialog'}
                        itemTextStyle={{color: '#000000',}}
                        style={{color: '#000000',marginLeft:30}}
                        textStyle={{ color: '#000000', alignSelf:"center", textAlign:'center'}}
                        selectedValue={this.state.className}  
                        onValueChange={(itemValue) => this.subjectselectlist(itemValue)}  
                  >  
                        <Picker.Item label={'Select Class'} value='' style={{color:'#000000'}}/>
                    {this.state.classlist && this.state.classlist.map(function(item,index){
                     return(
                             <Picker.Item label={item.class} value={item.class} style={{color:'#000000'}}/>
                             )
                     })}
                    
                  </Picker>
            
            </View>
            
            
            <Item regular  style={styles.input}>
                <Input   placeholder='Descriptions'
                            style={{ color:'#000', height:146,fontSize:16, padding:5,borderRadius:5}}
                            multiline
                            placeholderTextColor="#777"
                            editable={true}
                            onChange={(event) => this.setState({Descriptions: event.nativeEvent.text})}
                            value={this.state.Descriptions}
                        />  
            </Item>

            
                         <View style={{flexDirection:'row'}}>
                          <View style={{borderWidth:1,borderColor:'gray',marginTop:10,marginLeft:20,marginRight:25}}> 
                              
                               <DatePicker
                                  mode="datetime"
                                  placeholder="Start Time"
                                  textStyle={'#000'}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  placeHolderTextStyle={'#000'}
                                  onDateChange={start => {
                                      this.setState({ start: start });
                                  }}
                                  date={this.state.start}
                                  customStyles={{
                                      dateInput: {
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        
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
                          <View style={{borderWidth:1,borderColor:'gray',marginTop:10,marginLeft:20,marginRight:20}}> 
                              
                               <DatePicker
                                  mode="datetime"
                                  placeholder="end Time"
                                  textStyle={'#000'}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  placeHolderTextStyle={'#000'}
                                  onDateChange={end => {
                                      this.setState({ end: end });
                                  }}
                                  date={this.state.end}
                                  customStyles={{
                                      dateInput: {
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        
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
                   <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:30}}>
                             <TouchableOpacity style={{backgroundColor:'#DAD9DF',
                                                       width:90,height:40,
                                                       justifyContent:'center',
                                                       alignItems:'center',borderRadius:5
                                                     }} onPress={()=>this.cancelbtn()}>
                                <Text style={{color:'#fff'}}> Cancel</Text>
                             </TouchableOpacity>
                              <TouchableOpacity style={{backgroundColor:'#470B63',
                              width:90,height:40,marginLeft:10,justifyContent:'center',
                              alignItems:'center',borderRadius:5}}
                              onPress={()=>this.savebtn()}
                              >
                                <Text style={{color:'#fff'}}> Save</Text>
                             </TouchableOpacity>

                         </View>
          </View>
       
      </View>
      </ScrollView>
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Addtask);
