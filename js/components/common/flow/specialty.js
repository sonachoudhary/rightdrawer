import React, { Component } from "react";
import { AsyncStorage, View, Platform, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
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
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { registerAsync } from "../../../actions/common/register";
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};
  if (!values.state) {
    errors.state = 'State is required';
  }
  if (!values.city) {
    errors.city = 'City is required';
  }
  if (!values.zip) {
    errors.zip = 'Zip is required';
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

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };

  return {
    appConfig: state.basicAppConfig.config,
    activeLogin: state.entrypage.active,
    latitude: state.driver.user.gpsLoc[1],
    longitude: state.driver.user.gpsLoc[0],
  };
}

class Specialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      selectedSpecialty: [],
      customer: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      documentTypes: [
        {
          name: "Biomechanics and Functional",
          key: "Biomechanics and Functional",
          show: false
        },
        {
          name: "Strength and Conditioning",
          key: "Strength and Conditioning",
          show: false
        },
        {
          name: "Boxing/Martial Arts",
          key: "Boxing/Martial Arts",
          show: false
        },
        {
          name: "Rehabilitation/Physical Therapy",
          key: "Rehabilitation/Physical Therapy",
          show: false
        },
        {
          name: "Competition Prep",
          key: "Competition Prep",
          show: false
        },
        {
          name: "Body Building",
          key: "Body Building",
          show: false
        },
        {
          name: "Power Lifting",
          key: "Power Lifting",
          show: false
        },
        {
          name: "Crossfit",
          key: "Crossfit",
          show: false
        },
        {
          name: "HITT",
          key: "HITT",
          show: false
        },
        {
          name: "Bootcamp",
          key: "Bootcamp",
          show: false
        },
        {
          name: "Athletic Performance",
          key: "Athletic Performance",
          show: false
        },
        {
          name: "Senior Fitness",
          key: "Senior Fitness",
          show: false
        },
        {
          name: "Youth Fitness",
          key: "Youth Fitness",
          show: false
        },
        {
          name: "Yoga/Pilates",
          key: "Yoga/Pilates",
          show: false
        },
        {
          name: "Nutrition/Behavior Specialist",
          key: "Nutrition/Behavior Specialist",
          show: false
        },
        {
          name: "Dance/Zumba",
          key: "Dance/Zumba",
          show: false
        },
        {
          name: "Weight Loss",
          key: "Weight Loss",
          show: false
        }
      ]
    };
    
  }

  getUserInfo = async () => {
  //async function getUserInfo(){
    try {
      const nameData = await AsyncStorage.getItem('driverRegistration.name');
      const passData = await AsyncStorage.getItem('driverRegistration.pass');
      const phoneData = await AsyncStorage.getItem('driverRegistration.phone');

      const addressData = await AsyncStorage.getItem('driverRegistration.address');
      const ratesData = await AsyncStorage.getItem('driverRegistration.rates');
      const expData = await AsyncStorage.getItem('driverRegistration.exp');
      const cprData = await AsyncStorage.getItem('driverRegistration.cpr');
      const insuranceData = await AsyncStorage.getItem('driverRegistration.insurance');
      const licenseData = await AsyncStorage.getItem('driverRegistration.license');
      const backgroundData = await AsyncStorage.getItem('driverRegistration.background');
      const certData = await AsyncStorage.getItem('driverRegistration.cert');
      const speacialityData = await AsyncStorage.getItem('driverRegistration.speaciality');
      

      const nameItem = JSON.parse(nameData);
      const passItem = JSON.parse(passData);
      const phoneItem = JSON.parse(phoneData);
      const addressItem = JSON.parse(addressData);
      const ratesItem = JSON.parse(ratesData);
      const expItem = JSON.parse(expData);
      const cprItem = JSON.parse(cprData);
      const insuranceItem = JSON.parse(insuranceData);
      const licenseItem = JSON.parse(licenseData);
      const backgroundItem = JSON.parse(backgroundData);
      const certItem = JSON.parse(certData);
      const speacialtyItem = JSON.parse(speacialityData);
      
      var output = {};
      output = this.jsonConcat(output, nameItem);
      output = this.jsonConcat(output, passItem);
      output = this.jsonConcat(output, phoneItem);
      output = this.jsonConcat(output, addressItem);
      output = this.jsonConcat(output, ratesItem);
      output = this.jsonConcat(output, expItem);
      output = this.jsonConcat(output, cprItem);
      output = this.jsonConcat(output, insuranceItem);
      output = this.jsonConcat(output, licenseItem);
      output = this.jsonConcat(output, backgroundItem);
      output = this.jsonConcat(output, certItem);
      output = this.jsonConcat(output, speacialtyItem);   
      output = this.jsonConcat(output, this.state.customer); 
      
      await AsyncStorage.removeItem('driverRegistration');
      return output;
    } catch (error) {
      
    }
  }

  jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
  }

  renderArrow() {
    return (
      <Icon
        name="ios-arrow-forward"
        style={{
          ...styles.textColor,
          color: "#aaa",
          fontWeight: "bold",
          fontSize: 22
        }}
      />
    );
  }
  renderCheck() {
    return (
      <Icon
        name="checkmark"
        style={styles.checkmarkcls}
      />
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
      if (this.state.documentTypes[i].key === value && this.state.documentTypes[i].show == false) {
        this.state.documentTypes[i].show = true
        this.forceUpdate()
        this.setState({
         // selectedSpecialty: this.state.documentTypes[i].key
          selectedSpecialty: [...this.state.selectedSpecialty, this.state.documentTypes[i].key]

        })
      } else if (this.state.documentTypes[i].key === value && this.state.documentTypes[i].show == true) {
        this.state.documentTypes[i].show = false
        this.forceUpdate();
        const index = this.state.selectedSpecialty.indexOf(this.state.documentTypes[i].key);
        if (index > -1) {
            this.state.selectedSpecialty.splice(index, 1);
        }
        this.setState({
          selectedSpecialty: this.state.selectedSpecialty
        })
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
           <View style={styles.rightText}>{this.renderIcon(item.show)}</View>

          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.name}</Text>
          </View>
         
        </View>
      </ListItem>
    );
  };

  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    forgotMail: PropTypes.func,
    isFetching: PropTypes.bool,
  };
  
  submit() {
    this.getUserInfo().then((data) => {
             
        this.props.dispatch(registerAsync(data,'trainer'));    
    }).catch((error) => {
       
    });     
  }

  specialtyFormAsync = async (values) => {
   
    try {
      await AsyncStorage.setItem('driverRegistration.speaciality', JSON.stringify(values));
    } catch (error) {
      
    }
    this.submit()
  };

  backgroundSubmit() {

    if(this.state.selectedSpecialty.length<1){
        alert('Please select Specialty');
    }else {
        var values = { "speaciality":this.state.selectedSpecialty}
        this.specialtyFormAsync(values);
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
            <Button transparent onPress={() => Actions.certification()}>
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
          
          <Text style={styles.topheading}>What is your specialty?</Text>
          <Text style={{ color: "#000",paddingLeft:30,paddingTop:0,fontSize:15,marginBottom:30 }}>(Choose all that apply)</Text>
          
          <FlatList
            data={this.state.documentTypes}
            renderItem={this.renderRow}
            style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}/>

          <Button
            block
            style={styles.completeBtn}
            onPress={() => this.backgroundSubmit()}
            
          >
            <Text style={{ alignSelf: "center", fontSize:18,color:'#FFFFFF' }}>
              COMPLETE SIGN UP
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

Specialty = reduxForm({
  form: "specialtyForm", // a unique name for this form
  validate
})(Specialty);

Specialty = connect(mapStateToProps, null)(Specialty);

export default Specialty;
