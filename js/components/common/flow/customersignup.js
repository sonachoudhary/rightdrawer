import React, { Component, useEffect } from "react";
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from "react-redux";
import {
  AsyncStorage,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,ActivityIndicator
} from "react-native";
import {
  View,
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
  Body,
  Input,
  Toast,
  Spinner,
  Thumbnail,
  Grid,
  Col,
  CheckBox
} from "native-base";
//import { Item, Input, Button, View, CheckBox, Icon, Spinner, Thumbnail, Picker, Header, Title } from 'native-base';
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import Register from "../register/";
import SignIn from "../signIn/";
import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import ModalView from "../ModalView";
import { connectionState } from "../../../actions/network";
import CustomernameForm from "./customernameform";
import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import { registerAsyncSocial, getStateList, registerAsync } from "../../../actions/common/register";
import { clearEntryPage, socailSignupSuccess } from "../../../actions/common/entrypage";
import styles from "./styles";
//Social login uncommnet
import config from "../../../../config.js";
//Social login uncommnet
//https://medium.com/@rossbulat/react-native-sign-in-with-apple-75733d3fbc3
import RNPickerSelect from 'react-native-picker-select';
import PasswordInputText from 'react-native-hide-show-password-input';
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginLeft:5,
    borderRadius: 4,
    alignItems:'center',
    justifyContent:'center',
    color: '#000000',
     width:200,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems:'center',
    justifyContent:'center',
    width:200,
    borderRadius: 8,
    color: '#000000', 
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(val);
}

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = 'First name is required';
  } else if (!values.lname) {
    errors.lname = 'Last name is required';
  } else if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
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
         fetch(`${config.serverSideUrl}/managemyclinic/apilogin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail)
      })
        .then(response => response.json())
        .then(data => {
          if(data.message == "User Exist") {
            throw { email: 'This email is taken' }  
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
        <Input  value = {null} style={ [styles.input, (meta.touched && meta.error) ? {borderColor:"#707E85"} :{borderColor:"#B14C60"} ] } {...input} {...props} />
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

const deviceHeight = Dimensions.get("window").height;
//const deviceWidth = Dimensions.get('window').width;

const getFbUrl = token =>
  `https://graph.facebook.com/me?access_token=${token}&fields=name,first_name,last_name,email`;

class Customersignup extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isSigninInProgress: false,
      stateValue: undefined,
      name:'',
      mobile:'',
      email:'',
      password:'',
      school:'',
      class:'',
      schoollist:[],
      schoolclasslist:[],
      showloader:false,
    };
    
    this.getschool();
    
  }

  getschool(){
      fetch(`${config.serverSideUrl}/getschool`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(resp => resp.json())
        .then(data => {
          
          this.setState({schoollist:data})
          
       })
        .catch(e => {
                 
        });
  }

  schoolclass(){
    
      fetch(`${config.serverSideUrl}/getclass/1`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(resp => resp.json())
        .then(data => {
          this.setState({schoolclasslist:data})
       })
        .catch(e => {
                 
        });
  }

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
    registerAsync: PropTypes.func
  };
  submit(values) {    
    if(this.state.email==""){
      alert('Email is required')
    } else if(this.state.password==""){
      alert('Password is required')
    } else if(this.state.name==""){
      alert('Name is required')
    }else if(this.state.mobile==""){
      alert('Mobile is required')
    }else if(this.state.school==""){
      alert('School is required')
    }else if(this.state.class==""){
      alert('class is required')
    }else {
      this.setState({showloader:true})
      setTimeout(() => {
      fetch(`${config.serverSideUrl}/studentcreate`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
            email:this.state.email,
            password:this.state.password,
            phone:this.state.mobile,
            schoolid:this.state.school,
            classid:this.state.class,
            name:this.state.name,
            
            
              
        })
      
    })
    .then(resp => resp.json())
    .then(data => {
       this.setState({showloader:false})
      
      if(data!=null){
        
        alert(' Created successfully')
         Actions.signIn();
      }
    })
    .catch(e => {
              
    });
  }, 3000);
      
    }

  }

nextdropdownvalue(value){
  
  this.setState({ school: value })
  
    
      fetch(`${config.serverSideUrl}/getclass/${value}`, {
          method: "get",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(resp => resp.json())
        .then(data => {
          this.setState({schoolclasslist:data})
       })
        .catch(e => {
                 
        });
  
}

  
  render() {
    const placeholderStart = {
        label: 'Select School',
        value: '',
        color: '#000000',
        fontSize:16,
        width:200,
        justifyContent:'center',
        alignItems:'center'
      };

    const placeholderStart1 = {
        label: 'Select Class',
        value: '',
        color: '#000000',
        width:200,
        fontSize:16,
        justifyContent:'center',
        alignItems:'center'
      };

    
    return(
      <Container>

      {this.state.showloader==true ?
          <ActivityIndicator
            size="large"
            color={"#E91E63"}
            style={{
               marginTop:110,
              alignItems: "center",justifyContent: 'center',
            }}
          />
             :
      <ImageBackground
                style={{ flex: 1, }}
                
                imageStyle={{ resizeMode: 'cover' }}
                >
           <View>
              <Text style={{fontWeight:'bold',color:'#000000',fontSize:40,textAlign:'center',paddingTop:'15%',}}>Register</Text>
           </View>
           <View>
           <TouchableOpacity style={{width:'25%',backgroundColor:'#ffffff',
                              marginTop:'3%',borderWidth:1,
                              borderColor:'lightgrey',
                              borderBottomRightRadius:25,
                              borderTopRightRadius:25,}}
                        onPress={()=>Actions.signIn()}
                              >
      <Text style={{color:'red',padding:6,fontSize:17, height:40}}>Login</Text>
      </TouchableOpacity>

           </View>
           <View style={{borderWidth:1,backgroundColor:'#ffffff',borderColor:'lightgrey',width:'85%',marginTop:'5%',borderTopRightRadius:50,borderBottomRightRadius:50}}>

               <View style={{borderBottomWidth: 1,borderColor:'lightgrey', flexDirection:'row'}}>
                   <View style={{marginLeft:'3%',marginTop:'6%'}}>
                    <Image source={require("../../../../assets/images/aboutus.png")} style={{width:20,height:20,margin:'2%',}}/>
                   </View >
                    <TextInput
                    style={{ width:'80%',height:60,marginLeft:'0%'}}
                    onChangeText={ value => this.setState({ email: value })}
                    value={this.state.email}
                    placeholder="Email"
                    />
              </View>
                   
                    <View style={{ flexDirection:'row',borderBottomWidth: 1,borderColor:'lightgrey', }}>
                        <View style={{marginLeft:'3%',marginRight:10,marginTop:'6%'}}>
                          <Image source={require("../../../../assets/icon/key.png")} style={{width:15,height:15,margin:'2%'}}/>
                        </View >
                        <PasswordInputText
                        getRef={input => this.input = input}
                        style={{ lineWidth:0, activeLineWidth: 0,disabledLineWidth: 0,width:'70%',height:63,marginTop:-15,borderWidth:0, borderBottomWidth:0, borderBottomColor:'#ffffff',borderColor:'#ffffff'}}
                        value={this.state.password}
                        label={''}
                        placeholder="Password"
                        underlineColorAndroid="transparent"
                        onChangeText={ value => this.setState({ password: value })}
                      />
                   </View>

                   <View style={{ flexDirection:'row',borderBottomWidth: 1,borderColor:'lightgrey', }}>
                        <View style={{marginLeft:'3%',marginTop:'6%'}}>
                          <Image source={require("../../../../assets/images/mapuser.png")} style={{width:20,height:20,margin:'2%'}}/>
                        </View >
                        <TextInput
                        style={{ width:'60%',height:60,padding:'2%',}}
                         onChangeText={ value => this.setState({ name: value })}
                         value={this.state.name}
                         placeholder="Name"
                        />
                   </View>
                   <TouchableOpacity style={{marginLeft:'90%',marginTop:'45%',position:'absolute',}} onPress={() => this.submit()}>
                      <Image source={require("../../../../assets/images/arrowicon.png")} style={{width:60,height:60,margin:'2%',borderRadius:100}}/>
                   </TouchableOpacity>
                   <View style={{ flexDirection:'row',borderBottomWidth: 1,borderColor:'lightgrey', }}>
                        <View style={{marginLeft:'3%',marginTop:'6%'}}>
                          <Image source={require("../../../../assets/images/aboutus.png")} style={{width:20,height:20,margin:'2%'}}/>
                        </View >
                        <TextInput
                        style={{ width:'60%',height:60,padding:'2%',}}
                         onChangeText={ value => this.setState({ mobile: value })}
                         value={this.state.mobile}
                         placeholder="Mobile Number"
                        />
                   </View>
                   <View style={{ flexDirection:'row',borderBottomWidth: 1,borderColor:'lightgrey', }}>
                          <View style={{marginLeft:'3%',marginTop:'6%'}}>
                          <Image source={require("../../../../assets/images/group_user_icon.png")} style={{width:20,height:20,margin:'2%'}}/>
                        </View >
                          <RNPickerSelect style={pickerSelectStyles} placeholder={placeholderStart} onValueChange={(value) => this.nextdropdownvalue(value) }
                            items={this.state.schoollist}
                          />
                   </View>
                   <View style={{ flexDirection:'row',}}>
                        <View style={{marginLeft:'3%',marginTop:'6%'}}>
                          <Image source={require("../../../../assets/images/group_user_icon.png")} style={{width:20,height:20,margin:'2%'}}/>
                        </View >
                        <RNPickerSelect style={pickerSelectStyles} placeholder={placeholderStart1} onValueChange={(value) => this.setState({ class: value }) }
                            items={this.state.schoolclasslist}
                          />
                   </View>

            </View>
           
     
      </ImageBackground>
    }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeLogin: state.entrypage.active,
    appConfig: state.basicAppConfig.config,
    stateList: state.all.state_list
  };
}


function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status)),
    userLoginRequest: () => dispatch(userLoginRequest()),
    clearEntryPage: () => dispatch(clearEntryPage()),
    socailSignupSuccess: route => dispatch(socailSignupSuccess(route)),
    registerAsync: (userCredentials,uscitizen,state) => dispatch(registerAsync(userCredentials,uscitizen,state)),
    registerAsyncFb: userObj => dispatch(registerAsyncFb(userObj)),
    registerAsyncSocial: (userObj,social) => dispatch(registerAsyncSocial(userObj,social)),
    getStateList: () => dispatch(getStateList()),
  };
}

Customersignup = reduxForm({
  form: 'custnamelogin', // a unique name for this form
  validate,
  //asyncValidate,
  asyncBlurFields: [ 'email' ]
})(Customersignup);

export default connect(
  mapStateToProps,
  bindActions
)(Customersignup);
