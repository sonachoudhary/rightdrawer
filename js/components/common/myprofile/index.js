import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,ImageBackground,StatusBar,ScrollView } from "react-native";
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

import { logOutUserAsync } from "../../../actions/common/signin";


import Footer from "../footer";

import styles from "./styles";
import _ from "lodash";
import {DstATopComposition} from 'react-native-image-filter-kit'; 

import config from "../../../../config"
import IconBadge from 'react-native-icon-badge';
import UserAvatar from 'react-native-user-avatar';
import {CustomCachedImage} from "react-native-img-cache";
import CustomImage from 'react-native-image-progress';

let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 

function mapStateToProps(state) {
   return {
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    userType: state.driver.user.userType,
    user_id: state.driver.user._id,
    profileUrl: state.driver.user.profileUrl,
    userDetail: state.driver.user,
    jwtAccessToken: state.driver.appState.jwtAccessToken
   }
}

class Myprofile extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    logOutUserAsync: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const idLogedid =  this.props.userDetail._id;
    this.state = { 
      loggedInUserId: idLogedid,
      name: this.props.userDetail.fname +' '+this.props.userDetail.lname,
      profile_pic:this.props.profileUrl,
      notcount:0,
    };
  }

  handleLogOut() {
    this.props.logOutUserAsync(this.props.jwtAccessToken);
  }

  componentDidMount() {this.notificationcount(this.props.user_id); }

  componentWillUnmount() { }



    notificationcount(user_id){
      var today = new Date();
      const userEmail = { user_id: user_id,time:today  };
      fetch(`${config.serverSideUrl}:${config.port}/api/users/unreadnotificaitoncount`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail)
      })
      .then(response => response.json())
      .then(data => {
        this.setState({notcount:data.notificationdatalist.length});
      })
      .catch(error => { });
    }

  render() {

     if(this.props.userDetail.age!=""){
        var birthday = this.props.userDetail.age;
        var convertdate = new Date(birthday);
      
        var ageDifMs = Date.now() - convertdate.getTime();
        var ageDate = new Date(ageDifMs); 
        var agedata =  Math.abs(ageDate.getUTCFullYear() - 1970);
        if(agedata==50){ var agedata = 0; }
    }else {
        var agedata = 0;
    }

    

    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
      
      <StatusBar barStyle="light-content" />
        { this.state.loggedInUserId != undefined &&
         <View style={Platform.OS === "ios" ? styles.iosnotheadingicon : styles.androidnotheadingicon}>
            <TouchableOpacity onPress={() => Actions.notifications()}>
                <IconBadge
                  MainElement={
                    <Image source={require("../../../../assets/images/notification.png")} style={{width:22,height:24,marginTop:8,marginRight:10}} />
                  }
                  BadgeElement={
                    <Text style={{color:'#FFFFFF',fontSize:10,fontFamily:'ProximaNova-Bold'}}>{this.state.notcount}</Text>
                  }
                  IconBadgeStyle={
                    {width:15,
                    height:20,
                    backgroundColor: '#FF0000',borderWidth:2,borderColor:'#008000'}
                  }
                  Hidden={this.state.notcount==0}
              />
            </TouchableOpacity>
        </View>
        }
        <View style={Platform.OS === "ios" ? styles.iosnotheading : styles.androidnotheading}> 
            <Text style={{color:'#ffffff',fontSize:20,fontFamily:'ProximaNova-Bold'}}>My Profile</Text>
           
        </View>
        { this.state.loggedInUserId != undefined &&
         <Content style={{marginBottom:80}}>
              <View style={Platform.OS === "ios" ? styles.iosnotimage : styles.androidnotimage}>
                
                  { (this.state.profile_pic!="" && this.state.profile_pic!=null) ?
                  <DstATopComposition 
                      dstImage={
                        <Image
                            style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                            resizeMode="contain"
                            source={{ uri: this.state.profile_pic }}
                          />
                      }
                      srcImage={
                        <Image
                          style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                          resizeMode="contain"
                          source={require("../../../../assets/images/heptagon2-01.png")}
                          
                        />
                      }
                    /> 
                    :
                    <DstATopComposition 
                      
                      dstImage={
                        <Image
                          style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                          resizeMode="contain"
                          source={require("../../../../assets/images/user/screenprofile.png")}
                        />
                      }
                      srcImage={
                        <Image
                          style={Platform.OS === "ios" ? styles.myprofileios : styles.myprofileandroid}
                          resizeMode="contain"
                          source={require("../../../../assets/images/heptagon2-01.png")}
                          
                        />
                      }
                    />
                  }

              </View>

              <View style={Platform.OS === "ios" ? styles.imagebottomios : styles.imagebottomandroid}>
                  <Text style={{color:'#ffffff',fontSize:30,fontFamily:'ProximaNova-Bold'}}>{this.state.name}, {agedata}</Text>
                  <Text style={{color:'#ffffff',fontSize:17,opacity:0.9,marginTop:10,fontFamily:'ProximaNova-Regular'}}>Orlando, Florida</Text>
              </View>

              <View style={Platform.OS === "ios" ? styles.iosmarginHeader : styles.andmarginHeader}>
                 <View style={{width:deviceWidth-deviceWidth/3.5,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <View style={{width:'33%',justifyContent:'center',alignItems:'center'}}>
                      <TouchableOpacity onPress={() => Actions.editprofile()}>
                        <Image
                          source={require("../../../../assets/images/edit.png")}
                          style={{borderRadius:40,width:deviceHeight/14,height:deviceHeight/14}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{width:'33%',justifyContent:'center',alignItems:'center'}}>
                       <TouchableOpacity onPress={() => Actions.settings()}>
                        <Image
                          source={require("../../../../assets/images/settings.png")}
                          style={{borderRadius:40,width:deviceHeight/14,height:deviceHeight/14}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{width:'33%',justifyContent:'center',alignItems:'center'}}>
                      <TouchableOpacity onPress={() => this.handleLogOut()}>
                          <Image
                            source={require("../../../../assets/images/share.png")}
                            style={{borderRadius:40,width:deviceHeight/14,height:deviceHeight/14}}
                          />
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>

               <View>
                  <CustomCachedImage
                        component={CustomImage}
                        source={{ uri: this.state.profile_pic }} 
                        style={{ opacity:0 }} />
                 </View>

        </Content>
        }
        { this.state.loggedInUserId != undefined &&
          <Footer />
        }
        {this.state.loggedInUserId == undefined  &&
          <ScrollView>
            <View style={{ alignSelf: "center",justifyContent: 'center',marginTop:70}}>
                <Image
                    source={require("../../../../assets/images/logo.png")}
                    style={styles.mainlogo}
                  />
              </View>
              <View style={{alignSelf: "center",justifyContent: 'center',marginTop:30}}>
                <Text style={styles.sevenhomeheading}>Please Login or Register to interact</Text>
                <Text style={styles.sevenhomeheading}>with Real Users</Text>
              </View>
              <View style={{ flexDirection:'row',alignSelf: "center",justifyContent: 'center',marginBottom:314}}>
                  <Button onPress={() => Actions.signIn()} block style={styles.regBtn}>
                        <Text style={{ color: '#fff', fontSize:19,fontFamily:'ProximaNova-Bold',lineHeight:19}}>Login</Text>
                  </Button>
                  <Button onPress={() => Actions.signUp()} block style={[styles.regBtn,{marginLeft:14}]}>
                        <Text style={{ color: '#fff', fontSize:19,fontFamily:'ProximaNova-Bold',lineHeight:19}}>Register</Text>
                  </Button>
              </View>
          </ScrollView>

        }


      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    logOutUserAsync: jwtAccessToken => dispatch(logOutUserAsync(jwtAccessToken))
  };
}

Myprofile = connect(mapStateToProps, bindActions)(Myprofile);

export default Myprofile;
