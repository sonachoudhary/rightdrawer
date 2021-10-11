import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, Dimensions } from 'react-native';
import { Icon, Text } from 'native-base';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import Polyline from '@mapbox/polyline';
import { Actions } from "react-native-router-flux";

import { socketDriverInit, updateLocation } from '../../../services/driversocket';
import { clearReducerState } from '../../../actions/driver/rateRider';
import { requestTripUpdated } from '../../../actions/driver/rideRequest';
import { fetchUserCurrentLocationAsync, syncDataAsync } from '../../../actions/driver/home';

import DriverHome from '../home';


import commonColor from '../../../../native-base-theme/variables/commonColor';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
let that = null;

function mapStateToProps(state) {
	return {
		tripRequest: state.driver.tripRequest,
		trip: state.driver.trip,
		user: state.driver.user,
		pageStatus: state.driver.appState.pageStatus,
		jwtAccessToken: state.driver.appState.jwtAccessToken,
		region: {
			latitude: state.driver.user.gpsLoc[1],
			longitude: state.driver.user.gpsLoc[0],
			latitudeDelta: state.driver.user.latitudeDelta,
			longitudeDelta: state.driver.user.longitudeDelta,
		},
		riderPickupLocLat: !state.driver.tripRequest.srcLoc[1] ? undefined : state.driver.tripRequest.srcLoc[1],
		riderPickupLocLong: !state.driver.tripRequest.srcLoc[0] ? undefined : state.driver.tripRequest.srcLoc[0],
		driverCurrentGpsLocLat: !state.driver.tripRequest.driver
			? undefined
			: state.driver.tripRequest.driver.gpsLoc[1],
		driverCurrentGpsLocLong: !state.driver.tripRequest.driver
			? undefined
			: state.driver.tripRequest.driver.gpsLoc[0],
		pickUpAddress: state.driver.tripRequest.pickUpAddress,
		destAddress: state.driver.tripRequest.destAddress,
		destLoc: state.driver.tripRequest.destLoc,
		apiKey: state.basicAppConfig.config.googleMapsApiKey,
	};
}

class DriverRootView extends Component {
	static propTypes = {
		user: PropTypes.object,
		pageStatus: PropTypes.string,
		region: PropTypes.object,
		riderPickupLocLat: PropTypes.number,
		riderPickupLocLong: PropTypes.number,
		fetchUserCurrentLocationAsync: PropTypes.func,
		initialRegion: PropTypes.object,
	};
	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: this.props.region.latitude,
				longitude: this.props.region.longitude,
				latitudeDelta: this.props.region.latitudeDelta,
				longitudeDelta: this.props.region.longitudeDelta * aspectRatio,
			},
			mapRegion: {
				latitude: this.props.region.latitude,
				longitude: this.props.region.longitude,
				latitudeDelta: this.props.region.latitudeDelta,
				longitudeDelta: this.props.region.longitudeDelta * aspectRatio,
			},
			coords: [],
			mapReady: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		
	}

	UNSAFE_componentWillMount() {
		that = this;
		this.props.syncDataAsync(this.props.jwtAccessToken);
		
	}

	async showDirection(startLoc, destinationLoc) {
		try {
			let resp = await fetch(
				`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${
					this.props.apiKey
				}`
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

	_renderRiderMarker() {
		if (
			this.props.riderPickupLocLat !== undefined &&
			(this.props.pageStatus === 'onTrip' ||
				this.props.pageStatus === 'pickRider' ||
				this.props.pageStatus === 'startRide')
		) {
			return (
				<MapView.Marker
					identifier="RiderMarker"
					coordinate={{
						latitude: this.props.riderPickupLocLat,
						longitude: this.props.riderPickupLocLong,
					}}
				>
					<View>
						<Icon name="ios-pin" style={{ fontSize: 24 }} />
					</View>
				</MapView.Marker>
			);
		}
		return <View />;
	}


	_renderDriverMarker(latitude,longitude, trainerName) {
		

		return (
			<MapView.Marker
				identifier="DriverMarker"
				coordinate={{
					latitude: latitude,
					longitude: longitude,
				}}
			>
				
					<View
						style={{
							flexDirection: 'column',
							alignItems: 'center',
							paddingTop: 10,
						}}
					>
						<View style={styles.locationContainer}>
							<Text
								style={{
									fontSize: 14,
									color: '#FF6005',
									textAlign: 'center',
									borderRadius: 4,
								}}
							>
								{trainerName}
							</Text>
						</View>
						<View style={styles.triangle} />
						<Icon name="ios-pin" onPress={() => Actions.earnings()} style={{ fontSize: 24, color: '#FF6005', marginTop: 10 }} />
					</View>
				
			</MapView.Marker>
		);
		
	}
	
	render() {
		
		if (this.props.user.fname === undefined) {
			return <View />;
		}
		let component = null;
		switch (this.props.pageStatus) {
			case 'home':
				component = <DriverHome />;
				break;
			default:
				component = <DriverHome />;
		}
		var markers = [
			{
				title: 'src',
				latitude: 37.783836,
				longitude: -122.400418,
			},
			{
				title: 'dest',
				latitude: 37.783936,
				longitude: -122.402418,
			},
		];
		
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<MapView
					ref={ref => {
						this.map = ref;
					}}
					style={
						styles.map
					}
					initialRegion={this.props.initialRegion}
					onMapReady={() => {
						this.setState({ mapReady: true });
					}}
					fitToElements={MapView.IMMEDIATE_FIT}
					showsUserLocation={true}
					followsUserLocation
					// region={this.state.mapRegion}  region should not be fixed when passing markers to fit to elements
				>

					{ this._renderDriverMarker(37.783836, -122.400418, 'Trainer 1') }
					{ this._renderDriverMarker(37.784034, -122.403017, 'Trainer 2')  }
					
					
				</MapView>
				{component}
			</View>
		);
	}
}

function bindActions(dispatch) {
	return {
		clearReducerState: () => dispatch(clearReducerState()),
		requestTripUpdated: status => dispatch(requestTripUpdated(status)),
		fetchUserCurrentLocationAsync: () => dispatch(fetchUserCurrentLocationAsync()),
		syncDataAsync: jwtAccessToken => dispatch(syncDataAsync(jwtAccessToken)),
	};
}
function setCurrentMapDriver() {
	const gpsLoc = that.props.user.gpsLoc;
	const obj = {
		latitude: gpsLoc[1],
		longitude: gpsLoc[0],
	};
	that.map.fitToCoordinates([obj], {
		// edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
		animated: true,
	});
}

export { setCurrentMapDriver };

export default connect(
	mapStateToProps,
	bindActions
)(DriverRootView);
