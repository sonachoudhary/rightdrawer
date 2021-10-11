import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage, Text, Dimensions, Image, StyleSheet } from 'react-native';
import { Item, Input, Button, View, CheckBox, Icon, Spinner, Thumbnail, Picker, Header, Title } from 'native-base';
import PropTypes from 'prop-types';
//import { signinAsync, forgotMail } from '../../../actions/common/signin';
import { registerAsync } from "../../../actions/common/register";


import { Actions } from "react-native-router-flux";
import config from "../../../../config.js";
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import RNPickerSelect from 'react-native-picker-select';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    alignItems:'center',
    justifyContent:'center',
    color: '#FFF',
    width:150,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    alignItems:'center',
    justifyContent:'center',
    borderColor: 'purple',
    borderRadius: 8,
    color: '#FFF',
    width:150,
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

class CustomernameForm extends Component {
	constructor(props) {
		input.propTypes = {
			input: PropTypes.object,
			meta: PropTypes.object,
			textError: PropTypes.object
		};
		super(props);
		this.state = {
			checked: false,
			uscitizen: false,
			uscitizenError: false
		};
	}
	


	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func,
		forgotMail: PropTypes.func,
		isFetching: PropTypes.bool,
		registerAsync: PropTypes.func
	};
	submit(values) {		
		
		// if(this.state.uscitizen === false) {
		// 	this.setState({ uscitizenError:true }) 
		// } else {
		 	this.props.dispatch(registerAsync(values,this.state.uscitizen));	
		// }
		
		//this.nameFromAsync(values)
	}
	forgotPassword(values) {
		this.props.dispatch(forgotMail());
	}
    UNSAFE_componentWillReceiveProps () {
		
	}
    
    async componentDidMount() {
		
		const sessionData = await AsyncStorage.getItem('customerRegistration');
    	//const getSessionData = JSON.parse(fulldata);
    	
    	if(sessionData==null) {
    		this.props.initialize({ email: null,fname: null,lname: null}); 	
    	}		
	}

    
	chkbox_check(){
		var checked = this.state.uscitizen;
		if(checked == true) {
			this.setState({uscitizen : false})
		} else {
			this.setState({uscitizen : true, uscitizenError:false})			
		}
	}

	
	render() {
		const placeholderStart = {
	      label: 'Select State',
	      value: null,
	      color: '#FFF',
	      fontSize:18,
	      justifyContent:'center',
	      alignItems:'center'
	    };

		
		return (

			<View style={{ padding: 30 }}>

				<Text style={{ color:"#E8E8E8", fontSize:28, fontFamily:'Cabin-Bold' }}>
                  Register
                </Text>
                <Text style={{ color: "#E8E8E8", fontSize:16, marginTop:10, fontFamily:'Cabin-Regular' }}>
                  Create your own account
                </Text>

                <Field component={textError} name="fname"  />
                <Field component={textError} name="lname"  />
                <Field component={textError} name="email"  />
                <Field component={textError} name="password"  />
                <Field component={textError} name="conpassword"  />
                {/* 
                	this.state.uscitizenError == true && 
                	<View style={ styles.errorTextView }>
						<Text style={ styles.errorText } >Check the box if you’re located in the US</Text>
					</View> 
				*/}

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

				<View style={styles.fieldContainer} >
	                <Text style={styles.fieldContainerText}>
	                  Password*
	                </Text>
	                <Field
						component={input}
						placeholder="Enter Password"
						secureTextEntry
						placeholderTextColor={commonColor.placeholderColor}
						name="password"
						autoCapitalize="none" />
				</View>

				
				<View style={styles.fieldContainer} >
	                <Text style={styles.fieldContainerText}>
	                  Confirm Password*
	                </Text>

					<Field
						component={input}
						placeholder="Confirm Password"
						secureTextEntry
						placeholderTextColor={commonColor.placeholderColor}
						name="conpassword"
						autoCapitalize="none" />
				</View>
				
				<View style={styles.fieldContainer} >
					<Text style={styles.fieldContainerText}>
	                  Confirm Password*
	                </Text>
					<RNPickerSelect style={pickerSelectStyles} placeholder={placeholderStart} onValueChange={(value) => this.setState({ startTime: value }) }
						items={[
						  { label: '7:00', value: '7:00' },
						  { label: '8:00', value: '8:00' },                        
						  { label: '9:00', value: '9:00' },
						  { label: '10:00', value: '10:00' },
						  { label: '11:00', value: '11:00' },
						  { label: '12:00', value: '12:00' },
						  { label: '13:00', value: '13:00' },
						  { label: '14:00', value: '14:00' },
						  { label: '15:00', value: '15:00' },
						  { label: '16:00', value: '16:00' },
						  { label: '17:00', value: '17:00' },
						  { label: '18:00', value: '18:00' },
						  { label: '19:00', value: '19:00' },
						  { label: '20:00', value: '20:00' },
						  { label: '21:00', value: '21:00' },
						  { label: '22:00', value: '22:00' },
						  { label: '23:00', value: '23:00' },
						  { label: '24:00', value: '24:00' }
						]}
					/>
                </View>

				<View style={{ flexDirection: 'row', marginTop:10 }} >					
					<CheckBox
					  style={{ marginTop:10 }}
					  checked={this.state.uscitizen}
					  onPress={() => this.chkbox_check()}
					/>
					<Text style={{ color: "#E8E8E8", fontSize:16, marginTop:10, marginLeft:20, fontFamily:'Cabin-Regular' }}>
	                  US residence
	                </Text>
                </View>
				

				<Button
	                block
	                onPress={this.props.handleSubmit(this.submit.bind(this))}
	                style={[styles.nameBtn,{backgroundColor:"#392F2A"}]} >
	                <Text style={{ fontSize:16, color: "#FFFFFF", fontFamily:'Cabin-Bold' }}>
	                    REGISTER                   
	                </Text>
	            </Button>
				
				{/*<View style={{ justifyContent:'center', alignItem:'center' }} >
	            <Text style={{ color: "#E8E8E8", fontSize:16, marginTop:10, textAlign:"center", fontFamily:'Cabin-Regular' }}>
                  OR
                </Text>
                </View>*/}

                
			</View>
		);
	}
}
export default reduxForm({
	form: 'custnamelogin', // a unique name for this form
	validate,
	//asyncValidate,
	asyncBlurFields: [ 'email' ]
})(CustomernameForm);
