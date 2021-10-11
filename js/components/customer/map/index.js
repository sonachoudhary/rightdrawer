import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Dimensions, Image } from 'react-native';
import { Content, Text, Header, Button, Icon, Title, Left, Right, Body, Switch, Container } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import Polyline from '@mapbox/polyline';
import { Actions } from "react-native-router-flux";
const mapuser = require("../../../../assets/images/mapuser.png");
const sallonimage = require("../../../../assets/images/sallon.png");
import styles from './styles';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;


function mapStateToProps(state) {
	return {
		userType: state.driver.user.userType,    
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


class CustomerMap extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			coords: [],
			mapReady: false,
			//nearByTrainers: this.props.nearByTrainers,
			a: {
		        latitude: 30.7046,
		        longitude: 76.7179,
		    },
		    b: {
		        latitude: 30.7062,
		        longitude: 76.7185,
		    },
		};
		
	}

	// async componentDidMount() {
	//     await this.props.getNearByTrainers(this.state.customer.latitude,this.state.customer.longitude);		
	// }
	componentDidMount(){
		this.map.fitToSuppliedMarkers([markerIDs[1], markerIDs[2]], true);
		this.showDirection([30.7046, 76.7179], [30.7062, 76.7185])
	}


	// UNSAFE_componentWillMount() {
	// 	that = this;
	// 	this.props.getNearByTrainers(this.state.customer.latitude,this.state.customer.longitude);		
	// }

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
			
			this.setState({ coords: coords });
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
					<Marker identifier="Marker1" coordinate={this.state.a}>
						<View>
							<Image source={mapuser} style={styles.thumbnail} />
		    			</View>
	    			</Marker>
          			<Marker identifier="Marker2" coordinate={this.state.b}>
          				<View>
							<Image source={sallonimage} style={styles.thumbnail} />
		    			</View>
          			</Marker>
				</MapView>
				
				<View style={{ position:'absolute', top:20, left:10 }}>
				<Button transparent onPress={() => { (this.props.userType == 'Teacher') ?Actions.CustomerHome() :  Actions.BarberHome() } }>
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
						<Text style={{ alignSelf: 'center', fontFamily:'Cabin-Bold', fontSize:35, padding:10, color:'#2A3439' }}>20 Min</Text>
					</View>		
					<Text style={{ fontFamily:'Cabin-Regular', fontSize:16, paddingLeft:10, color:'#2A3439' }} >Mark John West</Text>
					<Text style={{ fontFamily:'Cabin-Regular', fontSize:14, paddingLeft:10, color:'#2A3439' }} >Haircut, Facial Shave, Full massage</Text>

					<View style={{ borderTopColor:'#E8E8E8', marginTop:20, borderTopWidth:1, height:33, flexDirection:'row' }}>
						<Text style={{ fontFamily:'Cabin-Regular', fontSize:16, padding:10, color:'#2A3439', opacity:0.5 }} >Cash</Text>
						<Text style={{ fontFamily:'Cabin-Regular', fontSize:16, color:'#2A3439', position:'absolute', right:10, marginTop:10 }} >$340</Text>
					</View>
				</View>
			</View>
		);
	}
}

function bindActions(dispatch) {
	return {
		//getNearByTrainers: (obj1, obj2) => dispatch(getNearByTrainers(obj1, obj2)),
	};
}

export default connect(
	mapStateToProps,
	bindActions
)(CustomerMap);
