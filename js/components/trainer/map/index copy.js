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
		setTimeout(() => {
    	    
    	    this.map.fitToSuppliedMarkers(['SelfMarker', 'CustomerMarker'], true);
	    }, 3000);
		//this.map.fitToSuppliedMarkers(['Marker1', 'Marker2'], true);
		//this.showDirection([30.7046, 76.7179], [30.7062, 76.7185])
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
		var initialArr = this.props.nearByCustomer
		//latitude: 30.718115533706904, longitude: 76.65027760994838
		if(this.props.nearByCustomer && this.props.nearByCustomer.length>0){
			return initialArr.map((item,i) => {				
				
		        return (
		            
		        	
		            <MapView.Marker
		                key={i}
		                onPress={() => this.openInfoPopup(item)}
						identifier="CustomerMarker"
						coordinate={{
							latitude: parseFloat(item.lat),
							longitude: parseFloat(item.lng),
						}}
					>
						
							<View>
								<Image source={mapuser} style={styles.thumbnail} />
			    			</View>
		    			
					</MapView.Marker>
					
		        );
			});
		} else {
			return (<View/>);
		}
		
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
                      <Text style={{ color: "#000", marginTop:3 ,fontSize:22,}}>{" "}Vehicle Number :  PB11 2659</Text>
                      <Text style={{ color: "#000", marginTop:3,fontSize:22, }}>{" "}Phone Number   :  8888888888</Text>
                </View>


				</ImageBackground>
			<View style={{flex:1,}}>
			    <Text style={{marginTop:100,marginLeft:100}}>Comming Soon</Text>
				{ /* <MapView
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
								<Image source={sallonimage} style={styles.thumbnail} />
			    			</View>
						
					</MapView.Marker>

				</MapView> */ }
				</View>
				
				 <Footernew/>
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
)(TrainerGeoFence);


/*<Marker identifier="Marker2" coordinate={{latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }}>
		<TouchableHighlight onPress={() => this.openInfoPopup(item)} underlayColor='#ff0000'>
			<View>
				<Image source={mapuser} style={styles.thumbnail} />
			</View>
		</TouchableHighlight>
	</Marker>*/
