import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Dimensions, Image, TouchableNativeFeedback as TouchableNative, TouchableOpacity, TouchableHighlight,ImageBackground } from 'react-native';
import { Content, Text, Header, Button, Icon, Title, Left, Right, Body, Switch, Container } from 'native-base';
import MapView, { Marker,ProviderPropType } from 'react-native-maps';
import PropTypes from 'prop-types';
import Polyline from '@mapbox/polyline';
import { Actions } from "react-native-router-flux";
import  Footernew  from "../../../components/footernew";
const mapuser = require("../../../../assets/images/mapuser.png");
const sallonimage = require("../../../../assets/images/sallon.png");
import styles from './styles';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const TouchableNativeFeedback = (Platform.OS === 'ios') ?  TouchableHighlight : TouchableOpacity;

function mapStateToProps(state) {
	return {
		userType: state.driver.user.userType,    
		nearByCustomer: state.customer.common.nearby_customer,		
		latitude: state.driver.user.latitude,
		longitude: state.driver.user.longitude
	};
}

const ASPECT_RATIO = width / height;
const LATITUDE = 30.7046;
const LONGITUDE = 76.7179;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const markerIDs = ['Marker1', 'Marker2', 'Marker3', 'Marker4', 'Marker5'];
const timeout = 4000;
let animationTimeout;


class TrainerGeoFence extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			coords: [],
			barberName:undefined,
			barberDistance: undefined,
			timeToReach: undefined,
			showInformation: false,
			mapReady: false,			
		};

	}

	componentDidMount(){		
		
	}

	
	

	render() {
		
		return (
			<View style={styles.container}>
			<ImageBackground source={ require('../../../../assets/images/Mask_Group_31.png')} style={{width: width, height: height-550, resizeMode:'cover' }} > 
				<View style={{marginTop:30}}>
				<Button transparent onPress={() => { (this.props.userType == 'Teacher') ?  Actions.CustomerHome() : Actions.BarberHome() } }>
	              <Icon
	                name="md-arrow-back"
	                style={{
	                  fontSize: 24,
	                  marginLeft: 5,
	                  color: '#000000'
	                }}
	              />
	             
	            </Button>
				</View>
				<View style={{marginTop:10,marginLeft:30}} >
                      <Text style={{ color: "#000", marginTop:3 ,fontSize:22,fontWeight:'bold'}}>{" "}Driver Name</Text>
                      <Text style={{ color: "#000", marginTop:5 ,fontSize:16}}>{" "}Vehicle Number :  PB11 2659</Text>
                      <Text style={{ color: "#000", marginTop:5,fontSize:16 }}>{" "}Phone Number   :  8888888888</Text>
                </View>


				</ImageBackground>
				<View style={{flex:1,}}>
			    		<Text style={{marginTop:100,fontSize:24, color:'#000000',marginLeft:100}}>Comming Soon</Text>
				</View>
				
				 <Footernew/>
			</View>

		);
	}
}

function bindActions(dispatch) {
	return {
		
	};
}

export default connect(
	mapStateToProps,
	bindActions
)(TrainerGeoFence);
