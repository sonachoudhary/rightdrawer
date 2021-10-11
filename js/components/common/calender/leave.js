import { Modal, View, Text,BackHandler,CheckBox ,FlatList,
  TouchableOpacity,KeyboardAvoidingView,ScrollView,Alert} from "react-native";
import React, { Component } from "react";
import { Actions, ActionConst } from "react-native-router-flux";

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


function mapStateToProps(state) {
  return {
   
    jwtAccessToken: state.driver.appState.jwtAccessToken,
   
   };
}
class Leaverequest extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      color:[{id:1,color:'#FF9800',checked:0},{id:1,color:'#53B958'},{id:1,color:'#007BFF'},{id:1,color:'#E83E8C'},{id:1,color:'#D80B4E'}],
      checked:true,
      Title:'',
      Descriptions:'',
      Date:new Date(),
      Time:"",
     };
    
  }

  componentDidMount() {
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
     alert(value)
    this.setState({selected: value})
   
  }
  savebtn(){
    if(this.state.Title==""){
      alert('Subject required')
    } else if(this.state.Descriptions==""){
      alert('reason required')
    } else{
      Actions.Calender();
    }

  }
  cancelbtn(){
    Actions.Calender();
  }
  
  
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center',backgroundColor:'#F8FAFA'}} behavior="padding"  keyboardVerticalOffset={70}>
              <ScrollView>
      <View style={{backgroundColor:'#F0F0F0'}}>
        
          <View style={{height:700,backgroundColor:'#fff',position:'absolute',top:100,right:0,left:0,borderRadius:20}}>
            <Text style={{color:'#000',fontWeight:'500',margin:30,fontSize:16}}>Create Leave</Text>
            <Item style={{marginLeft:30,marginRight:30,borderColor:'lightgray'}}>
                <Input placeholder="Subject" 
                         onChange={(event) => this.setState({Title: event.nativeEvent.text})}
                         value={this.state.Title}
                 
                />
            </Item>
            
            <Item regular  style={styles.inputvalue}>

                <Input   placeholder='Leave reason'
                            style={{ color:'#000', height:156, width:380, fontSize:16, padding:5,borderRadius:5,}}
                            multiline
                           
                            placeholderTextColor="#777"
                            editable={true}
                            onChange={(event) => this.setState({Descriptions: event.nativeEvent.text})}
                            value={this.state.Descriptions}
                        />  
            </Item>

            <View style={{borderWidth:1,borderColor:'gray',marginTop:10,marginLeft:20,marginRight:20,borderColor:'lightgray'}}> 
                              
                               <DatePicker
                                  
                                  placeholder="Start Date"
                                  textStyle={'#000'}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  placeHolderTextStyle={'#000'}
                                  onDateChange={Date => {
                                      this.setState({ Date: Date });
                                  }}
                                  date={this.state.Date}
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
                         
                   <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:30}}>
                             <TouchableOpacity style={{backgroundColor:'#DAD9DF',
                                                       width:90,height:40,
                                                       justifyContent:'center',
                                                       alignItems:'center',borderRadius:5
                                                     }} onPress={()=>this.cancelbtn()}>
                                <Text style={{color:'#000'}}> Cancel</Text>
                             </TouchableOpacity>
                              <TouchableOpacity style={{backgroundColor:'#D22D80',
                              width:90,height:40,marginLeft:10,justifyContent:'center',
                              alignItems:'center',borderRadius:5}}
                              onPress={()=>this.savebtn()}
                              >
                                <Text style={{color:'#fff'}}> Send</Text>
                             </TouchableOpacity>

                         </View>
          </View>
       
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
)(Leaverequest);
