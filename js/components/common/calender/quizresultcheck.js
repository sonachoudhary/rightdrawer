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
import config from "../../../../config.js";
const XDate = require('xdate');
import  Footernew  from "../../../components/footernew";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,    
  };
}
class Quizresultcheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      questionresuslt:[],
    }
  }

  componentDidMount() {
    const assignmentid=SyncStorage.get('assignmentid')
    fetch(`${config.serverSideUrl}/student/assignment/result/${assignmentid}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Cookie:'token='+this.props.jwtAccessToken
          },
        })
        .then(resp => resp.json())
        .then(data => {
             console.log('data',data)
            if(data!=null){
                this.setState({questionresuslt:data});
            }
         })
        .catch(e => {
                
        });
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
  

 
  renderItem2 = ({item, index}) => {
     
    return (
      <View>
      {index==0 &&
         <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
             <Text style={{color:'#000',textAlign:'center', fontSize:18}}>{this.state.questionresuslt.paper.title}</Text>
             <Text style={{color:'#000',textAlign:'center',}}>Marks: {this.state.questionresuslt.paper.Obtainedmarks}/{this.state.questionresuslt.paper.Totalmarks}</Text>
         </View>
      }
      <TouchableOpacity style={{borderBottomWidth:1,borderColor:'lightgray',backgroundColor:'#fff',marginLeft:10,borderRadius:10,marginTop:10}}>
                    <Text style={{ color:"#000", fontSize:15, marginLeft:10,fontWeight:'bold',marginTop:10}}>{item.question}? </Text>
                   {item.options!=null &&
                   <View style={{marginTop:10,}}>
                   <FlatList
                   data={item.options}
                   extraData={this.state}
                   renderItem={this.renderoptions}
                   />
                   </View>
                   }
                  

                   {item.answer!=null &&
                   <View style={{marginTop:10,marginBottom:5}}>
                     <Text style={{marginLeft:10,color:'#000'}}>{item.answer.answer}</Text>
                   </View>
                 }
                  <View style={{flexDirection:'row',justifyContent:'flex-start',marginRight:10,padding:10}}>
                      { item.answer!=null ?
                        <Text>Marks Obtain:{item.answer.marks}</Text>
                      :
                        <Text>Marks Obtain:0</Text>
                      }
                     </View>
      </TouchableOpacity>   
      </View>     
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
             <View style={{marginTop:5,padding:5,}}>
             <View style={{flexDirection:'row'}}>
              <Text> {value}{item.optionvalue} </Text>
             {item.iscorrect==true &&
                    <Image                      
                              source={require("../../../../assets/images/righticon.png")}
                              style={{ width:25, height: 25,left:3 ,borderRadius:20,}}
                            />
                    }       
                   
              </View>
              </View>
      )

   }
   
  render() {
    
  
    return (
      <Container>
        <ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: deviceWidth, height: 60, resizeMode:'cover' }}> 
               <View style={{flexDirection:'row',marginTop:10}}>
                 <Button transparent onPress={()=>Actions.pop()}>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#000000" }}
                    />
                                            
                </Button>
                <Text style={styles.textheadingnewdata}> Assignment Result</Text>
            </View>
         
        </ImageBackground>
        <Content style={{marginBottom:10}}>
              
              {this.state.questionresuslt.status==false ?
                <View style={{ justifyContent:'center',alignItems:'center',marginTop:'20%'}}>
                    <Text style={{color:'#000',fontSize:16,width:deviceWidth/2, height:300}}>{this.state.questionresuslt.message}</Text>
                </View>
                 
                :
                <View style={{borderTopLeftRadius:20,borderTopRightRadius: 20,}}>

                  <FlatList
                  data={this.state.questionresuslt.questions}
                   extraData={this.state}
                   renderItem={this.renderItem2}
                   />
                </View>
              }
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
)(Quizresultcheck);
