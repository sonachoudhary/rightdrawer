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
import { updateUserProfileAsync,updateUserSliderPicAsync } from "../../../actions/driver/settings";

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
  if (!values.unveristy) {
    errors.fname = 'UNIVERSITY is required';
  } else if (!values.major) {
    errors.lname = 'Major is required';
  }else if (!values.extra) {
    errors.lname = 'EXTRACURRICULAR is required';
  }else if (!values.fratienty) {
    errors.lname = 'FRATERNITY is required';
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
        
        {props.type === 'user1' &&
          <Input {...input} {...props} style={{ color: '#ffffff',borderBottomWidth:0,borderBottomColor:'#1A1A1A' }}  />
        }
        {props.type === 'user' &&
          <Input {...input} {...props} style={{ fontSize:14,color: '#ffffff',opacity:0.8,height:44,lineHeight:16,marginTop:0,justifyContent:'center',borderBottomColor:'#313131',borderBottomWidth:0}}  />
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
      bio:'',
      heading: "RIDER LOCATION ARRIVED",
      userDetails:this.props.userDetails,
      displaylabel:'',
      showView: true,
      forgotemail:'',
      showtimer:0,
      timer:10,
      user_id:this.props.userDetails._id,
      about:'',
      modalVisible: false,
      about:this.props.userDetails.about,
      unveristy:this.props.userDetails.unveristy,
      major:this.props.userDetails.major,
      extra:this.props.userDetails.extra,
      fratienty:this.props.userDetails.fratienty,
      showloader:false,
      s3source:'',
      s3sourceType:'',
      slider_pic1:'',
      slider_pic2:'',
      slider_pic3:'',
      slider_pic4:'',
      slider_pic5:'',
      slider_pic6:'',
      slider1:0,
      slider2:0,
      slider3:0,
      slider4:0,
      slider5:0,
      slider6:0,
    };
  
  }

  componentWillMount() {
     this.getuserprofile();
  }

  getuserprofile(){
   var value = this.state.user_id;
   if(value!=""){
        const userEmail = { user_id: value };
        fetch(`${config.serverSideUrl}:${config.port}/api/users/getbio`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmail)
        })
          .then(response => response.json())
          .then(data => {
              this.setState({profiledata:data.data});
              if(data.data.slider_pic1!=null){ this.setState({slider_pic1:data.data.slider_pic1, slider1:1}); }
              if(data.data.slider_pic2!=null){ this.setState({slider_pic2:data.data.slider_pic2, slider2:1}); }
              if(data.data.slider_pic3!=null){ this.setState({slider_pic3:data.data.slider_pic3, slider3:1}); }
              if(data.data.slider_pic4!=null){ this.setState({slider_pic4:data.data.slider_pic4, slider4:1}); }
              if(data.data.slider_pic5!=null){ this.setState({slider_pic5:data.data.slider_pic5, slider5:1}); }
              if(data.data.slider_pic6!=null){ this.setState({slider_pic6:data.data.slider_pic6, slider6:1}); }
          })
          .catch(error => {
            
          });
    }
  }
  

  UNSAFE_componentWillReceiveProps(){
     
  }

  

  state = {
    showError: false
  };

  
  submit(values) {
    var values = {  "type":1,"about":this.state.about, "unveristy":this.state.unveristy,"major":this.state.major,"extra":this.state.extra,"fratienty":this.state.fratienty}
    this.props.dispatch(updateUserProfileAsync({ ...values }));
    Actions.profile();
  }

  
  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  
  userImageViaCamera(type) {
    ImagePicker.showImagePicker(options, (image) => {
      if(image.uri){
          this.setState({showloader:true});
          this.setState({ profile_pic: image.uri }) ;
          var that = this;
          setTimeout(function(){
              that.setState({ showloader:false }) ;
          },10000);
          image.name = Date.now() + getRandomId();
          image.type = "image/jpeg";
          RNS3.put(image, imageUploadOptions).then(response => { 
            if (response.status !== 201) {
              throw new Error("Failed to upload image to S3");
            } else {
              let data = { s3source: response.body.postResponse.location, s3sourceKey: response.body.postResponse.key, s3sourceETag: response.body.postResponse.etag };
              if(type==1){ 
                this.setState({ s3source: data.s3source,s3sourceType: data.s3sourceType, slider_pic1:data.s3source, slider1:1 });
                var values = { slider_pic1:data.s3source }
                this.props.dispatch(updateUserSliderPicAsync({ ...values }));
              }
              if(type==2){ 
                this.setState({ s3source: data.s3source,s3sourceType: data.s3sourceType, slider_pic2:data.s3source, slider2:1 });
                var values = { slider_pic2:data.s3source }
                this.props.dispatch(updateUserSliderPicAsync({ ...values }));
              }
              if(type==3){ 
                this.setState({ s3source: data.s3source,s3sourceType: data.s3sourceType, slider_pic3:data.s3source, slider3:1 });
                var values = { slider_pic3:data.s3source }
                this.props.dispatch(updateUserSliderPicAsync({ ...values }));
              }
              if(type==4){ 
                this.setState({ s3source: data.s3source,s3sourceType: data.s3sourceType, slider_pic4:data.s3source, slider4:1 });
                var values = { slider_pic4:data.s3source }
                this.props.dispatch(updateUserSliderPicAsync({ ...values }));
              }
              if(type==5){ 
                this.setState({ s3source: data.s3source,s3sourceType: data.s3sourceType, slider_pic5:data.s3source, slider5:1 });
                var values = { slider_pic5:data.s3source }
                this.props.dispatch(updateUserSliderPicAsync({ ...values }));
              }
              if(type==6){ 
                this.setState({ s3source: data.s3source,s3sourceType: data.s3sourceType, slider_pic6:data.s3source, slider6:1 }); 
                var values = { slider_pic6:data.s3source }
                this.props.dispatch(updateUserSliderPicAsync({ ...values }));
              }
              this.setState({showloader:false});
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
        
        <ScrollView style={{marginBottom:110}}>
            <View style={{marginTop:50,justifyContent:'center',alignItems:'center',marginLeft:10}}>

              <View style={{flexDirection:'row',marginBottom:15}}>
                { this.state.slider1==1 &&
                  <View style={{width:deviceWidth/3.8,justifyContent:'center',alignItems:'center',marginRight:10}}>
                    <TouchableOpacity onPress={() => this.userImageViaCamera(1)}>
                      <Image source={{ uri: this.state.slider_pic1 }} style={{borderRadius:5,width:deviceWidth/3.8,height:deviceHeight/5.1,marginTop:0,backgroundColor:'#313131'}} />
                    </TouchableOpacity>
                  </View>
                }
                { this.state.slider1==0 &&
                  <View style={{width:deviceWidth/3.8,borderColor:'#707070',height:deviceHeight/5,borderRadius:5,borderWidth:2,justifyContent:'center',alignItems:'center',marginRight:10}}>
                      <TouchableOpacity onPress={() => this.userImageViaCamera(1)}>
                        <Image source={require("../../../../assets/images/addicon.png")} style={{width:28,height:28,marginTop:0}} />
                      </TouchableOpacity>
                  </View>
                }

                { this.state.slider2==1 &&
                  <View style={{width:deviceWidth/3.8,justifyContent:'center',alignItems:'center',marginRight:10}}>
                    <TouchableOpacity onPress={() => this.userImageViaCamera(2)}>
                      <Image source={{ uri: this.state.slider_pic2 }} style={{borderRadius:5,width:deviceWidth/3.8,height:deviceHeight/5.1,marginTop:0,backgroundColor:'#313131'}} />
                    </TouchableOpacity>
                  </View>
                }
                { this.state.slider2==0 &&
                  <View style={{width:deviceWidth/3.8,borderColor:'#707070',height:deviceHeight/5,borderRadius:5,borderWidth:2,justifyContent:'center',alignItems:'center',marginRight:10}}>
                      <TouchableOpacity onPress={() => this.userImageViaCamera(2)}>
                        <Image source={require("../../../../assets/images/addicon.png")} style={{width:28,height:28,marginTop:0}} />
                      </TouchableOpacity>
                  </View>
                }

                { this.state.slider3==1 &&
                  <View style={{width:deviceWidth/3.8,justifyContent:'center',alignItems:'center',marginRight:10}}>
                    <TouchableOpacity onPress={() => this.userImageViaCamera(3)}>
                      <Image source={{ uri: this.state.slider_pic3 }} style={{borderRadius:5,width:deviceWidth/3.8,height:deviceHeight/5.1,marginTop:0,backgroundColor:'#313131'}} />
                    </TouchableOpacity>
                  </View>
                }
                { this.state.slider3==0 &&
                  <View style={{width:deviceWidth/3.8,borderColor:'#707070',height:deviceHeight/5,borderRadius:5,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                      <TouchableOpacity onPress={() => this.userImageViaCamera(3)}>
                        <Image source={require("../../../../assets/images/addicon.png")} style={{width:28,height:28,marginTop:0}} />
                      </TouchableOpacity>
                  </View>
                }
                
                
                 
              </View>

               <View style={{flexDirection:'row'}}>
                { this.state.slider4==1 &&
                  <View style={{width:deviceWidth/3.8,justifyContent:'center',alignItems:'center',marginRight:10}}>
                    <TouchableOpacity onPress={() => this.userImageViaCamera(4)}>
                      <Image source={{ uri: this.state.slider_pic4 }} style={{borderRadius:5,width:deviceWidth/3.8,height:deviceHeight/5.1,marginTop:0,backgroundColor:'#313131'}} />
                    </TouchableOpacity>
                  </View>
                }
                { this.state.slider4==0 &&
                  <View style={{width:deviceWidth/3.8,borderColor:'#707070',height:deviceHeight/5,borderRadius:5,borderWidth:2,justifyContent:'center',alignItems:'center',marginRight:10}}>
                      <TouchableOpacity onPress={() => this.userImageViaCamera(4)}>
                        <Image source={require("../../../../assets/images/addicon.png")} style={{width:28,height:28,marginTop:0}} />
                      </TouchableOpacity>
                  </View>
                }

                { this.state.slider5==1 &&
                  <View style={{width:deviceWidth/3.8,justifyContent:'center',alignItems:'center',marginRight:10}}>
                    <TouchableOpacity onPress={() => this.userImageViaCamera(5)}>
                      <Image source={{ uri: this.state.slider_pic5 }} style={{borderRadius:5,width:deviceWidth/3.8,height:deviceHeight/5.1,marginTop:0,backgroundColor:'#313131'}} />
                    </TouchableOpacity>
                  </View>
                }
                { this.state.slider5==0 &&
                  <View style={{width:deviceWidth/3.8,borderColor:'#707070',height:deviceHeight/5,borderRadius:5,borderWidth:2,justifyContent:'center',alignItems:'center',marginRight:10}}>
                      <TouchableOpacity onPress={() => this.userImageViaCamera(5)}>
                        <Image source={require("../../../../assets/images/addicon.png")} style={{width:28,height:28,marginTop:0}} />
                      </TouchableOpacity>
                  </View>
                }

                { this.state.slider6==1 &&
                  <View style={{width:deviceWidth/3.8,justifyContent:'center',alignItems:'center',marginRight:10}}>
                    <TouchableOpacity onPress={() => this.userImageViaCamera(6)}>
                      <Image source={{ uri: this.state.slider_pic6 }} style={{borderRadius:5,width:deviceWidth/3.8,height:deviceHeight/5.1,marginTop:0,backgroundColor:'#313131'}} />
                    </TouchableOpacity>
                  </View>
                }
                { this.state.slider6==0 &&
                  <View style={{width:deviceWidth/3.8,borderColor:'#707070',height:deviceHeight/5,borderRadius:5,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                      <TouchableOpacity onPress={() => this.userImageViaCamera(6)}>
                        <Image source={require("../../../../assets/images/addicon.png")} style={{width:28,height:28,marginTop:0}} />
                      </TouchableOpacity>
                  </View>
                }

               
              </View> 



            </View>
        
        <View style={{width: deviceWidth,justifyContent:'center',alignItems:'center',marginTop:20}}>
              <View style={{ padding: 10,width: deviceWidth-20}}>
                 <View style={{ padding: 10 }}>
                  <View style={{flexDirection:'row',marginBottom:10,marginTop:10,paddingLeft:10}}>
                    <Image source={require("../../../../assets/images/user.png")} style={{marginTop:0,marginRight:10}} />
                    <Text style={{color:'#ffffff',fontSize:14,paddingTop:0,opacity:1}}>ABOUT ME</Text>
                  </View>

                  <Textarea
                      containerStyle={styles.textareaContainer}
                      style={styles.textarea}
                      onChangeText={ (value) => ( this.setState({about: value}) ) }
                      placeholder={'Say something interesting about yourself!'}
                      placeholderTextColor={'#787878'}
                      value={this.state.about}
                      underlineColorAndroid={'transparent'}
                    />
                </View>

                <View style={{ padding: 10 }}>
                  <View style={{flexDirection:'row',marginBottom:10,marginTop:0,paddingLeft:10}}>
                    <Image source={require("../../../../assets/images/icon11.png")} style={{width:22,height:24,marginTop:0,marginRight:10}} />
                    <Text style={{color:'#ffffff',fontSize:14,paddingTop:3,opacity:1}}>UNIVERSITY</Text>
                  </View>

                  <Input
                    style={{fontSize:16,color: '#ffffff',opacity:0.8,height:48,lineHeight:18,marginTop:0,justifyContent:'center',backgroundColor:'#313131',borderRadius:25,paddingLeft:20}}
                    name="unveristy"
                    type="user"
                    placeholder="Add University"
                    placeholderTextColor={'#787878'}
                    autoCapitalize="none"
                    onChangeText={ value => this.setState({ unveristy: value })}
                    value={this.state.unveristy}
                  />
                </View>

                <View style={{ padding: 10 }}>
                  <View style={{flexDirection:'row',marginBottom:10,marginTop:0,paddingLeft:10}}>
                    <Image source={require("../../../../assets/images/icon21.png")} style={{width:22,height:24,marginTop:0,marginRight:10}} />
                    <Text style={{color:'#ffffff',fontSize:14,paddingTop:3,opacity:1}}>MAJOR</Text>
                  </View>

                  <Input
                    style={{fontSize:16,color: '#ffffff',opacity:0.8,height:48,lineHeight:18,marginTop:0,justifyContent:'center',backgroundColor:'#313131',borderRadius:25,paddingLeft:20}}
                    name="major"
                    type="user"
                    placeholder="Add Major"
                    placeholderTextColor={'#787878'}
                    autoCapitalize="none"
                    onChangeText={ value => this.setState({ major: value })}
                    value={this.state.major}
                  />
                </View>

                <View style={{ padding: 10 }}>
                  <View style={{flexDirection:'row',marginBottom:5,marginTop:0,paddingLeft:10}}>
                    <Image source={require("../../../../assets/images/icon31.png")} style={{width:22,height:24,marginTop:0,marginRight:10}} />
                    <Text style={{color:'#ffffff',fontSize:14,paddingTop:3,opacity:1}}>EXTRACURRICULAR</Text>
                  </View>

                  <Input
                    style={{fontSize:16,color: '#ffffff',opacity:0.8,height:48,lineHeight:18,marginTop:0,justifyContent:'center',backgroundColor:'#313131',borderRadius:25,paddingLeft:20}}
                    name="extra"
                    type="user"
                    placeholder="Add Extracurricular (Optional)"
                    placeholderTextColor={'#787878'}
                    autoCapitalize="none"
                    onChangeText={ value => this.setState({ extra: value })}
                    value={this.state.extra}
                  />
                </View>

                <View style={{ padding: 10,marginTop:-5 }}>
                  <View style={{flexDirection:'row',marginBottom:0,marginTop:0,paddingLeft:5}}>
                    <Image source={require("../../../../assets/images/icon41.png")} style={{marginTop:0,marginRight:5}} />
                    <Text style={{color:'#ffffff',fontSize:14,paddingTop:7,opacity:1}}>FRATERNITY</Text>
                  </View>

                  <Input
                    style={{fontSize:16,color: '#ffffff',opacity:0.8,height:48,lineHeight:18,marginTop:0,justifyContent:'center',backgroundColor:'#313131',borderRadius:25,paddingLeft:20}}
                    name="fratienty"
                    type="user"
                    placeholder="Add Fraternity (Optional)"
                    placeholderTextColor={'#787878'}
                    autoCapitalize="none"
                    onChangeText={ value => this.setState({ fratienty: value })}
                    value={this.state.fratienty}
                  />
                </View>
                </View>


                 <View style={[styles.regBtnContain,{justifyContent:'center',alignItems:'center',marginTop:40}]}>
                  <TouchableOpacity onPress={this.props.handleSubmit(this.submit.bind(this))}>
                      <View style={styles.regBtn}>
                          <Text  style={{ color: '#fff', fontSize:22,fontFamily:'ProximaNova-Bold',lineHeight:22 }}>Save</Text>
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
    updateUserSliderPicAsync: userDetails => dispatch(updateUserSliderPicAsync(userDetails)),   
  };
}


Editprofile = connect(mapStateToProps,bindActions)(Editprofile);

export default Editprofile;
