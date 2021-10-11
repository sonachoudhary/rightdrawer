import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo } from 'react-native';

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
  Col
} from "native-base";

import PropTypes from 'prop-types';
import { signinAsync, forgotMail } from '../../../actions/common/signin';
import { Actions } from "react-native-router-flux";
import { registerAsync } from "../../../actions/common/register";
import { connect } from "react-redux";
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import config from "../../../../config.js";

const deviceWidth = Dimensions.get('window').width;

function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);
}

const validate = values => {
	const errors = {};
	if (!values.otp) {
		errors.otp = 'OTP is required';
	}else if (!values.password) {
		errors.password = 'Password is required';
	} else if(!validatePassword(values.password)){
		errors.conpassword = "The password should have at least 8 character, 1 upper case, 1 lower case, 1 number and 1 special character(*,%,!,@,&,$,?)";
	}else if (values.password != values.conpassword) {
		errors.conpassword = "Password doesn't match";
	}
	return errors;
};

export const input = props => {
	const { meta, input } = props;
	return (
		<View>
			<Item>
				<Input style={ styles.input } {...input} {...props} placeholderTextColor="#FF0000" style={{color:'#FF0000'}} />
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
    appConfig: state.basicAppConfig.config,
    activeLogin: state.entrypage.active,
    latitude: state.driver.user.gpsLoc[1],
    longitude: state.driver.user.gpsLoc[0],
  };
}


class CustpasswordForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			checked: false,
			otp:'',
			customer: {
		        latitude: this.props.latitude,
		        longitude: this.props.longitude
		    },
		};
		this.props.initialize({ otp: null,password:null,conpassword:null}); 
	}
	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func,
		forgotMail: PropTypes.func,
		isFetching: PropTypes.bool,
	};

	getUserInfo = async () => {
	  //async function getUserInfo(){
	    try {
	      const nameData = await AsyncStorage.getItem('customerRegistration.name');
	      const passData = await AsyncStorage.getItem('customerRegistration.pass');
	      const nameItem = JSON.parse(nameData);
	      const passItem = JSON.parse(passData);
	      var output = {};
	      output = this.jsonConcat(output, nameItem);
	      output = this.jsonConcat(output, passItem);
	      output = this.jsonConcat(output, this.state.customer); 
      	           
	      await AsyncStorage.removeItem('customerRegistration');
	      return output;
	    } catch (error) {
	      
	    }
	  }

	jsonConcat(o1, o2) {
	   for (var key in o2) {
	    o1[key] = o2[key];
	   }
	   return o1;
	}

	async submit(values) {
		//this.props.dispatch(signinAsync(values));
		//this.passFormAsync(values)
		
		if(this.state.otp!=""){
			const ForgotEmail = await AsyncStorage.getItem('forgotPasswordsetEmail');
	        const obj = {
	            email:ForgotEmail,
	            password:values['password'],
	            otp:this.state.otp
	        };
	       
	        fetch(`${config.serverSideUrl}:${config.port}/api/config/forgotemail`, {
	          method: "POST",
	          headers: {
	            Accept: "application/json",
	            "Content-Type": "application/json"
	          },
	          body: JSON.stringify(obj)
	        })
	          .then(resp => resp.json())
	          .then(data => {
	          	
	          	alert(data.message);
	          	if(data.success==true){
					Actions.pop();
	          	}
	            
	           
	          })
	          .catch(e => {
	          
	          });
   		}

	}
	forgotPassword(values) {
		this.props.dispatch(forgotMail());
	}

	passFormAsync = async (values) => {
      
      try {
        await AsyncStorage.setItem('customerRegistration.pass', JSON.stringify(values));
      } catch (error) {
        
      }
      this.callAction();
  	};

  	callAction(){
  		this.getUserInfo().then((data) => {
	             
	        this.props.dispatch(registerAsync(data,'customer'));    
	    }).catch((error) => {
	        
	    }); 
  	}

	render() {
		return (

			<Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
             <Icon
                name="md-arrow-back"
                style={styles.backbuttonarrowcolor}
              />
             <Text style={styles.backbuttoncolor}>{" "}Back</Text>
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
              Sign In
            </Title>
          </Body>
          <Right />
        </Header>
        
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <Content style={{ backgroundColor: commonColor.brandSecondry }}>

			<View style={{ padding:50 }}>
			

					<View style={{flexDirection:'row',marginTop:0, marginBottom:30}}>
			     	<Icon
	                      name="md-information-circle"
	                      style={{
	                        fontSize: 24,
	                        marginRight:10,
	                        color:'#000000'
	                      }}
	                    />
			     	<Text style={{fontSize:13, color:'#333333'}}>The password should have at least 8 character, 1 upper case, 1 lower case, 1 number and 1 special character(*,%,!,@,&,$,?)</Text>
			    </View>
			    
				<View style={{ marginTop: 10 }}>
				<Text style={{ color: "#000",fontSize:18 }}>One Time Password (Check Email)</Text>
				
					<Field
						component={input}
						placeholder="Enter One Time Password"
						placeholderTextColor={commonColor.placeholderColor}
						name="otp"
						autoCapitalize="none"
						onChangeText={ value => this.setState({ otp: value })}
					/>
				</View>


				<View style={{ marginTop: 40 }}>
				<Text style={{ color: "#000",fontSize:18 }}>New password</Text>
				
					<Field
						component={input}
						placeholder="Enter Password"
						secureTextEntry
						placeholderTextColor={commonColor.placeholderColor}
						name="password"
						autoCapitalize="none"
					/>
				</View>

				<View style={{ marginTop: 40 }}>
				<Text style={{ color: "#000",fontSize:18 }}>Confirm password</Text>
				
					<Field
						component={input}
						placeholder="Confirm Password"
						secureTextEntry
						placeholderTextColor={commonColor.placeholderColor}
						name="conpassword"
						autoCapitalize="none"
					/>
				</View>				
				<View style={{marginTop:50}}>
				<Button
	                block
	                onPress={this.props.handleSubmit(this.submit.bind(this))}
	                style={styles.nameBtn}
	              >
	                <Text style={{ fontSize:18,color: "#fff" }}>
	                 Change Password                    
	                </Text>
	              </Button>
	              </View>
			</View>

			</Content>
        </View>
      </Container>

		);
	}
}

CustpasswordForm = reduxForm({
  form: "custpassform", // a unique name for this form
  validate
})(CustpasswordForm);

CustpasswordForm = connect(mapStateToProps, null)(CustpasswordForm);

export default CustpasswordForm;