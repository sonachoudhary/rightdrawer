import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Image, Linking, Platform, Dimensions, FlatList, TouchableNativeFeedback as TouchableNative, TouchableOpacity } from "react-native";
import {
  Tab,
  Tabs, 
  ScrollableTab,
  TabHeading,
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
  Text,
  Item,
  Title,
  Left,
  Right,
  Label,
  Body,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { fetchAbout } from "../../../actions/common/all";
import Modal from "react-native-modal";

const {OS} = Platform;

export const TouchableNativeFeedback = (OS === 'ios') ? TouchableOpacity : TouchableNative;

const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    loadSpinner: state.driver.history.loadSpinner,
    user_id: state.driver.user._id,
    aboutus: state.all.aboutus
  };
}

class Contact extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchAbout: PropTypes.func,
    loadSpinner: PropTypes.bool,
    newslist: PropTypes.array,    
  };

  constructor(props) {
    super(props);  
  }  
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
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
        
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <View>          
            <Text style={ styles.contact }>
              For questions, concerns, and comments please reach out to us at 
              <Text style={ styles.email } onPress={() => Linking.openURL('mailto:support@example.com') }>
                {" - "}info@myfitworldapp.com
              </Text>
            </Text>             
          </View>                  
        </Content>        
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    fetchAbout: user_id => dispatch(fetchAbout(user_id)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Contact);