import React, { Component } from "react";
import { Dimensions, AsyncStorage, View, Platform, FlatList, TouchableOpacity, TextInput,Image } from "react-native";
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
  Item,
  Input,
  Container,
  Header,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Title,
  Left,
  Picker,
  Right,
  Body,
  Radio, 
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import DatePicker from 'react-native-datepicker'; //https://www.npmjs.com/package/react-native-datepicker
import { appointmentRequest, setIndividalAppointmentData } from "../../../actions/common/booking";
import moment from "moment";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const validate = values => {
  const errors = {};
  if (!values.state) {
    errors.state = 'State is Required';
  }
  if (!values.city) {
    errors.city = 'City is Required';
  }
  if (!values.zip) {
    errors.zip = 'Zip is Required';
  }
  
  return errors;
};

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Input {...input} {...props} />
      {meta.touched && meta.error && <Text style={{ color: 'red', textAlign:"right", paddingRight:10 }}>{meta.error}</Text>}
    </View>
  );
};
input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes()

if(dd<10) { dd='0'+dd; } 
if(mm<10) { mm='0'+mm; } 
//today = mm + '-' + dd + '-' + yyyy + '-' + time ;
//today = "2016-05-15";

today = moment(
  today,
  "MMM Do YY h:mm A"
);

var endDate = new Date();
endDate.setMonth(endDate.getMonth() + 6);
var edd = endDate.getDate();
var emm = endDate.getMonth()+1; 
var eyyyy = endDate.getFullYear();
if(edd<10) { edd='0'+edd; } 
if(emm<10) { emm='0'+emm; } 
endday = edd+'-'+emm+'-'+eyyyy;


function mapStateToProps(state) {
  return {
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating,
    trainerProfileId: state.driver.user.trainerProfileId,
    tfname: state.driver.user.tfname,
    tlname: state.driver.user.tlname,
    cfname: state.driver.user.fname,
    clname: state.driver.user.lname,
    user_id: state.driver.user._id,
  };
}

class OfferService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time:today,
      choosenIndex: "0", 
      offerPrice: "1",  
      choosenIndexExercise: "cardio",
      itemSelected: 'current',  
      trainerProfileId: this.props.trainerProfileId,
      tfname: this.props.tfname,
      tlname: this.props.tlname,
      customer_id: this.props.user_id,
      cfname: this.props.cfname,
      clname: this.props.clname
    };
    
  }

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  
  submit(values) {
    var data = {
      offeredRate: this.state.offerPrice,
      appointmentLength: this.state.choosenIndex,
      reqService: this.state.choosenIndexExercise,      
    }
    //this.props.dispatch(appointmentRequest(this.state));    
    this.props.dispatch(setIndividalAppointmentData(data));    
  }

  validateAge(val) { 
    return /^[0-9\b]+$/.test(val);
  }


  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          iosBarStyle="light-content"
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
        <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{
                  fontSize: 24,
                  marginLeft: 5,
                  color: commonColor.brandButton
                }}
              />
              <Text style={{ color: "#000", marginTop:3 }}>{" "}Back</Text>
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
              Fitworld
            </Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => Actions.pop()}>
                <Text style={{right:15,color: "#000"}}>Cancel</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "#FFFFFF", borderTopColor:'#dddddd', borderTopWidth:1 }}>
          
          <View style={{ backgroundColor: "#FFFFFF", margin:20 }}>

          <View style={{ alignSelf:'center', textAlign:'center',width: deviceWidth - 120, borderBottomWidth:1,borderColor: '#999' }}>
              <Text style={{ color: "#000", paddingTop:20, paddingBottom:10, fontSize:20, alignSelf:'center', textAlign:'center',width: deviceWidth - 120}}>
                Requested Service
              </Text>
            <View style={{ alignSelf:'center', textAlign:'center',width: deviceWidth - 120 }}>

              <Picker 
                style={styles.pickerStyle}  
                mode={'dialog'}
                selectedValue={this.state.choosenIndexExercise}  
                onValueChange={(itemValue, itemPosition) =>  
                  this.setState({choosenIndexExercise: itemValue })}  
              >  
                <Picker.Item label="Cardio" value="cardio" />
                <Picker.Item label="Gym" value="gym" />  
                <Picker.Item label="Weight Lifting" value="weightlift" />  
              </Picker> 
            </View> 
          </View>
          <View style={{ alignSelf:'center', marginTop:20,textAlign:'center',width: deviceWidth - 120, borderBottomWidth:1,borderColor: '#999' }}>
              <Text style={{ color: "#000", paddingTop:20, paddingBottom:10, fontSize:20, alignSelf:'center', textAlign:'center',width: deviceWidth - 120}}>
                Appointment length
              </Text>
              <View style={{ alignSelf:'center', textAlign:'center',width: deviceWidth - 120 }}>
                  <Picker 
                    style={styles.pickerStyle1}  
                    mode={'dialog'}
                    selectedValue={this.state.choosenIndex}  
                    onValueChange={(itemValue, itemPosition) =>  
                      this.setState({choosenIndex: itemValue })}  
                  >  
                    <Picker.Item label="1/2 Hour" value="0" />  
                    <Picker.Item label="1 Hour" value="1" />  
                    <Picker.Item label="2 Hour" value="2" />  
                    <Picker.Item label="3 Hour" value="3" />  
                    <Picker.Item label="4 Hour" value="4" />  
                    <Picker.Item label="5 Hour" value="5" />  
                    <Picker.Item label="6 Hour" value="6" />  
                    <Picker.Item label="7 Hour" value="7" />  
                    <Picker.Item label="8 Hour" value="8" />  
                    <Picker.Item label="9 Hour" value="9" />  
                    <Picker.Item label="10 Hour" value="10" />  
                  </Picker>
              </View>  
          </View>
          <Text style={{ color: "#000", marginTop:20, padding:20, fontSize:20, alignSelf:'center', textAlign:'center' }}>
            Offered Rate(Per Person)
          </Text>

          <Input
             value={this.state.offerPrice}
             onChangeText={ value => this.setState({ offerPrice: value.replace(/[^0-9]/g, '') })}
            style={{
              fontWeight: "400",
              color: "#000",
              alignSelf:"center", 
              textAlign:'center',
              borderBottomWidth:1,
              borderColor: '#999',
              width: deviceWidth - 120

            }}            
          />

          <Button
            block
            style={styles.completeBtn}
            onPress={this.props.handleSubmit(this.submit.bind(this))}
          >
           <View style={{flexDirection:'row'}}>
              <Text style={{ alignSelf: "center", color: "#FFF" }}>
                CONTINUE           
              </Text>
              <Image source={require('../../../../assets/images/arrow-white.png')} style={{width: 16, height: 14,marginTop:2,marginLeft:20}}/>
           </View>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

OfferService = reduxForm({
  form: "bookForm", // a unique name for this form
  validate
})(OfferService);

OfferService = connect(mapStateToProps, null)(OfferService);

export default OfferService;