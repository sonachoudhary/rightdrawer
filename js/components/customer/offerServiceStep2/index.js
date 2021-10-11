import React, { Component } from "react";
import { Dimensions, AsyncStorage, View, Platform, FlatList, TextInput,Image,TouchableOpacity } from "react-native";
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

import { appointmentRequest, indvidualaAppointmentRequest } from "../../../actions/common/booking";
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
today = yyyy + '-' + mm + '-' + dd + ' ' + time ;
//today = "2016-05-15";

//today = moment(
  //today,
  //"MMM Do YY h:mm A"
//);

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
    user_id: state.driver.user._id,
    individualAppointment: state.trainer.appointment.individualAppointment
  };
}

class OfferServiceStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidebtn:false,
      time: moment(today).format('lll'),
      numberofpeople: "1",  
      customer_id: this.props.user_id,
      individualAppointment: this.props.individualAppointment
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  submit(values) {
    
    this.setState({hidebtn:true});
    this.props.dispatch(indvidualaAppointmentRequest(this.state));    
  }
  render() {
    
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          iosBarStyle="dark-content"
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.offerService()}>
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

            <Text style={{ color: "#000", paddingTop:20, paddingBottom:20, fontSize:20, alignSelf:'center', textAlign:'center',width: deviceWidth - 120 }}>
              Choose appointment time
            </Text>
            <View style={{ alignSelf:'center', textAlign:'center',width: deviceWidth - 120 }}>
              <DatePicker
                  style = {{ width: deviceWidth -120, textAlign:'center',marginBottom:10}}
                  date={this.state.time}
                  format="lll"
                  mode="datetime"
                  placeholder="Start"
                  showIcon={false}
                  minDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      textAlign: 'center',
                      alignSelf: 'center',
                      borderWidth: 0,
                    },
                    dateText:{
                      color: "#000000",
                      fontSize: 18,
                      alignSelf:'center', 
                      textAlign:'center',                
                    }
                  }}
                  onDateChange={time => {
                    this.setState({ time: time });
                  }} />
              </View>
          </View>
           <View style={{ alignSelf:'center', marginTop:10,textAlign:'center',width: deviceWidth - 120, borderBottomWidth:1,borderColor: '#999' }}>
                 <Text style={{ color: "#000", paddingTop:20, fontSize:20, alignSelf:'center', textAlign:'center',width: deviceWidth - 120 }}>
                  Number of People
                </Text>

                <Input
                   value={this.state.numberofpeople}
                   onChangeText={ value => this.setState({ numberofpeople: value.replace(/[^0-9]/g, '') })}
                  style={{
                    fontWeight: "400",
                    color: "#000000",
                    alignSelf:"center",
                    textAlign:'center',
                    width: deviceWidth - 120
                  }}            
                />
          </View>
          <View style={{ alignSelf:'center', textAlign:'center',width: deviceWidth - 120}}>
              <Text style={{ color: "#000",marginTop:20,  paddingTop:20, paddingBottom:20, fontSize:20, alignSelf:'center', textAlign:'center' }}>
                Choose location
              </Text>
               <View style={{ alignSelf:'center', textAlign:'center',width: deviceWidth - 120}}>
                  <ListItem style={{ width:180,flexDirection: "row",  alignSelf:'center', textAlign:'center' }} onPress={() => this.setState({ itemSelected: 'homesaved' })}>
                    <Radio style={{ marginRight: 20, width: 20 }} selected={this.state.itemSelected == 'homesaved'} />
                    <Text style={{ color: "#000000" }}>
                      Home(Saved)
                    </Text>
                  </ListItem>
                  <ListItem style={{ width:180,flexDirection: "row",  alignSelf:'center', textAlign:'center'  }} onPress={() => this.setState({ itemSelected: 'current' })}>
                    <Radio style={{ marginRight: 20, width: 20 }} selected={this.state.itemSelected == 'current' } />
                    <Text style={{ color: "#000000" }}>
                      Current Location
                    </Text>
                  </ListItem>

                  <ListItem style={{ width:180,flexDirection: "row",   alignSelf:'center', textAlign:'center' }} onPress={() => this.setState({ itemSelected: 'other' })}>
                    <Radio style={{ marginRight: 20, width: 20 }} selected={this.state.itemSelected == 'other' } />
                    <Text style={{ color: "#000000" }}>
                      Other
                    </Text>
                  </ListItem>
              </View>
           </View>
          <Button
            block
            disabled={this.state.hidebtn}
            style={styles.completeBtn}
            onPress={this.props.handleSubmit(this.submit.bind(this))}
          >
           <View style={{flexDirection:'row'}}>
              <Text style={{ alignSelf: "center", color: "#FFF" }}>
                CONFIRM REQUEST           
              </Text>
              
           </View>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

OfferServiceStep2 = reduxForm({
  form: "bookForm", // a unique name for this form
  validate
})(OfferServiceStep2);

OfferServiceStep2 = connect(mapStateToProps, null)(OfferServiceStep2);

export default OfferServiceStep2;