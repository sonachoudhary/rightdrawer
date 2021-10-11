import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, ImageBackground, TouchableOpacity, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  ListItem,
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

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const { width } = Dimensions.get("window");
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { openChatWindow } from "../../../actions/common/chat";
import { Rating, AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';

const STAR_IMAGEfill = require("../../../../assets/images/fillstaricon.png");
const STAR_IMAGEhalf = require("../../../../assets/images/halffillicon.png");
const STAR_IMAGEblank = require("../../../../assets/images/blankstaricon.png");



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
    tfname: state.driver.user.tfname,
    tlname: state.driver.user.tlname,
    tprofileUrl: state.driver.user.tprofileUrl,
    tExperience: state.driver.user.tExperience,
    tAddress: state.driver.user.tAddress,
    tHoursRate: state.driver.user.tHoursRate,
    tSpeaciality: state.driver.user.tSpeaciality,
    userCardId: state.driver.user.userCardId,
    trainerProfileId: state.driver.user.trainerProfileId,
    rating: state.driver.user.rating,
  };
}
class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      render: false,
      tfname: this.props.tfname,
      tlname: this.props.tlname,
      tprofileUrl: this.props.tprofileUrl,
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

  openAppointmentWindow() {
    if(this.props.userCardId==null) {
     
      Actions.cardPayment();
    } else {
     
      Actions.book()
    }        
  }

  openChatWindow(){
    this.props.openChatWindow(this.props.trainerProfileId);
  }
  render() {
   
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Content>
          <Card
            transparent
            style={{
              marginTop: 0,
              marginRight: 0,
              paddingTop: 0,
              paddingBottom: 20,
              marginLeft: 0,
              borderWidth:0,
              borderColor: "#FFF",
              elevation:0
            }}
          >
            <CardItem style={{ margin: 20 }}>
              <Body>                
                    <View style={{ justifyContent: "center", textAlign: "center", width: deviceWidth }}>
                    
                     <ListItem style={{ marginTop:10,flexDirection: "row", marginLeft:-20,justifyContent: "center", borderBottomWidth:1, borderColor: '#ffffff' }}>
                       <View style={{flexDirection:'row'}}>
                          
                          <Image source={{ uri: this.props.profileUrl }} style={{width: 80, height: 80}}/>
                          
                          <View style={styles.dummytext}>
                            <Text style={styles.trainerheading}> {this.props.tfname} {this.props.tlname}</Text>
                            <Text style={styles.desctext}>${this.props.tHoursRate} Hour/{this.props.tAddress}</Text>
                            
                          </View>
                       </View>
                    </ListItem> 
                      <View style={styles.bio}>
                        <Text style={styles.bioheading}>Rating</Text>
                         <View style={{Left:20, top:25,position:'absolute'}}>
                         <StarRating
                            disabled={true}
                            emptyStar={STAR_IMAGEblank}
                            fullStar={STAR_IMAGEfill}
                            halfStar={STAR_IMAGEhalf}
                            maxStars={5}
                            starSize={30}
                            rating={this.state.rating}
                          />
                        
                        </View>
                      </View>
                      <View style={[styles.bio,{marginTop:30}]}>
                        <Text style={styles.bioheading}>Years of Experience</Text>
                        <Text style={styles.bioheadingdata}>{ this.props.tExperience ? this.props.tExperience : 'Not Specified' } </Text>
                      </View>

                      <View style={styles.bio}>
                        <Text style={styles.bioheading}>Location</Text>
                        <Text style={styles.bioheadingdata}>{ (this.props.tAddress != '') ? this.props.tAddress : 'Not Mentioned' } </Text>
                      </View>

                      <View style={styles.bio}>
                        <Text style={styles.bioheading}>Hourly Rate</Text>
                        <Text style={styles.bioheadingdata}>{ this.props.tHoursRate ? this.props.tHoursRate : 'Not Specified' } </Text>
                      </View>

                      <View style={styles.bio}>
                        <Text style={styles.bioheading}>Training Specialties</Text>
                        <Text style={styles.bioheadingdata}>{ this.props.tSpeaciality ? this.props.tSpeaciality : 'Not Specified' } </Text>
                      </View>

                       <View style={styles.bio}>
                        <Text style={styles.bioheading}>About Me</Text>
                        
                      </View>

                      <View style={{right:50, position:'absolute', top:5}}>

                      <Icon
                        name="ios-text"
                        onPress={() => this.openChatWindow()} 
                        style={{ color: "#FF0000", fontWeight: "bold", fontSize: 30, right:50, position:'absolute', top:5}}
                      />
                      <Text style={{ color: "#FF0000", fontWeight: "bold", fontSize: 18, right:5, position:'absolute', top:10 }} onPress={() => this.openChatWindow()} >Chat</Text>


                     </View>
                  </View>
                </Body>

            </CardItem>
          </Card>

         
          
          <Button
            block
            style={styles.screenButton}
          >
            <Text onPress={() => this.openAppointmentWindow()} style={{ alignSelf: "center", fontWeight: "bold" }}>
              BOOK APPOINTMENT
            </Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    openChatWindow: user_id => dispatch(openChatWindow(user_id)),    
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Tab1);
