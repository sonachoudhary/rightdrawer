import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View, StatusBar, Dimensions } from "react-native";
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
const deviceWidth = Dimensions.get('window').width;
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  }
  return errors;
};

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
    loadingStatus: state.driver.appState.loadingStatus,
    setForgotEmailError:  state.driver.user.setForgotEmailError
  };
}

class Forgot extends Component {
  constructor(props) {
    input.propTypes = {
      input: PropTypes.object,
      meta: PropTypes.object,
      textError: PropTypes.object
    };
    super(props);
    this.state = {
      checked: false,
    };
  }
  


  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  submit(values) {
    
    this.props.dispatch(forgotMail());    
  }

  render() {
   
    
    return (

     <Container >
        <Header style={{ backgroundColor: commonColor.brandSecondry }} >
          <Left>
            <Button transparent onPress={() => Actions.signIn()}>
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

              <Text style={{ color:"#E8E8E8", fontSize:28, fontFamily:'Cabin-Bold' }}>
                Forgot Password
              </Text>
              <Text style={{ color: "#E8E8E8", fontSize:16, marginTop:10, fontFamily:'Cabin-Regular' }}>
                Enter your email that is used to register to request a password reset.
              </Text>

              <Field component={textError} name="email"  />
              
              {/*this.props.setForgotEmailError &&
              <View style={ styles.errorTextView }> 
                <Text style={ styles.errorText }> 
                  {this.props.setForgotEmailError}
                </Text> 
              </View>
              */}

              <View style={styles.fieldContainer} >
                <Text style={styles.fieldContainerText}>
                  Email*
                </Text>

                <Field
                  component={input}
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  placeholderTextColor={commonColor.placeholderColor}
                  keyboardType="email-address"
                  autoCapitalize="none" />
              </View>

              <Button
                  block
                  onPress={this.props.handleSubmit(this.submit.bind(this))}
                  style={[styles.nameBtn,{backgroundColor:"#392F2A", marginTop:50}]} >
                  <Text style={{ fontSize:16, color: "#FFFFFF",fontFamily:'Cabin-Bold' }}>
                      RESET PASSWORD
                  </Text>
              </Button>
              
              <View style={{ justifyContent:'center', alignItem:'center' }} >
                <Text onPress={()=>Actions.signIn()} style={{ color: "#E8E8E8", fontSize:16, marginTop:20, textAlign:"center", fontFamily:'Cabin-Regular' }}>
                  Did you remember already? Login here
                </Text>
              </View>

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
  };
}

Forgot = reduxForm({
  form: "forgotform", // a unique name for this form
  validate
})(Forgot);

Forgot = connect(mapStateToProps, bindActions)(Forgot);

export default Forgot;
