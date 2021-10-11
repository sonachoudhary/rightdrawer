import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,ScrollView,StatusBar,FlatList,Animated,Easing,StyleSheet } from "react-native";
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
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import * as appStateSelector from "../../../reducers/driver/appState";
//import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin";
import AsyncStorage from '@react-native-community/async-storage';

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest,getNearByTrainers,setclassData } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser } from '../../../actions/driver/home';

import OneSignal from "react-native-onesignal";
import config from "../../../../config";

import SortableList from 'react-native-sortable-list';
import Modal from "react-native-modal";
import UserAvatar from 'react-native-user-avatar';
import {CustomCachedImage} from "react-native-img-cache";
import CustomImage from 'react-native-image-progress';

//import DeviceInfo from 'react-native-device-info';


const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 



function mapStateToProps(state) {
  
  return {
   
    latitude: state.driver.user.gpsLoc[1],
    longitude: state.driver.user.gpsLoc[0],
    nearByTrainers: state.driver.user.nearbyTrainers,
  };
}


class Preferencelist extends Component {
  static propTypes = {
    
     nearbyTrainers: PropTypes.array
  };

  constructor(props) { 
    super(props);
    
    this.state = {
      socialLogin: null,
      showforgotpanel:false,
      loading: true,
      heading: "RIDER LOCATION ARRIVED",
      displaylabel:'',
      showView: true,
      forgotemail:'',
      showtimer:0,
      timer:60,
      customer: {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
      },
      preferencemodalVisible: false,
      preferencepicmodalVisible:false,
      modalVisible: false,
      nearByTrainers: [],
      scrollEnabled:false,
    };

     this.getfunction();
     this.openpic();
  }
  
  async openpic(){
    var touropen = await AsyncStorage.getItem('touropen');
    if(touropen!="0"){
      var that = this;
      setTimeout(function(){ that.setState({preferencemodalVisible:true});},100);
    }
  }
 
  async openother(){
      await AsyncStorage.setItem('touropen', "0");
      var that = this;
      this.setState({preferencemodalVisible:false});
      setTimeout(function(){ that.setState({preferencepicmodalVisible:true});},500);
      setTimeout(function(){ that.setState({preferencepicmodalVisible:false});},5000);
      
   }

   getfunction() {
     const data = { user_id : '', latitude : this.state.customer.latitude, longitude : this.state.customer.longitude };
  
  
    fetch(`${config.serverSideUrl}:${config.port}/api/users/searchnearmatch`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        resp.json().then(data => { 
          console.log('printdata',data.data);
           this.setState({ nearByTrainers : data.data });
           console.log('this.state.nearByTrainers', this.state.nearByTrainers);
        });
      })
      .catch(e => {
        
      });
  
      
  }
  

  

  getmatch(user_id){
    this.props.dispatch(setclassData(user_id,'test'));
  }
  
  _renderRow = ({data, active,index}) => {
    return <Row data={data} active={active} index={index} user_id={data._id} />
  }

  
  preferencelist(){
    if(this.state.scrollEnabled==true){
       this.setState({scrollEnabled: false });
    }else {
      this.setState({scrollEnabled: true });
    }
    
  }


  render() { 
     //console.log('this.state.nearByTrainers', this.state.nearByTrainers);
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
      <StatusBar barStyle="light-content" />
       <View style={{ justifyContent:'center',alignItems:'center',width:deviceWidth,marginTop:70}}>
              <View style={{ width:deviceWidth,flexDirection:'row'}}>
                <View style={{ width:deviceWidth-90}}>
                  <TouchableOpacity onPress={() => this.preferencelist()}>
                    <Text style={{color:'#ffffff',fontSize:20,paddingLeft:10,fontFamily:'ProximaNova-Bold'}}>Preference List</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{color:'#ffffff',fontSize:20,paddingLeft:20,fontFamily:'ProximaNova-Bold'}}>00:{this.state.timer}</Text>
              </View>
            <View style={{marginTop:30,marginBottom:130}}>
              { Platform.OS === "ios" ?
              <SortableList
                style={styles.list}
                contentContainerStyle={styles.contentContainer}
                data={this.state.nearByTrainers}
                renderRow={this._renderRow} />
              :
              <SortableList
                style={styles.list}
                contentContainerStyle={styles.contentContainer}
                data={this.state.nearByTrainers}
                scrollEnabled={this.state.scrollEnabled}
                renderRow={this._renderRow} />
              }
              </View>
       </View>
          <View style={{position:'absolute',bottom:deviceHeight/18,justifyContent:'center',alignItems:'center',width:deviceWidth}}>
            <TouchableOpacity onPress={() => Actions.profile()}>
              <Image
                  source={require("../../../../assets/images/backicon.png")}
                  style={{width:40,height:40}}
                  
                />
            </TouchableOpacity>
           </View>



        <Modal
            animationType="slide"
            backdropOpacity={0.8}
            isVisible={this.state.preferencemodalVisible}
            >
              <View style={styles.modalView}>

                  <View style={{marginTop:deviceHeight/2.5,justifyContent:'center',alignItems:'center',width:deviceWidth}}>
                    <Text style={{fontSize:22,lineHeight:24,color:'#ffffff',fontFamily:'ProximaNova-Bold'}}>Drag and drop to rank the profiles.</Text>
                    
                  </View>
                   <View style={{marginLeft:deviceWidth-150,zIndex:1001}}>
                      <Image
                            style={{width:deviceWidth/6.8,height:deviceWidth/5.2,marginTop:16,marginBottom:-30,transform: [{ rotate: '180deg'}]}}
                            resizeMode="contain"
                            source={require("../../../../assets/images/arrow.png")}
                      />
                    </View>
                     
                     <View style={{width:deviceWidth-20,flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:0,borderColor:'#1A1A1A',borderRadius:5,height:100,marginBottom:7,backgroundColor:'#333333'}}>
                              <View style={{width:'30%',borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                                   <TouchableOpacity onPress={() => this.openother()}>
                                      <Image source={require("../../../../assets/images/user/user4.png")} style={{width:100,height:100}} />
                                   </TouchableOpacity>
                              </View>
                              <View style={{width:'70%',justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={() => this.openother()}>
                                        <Text style={{paddingLeft:20, fontSize:18, color:'#ffffff',justifyContent: 'center',textTransform: 'capitalize'}}>Beatrice Nelson, 25</Text>
                                    </TouchableOpacity>
                                </View>
                    </View>
                    
                  <View style={{marginLeft:deviceWidth-150}}>
                    <Image
                          style={{width:deviceWidth/6.8,height:deviceWidth/5.2,marginTop:-30,marginBottom:16}}
                          resizeMode="contain"
                          source={require("../../../../assets/images/arrow.png")}
                    />
                  </View>

              </View>
          </Modal>

          <Modal
            animationType="slide"
            backdropOpacity={0.8}
            isVisible={this.state.preferencepicmodalVisible}
            >
              <View style={styles.modalView}>
                  <View style={{marginTop:deviceHeight/3,justifyContent:'center',alignItems:'center',width:deviceWidth,marginLeft:-10,marginBottom:10}}>
                    <Text style={{fontSize:22,lineHeight:24,color:'#ffffff',fontFamily:'ProximaNova-Bold'}}>Tap on the picture to</Text>
                    <Text style={{fontSize:20,lineHeight:24,color:'#ffffff',fontFamily:'ProximaNova-Bold'}}>view full profile.</Text>
                      
                  </View>
                    <View style={{width:deviceWidth-20,marginLeft:'30%',alignItems:'flex-start'}}>
                      <Image
                            style={{width:52,height:66,marginTop:0,marginBottom:5,transform: [{ rotate: '10deg'}]}}
                            resizeMode="contain"
                            source={require("../../../../assets/images/arrow.png")}
                      />
                    </View>
                    
                     <View style={{width:deviceWidth-20,flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:0,borderColor:'#1A1A1A',borderRadius:5,height:100,marginBottom:7,backgroundColor:'#333333'}}>
                              <View style={{width:'30%',borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                                   <Image source={require("../../../../assets/images/user/user4.png")} style={{width:100,height:100}} />
                              </View>
                              <View style={{width:'70%',justifyContent: 'center'}}>
                                    <TouchableOpacity>
                                        <Text style={{paddingLeft:20, fontSize:18, color:'#ffffff',justifyContent: 'center',textTransform: 'capitalize'}}>Beatrice Nelson, 25</Text>
                                    </TouchableOpacity>
                                </View>
                    </View>
                    
                  

              </View>
          </Modal>

      </Container>
    );
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  async SendPressed(user_id){
    await AsyncStorage.setItem('user_id', user_id);
    Actions.profilematch();
  }

  render() {
   const {data, active,index,user_id} = this.props;
     var name = data.fname +' '+ data.lname;
    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
     
      <View style={{width:deviceWidth-20,flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:0,borderColor:'#1A1A1A',borderRadius:5,height:90,marginBottom:7,backgroundColor:'#333333'}}>
          
          <View style={{width:'25%',borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
          
              <View>
               
                  { (data.profileUrl!="" && data.profileUrl!=null) ?
                      <View style={{ width:90,height:90,borderTopLeftRadius:5,borderBottomLeftRadius:5,overflow: "hidden"}}>
                        <TouchableOpacity onPress={() => this.SendPressed(user_id)}>
                        <CustomCachedImage
                        component={CustomImage}
                        source={{ uri: data.profileUrl }} 
                        style={{ width:90,height:90,borderTopLeftRadius:5,borderBottomLeftRadius:5 }} />
                        </TouchableOpacity>
                      </View>
                    :
                      <View>
                        <TouchableOpacity onPress={() => this.SendPressed(user_id)}>
                          <UserAvatar size={90} name={name} src={data.profile_pic} style={{ width:90,height:90,borderTopRightRadius:0,borderBottomRightRadius:0,borderTopLeftRadius:5,borderBottomLeftRadius:5 }} />
                          </TouchableOpacity>
                      </View>
                    }
                
             
              </View>
          </View>
          
            <View style={{width:'65%',justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => this.SendPressed(user_id)}>
                    <Text style={{paddingLeft:20, fontSize:18, color:'#ffffff',justifyContent: 'center',textTransform: 'capitalize'}}>{data.fname} {data.lname}</Text>
                </TouchableOpacity>
                <Text style={{paddingLeft:20, fontSize:14, opacity:0.5,color:'#ffffff',justifyContent: 'center',textTransform: 'capitalize'}}>University Name</Text>
              
            </View>
         
          <View style={{width:'10%',justifyContent: 'center'}}>
            <Text style={{color:'#F54462',fontSize:20,justifyContent: 'center',fontWight:'500',textShadowColor: '#F54462', textShadowOffset: { width: -1, height: 0 }, textShadowRadius: 10}}>{index+1}</Text>
          </View>
      </View>
     
      </Animated.View>
    );
  }
}


function bindActions(dispatch) {
  return {
    getNearByTrainers: (obj1, obj2) => dispatch(getNearByTrainers(obj1, obj2)),
    
  };
}



Preferencelist = connect(mapStateToProps,bindActions)(Preferencelist);

export default Preferencelist;
