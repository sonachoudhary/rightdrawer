import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, Dimensions } from 'react-native';
import { Item, Input, Button, View, Icon, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { signinAsync, forgotMail } from '../../../actions/common/signin';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Email is Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email';
	} else if (isNaN(Number(values.phoneNo))) {
		errors.phoneNo = 'Must be a number';
	} else if (!values.password) {
		errors.password = 'Password is required';
	} else if (!values.phoneNo) {
		errors.phoneNo = 'Mobile Number is required';
	} else if (!values.fname) {
		errors.fname = 'First name is required';
	} else if (!values.lname) {
		errors.lname = 'Last name is required';
	}
	if (!values.password) {
		errors.password = 'Password is required';
	}
	return errors;
};


export const input = props => {
	const { meta, input } = props;
	return (
		<View>
			<Item>
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



class ExperienceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
		};
	}

	UNSAFE_componentWillReceiveProps () {
   		 
    this.getUserInfo();
    }
    
    getUserInfo =  async() => {
          const fulldata = await AsyncStorage.getItem('driverRegistration.exp');
          const getdata = JSON.parse(fulldata);
          
     
    }

	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func,
		forgotMail: PropTypes.func,
		isFetching: PropTypes.bool,
	};
	submit(values) {
		this.props.dispatch(signinAsync(values));
	}
	forgotPassword(values) {
		this.props.dispatch(forgotMail());
	}

	handleConfirm(pItems){
		
	}

	

	render() {
		return (
			<View style={{ padding:50 }}>
				<Text style={{ fontWeight: "600", color: "#000" }}>How long have you been a Trainer/Instructor?</Text>
				
				<View style={{ padding: 10 }}>
				   	
				</View>
			</View>
		);
	}
}
export default reduxForm({
	form: 'namelogin', // a unique name for this form
	validate,
})(ExperienceForm);
