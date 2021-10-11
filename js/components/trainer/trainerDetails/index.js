import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, Platform, Dimensions,TouchableOpacity,Image } from "react-native";
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

import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { getProfileData } from "../../../actions/common/checkUser";
import { setFevorite } from '../../../actions/common/favorite';

const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    phoneNo: state.driver.user.phoneNo,
    profileUpdating: state.driver.user.profileUpdating,
    emergencyDetails: state.driver.user.emergencyDetails,
    workAddress: state.driver.user.workAddress,
    homeAddress: state.driver.user.homeAddress,
    trainerProfileId: state.driver.user.trainerProfileId,
    tfname: state.driver.user.tfname,
    tlname: state.driver.user.tlname,
    tprofileUrl: state.driver.user.tprofileUrl,
    favorite: state.driver.user.favorite, 
    rating: state.driver.user.rating,    
  };
}
class TrainerDetails extends Component {

  static propTypes = {
    setFevorite: PropTypes.func,    
  };

  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      render: false,
      trainerProfileId: this.props.trainerProfileId,
      jwtAccessToken: this.props.jwtAccessToken,
      tfname: this.props.tfname,
      tlname: this.props.tlname,
      tprofileUrl: this.props.tprofileUrl,
      favorite: this.props.favorite,
      rating:this.props.rating,

    };    
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  makeFavorite() {
    if(this.state.favorite==true) {
      this.setState({ favorite: false })
      this.props.setFevorite(this.state.trainerProfileId, false);
    } else {
      this.setState({ favorite: true })
      this.props.setFevorite(this.state.trainerProfileId, true);
    }       
  }

  render() {
    let favoriteColor = "#333";
    if(this.state.favorite) {
      favoriteColor = '#FF0000';
    }

    return (
      <Container style={{ backgroundColor: "#fff" }}>
        

        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={styles.iosHeader}
          iosBarStyle="light-content"
        >
          <Left>
            <Button transparent>
              <Icon name="ios-menu" style={styles.logoutLogo} onPress={Actions.drawerOpen} />
            </Button>
          </Left>
          <Body>
            <Title style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>
              FitWorld
            </Title>
          </Body>
          <Right>
          <TouchableOpacity
            onPress={() => Actions.GroupBookingStep1()}
          >
            <Image source={require('../../../../assets/images/group_user_icon.png')} style={{width: 30, height: 24,marginTop:2}}/>
            </TouchableOpacity>
          </Right>
        </Header>
        
        <Tabs
          renderTabBar={() => <ScrollableTab style={{ backgroundColor: "white",borderWidth:0,borderColor:'#ffffff' }} />}
          tabBarUnderlineStyle = {{ backgroundColor: "red"}}
        >
          <Tab

            heading={ <TabHeading style={{backgroundColor:'#FFFFFF'}}><Text style={{color:'#999'}}>Bio</Text></TabHeading>}
          >
            <Tab1 />
          </Tab>
          
          <Tab 
            heading={ <TabHeading style={{backgroundColor:'#FFFFFF'}}><Text style={{color:'#999'}}>Reviews</Text></TabHeading>}
          >
            <Tab2 />
          </Tab>
          
          <Tab 
            disabled={ true }
            heading = { 
              <TabHeading style={{backgroundColor:'#FFFFFF'}}>
                <Icon name="heart" style={{ color: favoriteColor }} onPress={() => this.makeFavorite()} />
              </TabHeading>
            }
          >
            <Tab2 />
          </Tab>
            <Tab 
            heading={ <TabHeading style={{backgroundColor:'#FFFFFF',zIndex:-1}}><Text style={{color:'#FFFFFF'}}>Reviews</Text></TabHeading>}
          >
          </Tab>
            
          <Tab heading={ <TabHeading style={{backgroundColor:'#FFFFFF'}}><Icon style={{color:"#000"}} onPress={() => Actions.pop()}  name="arrow-down" /></TabHeading>}></Tab>

        </Tabs>
        

        
        
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setFevorite: (obj1, obj2) => dispatch(setFevorite(obj1, obj2)),
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(TrainerDetails);
