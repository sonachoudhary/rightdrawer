import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, TouchableOpacity, BackHandler, NetInfo,Image } from 'react-native';
import { Content, Text, Header, Button, Icon, Title, Left, Right, Body, Switch, Container } from 'native-base';


function mapStateToProps(state) {
	return {
		
		jwtAccessToken: state.driver.appState.jwtAccessToken,
		
	};
}
class CustomerHome extends Component {
	render() {
		return (
			<View>
				<Text></Text>

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
)(CustomerHome);
