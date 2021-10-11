import { Modal, View, Text,BackHandler,CheckBox ,FlatList,
  TouchableOpacity,KeyboardAvoidingView,ScrollView,Alert,TextInput,Image} from "react-native";
import React, { Component } from "react";
import { Actions, ActionConst } from "react-native-router-flux";
import MapView from 'react-native-maps';

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


class DriverHome extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      color:[{id:1,color:'#FF9800',checked:0},{id:1,color:'#53B958'},{id:1,color:'#007BFF'},{id:1,color:'#E83E8C'},{id:1,color:'#D80B4E'}],
      checked:true,
      Title:'',
      Descriptions:'',
      Date:new Date(),
      Time:"",
      name:"",
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
      
      <ScrollView>
      <View style={{backgroundColor:'#F0F0F0',}}>
       <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{width:70,height:70}}  >
                       <Image                      
                            source={require("../../../../assets/images/Group_16692.png")}
                            style={{ width:50.08, height: 50.08, position:'absolute', right:10 , }}
                        />  
                    </TouchableOpacity>
        <View style={{flexDirection:'row',borderRadius:10,borderWidth:1,borderColor:'#b3b3b3',marginTop:'5%',}}>
           <View style={{width:'80%'}}>
            <TextInput
              style={{height: 50,borderBottomWidth: 1, borderColor:'#bfbfbf'}}
              onChange={(event) => this.setState({name: event.nativeEvent.text})}
              value={this.state.name}
            />
           </View>
            <TouchableOpacity 
                        onPress={()=>Actions.customersignup()}>
            <View style={{backgroundColor:'#341F54',height:50,padding:'3%',borderRadius:5,justifyContent:'center',}}>
              <Text style={{fontSize:17,color:'#ffffff',textAlign:'center'}}>Search</Text>
            </View>
            </TouchableOpacity>
        </View>
       
      
       <View style={{height:900}}>
            <MapView
              style={{height:'100%'}}
              region={{
              latitude: 28,
              longitude: 80,
              latitudeDelta:6,
              longitudeDelta: 2,
              }}
            />
       </View>
      </View>
      </ScrollView>
      
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
)(DriverHome);
