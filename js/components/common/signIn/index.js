import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View, StatusBar, ImageBackground, Dimensions, Image } from "react-native";
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
import { signinAsync, forgotMail, loginAsyncSocial } from "../../../actions/common/signin";
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
import config from "../../../../config";
import AsyncStorage from '@react-native-community/async-storage';

//Social login uncommnet


//https://stackoverflow.com/questions/47437678/why-do-i-get-com-google-android-gms-common-api-apiexception-10


//https://medium.com/@rossbulat/react-native-sign-in-with-apple-75733d3fbc3
import SigninForm from "./signinform";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;

let that = null;

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  } else if (isNaN(Number(values.phoneNo))) {
    errors.phoneNo = 'Must be a number';
  } else if (!values.password) {
    errors.password = 'Password is Required';
  } else if (!values.phoneNo) {
    errors.phoneNo = 'Mobile Number is Required';
  } else if (!values.fname) {
    errors.fname = 'First name is Required';
  } else if (!values.lname) {
    errors.lname = 'Last name is Required';
  }
  if (!values.password) {
    errors.password = 'Password is Required';
  }
  return errors;
};



const getFbUrl = token =>
  `https://graph.facebook.com/me?access_token=${token}&fields=name,first_name,last_name,email`;




export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item>
        {props.type === 'email' ? (
          <Icon name="ios-mail" style={{ color: commonColor.placeholderColor }} />
        ) : (
          <Icon name="ios-lock" style={{ color: commonColor.placeholderColor }} />
        )}
        <Input {...input} {...props} />
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
  return {
    
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    socialLogin: state.entrypage.socialLogin,    
  };
}

class SignIn extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    signinAsync: PropTypes.func,
    signInUser: PropTypes.func,
    socailLoginSuccessAndRoutetoRegister: PropTypes.func,
    socailSignupSuccess: PropTypes.func,
    currentLocationDriver: PropTypes.func,
    forgotMail: PropTypes.func,
  };

  forgotPassword(values) {
    this.props.dispatch(forgotMail());
  }

  constructor(props) {
    super(props);
    
    this.state = {
      socialLogin: null,
      showforgotpanel:false,
      loading: true,
      heading: "RIDER LOCATION ARRIVED",
      showView: true,        
    };

    
  }

  componentDidMount() {
    socketDriverInit();    
    this.props.fetchUserCurrentLocationAsync();
    updateLocation(this.props.user);
  }

  openforgotpassword(){
     this.setState({
      showforgotpanel: true
     })
  }
  closeforgotpassword(){
     this.setState({
      showforgotpanel: false
     })
  }

  async componentDidMount() {
    await this.props.currentLocationUser()
    //await this.props.clearEntryPage();
  }

  async UNSAFE_componentWillReceiveProps() {
    await this.props.currentLocationUser()
    //await this.props.clearEntryPage();
  }

  triggarLocation(){
    this.props.currentLocationUser()
  }

  state = {
    showError: false
  };

  async submit(values) {
    let fcmToken = await AsyncStorage.getItem("FCM_TOCKEN_WESMART");
    
    //this.props.dispatch(signinAsync(values));  
  }

  componentWillReceiveProps(nextProps) {
    
    this.props.currentLocationUser()

    if (nextProps.loginError) {
      this.setState({
        showError: true
      });
    } else {
      this.setState({
        showError: false
      });
    }
    if (nextProps.socialLogin.email !== null) {
      this.setState({ socialLogin: nextProps.socialLogin });
    }
  }

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }

  async loginWithFacebook() {
    
    
      try {
        const result = await LoginManager.logInWithPermissions([
          "public_profile",
          "email"
        ]);

        if (result.isCancelled) {
          return reject({ token: null, type: "cancel" });
        }

        const data = await AccessToken.getCurrentAccessToken();
        
        if (data.accessToken) {
          // Fetching user-details        
          return { token: data.accessToken.toString(), type: "success" };
        }

        return { token: null, type: "error in fetching access token" };
      } catch (error) {
        return { token: null, type: error };
      }
    
  }

  requestFbLogin() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.loginWithFacebook();
          
          const { token, type } = res;
              
          const loginSuccessful =
            type && token && type !== "cancel" && token.length > 0;
            
          if (!loginSuccessful || type !== "success") {
            return resolve({ successFb: false });
          }
          const fbUrl = getFbUrl(token);
           
          const response = await fetch(fbUrl); 
          userLoginRequest();
          const user = await response.json();

          if (!user) {
            return alert("Email not found");
          }
          this.props.loginAsyncSocial(user,1)
        } catch (e) {
          
        }
      });
  }

  _signIn = async () => {
    try {      
      
    } catch (error) {
      
    }
  };


  async onAppleButtonPress() {

    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });

      
      const data = {
        email: appleAuthRequestResponse.email,
        name: appleAuthRequestResponse.fullName.givenName,
        id: appleAuthRequestResponse.user
      };
      this.props.loginAsyncSocial(data,3)
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        // user cancelled Apple Sign-in
        
      } else {
        // other unknown error
        
      }
    }
    
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // // use credentialState response to ensure the user is authenticated
    // if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
    //   // user is authenticated
    // }
  }

  render() {
    
    return (

            <Content style={{ backgroundColor: commonColor.brandSecondry , opacity:0.90}}>
              <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Content style={{ backgroundColor: commonColor.brandSecondry,  }}>
                  <SigninForm isFetching={this.props.isFetching} />                
                </Content>
              </View>
            </Content>
     
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
    signinAsync: (userCredentials) => dispatch(signinAsync(userCredentials)),
    signInUser: userCredentials => dispatch(signInUser(userCredentials)),
    changePageStatus: pageStatus => dispatch(changePageStatus(pageStatus)),
    currentLocationUser: () => dispatch(currentLocationUser()),
    syncDataAsync: jwtAccessToken => dispatch(syncDataAsync(jwtAccessToken)),
    mapDeviceIdToUser: (jwtAccessToken, deviceId, pushToken) => dispatch(mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken)),
    loginAsyncSocial: (userObj,social) => dispatch(loginAsyncSocial(userObj,social))
  };
}

function setCurrentMapDriver() {

  // const gpsLoc = that.props.user.gpsLoc;
  // const obj = {
  //   latitude: gpsLoc[1],
  //   longitude: gpsLoc[0],
  // };
  
}

export { setCurrentMapDriver };

SignIn = reduxForm({
  form: "loginForm", // a unique name for this form
  validate
})(SignIn);

SignIn = connect(mapStateToProps, bindActions)(SignIn);

export default SignIn;
