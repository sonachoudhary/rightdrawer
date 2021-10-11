import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, TextInput, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
  Text,
  Item,
  Title,
  Left,
  Right,
  Spinner,
  Body,
  Form, 
  Picker,
  Label,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";

import SettingsForm from "./form";
import {
  updateUserProfileAsync,
  updateUserProfilePicAsync
} from "../../../actions/driver/settings";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import  Footer  from "../../../components/footer";

import { RNS3 } from 'react-native-s3-upload';//https://www.npmjs.com/package/react-native-s3-upload
import ImagePicker from 'react-native-image-picker';
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import PropTypes from "prop-types";
import { updateProfile, updateProfilePhoto } from "../../../actions/common/signin";
const { width, height } = Dimensions.get("window");
import { createNumberMask, createTextMask } from 'redux-form-input-masks';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
  guide: false,
  allowEmpty: true,
});
function validatephone(val) { 
    return /^[0-9\b]+$/.test(val);
}

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = 'First Name is required';
  } else if (!values.lname) {
    errors.lname = 'Last Name is required';
  }
  return errors;
};

let lengthText = 300;
function calculate(text) {
  lengthText = 300;
  lengthText = lengthText - text.length
}

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item>
        <Input  value = {null} style={ [styles.input, (meta.touched && meta.error) ? {borderColor:"#B14C60"} : {borderColor:"#707E85"}] } {...input} {...props} />
      </Item>     
    </View>
  );
};

export const textError = props => {
  const { meta, textError } = props;
  return (

    <View>
    {meta.touched && meta.error && 
      <View style={ styles.errorTextView }>
        <Text style={ styles.errorText }  {...textError} {...props} >{meta.error}</Text>
      </View>}
    </View>
    
  );
};


const getImageOptions = (maxFiles) => {
  const imageOptions = {
    width: 150,
    height: 150,
    compressImageQuality: 0.15,
    mediaType: "photo",
    includeBase64: true
  }

  // if(Platform.OS === 'ios') {
  //   imageOptions.writeTempFile = false
  // }

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
  keyPrefix: "backimage",
  bucket: "c1-s3b-htc",
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

input.propTypes = {
  input: PropTypes.object,
  inputtext: PropTypes.object,
  inputRate: PropTypes.object,
  meta: PropTypes.object,
};
const getRandomId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2)
function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating,
    userType: state.driver.appState.userType,
    data:state.driver.user.student
  };
}
class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      s3source: this.props.profileUrl,
      showloader: false
    };
  }
   
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  submit(values) {
    let data = { fname: values.fname, lname: values.lname, email: values.email, profile_url: this.state.s3source };
    
    this.props.updateProfile(data)
  }

  updatephoto(s3source) {
    let data = { profile_url: s3source };
    //this.props.updateProfilePhoto(data)
  }

  userImageViaCamera() {
    
    ImagePicker.showImagePicker(options, (image) => {
      

      this.setState({
        showloader: true,
        s3source: image.uri        
      })  

      image.name = "HTC_"+getRandomId();
      image.type = "image/jpeg";
      RNS3.put(image, imageUploadOptions).then(response => {
        
        if (response.status !== 201) {
          throw new Error("Failed to upload image to S3");
          this.setState({
            showloader: false
          })  
        } else {
          this.setState({
            s3source: response.body.postResponse.location,  
            showloader: false          
          })    

          //this.updatephoto(response.body.postResponse.location)                  
        }                        
      });
      
    });
  }

  pickImage(userDetails) {
    
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        this.setState({ image: this.props.profileUrl });
      } else if (response.error) {
        this.setState({ image: this.props.profileUrl });
      } else {
        let source = { uri: response.uri };
        let userData = Object.assign(userDetails, {
          profileUrl: source.uri
        });
        this.props.updateUserProfilePicAsync(userData, "profile");
      }
    });
  }

  render() {
    
    var social = false;
    if(this.props.userDetails && this.props.userDetails.socialId && this.props.userDetails.socialId !== '') {
      social = true;
    }
    

    var userType = this.props.userType;
    
    return (
      <Container style={{ backgroundColor: commonColor.brandSecondry }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => (userType=='barber') ? Actions.BarberHome() : Actions.CustomerHome()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#000000" }}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Edit Profile
            </Title>
          </Body>
          <Right>
              <Text style={{ color: "#000000", fontWeight: "bold", fontSize: 18 }} 
              onPress={this.props.handleSubmit(this.submit.bind(this))}> Save </Text>            
          </Right>
        </Header>
        
        <Content style={{ backgroundColor: commonColor.brandSecondry , opacity:0.80}}>
          
          <View style={{justifyContent: "center", alignItems: "center", width: deviceWidth, marginTop:20 }} >              
              <View style={{ justifyContent: "center", textAlign: "center", width: 120, borderRadius:60, height:120, backgroundColor:'#828282',paddingBottom:15, marginTop:20 }}>
                   <TouchableOpacity onPress={() => this.userImageViaCamera()}>
                     <Thumbnail
                      source={{ uri: this.state.s3source }}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        borderWidth: 0,
                        marginTop:20
                      }}
                    />
                   
                    <View style={{backgroundColor:'#FFFFFF', marginTop:80, marginLeft:80, width:46, height:46, borderRadius:23, position:'absolute',zIndex:1001 }}>
                      <Icon
                        name="ios-camera"                      
                        style={{ fontSize: 36, color: "#000", paddingTop:5, paddingLeft:10 }}
                      /> 
                    </View>
                                      
                  </TouchableOpacity>
              </View>
          </View>

          <View style={{ padding: 30 }}>
            <Field component={textError} name="fname"  />
            <Field component={textError} name="lname"  />
            <Field component={textError} name="email"  />
            
            <View style={styles.fieldContainer} >
              <Text style={styles.fieldContainerText}>
                First Name*
              </Text>

              <Field
                component={input}
                name="fname"
                placeholder="first name"
                placeholderTextColor={commonColor.placeholderColor}
                autoCapitalize="none" />
            </View>

            <View style={styles.fieldContainer} >
              <Text style={styles.fieldContainerText}>
                Last Name*
              </Text>

              <Field
                component={input}
                name="lname"
                placeholder="last name"
                placeholderTextColor={commonColor.placeholderColor}
                autoCapitalize="none" />
            </View>
            
            {social === false && 
            <View style={styles.fieldContainer} >
              <Text style={styles.fieldContainerText}>
                Email
              </Text>

              <Text style={{ color: commonColor.placeholderColor }}>{this.props.email}</Text>
            </View>
            }

            {social === true &&  
              <View style={styles.fieldContainer} >
                <Text style={styles.fieldContainerText}>
                  Email: 
                </Text>
                <Text style={{ color: commonColor.placeholderColor }}>
                  {this.props.userDetails.email}
                </Text>
              </View>
            }

          </View>

            { this.state.showloader==true &&
              <View style={{position:'absolute',opacity:0.5,width:deviceWidth,height:deviceHeight, backgroundColor:'#000',justifyContent:'center',alignItems:'center', marginTop:-100}}>
                  <Spinner color="white" />
              </View>
            }
        </Content>
         <Footer />
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
   
    updateUserProfileAsync: userDetails => dispatch(updateUserProfileAsync(userDetails)),
    updateUserProfilePicAsync: (userData, type) => dispatch(updateUserProfilePicAsync(userData, type)),
    updateProfile:(data) => dispatch(updateProfile(data)),
    updateProfilePhoto:(data) => dispatch(updateProfilePhoto(data)),
  };
}

Bio = reduxForm({
  form: "bioForm", // a unique name for this form
  validate
})(Bio);


Bio = connect(state => ({
  homeAddress: formValueSelector("settings")(state, "homeAddress"),
  initialValues: {
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,    
  }
}))(Bio);


Bio = connect(mapStateToProps, bindActions)(Bio);

export default Bio;


