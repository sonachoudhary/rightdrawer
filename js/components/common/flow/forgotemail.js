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
import config from "../../../../config.js";
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Email is Required';
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

	async submit(values) {
		
		if(values['email']!=""){
			await AsyncStorage.setItem('forgotPasswordsetEmail',values['email']);
	        const obj = {
	            email:values['email']
	        };
	        fetch(`${config.serverSideUrl}:${config.port}/api/config/forgot`, {
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
					Actions.forgotpassword();
	          	}
	            
	           
	          })
	          .catch(e => {
	          
	          });
   		}
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
    		this.props.initialize({ email: null}); 	
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

			<View style={{ padding: 50 }}>
					 <Text style={{ fontSize:18, textAlign: "center", paddingBottom: 20, paddingTop:10, color:"#000"}}>Forgot Password</Text>
				<View style={{ marginTop: 50 }}>
				<Text style={{ color: "#000",fontSize:18}}>What is your email address</Text>
				<View>
					<Field
						component={input}
						type="email"
						name="email"
						placeholder="Enter Email"
						placeholderTextColor={commonColor.placeholderColor}
						autoCapitalize="none"
						autoCorrect={false}
					/>
				</View>
				</View>
				<View style={{marginTop:50}}>
				<Button
	                block
	                onPress={this.props.handleSubmit(this.submit.bind(this))}
	                //onPress={() => Actions.createpass()}
	                style={styles.nameBtn}
	              >
	                <Text style={{ alignSelf: "center", fontSize:20,color:'#ffffff'}}>
              		Continue  {" "}
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
	            <Button
                  transparent
                  style={{  }}
                  onPress={() => Actions.pop()} >
                  <Text style={{ color: '#000',marginTop:10 }}>Have an existing account? Login here</Text>
                </Button>

                <Text style={{ fontWeight: "600", fontSize:18,  color: "#828282", marginTop:50, marginBottom:30, textAlign: "center" }} onPress={() => Actions.services()}>
              Create New Account{" "}
              <Icon
                name="md-arrow-forward"
                style={{
                  fontSize: 16,
                  marginLeft: 40,
                  paddingTop:7,
                  paddingLeft:40,
                  color: "#828282"
                }}
              />
            </Text>

				
			</View>

			</Content>
        </View>
      </Container>
		);
	}
}
export default reduxForm({
	form: 'custnamelogin', // a unique name for this form
	validate,
	
	asyncBlurFields: [ 'email' ]
})(CustomernameForm);
