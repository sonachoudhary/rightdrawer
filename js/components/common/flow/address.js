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
import config from "../../../../config.js";

import RNPickerSelect from 'react-native-picker-select';

const validate = values => {
  const errors = {};
  // if (!values.state) {
  //   errors.state = 'State is Required';
  // }
  
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
   
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#FF0000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      country:233,
      state:'',
      zip:undefined,
      countrylist:[],
      statelist:[]
    };
  }

  UNSAFE_componentWillReceiveProps () {
    
    if(this.state.country==undefined && this.state.state==undefined && this.state.zip==undefined){
      this.getUserInfo();
    }
    
  }
  componentDidMount() {
      //this.countrylist();
      this.getstatelist(233);
  } 

    countrylist(){
      const userEmail = { email: 'test@gmail.com' };
      fetch(`${config.serverSideUrl}:${config.port}/api/users/countrylist`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail)
      })
        .then(response => response.json())
        .then(data => {
          this.setState({countrylist:data.data});
            //resolve(data)
         })
        .catch(error => {
         
        });
    }

    getstatelist(id){
        const userEmail = { country_id: id };
        
        fetch(`${config.serverSideUrl}:${config.port}/api/users/statelist`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail)
      })
        .then(response => response.json())
        .then(data => {
          this.setState({statelist:data.data});
            //resolve(data)
         })
        .catch(error => {
          
        });
    }
    getUserInfo =  async() => {
          const fulldata = await AsyncStorage.getItem('driverRegistration.address');
          const getdata = JSON.parse(fulldata);
          
        const country = getdata.country;
        const state = getdata.state;
        const zip = getdata.zip;

        if(country!=null && state!=null && zip!=null){
          this.props.initialize({ country: country,state: state,zip:zip}); 
        }else if(country!=null && state!=null){
          this.props.initialize({ country: country,state: state}); 
        }else if(country!=null && zip!=null){
          this.props.initialize({ country: country,zip: zip}); 
        }else if(zip!=null && state!=null){
          this.props.initialize({ zip: zip,state: state}); 
        }else if(zip!=null){
          this.props.initialize({ zip: zip}); 
        }else if(country!=null){
          this.props.initialize({ country: country}); 
        }else if(state!=null){
          this.props.initialize({ state: state}); 
        }
    }


  navigate(key, name) {
    Actions.uploadFiles({ keys: key, Filename: name });
  }

  addressFormAsync = async (values) => {
      
      try {
        await AsyncStorage.setItem('driverRegistration.address', JSON.stringify(values));
      } catch (error) {
        
      }
      Actions.rates()
    };

  static propTypes = { 
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  submit() {
   if (this.state.country=="") {
         alert('Country is required');
    }else if (this.state.state=="") {
         alert('State is required');
    }else {
        var values = { "country":this.state.country, "state":this.state.state, "zip":this.state.zip}
        
        this.addressFormAsync(values)
    }
    //Actions.rates();
  }
  onPickerValueChange=(value, index)=>{
    this.setState( {"country": value });
    
    this.getstatelist(parseInt(value));
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
            <Button transparent onPress={() => Actions.experience()}>
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
          
          <Text style={styles.topheading}>Where are you located?</Text>
          
          <View style={styles.addressContainer}>
            <View style={{flex:1, flexDirection:"row", height:40}}>  
              <Text style={[styles.rowItemLeft1,{marginTop:5}]}>Country</Text>
                
              <View style={{marginTop:10}}>
                <Text style={{marginTop:5,color: '#FF0000',fontSize:16,marginLeft:10}}>United States</Text>
               
                  </View>
              
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View style={{flex:1, flexDirection:"row", height:40}}>  
              <Text style={[styles.rowItemLeft1,{marginTop:5}]}>State</Text>
                <View style={{marginTop:10}}>
                <RNPickerSelect
                      placeholder={{label: 'Select State',value: null,color: '#FF0000'}}
                       style={pickerSelectStyles}
                      onValueChange={ (value) => ( this.setState({state:value}) ) }
                      selectedValue={this.state.state}
                      items={[...this.state.statelist]}
                  />
                </View>
              
            </View>
          </View>

          <View style={[styles.addressContainer,{ borderBottomColor:"#ddd",
    borderBottomWidth:1,paddingBottom:10}]}>
            <View style={{flex:1, flexDirection:"row"}}>  
              <Text style={[styles.rowItemLeft1,{paddingTop:5}]}>Zip code</Text>
              <Field 
                style={[styles.rowItemRight1,{ paddingLeft: 15,color:'#FF0000'}]}
                component={input}
                placeholder="Zip code"
                name="zip"
                placeholderTextColor="#FF0000" 
                onChangeText={ value => this.setState({ zip: value })}
                />
            </View>
          </View>

          <Button
            block
            style={styles.experienceButton}
            onPress={this.props.handleSubmit(this.submit.bind(this))}
          >
            <Text style={{ alignSelf: "center", fontSize:20,color:'#FFFFFF' }}>
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

Address = reduxForm({
  form: "addressForm", // a unique name for this form
  validate
})(Address);

Address = connect(mapStateToProps, null)(Address);

export default Address;