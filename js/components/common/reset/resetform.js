import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage, Text, Dimensions, Image } from 'react-native';
import { Item, Input, Button, View, Icon, Spinner, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import { resetForm } from '../../../actions/common/signin';
import { Actions } from "react-native-router-flux";
import config from "../../../../config.js";
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(val);
}

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email';
	} else if (!values.otp) {
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

class ResetForm extends Component {
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
		resetForm: PropTypes.func,
		isFetching: PropTypes.bool,
	};
	submit(values) {	
		
		this.props.dispatch(resetForm(values));		
	}
	
	render() {
		return (

			<View style={{ padding: 30 }}>

				<Text style={{ color:"#E8E8E8", fontSize:28, fontWeight:'bold' }}>
                  Change Password
                </Text>
                <Text style={{ color: "#E8E8E8", fontSize:16, marginTop:10 }}>
                  Write your new password
                </Text>

                <Field component={textError} name="email"  />
               	<Field component={textError} name="password"  />
               	<Field component={textError} name="conpassword"  />
               	<Field component={textError} name="otp"  />
               	

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
						keyboardType="email-address"
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
						keyboardType="email-address"
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
		);
	}
}
export default reduxForm({
	form: 'resetform', // a unique name for this form
	validate,
	asyncBlurFields: [ 'email' ]
})(ResetForm);
