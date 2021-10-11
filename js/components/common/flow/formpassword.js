import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage, Text, Dimensions } from 'react-native';
import { Item, Input, Button, View, Icon, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { signinAsync, forgotMail } from '../../../actions/common/signin';
import { Actions } from "react-native-router-flux";

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const deviceWidth = Dimensions.get('window').width;

function validatePassword(val) { 
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);
}

const validate = values => {
	const errors = {};

	if (!values.password) {
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

class PasswordForm extends Component {
	constructor(props) {
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
		//this.props.dispatch(signinAsync(values));
		this.passFormAsync(values)
	}
	forgotPassword(values) {
		this.props.dispatch(forgotMail());
	}

	passFormAsync = async (values) => {
      
      try {
        await AsyncStorage.setItem('driverRegistration.pass', JSON.stringify(values));
      } catch (error) {
        
      }

      Actions.phone()
  	};

	render() {
		return (
			<View style={{ padding:50 }}>
			    <View style={{flexDirection:'row',marginTop:-30, marginBottom:30}}>
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
				<Text style={{ color: "#000",fontSize:18 }}>Create a password</Text>
				
					<Field
						component={input}
						placeholder="Enter Password"
						secureTextEntry
						placeholderTextColor={commonColor.placeholderColor}
						name="password"
						autoCapitalize="none"
					/>
				</View>

				<View style={{ marginTop: 50 }}>
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

				<Button
	                block
	                onPress={this.props.handleSubmit(this.submit.bind(this))}
	                style={styles.nameBtn}
	              >
	               <Text style={{ alignSelf: "center", fontSize:20,color:'#FFFFFF'}}>
              		NEXT  {" "}
	                    <Icon
	                      name="md-arrow-forward"
	                      style={{
	                        fontSize: 16,
	                        marginLeft: 40,
	                        paddingTop:7,
	                        paddingLeft:40,
	                        color: "#FFF"
	                      }}
	                    />
	                </Text>
	              </Button>

			</View>
		);
	}
}
export default reduxForm({
	form: 'passform', // a unique name for this form
	validate,
	validatePassword,
})(PasswordForm);
