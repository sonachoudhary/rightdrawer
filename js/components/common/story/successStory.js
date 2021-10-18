import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,StatusBar,ImageBackground,StyleSheet ,FlatList,ScrollView} from "react-native";
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
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
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

class SuccessStory extends Component {
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

      ],
      showmodal:false,
    };
    
  }

 

  componentWillUnmount(){
   
  }
 
  showmodal=()=>{
    this.setState({
      showmodal:true
    })
  }
  renderdata=({item,index})=>{
    return(
      <View style={styles.boxmain}>
           <View>
                <Image                      
                       source={require("../../../../assets/images/profilepic.png")}
                      style={[styles.img,{ width:deviceWidth/3.5, height: 200,paddingLeft:20}]}
                      />
           </View>
           <View style={{padding:'5%'}}>
              <Text style={styles.titletext}> Monika Kumari & Vikas Nagal</Text>
              <Text style={styles.datetext}>Date:10-12-2021</Text>
              <Text style={styles.desctext}> Great platform to search suitable life partner..</Text>
              <TouchableOpacity onPress={()=>this.showmodal()}>
               <Text style={styles.Readmore}>Read More</Text>
              </TouchableOpacity>
           </View>

      </View>
      )
  }

  render() {
   
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" />
      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#ed1079',}}>
                   <Button transparent onPress={() =>Actions.Home()} style={{marginTop:'5%',marginBottom:'5%'}}>
                      <Image                      
                       source={require("../../../../assets/images/menu.png")}
                      style={{ width:deviceWidth/10, height: 40,paddingLeft:20}}
                      />
                        <Text style={{color:'#fff',fontSize:deviceHeight/40,textAlign:'center',padding:'5%'}}> SuccessStory </Text>                            
                    </Button>
              </View>
       <ScrollView>
               <View>
                    <FlatList
                       style={{ margin:10}}
                       data={this.state.dataitem}
                       extraData={this.state}
                      
                       renderItem={this.renderdata}
                        />
               </View>
               <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.showmodal}
        onRequestClose={() => {
         
          this.setState({showmodal:false});
        }}
      >
        <View style={styles.centeredView}>


          <View>

          <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.2}
          zoomStep={0.2}
          initialZoom={1}

          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}
          style={{
           
          }}
        >

           <Image                      
                       source={require("../../../../assets/images/profilepic.png")}
                      style={{width: null, height: '100%' }}
                      resizeMode="contain" 
                      />
      </ReactNativeZoomableView>
                
           </View>
        </View>
      </Modal>
      
    </View>

       </ScrollView>

      </Container>
    );
  }
}



SuccessStory = reduxForm({
  
})(SuccessStory);

SuccessStory = connect(mapStateToProps)(SuccessStory);

export default SuccessStory;
