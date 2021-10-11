import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View, Dimensions, Image, Share } from "react-native";
import PropTypes from "prop-types";
import {
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
  Spinner,
  Body,
  Toast,
  Input
} from "native-base";
import { Actions } from "react-native-router-flux";
import { inviteMail } from "../../../actions/common/all";
import styles from "./styles";
import Hr from 'react-native-hr-component';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
  return {
    userType: state.driver.user.userType,    
  };
}

class ShareScreenSecond extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,   
      emails: undefined,
      invalidEmail: false       
    };    
    
  }

  sendInvite(){
    if (!/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}\s*?,?\s*?)+$/i.test(this.state.emails)) {
     
      this.setState({ invalidEmail: true })
    } else {
     
      this.setState({ invalidEmail: false })
      this.props.inviteMail(this.state.emails);  
    }    
  }

  shareThisApp() {
    var urlToShare = 'https://play.google.com/store/apps/details?id=com.htc.live';
    if(Platform.OS === 'ios'){
      urlToShare = 'https://apps.apple.com/us/app/id1502513555';
    }
    Share.share({
      message: 'Hold That Chair - ' + urlToShare,
      url: urlToShare,
      title: 'Hold That Chair'
    })
  }

  render() {
    
    return (

     <Container style={{ backgroundColor: "#0D1214" }}>
        <Content>
          <View style={{ flex: 1 }}>

            <View style={{ flex: 1, marginLeft:5, marginTop:20, flexDirection:'row' }} >
                <View style={{ }} >
                  <Button transparent onPress={() => { Actions.ShareScreenFirst() } }>
                    <Icon
                      name="md-arrow-back"
                      style={{ fontSize: 28, color: "#fff" }}
                    />
                    <Text style={{ color:"#E8E8E8", fontSize:18, marginLeft:5 }}>
                    Back
                  </Text> 
                  </Button>                                
                </View>
            </View>
            
            <View style={{ padding: 20, marginTop: 20 }} >
              <Text style={{ color:"#E8E8E8", fontSize:30, fontFamily:'Cabin-Bold' }}>
                Share the App
              </Text>  
              
              <Text style={{ color:"#E8E8E8", fontSize:20, fontFamily:'Cabin-Regular', marginTop:10 }}>
                Write the email of whom you wanted to share the app.
              </Text>     
              
              {this.state.invalidEmail && 
              <View style={ styles.errorTextView }>
                <Text style={ styles.errorText }>Invalid Email</Text>
              </View>
              }

              <Input multiline onChangeText={text => this.setState({ emails: text }) } style={{paddingLeft:10, marginTop:20, borderWidth:1, fontFamily:'Cabin-Regular', borderRadius:3, height:100, backgroundColor:'#2A3439', borderWidth:1, borderColor: '#707E85' }}  />           

              <Text style={{ color:"#E8E8E8", fontSize:14, fontFamily:'Cabin-Regular', marginTop:10, opacity:0.5 }}>
                separate it with comma
              </Text>     

              <Button block onPress={() => this.sendInvite()} style={[styles.nameBtn,{backgroundColor: "#392F2A"}]}>
                  <Text style={{ fontSize: 20, color: "#FFFFFF", marginLeft:10, fontFamily:'Cabin-Bold' }}>
                    Send
                  </Text>
              </Button>

            </View>


            <View style={{ marginTop:30, marginBottom:30 }}>
            <Hr text="OR" fontSize={20} lineColor="#eee" textPadding={20} textStyles={{color:'#FFFFFF'}} hrStyles={{color:'#E8E8E8', paddingLeft:20, paddingRight:20 }} />
            </View>

            <View style={{ padding: 20}} >
              <Button
                  block                 
                  onPress={() => this.shareThisApp() }
                  style={[styles.nameBtn,{backgroundColor: "#392F2A"}]} >

                  <Icon
                    name="ios-share"
                    style={{ fontSize: 28, color: "#fff" }}
                  />
                  <Text style={{ fontSize: 20, color: "#fff", marginLeft:10, fontFamily:'Cabin-Bold' }}>
                    Share on Social Media
                  </Text>
              </Button>

              </View>
            
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    inviteMail:(emails) => dispatch(inviteMail(emails))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(ShareScreenSecond);
