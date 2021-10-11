import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Platform, View,Dimensions,Image,TouchableOpacity } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
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



import styles from "./styles";
import _ from "lodash";
import config from "../../../../config";
//import DeviceInfo from 'react-native-device-info';

let that = null;
const deviceWidth = Dimensions.get('window').width; 
const deviceHeight = Dimensions.get('window').height; 

   
      const setFooter = ({ }: Props) => (
        <View style={Platform.OS === "ios" ? styles.iosfooter : styles.andfooter}>
          <View style={{ justifyContent:'center', paddingTop:5,alignItems:'center', width:deviceWidth/4 }} >
            <View style={{ justifyContent:'center',alignItems:'center'}}>
              <Button transparent onPress={() => Actions.profile()} >
                 <Image source={require("../../../../assets/images/home.png")} style={{width:20, height:23}} />
              </Button>
            </View>
          </View>                    

          <View style={{ justifyContent:'center', paddingTop:5,alignItems:'center', width:deviceWidth/4,  }} >
          <View style={{ justifyContent:'center',alignItems:'center'}}>
            <Button transparent onPress={() => Actions.chatlist()} >
                <Image source={require("../../../../assets/images/chat.png")} style={{width:24, height:24}} />
            </Button> 
            </View>
          </View>                    

          <View style={{ justifyContent:'center', paddingTop:5,alignItems:'center',  width:deviceWidth/4}} >
          <View style={{ justifyContent:'center',alignItems:'center'}}>
            <Button transparent onPress={() => Actions.myprofile()} >
              <Image source={require("../../../../assets/images/user_footer.png")} style={{width:26, height:26}} />
            </Button>
            </View>
          </View>                    
      </View> 
  );
export default setFooter;
