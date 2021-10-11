import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage, Text, Dimensions } from 'react-native';
import { Item, Input, Button, View, Icon, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { signinAsync, forgotMail } from '../../../actions/common/signin';
import { Actions } from "react-native-router-flux";
import config from "../../../../config.js";
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
	const errors = {};
	if (!values.fname) {
		errors.fname = 'First name is Required';
	} else if (!values.lname) {
		errors.lname = 'Last name is Required';
	} else if (!values.email) {
		errors.email = 'Email is Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email';
	}
	return errors;
};


export const asyncValidate = (values/*, dispatch */) => {
  	return new Promise((resolve) => {
    	const userEmail = { email: values.email };
      	 fetch(`${config.serverSideUrl}:${config.port}/api/auth/checkUser`, {
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
          
        });
    })
}

export const input = props => {
	const { meta, input } = props;
	return (
		<View>
			<Item>
				<Input  value = {null} {...input} {...props} placeholderTextColor="#FF0000" style={{color:'#FF0000'}} />
			</Item>

			{meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
		</View>
	);
};


input.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
};

class CustomernameForm extends Component {
	constructor(props) {input.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
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
		
		//this.props.dispatch(signinAsync(values));
		this.nameFromAsync(values)
	}
	forgotPassword(values) {
		this.props.dispatch(forgotMail());
	}
    UNSAFE_componentWillReceiveProps () {
		
		this.getUserInfo();
	}
    
    async componentDidMount() {
		
		const sessionData = await AsyncStorage.getItem('customerRegistration');
    	
    	if(sessionData==null) {
    		this.props.initialize({ email: null,fname: null,lname: null}); 	
    	}		
	}

    getUserInfo =  async() => {
    	    const fulldata = await AsyncStorage.getItem('customerRegistration.name');
    	    const getdata = JSON.parse(fulldata);
    	    
    	    if(getdata!=null){
		    	const fname = getdata.fname;
			    const lname = getdata.lname;
			    const email = getdata.email;
			}
		    if(email!=null && lname!=null && fname!=null){
		    	this.props.initialize({ email: email,fname: fname,lname: lname}); 
		    }	
	  }
	nameFromAsync = async (values) => {
	    
	    try {
	      await AsyncStorage.setItem('customerRegistration.name', JSON.stringify(values));
	    } catch (error) {
	      
	    }
	    Actions.customerpass()
	};
	
	render() {


		return (

			<View style={{ padding: 50 }}>

				<Text style={{  color: "#000",fontSize:18 }}>What is your first and last name?</Text>
				
				<View style={{ flex:1, flexDirection: 'row'  }}>
					<View style={{ width: 90, flex:1, paddingRight:20 }}>
						<Field
							component={input}
							name="fname"
							placeholder="First Name"
							placeholderTextColor={commonColor.placeholderColor}
							autoCapitalize="words"
						/>
					</View>
					<View style={{ width: 90, flex:1 }}>
						<Field
							component={input}
							placeholder="Last Name"
							placeholderTextColor={commonColor.placeholderColor}
							name="lname"
							autoCapitalize="words"					
						/>
					</View>
				</View>
				
				<View style={{ marginTop: 80 }}>
				<Text style={{ color: "#000",fontSize:18}}>What is your email address?</Text>
				<View>
					<Field
						component={input}
						type="email"
						name="email"
						placeholder="Email"
						placeholderTextColor={commonColor.placeholderColor}
						autoCapitalize="none"
						autoCorrect={false}
					/>
				</View>
				</View>

				<Button
	                block
	                onPress={this.props.handleSubmit(this.submit.bind(this))}
	                //onPress={() => Actions.createpass()}
	                style={styles.nameBtn}
	              >
	                <Text style={{ alignSelf: "center", fontSize:20,color:'#ffffff'}}>
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
	form: 'custnamelogin', // a unique name for this form
	validate,
	asyncValidate,
	asyncBlurFields: [ 'email' ]
})(CustomernameForm);
