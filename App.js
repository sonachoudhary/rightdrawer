import React from "react";
import Setup from "./js/setup";
//import * as Sentry from '@sentry/react-native';
//import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { store } from './js/configureStore';
import AsyncStorage from '@react-native-community/async-storage';
import SyncStorage from 'sync-storage';

navigator.geolocation = require('@react-native-community/geolocation');



export default class App extends React.Component {

	async componentDidMount() {
        //this.checkPermission();
        //await AsyncStorage.removeItem("FCM_TOCKEN_HTC");   
        console.log('deleted')     
        this.requestPermission();
    }

    //1
    checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    };

    //3
    getToken = async () => {
        //alert('sd')      
        //let fcmToken = await AsyncStorage.getItem("FCM_TOCKEN_HTC");
        // console.log('gettoken AsyncStorage:', )
        //if (!fcmToken || fcmToken=="undefined") {      
            await messaging().registerDeviceForRemoteMessages();    
            fcmToken = await messaging().getToken();
            console.log('gettoken fcmToken under if:', fcmToken)
            if (fcmToken) {
                // user has a device token
                SyncStorage.set('FCM_TOCKEN_WESMART',fcmToken );
                //await AsyncStorage.setItem("FCM_TOCKEN_WESMART", fcmToken);
            }
       // }
    };

    //2
    requestPermission = async () => {
        try {
            await messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log("permission rejected");
        }
    };


   

    updateToken(fcmToken){
    	return {
            type: PUSH_TOKEN,
            payload: fcmToken
        };  
    }
    
    


	render() {
		console.disableYellowBox = true;
		return <Setup />;
  	}
}
