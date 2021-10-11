import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import {
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo,
  AsyncStorage
} from "react-native";
import {
  View,
  Container,
  Content,
  Header,
  Text,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Item,
  Body,
  Input,
  Toast,
  Spinner,
  Thumbnail,
  Grid,
  Col
} from "native-base";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";

import Register from "../register/";
import SignIn from "../signIn/";
import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import ModalView from "../ModalView";
import { connectionState } from "../../../actions/network";

import PhoneForm from "./form-phone";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;

class Phone extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func
  };

  getUserInfo = async () => {
  //async function getUserInfo(){
    try {
      const nameData = await AsyncStorage.getItem('driverRegistration.name');
      const passData = await AsyncStorage.getItem('driverRegistration.pass');
      const nameItem = JSON.parse(nameData);
      const passItem = JSON.parse(passData);
      
      var output = {};
      output = this.jsonConcat(output, nameItem);
      output = this.jsonConcat(output, passItem);
      
      
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

  componentDidMount(){
    this.getUserInfo().then((data) => {
           
    }).catch((error) => {
       
    }); 
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return(
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.createpass()}>
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
              Sign In
            </Title>
          </Body>
          <Right />
        </Header>        

        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <Content style={{ backgroundColor: commonColor.brandSecondry }}>
            <PhoneForm isFetching={this.props.isFetching} />
          </Content>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeLogin: state.entrypage.active,
    appConfig: state.basicAppConfig.config
  };
}

function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Phone);
