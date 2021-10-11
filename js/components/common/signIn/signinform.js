import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage, Text, Dimensions, Image,TouchableOpacity,ActivityIndicator,ImageBackground ,TextInput} from 'react-native';
import { Item, Input, Button, View, Icon, Spinner, Thumbnail,CheckBox,Container, } from 'native-base';
import PropTypes from 'prop-types';
import { signinAsync, forgotMail } from '../../../actions/common/signin';
import { Actions } from "react-native-router-flux";
import config from "../../../../config.js";
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import SyncStorage from 'sync-storage';
import { Calendar,Agenda } from 'react-native-toggle-calendar';
import PasswordInputText from 'react-native-hide-show-password-input';
import ModalView from "../ModalView";


import moment from "moment";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Email is required';
	} else if(!values.password){
		 errors.email = 'Password is required';
	}
	return errors;
};

export const asyncValidate = (values/*, dispatch */) => {
  	return new Promise((resolve, reject) => {
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
        	if(data!=null){
	          if(data.message == "User Exist") {
	          	throw { email: 'This email is taken' }	
	          } else {
	          	resolve(data)
	          }
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
				<Input  value = {null} style={ [styles.input, (meta.touched && meta.error) ? {borderColor:"#3B3B3B"} : {borderColor:"#3B3B3B"}] } {...input} {...props} />
			</Item>			
		</View>
	);
};

export const textError = props => {
	const { meta, textError } = props;
	return (

		<View>
		{
			meta.touched && meta.error && 
			<View style={ styles.errorTextView }>
				<Text style={ styles.errorText }  {...textError} {...props} >{meta.error}</Text>
			</View>
		}
		</View>
		
	);
};


input.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
	textError: PropTypes.object
};

class SigninForm extends Component {
	constructor(props) {
		input.propTypes = {
			input: PropTypes.object,
			meta: PropTypes.object,
			textError: PropTypes.object
		};
		super(props);
		this.state = {
			isSelected: false,
			Remember:'',
			email:undefined,
			password:undefined,
			showloader:false,
		};
	}

	checkbox(){
    this.setState({isSelected:!this.state.isSelected})
    if(this.state.isSelected==true){
    	SyncStorage.set('data:email',this.state.email );
			SyncStorage.set('data:password',this.state.password );
		}else {
			SyncStorage.set('data:email','' );
			SyncStorage.set('data:password','' );
		}
  }

	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func,
		forgotMail: PropTypes.func,
		isFetching: PropTypes.bool,
		signinAsync: PropTypes.func,
	};

	submit() {
		if(this.state.email==""){
			alert('Email required')
		}  else if(this.state.password==""){
			alert('password required')
		} else {
			this.setState({showloader:true})
			
		 setTimeout(() => {
		 	this.setState({showloader:true})
    	    var field= [];
			field.email=this.state.email;
            field.password=this.state.password;
            field.token=SyncStorage.get('FCM_TOCKEN_WESMART');
            SyncStorage.set('data:email',this.state.email );
		    SyncStorage.set('data:password',this.state.password );
            
    	    this.props.dispatch(signinAsync(field));
    	     	    
	    }, 300);
	    setTimeout(()=>{
	    	this.setState({showloader:false})
	    },2500)


		}
		
		
		
		
		
	}

	forgotPassword(values) {
		this.props.dispatch(forgotMail());
	}
  
  UNSAFE_componentWillReceiveProps () {
  	  if(this.state.email==undefined && this.state.password==undefined){
    	 	this.getUserInfo();
    	}
	}
  

  getUserInfo =  async() => {
    	const email = SyncStorage.get('data:email')
      const password = SyncStorage.get('data:password')
      if(email!=null && password!=null){
      		this.props.initialize({ email: email,password: password,}); 
		  }	
	}

	nameFromAsync = async (values) => {
	    try {
	      await SyncStorage.set('customerRegistration.name', JSON.stringify(values));
	    } catch (error) {
	      
	    }
	    Actions.customerpass()
	};
	
	render() {	

		return (
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
              <Text style={{fontWeight:'bold',fontSize:44,textAlign:'center',paddingTop:'50%',}}>Login</Text>
           </View>
           <View style={{borderWidth:1,backgroundColor:'#ffffff',borderColor:'lightgrey',width:'85%',marginTop:'10%',borderTopRightRadius:50,borderBottomRightRadius:50}}>

               <View style={{borderBottomWidth: 1,borderColor:'lightgrey', flexDirection:'row'}}>
                   <View style={{marginLeft:'3%',marginTop:'6%'}}>
                    <Image source={require("../../../../assets/images/aboutus.png")} style={{width:20,height:20,margin:'2%',}}/>
                   </View >
                    <TextInput
                    style={{ width:'80%',height:60,marginLeft:'0%'}}
                    onChangeText={ value => this.setState({ email: value })}
                      value={this.state.email}
                    placeholder="Username"
                    />
              </View>
                   <TouchableOpacity style={{marginLeft:'90%',marginTop:'7%',position:'absolute',}} onPress={() => this.submit()}>
                      <Image source={require("../../../../assets/images/arrowicon.png")} style={{width:60,height:60,margin:'2%',borderRadius:100}}/>
                   </TouchableOpacity>
                    <View style={{ flexDirection:'row'}}>
                    <View style={{marginLeft:'3%', marginRight:10,marginTop:'6%'}}>
                      <Image source={require("../../../../assets/icon/key.png")} style={{width:15,height:15,margin:'2%'}}/>
                    </View >
                    <View style={{marginBottom:15, lineWidth:0, activeLineWidth: 0,disabledLineWidth: 0,width:'100%',borderWidth:0, borderBottomWidth:0, borderBottomColor:'#ffffff',borderColor:'#ffffff'}}>
                     <PasswordInputText
							          getRef={input => this.input = input}
							          style={{ lineWidth:0, activeLineWidth: 0,disabledLineWidth: 0,width:'70%',height:60,marginTop:-15,borderWidth:0, borderBottomWidth:0, borderBottomColor:'#ffffff',borderColor:'#ffffff'}}
							          value={this.state.password}
							          label={''}
							          placeholder="Password"
							          underlineColorAndroid="transparent"
							          onChangeText={ value => this.setState({ password: value })}
							        />
							        </View>
                   </View>
            </View>
           <TouchableOpacity style={{ flexDirection:'row',marginTop:15,marginLeft:'3%' }} onPress={()=>this.checkbox()} >
					  {!this.state.isSelected ?
					   <Image
			              source={require("../../../../assets/images/checkremmber.png")}
			              style={{ width:15, height: 15 }}
			            />
			        :
			            <Image
			              source={require("../../../../assets/images/uncheckremmber.png")}
			              style={{ width:15, height: 15 }}
			            />
			        }
		        	<Text style={{ color: "#3B3B3B", fontSize:14, marginLeft:10}}>
		               Remember me
		          </Text>
	        </TouchableOpacity>

     <TouchableOpacity style={{width:'25%',backgroundColor:'#ffffff', marginTop:'15%',borderWidth:1,borderColor:'lightgrey', borderBottomRightRadius:25,borderTopRightRadius:25}}
                        onPress={()=>Actions.customersignup()}>
        
      		<Text style={{color:'red',padding:6,fontSize:16,height:40 }}>Register</Text>
      	
      </TouchableOpacity>
      </ImageBackground>
      }
        </Container>
			
		);
	}
}
export default reduxForm({
	form: 'signinform', // a unique name for this form
	validate,
	//asyncValidate,
	asyncBlurFields: [ 'email' ]

})(SigninForm);
