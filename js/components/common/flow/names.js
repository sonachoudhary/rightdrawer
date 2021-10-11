import React, { Component } from "react";
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from "react-redux";
//import RNGooglePlaces from "react-native-google-places";
import {
  AsyncStorage,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  PermissionsAndroid,
  NetInfo
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

import NameForm from "./nameform";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;

class Names extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func
  };

  openSearchModal() {
    
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
       
      })
  }

  async deleteSession(){
    try {
      await AsyncStorage.removeItem('driverRegistration');
      await AsyncStorage.removeItem('driverRegistration.name');
      await AsyncStorage.removeItem('driverRegistration.pass');
    } catch (error) {
      
    }
  } 

  componentDidMount(){
    this.deleteSession().then((data) => {
            
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
            <Button transparent onPress={() => Actions.services()}>
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
            <NameForm isFetching={this.props.isFetching} />
          </Content>

        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeLogin: state.entrypage.active,
    appConfig: state.basicAppConfig.config,
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
)(Names);
