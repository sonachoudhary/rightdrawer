import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,StatusBar, Dimensions } from "react-native";
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
import RegisterFormFb from "../register/formFb";
import * as appStateSelector from "../../../reducers/driver/appState";
//import LoginForm from "./form";
//import Register from "../register/";
import { signinAsync, forgotMail } from "../../../actions/common/signin";
import { resetForm } from '../../../actions/common/signin';
import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";
import { requestFbLogin } from "../loginFb";
//import { signInWithGoogleAsync } from "../loginGoogle";
import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import _ from "lodash";
import { changePageStatus, currentLocationUser, signInUser } from '../../../actions/driver/home';
import { fetchUserCurrentLocationAsync, syncDataAsync, mapDeviceIdToUser } from '../../../actions/driver/home';
import config from "../../../../config";
//import DeviceInfo from 'react-native-device-info';
import ResetForm from "./resetform";

let that = null;

function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(val);
}

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
  const errors = {};
  if (!values.otp) {
    errors.otp = 'OTP is required';
  } else if (!values.password) {
    errors.password = 'Password is required';
  } else if(!validatePassword(values.password)){
    errors.conpassword = "The password should have at least 8 characters up to a maximum of 20 characters, which contains at least 1 upper case, at least 1 numeric value and at least 1 special character.";
  }else if (values.password != values.conpassword) {
    errors.conpassword = "Password doesn't match";
  }
  return errors;
};

export const asyncValidate = (values/*, dispatch */) => {
    return new Promise((resolve, reject) => {
      const userEmail = { email: values.email };
         fetch(`${config.serverSideUrl}/index.php/checkemail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail)
      })
        .then(response => response.json())
        .then(data => {
          
          if(data.success == 400) {

            throw { email: 'email not foundsds' } 
          } else {
            resolve(data)
          }
        })
        .catch(error => {
          
          reject(error);
        });
    })
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


input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  textError: PropTypes.object
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
    socialLogin: state.entrypage.socialLogin,
    appConfig: state.basicAppConfig.config,
    activeLogin: state.entrypage.active,
    tripRequest: state.driver.tripRequest,
    trip: state.driver.trip,
    region: {
      latitude: state.driver.tripRequest.srcLoc[1],
      longitude: state.driver.tripRequest.srcLoc[0],
      latitudeDelta: state.driver.tripRequest.latitudeDelta,
      longitudeDelta: state.driver.tripRequest.longitudeDelta
    },
    driverCurrentGpsLocLat: state.driver.user.gpsLoc[1],
    driverCurrentGpsLocLong: state.driver.user.gpsLoc[0],
    socketDisconnected: state.driver.appState.socketDisconnected,
    latitude: state.driver.user.gpsLoc[1],
    longitude: state.driver.user.gpsLoc[0],
    setForgotemail: state.driver.user.setForgotEmail,

  };
}

class Reset extends Component {
  

  constructor(props) {
    super(props);
    
    this.state = {
      socialLogin: null,
      showforgotpanel:false,
      loading: true,
      heading: "RIDER LOCATION ARRIVED",
      showView: true,
      customer: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      driver: {
        latitude: this.props.region.latitude,
        longitude: this.props.region.longitude
      },
      modalVisible: false,
      navigateData: {
        source: {
          latitude: _.get(this.props, "region.latitude", ""),
          longitude: _.get(this.props, "region.longitude", "")
        },
        destination: {
          latitude: _.get(this.props, "driverCurrentGpsLocLat", ""),
          longitude: _.get(this.props, "driverCurrentGpsLocLong", "")
        },
      }
    };
    
  }

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    resetForm: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  submit(values) {  
    
    this.props.dispatch(resetForm(values));   
  }

  
  render() {
    
    return (

     <Container >
        <Header style={{ backgroundColor: commonColor.brandSecondry }} >
          <Left>
            <Button transparent onPress={() => Actions.forgot()}>
              <Icon
                name="md-arrow-back"
                style={{
                  fontSize: 24,
                  marginLeft: 15,
                  fontWeight:'bold',
                  color: "#E8E8E8"
                }}
              />
              <Text style={{ color: "#E8E8E8", marginTop:3, fontSize:16 }}>{" "}Back</Text>
            </Button>
          </Left>
          <Body>
            <Title/>
          </Body>
          <Right />
        </Header>
        
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <Content style={{ backgroundColor: commonColor.brandSecondry }}>
            <View style={{ padding: 30 }}>

              <Text style={{ color:"#E8E8E8", fontSize:28, fontWeight:'bold' }}>
                        Change Password
                      </Text>
                      <Text style={{ color: "#E8E8E8", fontSize:16, marginTop:10 }}>
                        Write your new password
                      </Text>

                      <Field component={textError} name="password"  />
                      <Field component={textError} name="conpassword"  />
                      <Field component={textError} name="otp"  />
                      

                      <View style={styles.fieldContainer} >
                        <Text style={styles.fieldContainerText}>
                          Email OTP*
                        </Text>

                <Field
                  component={input}
                  placeholder="OTP"
                  name="otp"
                  placeholderTextColor={commonColor.placeholderColor}
                  keyboardType="email-address"
                  autoCapitalize="none" />
                  

                <Text style={styles.fieldContainerText}>
                          New Password*
                        </Text>

                <Field
                  component={input}
                  placeholder="*******"
                  secureTextEntry
                  name="password"
                  placeholderTextColor={commonColor.placeholderColor}                  
                  autoCapitalize="none" />

                <Text style={styles.fieldContainerText}>
                          Confirm Password*
                        </Text>

                <Field
                  component={input}
                  placeholder="*******"
                  secureTextEntry
                  name="conpassword"
                  placeholderTextColor={commonColor.placeholderColor}                
                  autoCapitalize="none" />

              </View>

              <Button
                        block
                        onPress={this.props.handleSubmit(this.submit.bind(this))}
                        style={[styles.nameBtn,{backgroundColor:"#392F2A", marginTop:50}]} >
                        <Text style={{ fontWeight: "600", color: "#FFFFFF" }}>
                            CONFIRM PASSWORD
                        </Text>
                    </Button>
                            
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    checkUser: (obj1, obj2) => dispatch(checkUser(obj1, obj2)),
    userLoginRequest: () => dispatch(userLoginRequest()),
    clearEntryPage: () => dispatch(clearEntryPage()),
    socailLoginSuccessAndRoutetoRegister: data =>
      dispatch(socailLoginSuccessAndRoutetoRegister(data)),
    socailSignupSuccess: route => dispatch(socailSignupSuccess(route)),
    signinAsync: (userCredentials, coords) => dispatch(signinAsync(userCredentials, coords)),
    signInUser: userCredentials => dispatch(signInUser(userCredentials)),
    changePageStatus: pageStatus => dispatch(changePageStatus(pageStatus)),
    currentLocationUser: () => dispatch(currentLocationUser()),
    syncDataAsync: jwtAccessToken => dispatch(syncDataAsync(jwtAccessToken)),
    mapDeviceIdToUser: (jwtAccessToken, deviceId, pushToken) => dispatch(mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken))
  };
}


Reset = reduxForm({
  form: "resetForm", // a unique name for this form
  validate
})(Reset);

Reset = connect(mapStateToProps, bindActions)(Reset);

export default Reset;
