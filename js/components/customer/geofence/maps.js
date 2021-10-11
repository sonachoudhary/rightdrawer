import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Platform, Dimensions, Image, TouchableHighlight,TextInput,TouchableOpacity } from 'react-native';
import { Content, Text, Header, Button, Icon, Title, Left, Right, Body, Switch, Container } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import Polyline from '@mapbox/polyline';
import PolylineDirection from '@react-native-maps/polyline-direction';
import { Actions } from "react-native-router-flux";
const mapuser = require("../../../../assets/images/mapuser.png");
const bus = require("../../../../assets/images/bus.png");
import styles from './styles';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;


function mapStateToProps(state) {
	return {
		userType: state.driver.user.userType,    
		nearByBarber: state.customer.common.nearby_barber,		
		latitude: 30.7046,
		longitude: 76.7179
	};
}

const ASPECT_RATIO = width / height;
const LATITUDE = 30.7046;
const LONGITUDE = 76.7179;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const origin = { latitude: 30.7046, longitude: 76.7179 };
const destination = { latitude: 30.8046, longitude: 79.7179 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQO5Ol8duHnJd2vs1JElye8f177yXyHGw';

const markerIDs = ['Marker1', 'Marker2', 'Marker3', 'Marker4', 'Marker5'];
const timeout = 4000;
let animationTimeout;


class CustomerGeoFence extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			coords: [{latitude: 30.7146,longitude: 79.7179}],
			barberName:undefined,
			barberDistance: undefined,
			timeToReach: undefined,
			showInformation: false,
			mapReady: false,			
		};

	}

	componentDidMount() {

		setTimeout(() => {
    	    
    	    this.map.fitToSuppliedMarkers(['SelfMarker', 'CustomerMarker'], true);
	    }, 3000);

		this.map.fitToSuppliedMarkers(['Marker1', 'Marker2'], true);
		this.showDirection([30.7046, 76.7179], [30.7062, 76.7185])

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

	renderMapCoords(){
		var initialArr = this.props.nearByBarber
		
		
		        		return (
		        			<MapView.Marker
				               
				               
								identifier="CustomerMarker"
								coordinate={{
									latitude: 30.7043,
									longitude: 76.7079,
								}}
							>
								
									<View>
										<Image source={bus} style={styles.thumbnail} />
					    			</View>
				    			
							</MapView.Marker>
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
				

				  <View style={{ position:'absolute', top:5, left:20 }}>
				     <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{width:70,height:70}}  >
                       <Image                      
                            source={require("../../../../assets/images/Group_16692.png")}
                            style={{ width:50.08, height: 50.08, position:'absolute', right:10 , }}
                        />  
                    </TouchableOpacity>
        
				
				</View>


				{
					this.state.showInformation &&
					<View style={{ backgroundColor: '#FFFFFF', position:"absolute", bottom: 50, left: 69, width:269, height:161  }} >
					<View style={{ flexDirection: 'row', justifyContent:'center', textAlign: 'center', width:269 }}>
						<Image source={require('../../../../assets/images/clock.png')} style={{width: 24, height: 24,alignSelf: 'center',}}/>
						<Text style={{ alignSelf: 'center', fontFamily:'Cabin-Bold', fontSize:35, padding:10, color:'#2A3439' }}>{this.state.timeToReach} </Text>
					</View>		
					<Text style={{ fontFamily:'Cabin-Regular', fontSize:16, paddingLeft:10, color:'#2A3439' }} >{this.state.barberName}</Text>
					{/*<Text style={{ fontFamily:'Cabin-Regular', fontSize:14, paddingLeft:10, color:'#2A3439' }} >Haircut, Facial Shave, Full massage</Text>*/}

					<View style={{ borderTopColor:'#E8E8E8', marginTop:20, borderTopWidth:1, height:33, flexDirection:'row' }}>
						<Text style={Platform.OS === "ios" ? styles.distanceIOS : styles.distanceAndroid} >Distance</Text>
						<Text style={{ fontFamily:'Cabin-Regular', fontSize:16, color:'#2A3439', position:'absolute', right:10, marginTop:10 }} >{this.state.barberDistance} mi</Text>
					</View>
				</View>}

			
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
)(CustomerGeoFence);
