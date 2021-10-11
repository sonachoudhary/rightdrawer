import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
import ImagePicker from "react-native-image-picker";

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
import SplashScreen from "react-native-splash-screen";
import SyncStorage from 'sync-storage';
const XDate = require('xdate');
import  Footer  from "../../../components/footer";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import config from "../../../../config.js";

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,    
  };
}
class Viewquiz2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       data2:[{month:'jan'},{month:'Feb'},{month:'March'},{month:'April'},{month:'May'},{month:'june'},{month:'july'},{month:'Aug'},{month:'Sep'},{month:'Oct'},{month:'Nov'},{month:'Dec'}],
       
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      question:[],
      marks:0,
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

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  _retrivedata(){
     const Studentid=SyncStorage.get('Studentid'); 
     const marks=SyncStorage.get('marks'); 
      const assignmentid=SyncStorage.get('paperid')
     this.setState({marks:marks})
     
     fetch(`${config.serverSideUrl}/studentpapersubmition/${assignmentid}/${Studentid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
          
        })
        .then(resp => resp.json())
        .then(data => {
            
            if(data.error && data.error.message=="Token Expired"){
           dispatch(loginfail(data))
         
            
        }else if(data){

             
                 this.setState({question: data });

              }
         })
        .catch(e => {

                 
        });

  }
  

  renderItem2 = ({item, index}) => {
    
    return (
      <TouchableOpacity style={{borderColor:'lightgray',margin:20,backgroundColor:'#fff',borderRadius:10,elevation: 5,shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 1,}}>
                   <View style={{marginLeft:10,flex:1,marginTop:10,marginBottom:10,marginRight:0,width:deviceWidth}}>
                    <Text style={{ color:"#000", fontSize:15, fontWeight:'bold', textAlign:'left'}}> {item.question}? </Text>
                    </View>
                   {item.options!=null &&
                   <View style={{margin:5,}}>
                   <FlatList
                   data={item.options}
                   extraData={this.state}
                   renderItem={this.renderoptions}
                   />
                   </View>
                   }
                   {item.answer!=null &&
                   <View>
                     <Text style={{marginLeft:10,color:'#000',marginLeft:10,}}>{item.answer.answer}</Text>
                   </View>
                 }
                 
                 
                 <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:10,padding:10}}>

                  <Text>Marks</Text>
                  {item.answer!=null &&
                  <View style={{width:50,height:20,backgroundColor:'#e6e6e6',aliginItems:'center'}}>
                  {item.type==true ?
                     <Text style={{color:'#000',textAlign:'center',}}>{item.answer.marks}</Text>
                     :
                     <Text style={{color:'#000',textAlign:'center',}}>{item.answer.marks}/{item.marks}</Text>
                   }
                   </View>
                 }
                 </View>
      </TouchableOpacity>        
    )
  };
  
   renderoptions=({item,index})=>{
    
    if(index==0){
      value="A."
    }else if(index==1){
      value="B."
    } else if(index==2){
      value="C."
    }else if(index==3){
      value="D."
    }
    return(
             <View style={{marginTop:5,padding:5,marginLeft:10}}>
             <View style={{flexDirection:'row'}}>
             <Text> {value}{item.optionvalue} </Text>
             {item.id==item.studentans &&
                    
                        <View>
                        {item.iscorrect==true ?
                            <Image                      
                                source={require("../../../../assets/images/righticon.png")}
                                style={{ width:25, height: 25,left:3 ,borderRadius:20,}}
                              /> 
                          :
                           <Image                      
                              source={require("../../../../assets/images/wrongicon.png")}
                              style={{ width:25, height: 25,left:3 ,borderRadius:20,}}
                            /> 
                        }
                        </View>
                            
                      
                    }
                    
                    
              </View>
              
              
              </View>
      )

   }
  render() {
    

    return (
      <Container>
        
          <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgb(237,204,202)'}}>
            <Button transparent onPress={()=>Actions.Viewquiz()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
              <Text style={styles.textheadingnewdata}> View Assignments</Text>                           
            </Button>
           
            </View>
          
        <Content style={{ backgroundColor: "#FFF",marginBottom:0}}>
              
              
                 <View style={{backgroundColor:rgb(237,204,202)}}>
                  <FlatList
                  data={this.state.question.questions}
                   extraData={this.state}
                   renderItem={this.renderItem2}
                   />
                </View>
                
           </Content>
        
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
)(Viewquiz2);
