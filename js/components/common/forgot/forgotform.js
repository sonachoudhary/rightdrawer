import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage, Text, Dimensions, Image } from 'react-native';
import { Item, Input, Button, View, Icon, Spinner, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import { forgotMail } from '../../../actions/common/signin';
import { Actions } from "react-native-router-flux";
import config from "../../../../config.js";
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

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

class ForgotForm extends Component {
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

			<View style={{ padding: 30 }}>

				<Text style={{ color:"#E8E8E8", fontSize:28, fontFamily:'Cabin-Bold' }}>
                  Forgot Password
                </Text>
                <Text style={{ color: "#E8E8E8", fontSize:16, marginTop:10, fontFamily:'Cabin-Regular' }}>
                  Enter your email that is used to register to request a password reset.
                </Text>

                
               	<Field component={textError} name="email"  />

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
		);
	}
}
export default reduxForm({
	form: 'forgotform', // a unique name for this form
	validate,
	asyncBlurFields: [ 'email' ]
})(ForgotForm);
