import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { View, ScrollView,Image, Platform, Dimensions, FlatList, TouchableNativeFeedback as TouchableNative, TouchableOpacity } from "react-native";
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
              Privacy Policy
            </Title>
          </Body>
          <Right/>            
        </Header>
        
        <Content style={{ backgroundColor: "#FFFFFF" }}>

          <ScrollView>
            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
               Introduction
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
               MyFitworldApp respects your privacy and values our clients trust. We are committed to ensuring that the privacy of the information stored by our systems is suitably protected and used appropriately. This Privacy Policy outlines how MyFitworldApp will treat information gathered by our app or hosted within our applications.
            </Text>

            <Text style={{ color: "#000", padding: 20,fontWeight:'600',fontSize:24, textAlign: 'justify', }} >
               Mode and place of processing the Data
            </Text>
            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
               Methods of processing
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
               The Data Controller processes the Data of Users in a proper manner and shall take appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data. The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Data Controller, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of the site (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Data Controller at any time.
            </Text>

            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
               Place
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
              The Data is processed at the Data Controller's operating offices and in any other places where the parties involved with the processing are located. For further information, please contact the Data Controller.
              </Text>

            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
               Retention time
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
             The Data is kept for the time necessary to provide the service requested by the User, or stated by the purposes outlined in this document, and the User can always request that the Data Controller suspend or remove the data.
            </Text>

            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
               The use of the collected Data
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
             The Data concerning the User is collected to allow the Owner to provide its services, as well as for the following purposes: Location-based interactions, Device permissions for Personal Data access and Registration and authentication. The Personal Data used for each purpose is outlined in the specific sections of this document.

            </Text>


            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
              Device permissions for Personal Data access
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
            Depending on the User's specific device, this Application may request certain permissions that allow it to access the User's device Data as described below. By default, these permissions must be granted by the User before the respective information can be accessed. Once the permission has been given, it can be revoked by the User at any time. In order to revoke these permissions, Users may refer to the device settings or contact the Owner for support at the contact details provided in the present document. The exact procedure for controlling app permissions may be dependent on the User's device and software. Please note that the revoking of such permissions might impact the proper functioning of this Application. If User grants any of the permissions listed below, the respective Personal Data may be processed (i.e accessed to, modified or removed) by this Application.
            </Text>


            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
               Approximate location permission (non-continuous)
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
              Used for accessing the User's approximate device location. This Application may collect, use, and share User location Data in order to provide location-based services. The geographic location of the User is determined in a manner that isn't continuous. This means that it is impossible for this Application to derive the approximate position of the User on a continuous basis.

            </Text>



            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
               Camera permission
            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
             Used for accessing the camera or capturing images and video from the device.

            </Text>


            <Text style={{ color: "#000", paddingTop: 20, paddingLeft:20,paddingRight:20,fontWeight:'600',fontSize:20, textAlign: 'justify', }} >
              Phone permission

            </Text>
            <Text style={{ color: "#000", padding: 20, fontSize:16, textAlign: 'justify', }} >
            Used for accessing a host of typical features associated with telephony. This enables, for instance, read-only access to the phone state's, which means it enables access to the phone number of the device, current mobile network information, or the status of any ongoing calls.


            </Text>

            <Text style={{ color: "#000", padding: 20,marginTop:20, fontSize:18, textAlign: 'justify', }} >Latest update: May 19, 2020</Text>

          </ScrollView>                    
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