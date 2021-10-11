import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncStorage, Text, Dimensions,FlatList,StyleSheet } from 'react-native';
import { Item, Input, Button, View, Icon, Spinner,ListItem, Picker } from 'native-base';
import PropTypes from 'prop-types';
import { signinAsync, forgotMail } from '../../../actions/common/signin';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Actions } from "react-native-router-flux";
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
  guide: false,
  allowEmpty: true,
});

const deviceWidth = Dimensions.get('window').width;
function validatephone(val) { 
    return /^[0-9\b]+$/.test(val);
}
function validateAge(val) { 
    return /^[0-9\b]+$/.test(val);
}


const validate = values => {
	/*const errors = {};
	
	if (!values.phoneNo) {
		errors.phoneNo = 'Phone number is Required';
	}else if(!validateAge(values.phoneNo)){
		errors.phoneNo = 'Only numeric allowed';
	}
	if (!values.age) {
		errors.age = 'Birthdate is Required';
	}else if(!validateAge(values.age)){
		errors.age = 'Only numeric allowed';
	}else if(values.age.length>2){
		errors.age = 'Age must be in 2 digit only'; 
	}
	return errors;*/
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

export const phoneinut = props => {
	const { meta, phoneinut } = props;
	return (
		<View>
			<Item>
				<Input style={ styles.phoneinut } {...phoneinut} {...props} placeholderTextColor="#FF0000" style={{color:'#FF0000'}}  />
			</Item>

			{meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
		</View>
	);
}; 


input.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 17,
    paddingVertical: 12,
    paddingHorizontal: 10,
   
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 17,
    paddingHorizontal: 10,
    
    lineHeight:25,
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

class PhoneForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
		   choosenIndexAge:'',
		   phoneNo:'',
	       selectedExp: ['Male'],
	       documentTypes : [
	        {
	          name: "Male",
	          key: "Male",
	          show: true
	        },
	        {
	          name: "Female",
	          key: "Female",
	          show: false
	        },
	        {
	          name: "Other",
	          key: "Other",
	          show: false
	        }
	      ]
	    };
	}
    


    UNSAFE_componentWillReceiveProps () {
    	
    	if(this.state.phoneNo==undefined){
    		
			this.getUserInfo();
		}else {
			if (this.state.phoneNo.length < 1)  { var phone = ''; }
	        if (this.state.phoneNo.length == 1) { var phone =  '(' +this.state.phoneNo; }
	        if (this.state.phoneNo.length == 2) { var phone =  '(' +this.state.phoneNo; }
	        if (this.state.phoneNo.length == 3) { var phone =  '(' +this.state.phoneNo; }
	        if (this.state.phoneNo.length == 4) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3); }
	        if (this.state.phoneNo.length == 5) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3); }
	        if (this.state.phoneNo.length == 6) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3); }
	        if (this.state.phoneNo.length == 7) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
	        if (this.state.phoneNo.length == 8) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
	        if (this.state.phoneNo.length == 9) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
	        if (this.state.phoneNo.length > 9) { var phone =  '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10); }
	        
			
			this.props.initialize({ phoneNo: phone }); 
		}

	}
    
    getUserInfo =  async() => { 
    	    const fulldata = await AsyncStorage.getItem('driverRegistration.phone');
    	    const getdata = JSON.parse(fulldata);
    	    
			const phoneNo = getdata.phoneNo;
		    const age = getdata.age;
		    
		    
			    if(phoneNo!=null && age!=null){
			    	this.props.initialize({ phoneNo: phoneNo,age: age}); 
			    }
		    
	  }


	phoneFormAsync = async (values) => {
		
      try {
        await AsyncStorage.setItem('driverRegistration.phone', JSON.stringify(values));
      } catch (error) {
        
      }
      Actions.experience()
  	};

	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func,
		forgotMail: PropTypes.func,
		isFetching: PropTypes.bool,
	};
	submit() {
		//this.props.dispatch(signinAsync(values));
		
		if (this.state.phoneNo=="") {
			   alert('Phone number is required');
		}else if (this.state.choosenIndexAge=="") {
			   alert('Birthdate is required');
		}else if (this.state.gender=="") {
			   alert('Gender is required');
		}else {
			
			var values = { "age":this.state.choosenIndexAge, "phoneNo":this.state.phoneNo, "gender":this.state.gender}
			
			this.phoneFormAsync(values);
		}
	}
	
	renderCheck() {
	    return (
	      <Icon name="checkmark" style={{ color: "#D41818", fontWeight: "bold", fontSize: 25, paddingTop:5, marginRight: 10, lineHeight:15 }} />
	    );
    }

	renderIcon(key) {
	    if(key === true) {
	      return this.renderCheck()
	    } else {
	      return null;
	    }    
	}

	callAction(value){
	    for (var i = 0; i < this.state.documentTypes.length; i++) {
	      if (this.state.documentTypes[i].key === value) {
	        this.state.documentTypes[i].show = true
	        this.forceUpdate()
	        this.setState({
	          selectedExp: this.state.documentTypes[i].key
	        })
	      } else {
	        this.state.documentTypes[i].show = false
	      }
	    }    
	}

	renderRow = ({ item }) => {
	    return (
	      <ListItem
	        style={styles.listcustom}
	        onPress={() => this.callAction(item.key)}
	      >
	        <View style={styles.listContainer}>
	          
			  <View style={styles.lextText}>
	            <Text style={styles.textColor}>{item.name}</Text>
	          </View>
	          <View style={styles.rightText}>{this.renderIcon(item.show)}</View>
	        </View>
	      </ListItem>
	    );
	};

	render() {

	var agearr = [];
	for(let i = 0; i < 100; i++){
        agearr.push(<Picker.Item label="18" value="18" />)
	}
		return (
			<View style={{ padding:50 }}>
				<View style={{ marginTop: 10 }}>
					<Text style={{ color: "#000",fontSize:18 }}>Enter your phone number</Text>

					<Field
						component={input}
						name="phoneNo"
						type="tel"
						placeholder="(999) 999-9999"
					    onChangeText={ value => this.setState({ phoneNo: value.replace(/[^0-9]/g, '') })}
						
					/>
				</View>

				<View style={{ marginTop: 30 }}>
				       <Text style={{ color: "#000",marginBottom:10,fontSize:18 }}>Select your birthdate</Text>
				      
                      <View style={{flex:1,alignSelf:'flex-start',width:deviceWidth-100,marginLeft:0,paddingLeft:0,borderBottomWidth: 1,borderBottomColor:'#cccccc'}}>
		              <DatePicker
		                    style = {{ marginLeft:-14,marginBottom:10,fontSize:17}}
		                    date={this.state.choosenIndexAge}
		                    mode="date"
		                    placeholder={<Text style={{color:'#FF0000',fontSize:16}}>&#128197; Birthdate</Text>}
		                    minDate={moment().subtract(100, "years")}
                        	maxDate={moment().subtract(18, "years")}
		                    showIcon={false}
		                    format="ll"
		                    confirmBtnText="Confirm"
		                    cancelBtnText="Cancel"
		                    customStyles={{
		                      dateInput: {
		                        borderWidth: 0,
		                        fontSize:17,
		                      },
		                      dateText:{
		                        color: "#FF0000", 
		                        marginLeft:0,
		                        fontSize:17,  
		                      }
		                    }}
		                    onDateChange={time => {
		                      this.setState({ choosenIndexAge: time });
		                    }} />
		                </View>
						
				</View>


				<View style={{ marginTop: 30,marginBottom:20 }}>
					<Text style={{ color: "#000",marginBottom:10,fontSize:18}}>Select your gender</Text>
					    <View style={{marginLeft:-1}}>
							<RNPickerSelect
	                          placeholder={{label: 'Select gender',value: null,color:'#FF0000'}}
	                          style={pickerSelectStyles}
	                          onValueChange={ (value) => ( this.setState({gender: value}) ) }
	                          items={[
	                            { label: 'Male', value: 'Male' ,color:'#FF0000'},
	                            { label: 'Female', value: 'Female',color:'#FF0000' },
	                            { label: 'Other', value: 'Other',color:'#FF0000' },
	                           
	                        ]}
	                      />
                      </View>
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
	form: 'namelogin', // a unique name for this form
	validate
})(PhoneForm);
