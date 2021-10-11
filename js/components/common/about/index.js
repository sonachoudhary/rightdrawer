import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Image, Platform, Dimensions, FlatList, TouchableNativeFeedback as TouchableNative, TouchableOpacity } from "react-native";
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

class About extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    fetchAbout: PropTypes.func,
    loadSpinner: PropTypes.bool,
    newslist: PropTypes.array,    
  };

  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      image: null,
      render: false,
      //trainerProfileId: this.props.trainerProfileId,
      jwtAccessToken: this.props.jwtAccessToken,
      user_id: this.props.user_id,
      modalVisible: false,
      customerName: '',
      modalDataStatus: '',
      message:'',
      notification_id: undefined 
    };
    
    //this.props.dispatch(getProfileData(this.state.trainerProfileId));    
  }

  setModalVisible(visible,item) {
     this.setState({
     	modalVisible: visible,
     	customerName: item.SenderData.lname+" "+item.SenderData.fname,
     	message: item.message,
     	notification_id: item._id
     });
  }

  async componentDidMount() {
    
    await this.props.fetchAbout(this.state.user_id);
  }

  async fetchAppointmentList() {
    await this.props.fetchAbout(this.state.user_id);
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
              About
            </Title>
          </Body>
          <Right/>            
        </Header>
        
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <View>
            <Text style={{ color: "#000", padding: 20, textAlign: 'justify', }} >
              {this.props.aboutus}
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
)(About);