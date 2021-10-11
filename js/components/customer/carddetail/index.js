import React, { Component } from "react";
import { AsyncStorage, View, Platform, FlatList, TextInput } from "react-native";
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
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

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

class Carddetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
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
  submit(values) {
    
    //this.props.dispatch(signinAsync(values));
    this.addressFormAsync(values)
    //Actions.rates();
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
              Documents
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          
          <Text style={{ color: "#000",padding:45,fontSize:20,marginBottom:20 }}>
            In order to book an appoinment, you first must complete add your billing information.
          </Text>

          <Button
            block
            style={styles.experienceButton}
          >
            <Text style={{ alignSelf: "center" }}>
              Save
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

Carddetail = reduxForm({
  form: "cardForm", // a unique name for this form
  validate
})(Carddetail);

Carddetail = connect(mapStateToProps, null)(Carddetail);

export default Carddetail;