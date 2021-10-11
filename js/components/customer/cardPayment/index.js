import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Container, Header, Text, Button, Icon, Title, Left, Right, Body, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { saveCardDetails } from '../../../actions/payment/riderCardPayment';
import { updatePayment } from '../../../actions/payment/paymentMethod';
import { closeDrawer } from '../../../actions/drawer';
import ModalView from '../../common/ModalView';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

class cardPayment extends Component {
	onSubmit() {
		const userEmail = {
			email: this.props.userEmail,
		};
		//this.props.saveCardDetails(userEmail);
		Actions.creditCard();
	}

	selectCash() {
		this.props.updatePayment('CASH');
	}

	// UNSAFE_componentWillMount() {
	// 	this.props.closeDrawer();
	// }

	showLoaderModal() {
		return (
			<ModalView>
				<Spinner />
			</ModalView>
		);
	}
	render() {
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Header
					androidStatusBarColor={commonColor.statusBarLight}
					style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
				>
					<Left/>
					<Body/>						
					<Right>
			            <Text style={
			                Platform.OS === "ios"
			                  ? styles.iosHeaderTitle
			                  : styles.aHeaderTitle
			              }
			              onPress={() => Actions.pop()}
			              >
			              Cancel
			            </Text>
			         </Right>
				</Header>
				<View>
					<View style={styles.cardSelect}>
						<Text style={{ color: "#000",padding:30,fontSize:16,marginBottom:30 }}>
							In order to book an appointment, you first must complete your billing information.
						</Text>
					</View>
					<View style={{ paddingHorizontal: 20 }}>
						{this.props.appConfig.stripe ? (
							<Button
					            block
					            style={styles.experienceButton}
					            onPress={() => Actions.creditCard()}
					          >
					            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
					              Add Payment Option  {" "}
					              <Icon
					                name="md-arrow-forward"
					                style={{
					                  fontSize: 16,
					                  marginLeft: 40,
					                  paddingTop:7,
					                  paddingLeft:40,
					                  color: "#FFF"
					                }}
					              />
					            </Text>
					        </Button>							
						 ) : null}
						{/*
						this.props.appConfig.cash ? (
							<TouchableOpacity
								style={{
									...styles.payCard,
									borderBottomLeftRadius: 4,
									borderBottomRightRadius: 4,
								}}
								onPress={() => this.selectCash()}
							>
								<Icon name="ios-cash" style={{ fontSize: 40, color: '#eee' }} />
								<Text
									style={{
										marginLeft: 20,
										marginTop: 8,
										color: '#eee',
										fontWeight: 'bold',
									}}
								>
									Cash
								</Text>
							</TouchableOpacity>
						) : null */}
						{ this.props.ridePayment.cardDetailsLoader ? this.showLoaderModal() : null} 
					</View>
				</View>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		userEmail: state.driver.user.email,
		ridePayment: state.customer.riderCardPayment,
		appConfig: state.basicAppConfig.config,
	};
}

function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
		closeDrawer: () => dispatch(closeDrawer()),
		saveCardDetails: data => dispatch(saveCardDetails(data)),
		updatePayment: data => dispatch(updatePayment(data)),
		
	};
}

export default connect(
	mapStateToProps,
	bindActions
)(cardPayment);
