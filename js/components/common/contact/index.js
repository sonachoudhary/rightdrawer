import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Text,Platform, TouchableOpacity, Alert, Image, TextInput } from "react-native";
import PropTypes from "prop-types";
import { Input, Button, Item, View, Form,Container,
  Header,
  Content,
  Icon,
  Title,
  Left,
  Right,
  Body } from "native-base";

import { Actions } from "react-native-router-flux";
import { sendEmailtoadmin } from "../../../actions/driver/settings";
import commonColor from "../../../../native-base-theme/variables/commonColor";


import styles from "./styles";

function mapStateToProps(state) {
  return {
     user_id: state.driver.user._id,
  };
}

function validatenumber(val) { 
    return /^[0-9\b]+$/.test(val);
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  }
  if (!values.description) {
    errors.description = "Message is required";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View style={{ flex: 1, width: null }}>
      <Item>
        <Input
          {...input}
          {...props}
        // style={{ fontWeight: "bold", marginLeft: 2, borderBottomWidth: 1 }}
        />
      </Item>
      {meta.touched &&
        meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
    </View>
  );
};

input.propTypes = {
  input: PropTypes.object
};

class Contact extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func
  };
  
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.user_id,
      textInputHolder: 0,
      captchaHolder: 0,
      randomNumberOne: 0,
    };
    
    //this.props.dispatch(getProfileData(this.state.trainerProfileId));    
  }


  submit(values) {
    const bankDetails = {
      name: values.name,
      email: values.email,
      description: values.description,
      id:this.state.user_id,
    };
    const userDetails = { ...this.props.user, bankDetails };
    
    var temp = this.state.randomNumberOne;

    if (this.state.textInputHolder ==""){
        Alert.alert("Captcha is required");
    } else if (this.state.textInputHolder == temp) {
        
        this.generateCaptcha();
        this.props.dispatch(sendEmailtoadmin(userDetails));
        this.props.initialize({ name: '',email: '',description:''}); 
        Actions.pop();
    }else {
        Alert.alert("Captcha not matched");
    }
    
  }

  componentDidMount() {
    this.generateCaptcha();
  }

  generateCaptcha = () => {
    var numberOne = Math.floor(Math.random() * 1000000) + 1;   
    var captchaCode = numberOne ;
    this.setState({ randomNumberOne: numberOne });
    this.setState({ captchaHolder: captchaCode });
  }

  validateCaptchaCode = () => {
    var temp = this.state.randomNumberOne ;
    if (this.state.textInputHolder == temp) {
      //Captcha match
      //Alert.alert("Captcha Matched");
    }
    else {
      //Captcha not match
      Alert.alert("Captcha NOT Matched");
    }
    // Calling captcha function, to generate captcha code
    this.generateCaptcha();
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#fff" }}
              />
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
              Contact Us
            </Title>
          </Body>
          <Right/>            
        </Header>
        <Content>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "space-around",
          margin:10
        }}
      >
        <Text style={{marginLeft:20,marginTop:20, marginBottom:10,color:'#000000', fontSize:18,fontWeight:'500'}}>Want to get in touch? We'd love to hear from you!</Text>
        <Form>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              placeholder="Your Name"
              placeholderTextColor={'#828282'}
              name="name"
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="email"
              placeholder="Email"
              placeholderTextColor={'#828282'}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="description"
              placeholder="Message"
              placeholderTextColor={'#828282'}
            />
          </View>

          <View style={styles.captchaContainerView}>

          <View style={ styles.captchaChildContainer}>
            <Image
              style={{ width: 180, height: 60, resizeMode: 'contain' }}
              source={{ uri: 'https://dummyimage.com/150x40/0091ea/fafafa.png&text=' + this.state.randomNumberOne }}
            />
            
          </View>


          <View  style={ styles.captchaChildContainer}>
            <TextInput
              placeholder="Enter Captcha"
              onChangeText={data => this.setState({ textInputHolder: data })}
              style={styles.textInputStyle}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>

        </Form>
        <View
          style={{  flex: 1, flexDirection: "row", justifyContent: "space-between",  marginBottom: 15 }} >
         
          <Button
            style={{ flex: 1,  padding: 10, height: 50, bottom: 0, marginHorizontal: 5, marginTop: 50, alignItems: "center", justifyContent: "center"  }}
            onPress={this.props.handleSubmit(this.submit.bind(this))}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              {" "}
              Send{" "}
            </Text>
          </Button>
        </View>
      </View>

      </Content>
      </Container>
    );
  }
}

Contact = reduxForm({
  form: "Contact", // a unique name for this form
  validate
})(Contact);

export default connect(
  mapStateToProps,
)(Contact);

