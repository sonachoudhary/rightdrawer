import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,StatusBar,ImageBackground,StyleSheet ,FlatList} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Item,
  Spinner,
  Body,
  Toast,
  Input,

} from "native-base";
import { Actions } from "react-native-router-flux";
import * as appStateSelector from "../../../reducers/driver/appState";
//import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin";
import AsyncStorage from '@react-native-community/async-storage';
import pr from 'pr-unit';
import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest,getremaningtimer,setlistorder,setgenderchoice } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";
import RNPickerSelect from 'react-native-picker-select';

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser,getpooldata } from '../../../actions/driver/home';
import OneSignal from "react-native-onesignal";
import config from "../../../../config";
import Footer from "../footer";
import Modal from "react-native-modal";
import Contacts from 'react-native-contacts';

//import DeviceInfo from 'react-native-device-info';
import { emit } from "../../../services/socket";
let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 




function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };
  console.log('state.driver.appState',state.app);
  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    setgenderchoice:state.driver.user.setgenderchoice,
    userDetail: state.driver.user,
    gender: state.driver.user.gender,
    uuid : state.app&&state.app.uuid,
    user_id: state.driver?.user?._id
  };
}

class Home extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    
    
  };
 timer = null;
  

  constructor(props) {
    super(props);
    

    this.state = {
      dataitem:[
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',},
      {Name:'Harrish',Membership:'Paid',Age:'25',Locations:'Janjgir',Educations:'master',Occupation:'Developer',Status:'Unmarried',Regligion:'Hindu',}

      ]
    };
    
  }

 

  componentWillUnmount(){
   
  }
 
  renderdata=({item,index})=>{
    return(
      <View style={styles.boxmain}>
       <View style={styles.box}>
       <View style={{justifyContent:'center',alignItems:'center',}}>
                   <Image                      
                       source={require("../../../../assets/images/profilepic.png")}
                      style={{ width:deviceWidth/4, height: 100,paddingLeft:20}}
                      />
        </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:deviceWidth/1.7}}>
            <View>
           <Text style={styles.lefttext}> Name:</Text>
           <Text style={styles.lefttext}> Membership:</Text>
           <Text style={styles.lefttext}> Age:</Text>
           <Text style={styles.lefttext}> Locations:</Text>
           <Text style={styles.lefttext}> Educations:</Text>
           <Text style={styles.lefttext}> Occupation:</Text>
           <Text style={styles.lefttext}> Married Status:</Text>
           <Text style={styles.lefttext}> Regligion/Cast:</Text>
           </View>
           <View>
           
           <Text style={styles.righttext}> Name{item.Name}</Text>
           <Text style={styles.righttext}> Name{item.Membership}</Text>
           <Text style={styles.righttext}> Name{item.Age}</Text>
           <Text style={styles.righttext}> Name{item.Locations}</Text>
           <Text style={styles.righttext}> Name{item.Educations}</Text>
           <Text style={styles.righttext}> Name{item.Occupation}</Text>
           <Text style={styles.righttext}> Name{item.Status}</Text>
           <Text style={styles.righttext}> Name{item.Regligion}</Text>
           </View>
           </View>
           
       </View>
       <TouchableOpacity style={{margin:'1%',
                                 backgroundColor:'#ed1e79',
                                 justifyContent:'center',
                                 alignItems:'center',borderRadius:10,
                               }} onPress={()=>Actions.Details()}>
               <Text style={{color:'#fff',padding:'3%',fontSize:22,}}>View Complete Profile</Text>
           </TouchableOpacity>
      </View>
      )
  }

  render() {
   
    
    return (
      <Container style={{ backgroundColor: "#ed1e79" }}>
      <StatusBar barStyle="light-content" backgroundColor="#ed1e79"/>
      
                   <Button transparent onPress={() =>this.props.navigation.openDrawer()} style={{padding:'1%',backgroundColor:'#ed1e79',}}>
                      <Image                      
                       source={require("../../../../assets/images/menu.png")}
                      style={{ width:deviceWidth/10, height: 40,paddingLeft:20}}
                      />
                        <Text style={{color:'#ffffff',fontSize:deviceHeight/30,paddingLeft:'30%',padding:'5%'}}> Home </Text>                            
                    </Button>
              
       <View>
               
                      <FlatList
                       style={{ margin:10}}
                       data={this.state.dataitem}
                       extraData={this.state}
                      
                       renderItem={this.renderdata}
                        />
              
       </View>
       
       

      </Container>
    );
  }
}



Home = reduxForm({
  
})(Home);

Home = connect(mapStateToProps)(Home);

export default Home;
