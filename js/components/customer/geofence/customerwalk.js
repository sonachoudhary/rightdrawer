import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Content, Text, Header, Button, Icon, Title, Left, Right, Body, Switch, Container } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import Polyline from '@mapbox/polyline';
import { Actions } from "react-native-router-flux";

import { updateCustomerPositionAppointment } from "../../../actions/common/signin";

const mapuser = require("../../../../assets/images/mapuser.png");
const sallonimage = require("../../../../assets/images/sallon.png");
import styles from './styles';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;


function mapStateToProps(state) {
	return {
		userType: state.driver.user.userType,    
		nearByBarber: state.customer.common.nearby_barber,		
		latitude: state.driver.user.latitude,
		longitude: state.driver.user.longitude,
		barberLat: state.booking.barberPosition.Lat,
		barberLng: state.booking.barberPosition.Lng,
		customerLat: state.booking.customerPositionLat,
		customerLng: state.booking.customerPositionLng
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


class CustomerWalk extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			coords: [],
			barberName:undefined,
			barberDistance: undefined,
			timeToReach: undefined,
			showInformation: false,
			mapReady: false,	
			distance: 0,
			calculatedTime: 0		
		};

	}

	componentDidMount() {
		var that = this;
		setTimeout(() => {
    	    that.map.fitToSuppliedMarkers(['SelfMarker', 'CustomerMarker'], true);    	    
	    }, 3000);

		setTimeout(() => {
    	    that.showDirection([that.props.latitude, that.props.longitude], [that.props.barberLat, that.props.barberLng]);
	    }, 4000);

		setInterval(() => {
    	    
    	    that.props.updateCustomerPositionAppointment();    	
    	    that.showDirection([that.props.customerLat, that.props.customerLng], [that.props.barberLat, that.props.barberLng]);
	    }, 3000);
	}

	callTrainerProfile(userId) {
		this.props.getProfileData(userId)
	}

	async showDirection(startLoc, destinationLoc) {
		var apiKey = 'AIzaSyBqrrV2vUjiGMDL7lQIg8SIyXgrnmsEBjA'
		try {
			let resp = await fetch(
				`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${apiKey}`
			);
			let respJson = await resp.json();
			
			let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
			let distance = respJson.routes[0].legs.map(leg => leg.distance.value).reduce((a, c) => a + c);			
			let coords = points.map((point, index) => {
				return {
					latitude: point[0],
					longitude: point[1],
				};
			});
			
			var distenceMeter = distance ;
			var time = distenceMeter / 9.67;
			var minutes = Math.floor(time / 60);
			var seconds = time - minutes * 60;

			if(minutes>0){
				var calculatedTime = minutes + " Min";
			} else {
				var calculatedTime = seconds.toFixed(0) + " Sec";
			}

			this.setState({ coords: coords, distance: distance/1000, calculatedTime: calculatedTime });
		} catch (error) {
				
		}
	}

	_renderDirectionLinePick() {

		return (
			<MapView.Polyline
				coordinates={this.state.coords}
				strokeWidth={4}
   				strokeColor="rgba(193, 66, 66,0.8)"   
   				
			/>
		);		
	}

	openInfoPopup(item){
		
		var distenceMeter = item.distance * 1000;
		var time = distenceMeter / 9.67;
		var minutes = Math.floor(time / 60);
		var seconds = time - minutes * 60;

		if(minutes>0){
			var calculatedTime = minutes + " Min";
		} else {
			var calculatedTime = seconds.toFixed(0) + " Sec";
		}
		

		this.setState({
			showInformation: true,
			barberName: item.first_name +" "+ item.last_name ,
			barberDistance: item.distance.toFixed(2),
			timeToReach: calculatedTime
		})

		this.showDirection([this.props.latitude, this.props.longitude], [item.lat, item.lng])
	}

	renderMapCoords() {		
		if(this.props.barberLat && this.props.barberLng) {
			return (
    			<MapView.Marker
	                key={1}
					identifier="CustomerMarker"
					coordinate={{
						latitude: parseFloat(this.props.barberLat),
						longitude: parseFloat(this.props.barberLng),
					}}
				>					
					<View>
						<Image source={sallonimage} style={styles.thumbnail} />
	    			</View>	    			
				</MapView.Marker>
  			);
		} else {
			return (<View/>);
		}
		
	}

	render() {
		
		return (
			<View style={styles.container}>
				<MapView
					ref={ref => {
						this.map = ref;
					}}
					style={
						styles.map
					}
					onMapReady={() => {
						this.setState({ mapReady: true });
					}}
					fitToElements={MapView.IMMEDIATE_FIT}
					//showsUserLocation={true}
					showsCompass={true}
					showsMyLocationButton={true}
					zoomEnabled={true}
					zoomTapEnabled={true}					
				>					
					{this._renderDirectionLinePick()}
					{this.renderMapCoords()}

	    			<MapView.Marker
						identifier="SelfMarker"
						coordinate={{
							latitude: parseFloat(this.props.latitude),
							longitude: parseFloat(this.props.longitude),
						}}
					>
							
							<View>
								<Image source={mapuser} style={styles.thumbnail} />
			    			</View>
						
					</MapView.Marker>

          			
				</MapView>
				
				<View style={{ position:'absolute', top:20, left:10 }}>
				<Button transparent onPress={() => { (this.props.userType == 'Teacher') ?Actions.CustomerHome() : Actions.BarberHome()  } }>
	              <Icon
	                name="md-arrow-back"
	                style={{
	                  fontSize: 24,
	                  marginLeft: 5,
	                  color: '#000000'
	                }}
	              />
	              <Text style={{ color: "#000", marginTop:3 }}>{" "}Back</Text>
	            </Button>
				</View>

				<View style={{ backgroundColor: '#FFFFFF', position:"absolute", bottom: 50, left: 69, width:269, height:161  }} >
					<View style={{ flexDirection: 'row', justifyContent:'center', textAlign: 'center', width:269 }}>
						<Image source={require('../../../../assets/images/clock.png')} style={{width: 24, height: 24,alignSelf: 'center',}}/>
						<Text style={{ alignSelf: 'center', fontFamily:'Cabin-Bold', fontSize:35, padding:10, color:'#2A3439' }}>{this.state.calculatedTime} </Text>
					</View>		
								
					<View style={{ borderTopColor:'#E8E8E8', marginTop:20, borderTopWidth:1, height:33, flexDirection:'row' }}>
						<Text style={Platform.OS === "ios" ? styles.distanceIOS : styles.distanceAndroid} >Distance</Text>
						<Text style={{ fontFamily:'Cabin-Regular', fontSize:16, color:'#2A3439', position:'absolute', right:10, marginTop:10 }} >{this.state.distance} mi</Text>
					</View>
				</View>
			</View>
		);
	}
}

function bindActions(dispatch) {
	return {
		updateCustomerPositionAppointment: appointment_id => dispatch(updateCustomerPositionAppointment(appointment_id)),
	};
}

export default connect(
	mapStateToProps,
	bindActions
)(CustomerWalk);
