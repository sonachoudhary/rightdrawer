import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,ImageBackground,ScrollView,StatusBar } from "react-native";
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
import Textarea from 'react-native-textarea';
import Footer from "../footer";
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-s3-upload';

import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser } from '../../../actions/driver/home';
import OneSignal from "react-native-onesignal";
import config from "../../../../config";
import { updateUserProfileAsync,updateUserProfilePicAsync} from "../../../actions/driver/settings";
import {DstATopComposition} from 'react-native-image-filter-kit';

//import DeviceInfo from 'react-native-device-info';

let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 

const getRandomId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2)

const getImageOptions = (maxFiles) => {
  const imageOptions = {
    width: 150,
    height: 150,
    compressImageQuality: 0.15,
    mediaType: "photo",
    includeBase64: true
  }

  if (maxFiles != null) {
    imageOptions.multiple = true;
    imageOptions.maxFiles = maxFiles;
  }

  return imageOptions;
}

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const imageUploadOptions = {
  keyPrefix: "backimage/",
  bucket: "b1-s3b-fitworld",
  region: "us-east-2",
  accessKey: "AKIAXJHBNQN2GK5CQWFF",
  secretKey: "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",
  successActionStatus: 201,
  width: 150,
  height: 150,
  compressImageQuality: 0.15,
  mediaType: "photo",
  includeBase64: true  
}

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = 'First name is required';
  } else if (!values.lname) {
    errors.lname = 'Last name is required';
  }
  
  return errors;
};

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item style={{backgroundColor:'#313131',borderRadius:30,paddingLeft:10,borderBottomColor:'#313131',borderBottomWidth:0}}>
         {props.type === 'user1' &&
          <Image source={require("../../../../assets/images/user.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'user' &&
          <Image source={require("../../../../assets/images/user.png")} style={{marginTop:2,marginLeft:5,marginRight:5,opacity:0.9}} />
        }
        {props.type === 'user1' &&
          <Input {...input} {...props} style={{ color: '#ffffff',borderBottomWidth:0,borderBottomColor:'#1A1A1A' }}  />
        }
        {props.type === 'user' &&
          <Input {...input} {...props} style={{ color: '#ffffff',opacity:0.8,height:48,lineHeight:18,marginTop:0,justifyContent:'center',borderBottomColor:'#313131',borderBottomWidth:0}}  />
        }
      </Item>

      {meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
    </View>
  );
};


input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    userDetails: state.driver.user,
  };
}

class Editprofile extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    
    
  };

  

  constructor(props) {
    super(props);
    
    this.state = {
      socialLogin: null,
      showforgotpanel:false,
      loading: true,
      isFetching:false,
      bio:'',
      heading: "RIDER LOCATION ARRIVED",
      userDetails:this.props.userDetails,
      displaylabel:'',
      showView: true,
      forgotemail:'',
      showtimer:0,
      timer:10,
      bio:this.props.userDetails.bio,
      modalVisible: false,
      s3source:'',
      s3sourceType:'',
      profile_pic:this.props.userDetails.profileUrl,
      showloader:false
    };

  }

 

  componentWillMount() {
    this.props.initialize({ fname: this.state.userDetails.fname,lname: this.state.userDetails.lname});
  }

  state = {
    showError: false
  };

  
  submit(values) {
    this.setState({isFetching:true});
    var values = { "type":0,"fname":values.fname,"lname":values.lname,"bio":this.state.bio}
    this.props.dispatch(updateUserProfileAsync({ ...values }));
    Actions.editprofile1();
  }

  
  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  
  showtimerdata(){
    this.setState({showtimer:1});
    var that = this;
    setTimeout(function(){ that.counter() },1000);
  }
  
  counter(){
    var that = this;
    that.setState({timer:that.state.timer-1});
    if(that.state.timer>0){
      setTimeout(function(){ that.counter() },1000);
    }else {
        that.setState({showtimer:0,timer:10});
    }
  }

  userImageViaCamera() {
    
    ImagePicker.showImagePicker(options, (image) => {
      if(image.uri){
          this.setState({ profile_pic: image.uri,showloader:true }) ;
          var that = this;
          setTimeout(function(){
              that.setState({ showloader:false }) ;
          },10000);
          image.name = Date.now() + getRandomId();
          image.type = "image/jpeg";
          RNS3.put(image, imageUploadOptions).then(response => { console.log(response);
            if (response.status !== 201) {
              throw new Error("Failed to upload image to S3");
            } else {
              
              let data = { s3source: response.body.postResponse.location, s3sourceKey: response.body.postResponse.key, s3sourceETag: response.body.postResponse.etag };
             
              this.setState({
                s3source: data.s3source,
                s3sourceType: data.s3sourceType,
                profile_pic:data.s3source,
                showloader:false
              }) 

              var values = { profileUrl:this.state.s3source }
              this.props.dispatch(updateUserProfilePicAsync({ ...values }));
               
            }                        
          });
      }
      
    });
  }

  render() {
    
    return (
      <Container style={{ backgroundColor: "#1A1A1A" }}>
      <StatusBar barStyle="light-content" />
       <View style={{flexDirection:'row',marginTop:40}}>
         <View style={{width:40}}>
          <TouchableOpacity onPress={() => Actions.myprofile()}>
            <View style={{marginLeft:10}}>
              <Image source={require("../../../../assets/images/leftarrow.png")} style={{width:23,height:16,zIndex:3005}} />
            </View>
          </TouchableOpacity>
          </View>
          <View style={{width: deviceWidth-40,justifyContent:'center',alignItems:'center',marginLeft:-15}}>
               <Text style={{color:'#ffffff',fontSize:20,fontFamily:'ProximaNova-Bold'}}>Edit Profile</Text>
          </View>
        </View>
        
        <ScrollView style={{marginBottom:80}}>
        <TouchableOpacity onPress={() => this.userImageViaCamera()}>
            <View style={{marginTop:40,justifyContent:'center',alignItems:'center'}}>
                  
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
                  <View>
                   <Image
                          style={{width:49,height:43,zIndex:3000,marginTop:-155}}
                          source={require("../../../../assets/images/white-camera.png")}
                        />
                  </View>
            </View>
        </TouchableOpacity>
        <View style={{width: deviceWidth,justifyContent:'center',alignItems:'center',marginTop:60}}>
          <View style={{padding:10,width: deviceWidth-20}}>
            <View style={{ padding: 10 }}>
                  <Field
                    component={input}
                    name="fname"
                    type="user"
                    placeholder="First Name"
                    placeholderTextColor={'#686868'}
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Field
                    component={input}
                    name="lname"
                    type="user"
                    placeholder="Last Name"
                    placeholderTextColor={'#686868'}
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <View style={{flexDirection:'row',marginBottom:14,marginTop:10,paddingLeft:15}}>
                    <Image source={require("../../../../assets/images/user.png")} style={{marginRight:10}} />
                    <Text style={{color:'#ffffff',fontSize:16,opacity:0.5,letterSpacing: -0.28}}>Profile Bio</Text>
                  </View>
                   <View style={{ padding: 10 }}>
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={ (value) => ( this.setState({bio: value}) ) }
                        placeholder={''}
                        value={this.state.bio}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                      />
                  </View>
                </View>
              </View>
               
                 <View style={[styles.regBtnContain,{justifyContent:'center',alignItems:'center',marginTop:31}]}>
                  <TouchableOpacity onPress={this.props.handleSubmit(this.submit.bind(this))}>
                      <View style={styles.regBtn}>
                          
                      {this.state.isFetching ? (
                            <Spinner />
                          ) : (
                            <Text  style={{ color: '#fff', fontSize:22,fontFamily:'ProximaNova-Bold',lineHeight:22}}>Next</Text>
                          )}
                      </View>
                  </TouchableOpacity>
                </View>

        </View>
        </ScrollView>
       
       <Footer /> 
      { this.state.showloader==true &&
          <View style={{position:'absolute',opacity:0.5,width:deviceWidth,height:deviceHeight, backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
              <Spinner color="red" />
          </View>
      }
      </Container>
    );
  }
}



Editprofile = reduxForm({
  form: "editprofileForm", // a unique name for this form
  validate
})(Editprofile);

function bindActions(dispatch) {
  return {
    updateUserProfileAsync: userDetails => dispatch(updateUserProfileAsync(userDetails)),
    updateUserProfilePicAsync: userDetails => dispatch(updateUserProfilePicAsync(userDetails)), 
  };
}

Editprofile = connect(mapStateToProps,bindActions)(Editprofile);

export default Editprofile;
