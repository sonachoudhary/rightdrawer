import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground,TouchableOpacity, Image, CheckBox, FlatList } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Spinner,
  Body,
  Label,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { addBarberServices } from "../../../actions/common/booking";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import SearchableDropdown from 'react-native-searchable-dropdown';
import PropTypes from "prop-types";


let that = null;

function validatePrice(val) { 
    return /^(?=.*\d)[\d]{1,3}$/.test(val);
}

const validate = values => {
  const errors = {};
  if (!values.servicename) {
    errors.servicename = 'Service name is required';
  } else if (!values.serviceprice) {
    errors.serviceprice = 'Service price is required';
  } else if(!validatePrice(values.serviceprice)){
    errors.serviceprice = "Service price should be numbers only.";
  }
  return errors;
};

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    user_id: state.driver.user._id,
    barberList: state.booking.barberList   
  };
}

export const input = props => {
  const { meta, input } = props;
  return (
    <View>      
        <Input  value = {null} style={ [styles.input, (meta.touched && meta.error) ? {borderColor:"#B14C60"} : {borderColor:"#707E85"}] } {...input} {...props} />
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



class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      items : this.props.barberList,
      selectedBaberId: undefined,
      selectedBaberName: undefined,
      error: false 
    };
  }
  
  callBookingService(){    
    if(this.state.selectedBaberId){
      this.setState({ error: false })
      this.props.setBookingStep3(this.state.selectedBaberId, this.state.selectedBaberName);    
    } else {
      this.setState({ error: true })
    } 
  }

  selectedBarber(item) {
    this.setState({ selectedBaberId: item.id, selectedBaberName: item.name });
  }

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  
  submit(values) { 
    
    this.props.addBarberServices(values);
  } 

  render() {
    
    return (
      <Container>
        <Content style={{ backgroundColor: "#0D1214"}}>
                           
             <View style={{ flexDirection:'row', marginTop:20 }} >

                <View style={{  marginLeft:5 }} >
                  <Button transparent onPress={()=>Actions.BarberHome()}>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text onPress={()=>Actions.BarberHome()} style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>
                      
                </View>
              </View>
              <View style={{ flexDirection:'row', marginTop:40 }} >
                <View style={{  marginLeft:10 }} >
                  <Text style={{ color:"#E8E8E8", fontSize:28, marginLeft:10, fontWeight:'600' }}>
                    Create Service
                  </Text>     
                </View>
              </View>

              <Field component={textError} name="servicename"  />
              <Field component={textError} name="serviceprice"  />

              <View style={styles.fieldContainer} >
                <Text style={styles.fieldContainerText}>
                  Service Name
                </Text>

                <Field
                  component={input}
                  placeholder="Service Name"
                  name="servicename"
                  placeholderTextColor={commonColor.placeholderColor}
                  autoCapitalize="none" />
                  
                <Text style={styles.fieldContainerText}>
                  Service Price
                </Text>

                <Field
                  component={input}
                  placeholder="Service Price"
                  name="serviceprice"
                  placeholderTextColor={commonColor.placeholderColor}
                  autoCapitalize="none" />
                
              </View>

              <Button
                  block
                  onPress={this.props.handleSubmit(this.submit.bind(this))}
                  style={[styles.nameBtn,{backgroundColor:"#392F2A", marginTop:50, marginLeft:30, marginRight:30 }]} >
                  <Text style={{ fontWeight: "600", color: "#FFFFFF" }}>
                    Add Service
                  </Text>
              </Button>

        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    addBarberServices:(data) => dispatch(addBarberServices(data)),    
  };
}

CreateService = reduxForm({
  form: "CreateServiceForm", // a unique name for this form
  validate
})(CreateService);

CreateService = connect(mapStateToProps, bindActions)(CreateService);

export default CreateService;
