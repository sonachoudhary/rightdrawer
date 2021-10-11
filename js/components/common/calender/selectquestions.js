import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, 
  Image, CheckBox, TouchableWithoutFeedback ,FlatList,BackHandler} from "react-native";
import ImagePicker from "react-native-image-picker";
import SelectMultiple from 'react-native-select-multiple'
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
    userid:state.driver.user.teacherlogin.teacherid,    
    userType: state.driver.user.userType,    
  };
}



 


class Selectquestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       data2:[{month:'jan'},{month:'Feb'},{month:'March'},{month:'April'},{month:'May'},{month:'june'},{month:'july'},{month:'Aug'},{month:'Sep'},{month:'Oct'},{month:'Nov'},{month:'Dec'}],
       
       selected:'',
      selectedDate: moment().format('YYYY-MM-DD'),
      error: false,
      selectedCal: undefined,
      questions:[],
      selectedquestions:[],
      chapterid:'',
      alldata:[],
      questionid:'',
      alldatamarks:[],
    }
  }
componentDidMount() {
   this._retrive()
   var that = this;
       setTimeout( function(){
        that.getquestionlist();
   },1000)
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
  
  
  

_retrive(){
  const chapterid=SyncStorage.get('chapterid');
    this.setState({chapterid:chapterid});
}
 getquestionlist(){
  
     fetch(`${config.serverSideUrl}/questions/${this.state.chapterid}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
       Cookie:'token='+this.props.jwtAccessToken,
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if(data!=null){
         this.setState({alldata:data})
          let array = [];
          let arry2=[];

         // let array2=[];
          for(let i = 0; i < data.length; i++) {
             var getar = [];
             getar['label'] =  data[i].question;
             getar['value'] =  data[i].id+'_'+data[i].marks;
             //getar['marks']=data[i].marks;
             array.push(getar);
            //array2.push(data[i].id);
          }
          
         
        this.setState({ questions:array })
        //this.setState({questionid:array2})
        
      }
    })
    .catch(e => {
              
    });
 }
 
 
  
  onSelectionsChange = (selectedquestions) => {
    
    this.setState({ selectedquestions })
  }
  createquiz(){
    // alert(this.state.questionid)
    SyncStorage.set('selectedquestions', this.state.selectedquestions);
     
     Actions.Createquiz()
  }

   
  render() {
    

    return (
      <Container style={{ backgroundColor:'#ffffff'}}>
         <Header style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}>
          <Left>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent onPress={() => Actions.Quizdashboard()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
                                            
            </Button>
            <Text style={styles.textheadingnewdata}> Select Questions</Text>
            </View>
          </Left>
          <Right>
                <TouchableOpacity  onPress={() => this.createquiz()}>
                      <Text style={{color:'#000000',fontSize:24}}> Next</Text>
                  </TouchableOpacity>
          </Right>    
        </Header>
        <Content style={{ backgroundColor:rgb(237,204,202)}}>
          
            <View>
                 <SelectMultiple
                  items={this.state.questions}
                  renderLabel={this.renderLabel}
                  selectedItems={this.state.selectedquestions}
                  selectedCheckboxStyle={{backgroundColor:'#7FBD7B'}}
                  labelStyle={{ fontSize:18}}
                   onSelectionsChange={this.onSelectionsChange} 
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
)(Selectquestions);
