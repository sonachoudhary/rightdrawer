import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity,
 Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
import ImagePicker from "react-native-image-picker";
import config from "../../../../config.js";
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

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,    
    userType: state.driver.user.userType,    
  };
}
class Viewquiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       data2:[{month:'jan'},{month:'Feb'},{month:'March'},{month:'April'},{month:'May'},{month:'june'},{month:'july'},{month:'Aug'},{month:'Sep'},{month:'Oct'},{month:'Nov'},{month:'Dec'}],
       
       selected: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      classdata:[],
      title:'',
      Day:'',
    }
  }

 componentDidMount() {
    this.getresponse();
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
  
   getresponse(){
    const assignmentid=SyncStorage.get('paperid')
    const title=SyncStorage.get("title");
    const time=SyncStorage.get('time');
    const timevalue=moment(time).format("ddd-DD");
    this.setState({Day:timevalue})
    this.setState({title:title});
       var that = this;
        
        fetch(`${config.serverSideUrl}/paper/submitions/${assignmentid}`, {
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
    }
 
  renderItem2 = ({item, index}) => {
     
    return (
      
        <View style={{margin:20}}>
               <TouchableOpacity style={{backgroundColor:'#FFCB7F',marginTop:20,height:75,width:deviceWidth-30,padding:15,borderRadius:10}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                        <Text style={{color:"#484347", fontSize:13, marginTop:5 ,fontWeight:'300',}}>{this.state.Day}</Text> 
                       
                        <Text style={{color:"#484347", fontSize:13, marginTop:5 ,fontWeight:'300',}}>{item.class}</Text> 
                         
                   </View>
                   <Text style={{color:"#484347", fontSize:16, marginTop:5 ,fontWeight:'600',}}>{this.state.title}</Text> 

              </TouchableOpacity>
                  <FlatList
                  data={item.classdetails}
                   extraData={this.state}
                   renderItem={this.renderstudent}
                   />
      </View> 
    )
  };
   nectscreen(id,marks){
    SyncStorage.set('Studentid',id);
    SyncStorage.set('marks',marks);
    const getvalue=SyncStorage.get("taken")
    
     if(getvalue==1){
       Actions.Viewquizassignmarks()
    }else if(getvalue==0){
      Actions.Viewquiz2()
     
    }
    
   
   }
   
   renderstudent=({item,index})=>{
    
    var uri= 'http://wesmart.in/backend/public/documents/'
    return(
          <TouchableOpacity onPress={()=>this.nectscreen(item.id,item.obtained)}>
            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1, padding:10,borderColor:'lightgray',height:70,margin:10}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                      <Image                      
                              source={{uri:uri+item.photo}}
                              style={{ width:50, height: 50,left:3 ,borderRadius:20,}}
                            /> 
                            <View style={{marginLeft:10}}>
                                 <Text> {item.name}</Text>
                                 <Text>RollNumber :{item.rollno}</Text>
                            </View>
                            
                 </View>
                 <View>
                   <Text>Marks ={item.obtained}/{item.total}</Text>
                 </View>
            </View> 
      </TouchableOpacity>
      )
   }
  render() {
    

    return (
      <Container style={{ backgroundColor:'#ffffff'}}>
         
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent onPress={()=>Actions.Quizdashboard()}> 
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
            <Text style={styles.textheadingnewdata}> View Assignments</Text>                            
            </Button>
            
            </View>
          
        <Content style={{ backgroundColor: "#FFF",marginBottom:120}}>
             
              
                 <View style={{backgroundColor:'#ffffff',borderTopLeftRadius:20,borderTopRightRadius: 20,elevation:2,}}>
                  <FlatList
                  data={this.state.classdata}
                   extraData={this.state}
                   renderItem={this.renderItem2}
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
    setBookingStep1: date => dispatch(setBookingStep1(date))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Viewquiz);
