import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, 
  Image, CheckBox, TouchableWithoutFeedback ,FlatList,AsyncStorage,BackHandler} from "react-native";
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
import { chapterlist } from "../../../actions/common/signin";
import {Calendar, CalendarList, Agenda} from '../../../obj/calender';
import moment from "moment/moment";
import SplashScreen from "react-native-splash-screen";
import SyncStorage from 'sync-storage';
const XDate = require('xdate');
import  Footer  from "../../../components/footer";
import config from "../../../../config.js";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    userid:state.driver.user.teacherlogin.teacherid,    
    userType: state.driver.user.userType, 
    assignments:state.driver.user.assignments,
     homework:state.driver.user.homework,   
  };
}
class Viewassignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
        assignments:this.props.assignments,
        data:[],
        selected: false,
        selectedDate: moment().format('YYYY-MM-DD'),
        error: false,
        selectedCal: undefined,
        assignmentdata:[],
        homeworkid:'',
        classdata:[],
    }
  }

componentDidMount() {
  const homeworkid=SyncStorage.get('homeworkid');
  this.setState({homeworkid:homeworkid})
  fetch(`${config.serverSideUrl}/homeworks/${this.props.userid}`, {
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
            
            if(data!=null){
               var manageassignment=[];
            var finalmanageassignment=[];
            for (let i = 0; i < data.length; i++){
                manageassignment.push(data[i].class);
            }
            const manageassignment1 = manageassignment.filter((x, i, a) => a.indexOf(x) == i)

            for (let j = 0; j < manageassignment1.length; j++){
                var getassignmentval = [];
                for (let k = 0; k < data.length; k++){
                    if(data[k].class == manageassignment1[j]){
                      getassignmentval.push(data[k]);
                    }
                }
                finalmanageassignment.push({'class':manageassignment1[j],'classdetails':getassignmentval});
            }
               this.setState({classdata: finalmanageassignment });
                  
                 
              }
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
  

 


 quizview = (id,time,title) =>{
      try {
         SyncStorage.set('homeworkid',id);
         SyncStorage.set('time',time);
         SyncStorage.set('title',title);
        Actions.Viewquizassignments(id)
      } catch (error) {}
  }
  renderItem = ({item, index}) => {
    
    
    
    return (
      <View style={{backgroundColor:'#ffd3ca',}} >

          <View style={{backgroundColor:'#ffd3ca', textAlign:'center', width:deviceWidth,justifyContent:'center',marginTop:10}} >
              <Text style={styles.textheading1}>{item.class}</Text>
                                      
          </View> 
            <FlatList
                    data={item.classdetails}
                    numColumns={1}
                     // extraData={this.state}
                    renderItem={this.renderdetails}
                   />
           

          
      </View>     
    )
  };

   renderdetails=({item,index})=>{
    let colors = ['#ffd3ca',  '#feb5c0', '#b6f8f4','#95bff9',];
     var Time=moment(item.created_at).format('hh:mm ddd')
     var Date=moment(item.created_at).format('YYYY-MM-DD')
     
    return(
        
         <TouchableOpacity style={{backgroundColor:'#fff',
                                 width:'95%',height:'auto', borderRadius: 10,
                               
                               shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 1,elevation: 5,shadowColor: '#00ffff',
                                marginHorizontal:10,
                                padding:5,
                                marginTop:'2%',
                                
                              }}  
                              onPress={()=>this.quizview(item.id,Time,item.title)}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',margin:'3%'}}>
                   <Text style={{color:'#000',fontSize:deviceHeight/50}}>{item.title}</Text>  
                   <Text style={{color:'#000',fontSize:deviceHeight/55}}>{Date}</Text>
                   </View>                   
                   <Text style={{color:'#000',marginLeft:'4%',marginTop:5,fontSize:deviceHeight/55}}>{Time}</Text>
            
           </TouchableOpacity> 
           
      )
   }

   
                
  
   
  render() {
   

    return (
      <Container style={{backgroundColor: "#ffffff"}}>
         <Header style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}>
          <Left>
          <View style={Platform.OS === "ios" ? styles.iosview : styles.aview}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> View Homeworks</Text>
            </View>
          </Left>
                 
        </Header>
        <Content style={{ backgroundColor: "#ffd3ca",marginBottom:0}}>
         
             <View>
                  <FlatList
                       style={{ margin:10}}
                       data={this.state.classdata}
                       extraData={this.state}
                       
                       renderItem={this.renderItem}
                   />

             </View>
        

                

       </Content>
        
     </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    chapterlist:(data) => dispatch(chapterlist(data)), 
    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Viewassignments);
