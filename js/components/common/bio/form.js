import React, { Component } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { View, Text, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";
import { Input, Card, CardItem, Icon, Button, Label, Item, Form, Picker } from "native-base";

import { updateUserProfileAsync } from "../../../actions/driver/settings";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width, height } = Dimensions.get("window");
import { createNumberMask, createTextMask } from 'redux-form-input-masks';

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
  guide: false,
  allowEmpty: true,
});

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = "name is Required";
	} else if (!values.city) {
		errors.city = "City is Required";
	} else if (!values.state) {
		errors.state = "State is Required";
	} else if (!values.weight) {
		errors.weight = "Weight is Required";
	} else if (!values.height) {
		errors.height = "Height is Required";
	} else if (!values.facebook) {
		errors.facebook = "Facebook is Required";
	} else if (!values.instagram) {
		errors.instagram = "Instagram is Required";
	} else if (!values.twitter) {
		errors.twitter = "Twitter is Required";
	} else if (!values.phoneNo.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/i)) {
		errors.phoneNo = "Invalid phone number";
	}
	// else if(!values.password) {
	//   errors.password = "password is Required";
	// }
	// else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	// 	errors.email = "Invalid email";
	// } else if (!values.phoneNo) {
	// 	errors.phoneNo = "Phone number is Required";
	// } 
	return errors;
};

export const input = props => {
	const { meta, input } = props;
	return (
		<View>
			<View style={{ flexDirection: "row", flex: 1 }}>
				<Input
					{...input}
					{...props}
					style={{
						fontWeight: "400",
						marginLeft: 2,
						borderBottomWidth: 1,
						borderBottomColor: "#6895B0",
						color: commonColor.brandPrimary
					}}
					onFocus={() => {
						{
							input.name === "homeAddress"
								? Actions.suggestLocation({
										heading: "Home Address",
										page: "HomeAddress"
									})
								: null;
						}
					}}
				/>
			</View>
			<View>{meta.touched && meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}</View>
		</View>
	);
};

let lengthText = 300;
function calculate(text) {
  lengthText = 300;
  lengthText = lengthText - text.length
}

export const inputtext = props => {
  const { meta, input } = props;
  return (
    <View>
      <View style={{ borderRadius:0, height: 100, paddingTop:10 }}>
        <TextInput
          style={{ borderWidth: 0, height: 100 }}
          multiline
          maxLength={300} 
          placeholderTextColor="#777"
          editable={true}
          onChangeText={(text) => calculate(text) }
          {...input} {...props}
        />
      </View>
      <Text style={{ color: '#777', textAlign:"right", paddingRight:30 }}> {lengthText} Character Left</Text>
      { meta.touched && meta.error && <Text style={{ color: 'red', textAlign:"left", paddingLeft:20 }}>{meta.error}</Text> }
    </View>
  );
};
input.propTypes = {
	input: PropTypes.object,
	inputtext: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}
class SettingsForm extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func
	};
   constructor(props) {
		super(props);
		this.state = {
		   choosenIndexAge:'18',
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
    		
		}else {
			if (this.state.phoneNo.length <= 3) {
			    var phone =  '(' +this.state.phoneNo+ ') ';
			}else if (this.state.phoneNo.length <= 6) {
			    var phone =   '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3);
			}else if (this.state.phoneNo.length > 6) {
			 	var phone =   '(' +this.state.phoneNo.slice(0, 3) + ') ' + this.state.phoneNo.slice(3, 6) + '-' + this.state.phoneNo.slice(6, 10);
			}
			
			this.props.initialize({ phoneNo: phone }); 
		}

	}
	
	componentWillReceiveProps(nextProps) {
		nextProps.dispatch(change("settings", "homeAddress", nextProps.initialValues.homeAddress));
	}
	submit(values) {
		this.props.dispatch(updateUserProfileAsync({ ...values }));
	}
	render() {
		var userType = this.props.userDetails.userType;
		return (
			<View>
				<Form>
					<Item
						stackedLabel
						style={{
							borderBottomWidth: 0,
							alignItems: "stretch",
							marginHorizontal: 10,
							flex: 1
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							FIRST NAME
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="fname" />
					</Item>

					<Item
						stackedLabel
						style={{
							borderBottomWidth: 0,
							alignItems: "stretch",
							marginHorizontal: 10,
							flex: 1
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							LAST NAME
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="lname" />
					</Item>

					<Item
						stackedLabel
						style={{
							borderBottomWidth: 0,
							alignItems: "stretch",
							marginHorizontal: 10,
							flex: 1
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							MOBILE
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="phoneNo" />						
					</Item>

					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							City
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="city" />
					</Item>
					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							State
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="state" />
					</Item>

					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							Age
						</Label>
						
						<Picker 
                        mode={'dialog'}
                        style={{ marginLeft: 10, width: width - 10 }}
		                selectedValue={this.state.choosenIndexAge}  
		                onValueChange={(itemValue, itemPosition) =>  
		                  this.setState({choosenIndexAge: itemValue })}  
		              >  

		                <Picker.Item label="18" value="18" />
		                <Picker.Item label="19" value="19" />  
		                <Picker.Item label="20" value="20" />  
		                <Picker.Item label="21" value="21" /> 
		                <Picker.Item label="21" value="21" /> 
		                <Picker.Item label="22" value="22" />  
		                <Picker.Item label="23" value="23" /> 
		                <Picker.Item label="24" value="24" /> 
		                <Picker.Item label="25" value="25" /> 
		                <Picker.Item label="26" value="26" /> 
		                <Picker.Item label="27" value="27" /> 
		                <Picker.Item label="28" value="28" />
		                <Picker.Item label="29" value="29" />  
		                <Picker.Item label="30" value="30" />  
		                <Picker.Item label="31" value="31" /> 
		                <Picker.Item label="32" value="32" /> 
		                <Picker.Item label="33" value="33" />  
		                <Picker.Item label="34" value="34" /> 
		                <Picker.Item label="35" value="35" /> 
		                <Picker.Item label="36" value="36" /> 
		                <Picker.Item label="37" value="37" /> 
		                <Picker.Item label="38" value="38" /> 
		                <Picker.Item label="39" value="39" />
		                <Picker.Item label="40" value="40" />  
		                <Picker.Item label="41" value="41" />  
		                <Picker.Item label="42" value="42" /> 
		                <Picker.Item label="43" value="43" /> 
		                <Picker.Item label="44" value="44" />  
		                <Picker.Item label="45" value="45" /> 
		                <Picker.Item label="46" value="46" /> 
		                <Picker.Item label="47" value="47" /> 
		                <Picker.Item label="48" value="48" /> 
		                <Picker.Item label="49" value="49" /> 
		                <Picker.Item label="50" value="50" />
		                <Picker.Item label="51" value="51" />  
		                <Picker.Item label="52" value="52" />  
		                <Picker.Item label="53" value="53" /> 
		                <Picker.Item label="54" value="54" /> 
		                <Picker.Item label="55" value="55" />  
		                <Picker.Item label="56" value="56" /> 
		                <Picker.Item label="57" value="57" /> 
		                <Picker.Item label="58" value="58" /> 
		                <Picker.Item label="59" value="59" /> 
		                <Picker.Item label="60" value="60" /> 
		                <Picker.Item label="61" value="61" />
		                <Picker.Item label="62" value="62" />  
		                <Picker.Item label="63" value="63" />  
		                <Picker.Item label="64" value="64" /> 
		                <Picker.Item label="65" value="65" /> 
		                <Picker.Item label="66" value="66" />  
		                <Picker.Item label="67" value="67" /> 
		                <Picker.Item label="68" value="68" /> 
		                <Picker.Item label="69" value="69" /> 
		                <Picker.Item label="70" value="70" /> 
		                <Picker.Item label="71" value="71" /> 
		                <Picker.Item label="72" value="72" />
		                <Picker.Item label="73" value="73" />  
		                <Picker.Item label="74" value="74" />  
		                <Picker.Item label="75" value="75" /> 
		                <Picker.Item label="76" value="76" /> 
		                <Picker.Item label="77" value="77" />  
		                <Picker.Item label="78" value="78" /> 
		                <Picker.Item label="79" value="79" /> 
		                <Picker.Item label="80" value="80" /> 
		                <Picker.Item label="81" value="81" /> 
		                <Picker.Item label="82" value="82" /> 
		                <Picker.Item label="83" value="83" />
		                <Picker.Item label="84" value="84" />  
		                <Picker.Item label="85" value="85" />  
		                <Picker.Item label="86" value="86" /> 
		                <Picker.Item label="87" value="87" /> 
		                <Picker.Item label="88" value="88" />  
		                <Picker.Item label="89" value="89" /> 
		                <Picker.Item label="90" value="90" /> 
		                <Picker.Item label="91" value="91" /> 
		                <Picker.Item label="92" value="92" /> 
		                <Picker.Item label="93" value="93" /> 
		                <Picker.Item label="94" value="94" />
		                <Picker.Item label="95" value="95" />  
		                <Picker.Item label="96" value="96" />  
		                <Picker.Item label="97" value="97" /> 
		                <Picker.Item label="98" value="98" /> 
		                <Picker.Item label="99" value="99" />  
		                
		              </Picker>
					</Item>

					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							Weight
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="weight" />
					</Item>

					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							Height
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="height" />
					</Item>

					{(userType=='customer') && 
					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							Fitness goals
						</Label>
						<Field
				            component={inputtext}
				            placeholder="Enter message..."
				            placeholderTextColor="#828282"
				            name="bio"
				            autoCapitalize="none"
				          />
					</Item>
					}

					{(userType=='trainer') && 
		              <Item
		                stackedLabel
		                style={{
		                  marginHorizontal: 10,
		                  flex: 1,
		                  alignItems: "stretch",
		                  borderBottomWidth: 0
		                }}
		              >
		                <Label style={{ color: commonColor.brandLebel }} note>
		                  Specialities
		                </Label>
		                <Text>{this.props.userDetails.Specialities}</Text>
		              </Item>
		              }

		              {/*(userType=='trainer') && 
		              <Item
		                stackedLabel
		                style={{
		                  marginHorizontal: 10,
		                  flex: 1,
		                  alignItems: "stretch",
		                  borderBottomWidth: 0
		                }}
		              >
		                <Label style={{ color: commonColor.brandLebel }} note>
		                  Certifications
		                </Label>
		                <Text>{this.props.userDetails.Certifications}</Text>
		              </Item>
		              */}

		              {/*(userType=='trainer') && 
		              <Item
		                stackedLabel
		                style={{
		                  marginHorizontal: 10,
		                  flex: 1,
		                  alignItems: "stretch",
		                  borderBottomWidth: 0
		                }}
		              >
		                <Label style={{ color: commonColor.brandLebel }} note>
		                  Years of experience
		                </Label>
		                <Text>{this.props.userDetails.experience}</Text>
		              </Item>
		              */}


		              {/*(userType=='trainer') && 
		              <Item
		                stackedLabel
		                style={{
		                  marginHorizontal: 10,
		                  flex: 1,
		                  alignItems: "stretch",
		                  borderBottomWidth: 0
		                }}
		              >
		                <Label style={{ color: commonColor.brandLebel }} note>
		                  Locations
		                </Label>
		                <Text>{this.props.userDetails.Locations}</Text>
		              </Item>
		              */}

		              {/*(userType=='trainer') && 
		              <Item
		                stackedLabel
		                style={{
		                  marginHorizontal: 10,
		                  flex: 1,
		                  alignItems: "stretch",
		                  borderBottomWidth: 0
		                }}
		              >
		                <Label style={{ color: commonColor.brandLebel }} note>
		                  Hourly rate
		                </Label>
		                <Text>{this.props.userDetails.rate}</Text>
		              </Item>
		              */}
					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							Facebook
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="facebook" />
					</Item>

					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							Instagram
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="instagram" />
					</Item>

					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: commonColor.brandLebel }} note>
							Twitter
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="twitter" />
					</Item>

				</Form>
				
				{/*<Button
					block
					style={{ padding: 10, height: 55, marginHorizontal: 5, marginTop:10, marginBottom:10, bottom: 0 }}
					onPress={this.props.handleSubmit(this.submit.bind(this))}
				>
					<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}> Save </Text>
				</Button>*/}
			</View>
		);
	}
}

SettingsForm = reduxForm({
	form: "settings", // a unique name for this form
	validate
})(SettingsForm);

SettingsForm = connect(state => ({
	homeAddress: formValueSelector("settings")(state, "homeAddress"),
	initialValues: {
		fname: state.driver.user.fname,
		lname: state.driver.user.lname,
		email: state.driver.user.email,
		twitter: state.driver.user.twitter,
		facebook: state.driver.user.facebook,
		instagram: state.driver.user.instagram,
		weight: state.driver.user.weight,
		height: state.driver.user.height,
		age: state.driver.user.age,
		bio: state.driver.user.bio,
		city: state.driver.user.city,
		state: state.driver.user.state,
		phoneNo: state.driver.user.phoneNo,
	}
}))(SettingsForm);

export default connect(
  mapStateToProps,  
)(SettingsForm);

//export default SettingsForm;
