import React, { Component } from "react";
import { AsyncStorage, View, Platform, FlatList, TextInput,StyleSheet } from "react-native";
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
  Right,
  Body,
  Picker
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import RNPickerSelect from 'react-native-picker-select';

var numberarr = [];
numberarr.push({'label':'$1 Hr','value':1,color: '#FF0000'});
for(let i=10;i<501;i=i+5){
  numberarr.push({'label':'$'+i.toString()+' Hr','value':i.toString(),color: '#FF0000'});
}

function validatenumber(val) { 
    return /^[0-9\b]+$/.test(val);
}

const validate = values => {
  /*const errors = {}; 
  if (!values.individual) {
    errors.individual = 'Required';
  }else if(!validatenumber(values.individual)){
    errors.individual = 'Only numeric allowed';
  }else if(values.individual.length>3){
    errors.individual = 'Max rate limit is 3 digit only';
  }else if(!validatenumber(values.group2)){
    errors.group2 = 'Only numeric allowed';
  }else if(values.group2.length>3){
    errors.group2 = 'Max rate limit is 3 digit only';
  }
  return errors;*/
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
   
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Input {...input} {...props} />
      {meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
    </View>
  );
};
input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};

class Rates extends Component {
  navigate(key, name) {
    Actions.uploadFiles({ keys: key, Filename: name });
  }
constructor(props) {
    super(props);
    this.state = {
      individual: undefined,
      group2:undefined,
      choosenIndexAge:'',
      choosenIndexAge1:'',
      numbers:numberarr,
    };
  }

UNSAFE_componentWillReceiveProps () {
    
    if(this.state.individual==undefined && this.state.group2==undefined){
      this.getUserInfo();
    }
  }
    
    getUserInfo =  async() => {
          const fulldata = await AsyncStorage.getItem('driverRegistration.rates');
          const getdata = JSON.parse(fulldata);
          if(getdata!=null){
            const individual = getdata.individual;
            const group2 = getdata.group2;
          }

          if(individual!=null && group2!=null){
            this.props.initialize({ individual: individual,group2: group2}); 
          }else if(individual!=null){
            this.props.initialize({ individual: individual}); 
          }
    }

  ratesFormAsync = async (values) => {
   
    try {
      await AsyncStorage.setItem('driverRegistration.rates', JSON.stringify(values));
    } catch (error) {
     
    }
    Actions.cpr()
  };

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
  };

  submit() {
    if(this.state.choosenIndexAge!=""){
        var values = { "individual":this.state.choosenIndexAge, "group2":this.state.choosenIndexAge1}
        this.ratesFormAsync(values)
    }else {
        alert('Individual rates is required');
    }
    
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
            <Button transparent onPress={() => Actions.address()}>
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
              Documents
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          
          <Text style={styles.topheading}>What are your rates?</Text>
          
          <View style={styles.addressContainer}>
            <View style={{flex:1, flexDirection:"row", height:60}}>  
              <Text style={styles.rowItemLeft}>Individual</Text>
              <RNPickerSelect
                placeholder={{label:'Choose rates',value: null,color:'#FF0000'}}
                onValueChange={ (value) => ( this.setState({choosenIndexAge: value}) ) }
                value={this.state.choosenIndexAge}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
                items={[...this.state.numbers]}
              />
             
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View style={{flex:1, flexDirection:"row", height:60}}>  
              <Text style={styles.rowItemLeft}>Group (2 or more)</Text>
              <RNPickerSelect
                placeholder={{label:'Choose rates',value: null,color:'#FF0000'}}
                onValueChange={ (value) => ( this.setState({choosenIndexAge1: value}) ) }
                value={this.state.choosenIndexAge1}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
                items={[...this.state.numbers]}
              />
              
            </View>
          </View> 

          <Button
            block
            style={styles.experienceButton}
            onPress={this.props.handleSubmit(this.submit.bind(this))}
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
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}

Rates = reduxForm({
  form: "ratesForm", // a unique name for this form
  validate
})(Rates);

Rates = connect(mapStateToProps, null)(Rates);

export default Rates;