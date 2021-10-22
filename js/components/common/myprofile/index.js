import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity,ImageBackground,StatusBar,ScrollView,TextInput,StyleSheet } from "react-native";
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
import RNPickerSelect from 'react-native-picker-select';

import * as appStateSelector from "../../../reducers/driver/appState";

import { logOutUserAsync } from "../../../actions/common/signin";



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
    this.state = { 
      fname:'',
      lname:'',
      email:'',
      Password:'',
      ConfirmPassword:'',
      Address:'',
      Country:'',
      Phone:'',
      Gender:'',
      Birth:'',
      Height:'',
      Status:'',
      Religion:'',
      Caste:'',
      Education:'',
      Occupation:'',
      Income:'',
    };
  }

  handleLogOut() {
    this.props.logOutUserAsync(this.props.jwtAccessToken);
  }

  componentDidMount() { }

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
      <Container style={{ backgroundColor: "#e6e6e6" }}>
      
      <StatusBar barStyle="light-content" />
          <View style={{marginTop:10,marginLeft:10}}>
          <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: deviceHeight/30, color: "#000000" }}
              />
          </Button>
        </View>
        <ScrollView>
            <View style={{ alignSelf: "center",justifyContent: 'center',}}>
                <Image
                    source={require("../../../../assets/images/fev.png")}
                    style={styles.mainlogo}
                  />
              </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='First Name'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({fname: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Last name'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({lname: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Email-Id'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({email: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Password'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Password: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Confirm Password'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({ConfirmPassword: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Address'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Address: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Country'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Country: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Mobile number '
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Phone: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%',backgroundColor:'#fff'}}>
                        <RNPickerSelect
                            placeholder={{label: 'Gender',value: null,color:'#000000'}}
                            style={pickerSelectStyles}
                            onValueChange={ (value) => ( this.setState({gender: value}) ) }
                            items={[
                              { label: 'Male', value: 'Male' ,color:'#000000'},
                              { label: 'Female', value: 'Female',color:'#000000' }
                             
                          ]}
                        />          
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Date of Birth'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Birth: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%',backgroundColor:'#fff'}}>
                        <RNPickerSelect
                            placeholder={{label: 'Height',value: null,color:'#000000'}}
                            style={pickerSelectStyles}
                            onValueChange={ (value) => ( this.setState({gender: value}) ) }
                            items={[
                              { label: '5ft', value: '5ft' ,color:'#000000'},
                              { label: '5.2ft', value: '5.2ft',color:'#000000' }
                             
                          ]}
                        />          
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%',backgroundColor:'#fff'}}>
                        <RNPickerSelect
                            placeholder={{label: 'Wight',value: null,color:'#000000'}}
                            style={pickerSelectStyles}
                            onValueChange={ (value) => ( this.setState({gender: value}) ) }
                            items={[
                              { label: '50kg', value: '50kg' ,color:'#000000'},
                              { label: '60kg', value: '60kg',color:'#000000' },
                              { label: '70kg', value: '70kg' ,color:'#000000'},
                              { label: '80kg', value: '80kg',color:'#000000' },
                              { label: '90kg', value: '90kg' ,color:'#000000'},
                              { label: '100kg', value: '100kg',color:'#000000' },
                              { label: '110kg', value: '110kg' ,color:'#000000'},
                              { label:  '120kg', value: '120kg',color:'#000000' },
                              { label: '130kg', value: '130kg' ,color:'#000000'},
                              { label: '140kg', value: '140kg',color:'#000000' },
                             
                          ]}
                        />          
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Marital Status'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Status: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Religion'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Religion: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Caste'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Caste: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Education'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Education: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Occupation'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Occupation: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginTop:20,marginLeft:'5%',marginRight:'5%'}}>
                        <TextInput
                          placeholder='Annual Income'
                          style={{ borderColor:'#d2d2d2', borderWidth:1, backgroundColor:'#fff', color:'#000', height:40,fontSize:16, padding:5,borderRadius:5}}
                          multiline
                          placeholderTextColor="#777"
                          editable={true}
                          onChange={(event) => this.setState({Income: event.nativeEvent.text})}
                          value={this.state.title}
                          
                        />            
                </View>
                <View style={{marginLeft:'30%',marginRight:'30%',backgroundColor:'#ed1e79',justifyContent:'center',alignItems:'center',borderRadius:20,margin:'10%'}}>
                  <TouchableOpacity onPress={() => Actions.signIn()} >
                        <Text style={{ fontSize:20, fontFamily:'ProximaNova-Bold',  opacity:1, color: "#FFFFFF",padding:'4%'}}>Sign In </Text>
                  </TouchableOpacity>
              </View>
          </ScrollView>

        


      </Container>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft:30,
    color: '#000000',
    height:50,
    opacity:0.7,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 0,
    marginTop:0,
    paddingLeft:0,
    height:40,
    justifyContent:'center',
    marginLeft:15,
    opacity:0.7,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

function bindActions(dispatch) {
  return {
    logOutUserAsync: jwtAccessToken => dispatch(logOutUserAsync(jwtAccessToken))
  };
}

Myprofile = connect(mapStateToProps, bindActions)(Myprofile);

export default Myprofile;
