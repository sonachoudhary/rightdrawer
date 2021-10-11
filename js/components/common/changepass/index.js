import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,StatusBar, Dimensions, Keyboard } from "react-native";
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
import { changePassForm } from '../../../actions/common/signin';
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


let that = null;

function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(val);
}

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
  const errors = {};
  if (!values.old_password) {
    errors.old_password = 'Current password is required';
  } else if (!values.password) {
    errors.password = 'New password is required';
  } else if(!validatePassword(values.password)){
    errors.password = "The password should have at least 8 characters up to a maximum of 20 characters, which contains at least 1 upper case, at least 1 numeric value and at least 1 special character.";
  }else if (values.old_password == values.password) {
    errors.conpassword = "Current and New Password should not be same";
  } else if (values.password != values.conpassword) {
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
  return {
    isLoggedIn: state.driver.appState.isLoggedIn,
    userType: state.driver.user.userType,
    jwtAccessToken: state.driver.appState.jwtAccessToken,
  };
}

class Changepass extends Component {
  
  constructor(props) {
    super(props);    
    this.state = {
      loading: true,      
    }; 
  }

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    changePassForm: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  
  submit(value) {  
    alert(value)
    
    this.props.changePassForm(value,this.props.jwtAccessToken);   
  }

  
  render() {
    
    return (

     <Container >
        <Header style={{ backgroundColor: commonColor.brandSecondry }} >
          <Left>
            <Button transparent onPress={() => { (this.props.userType == 'Teacher') ? Actions.CustomerHome() : Actions.BarberHome() } }>
              <Icon
                name="md-arrow-back"
                style={{
                  fontSize: 24,
                  marginLeft: 15,
                  fontWeight:'bold',
                  color: "#000"
                }}
              />
              <Text style={{ color: "#000", marginTop:3, fontSize:16 }}>{" "}Back</Text>
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

              <Text style={{ color:"#000", fontSize:28, fontWeight:'bold' }}>
                Change Password
              </Text>
              <Text style={{ color: "#000", fontSize:16, marginTop:10 }}>
                Write your new password
               </Text>

                                 

              <View style={styles.fieldContainer} >
                <Text style={styles.fieldContainerText}>
                  Current Password*
                </Text>

                <Field
                  component={input}
                  placeholder="*******"
                  secureTextEntry
                  name="old_password"
                  placeholderTextColor={commonColor.placeholderColor}
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
                  onPress={()=>this.submit()}
                  style={[styles.nameBtn,{backgroundColor:"#331A58", marginTop:50}]} >
                  <Text style={{ fontWeight: "600", color: "#FFFFFF" }}>
                    CHANGE PASSWORD
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
    changePassForm: (obj1,token) => dispatch(changePassForm(obj1,token)),    
  };
}


Changepass = reduxForm({
  form: "changePassForm", // a unique name for this form

})(Changepass);

Changepass = connect(mapStateToProps, bindActions)(Changepass);

export default Changepass;
