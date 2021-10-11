import React, { Component } from "react";
import { Root } from "native-base";
import AppNavigator from "./AppNavigator";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

class App extends Component {

	async componentDidMount() {
    	this.checkPermission();
      messaging.notifications().setBadge(0);
  }

  checkPermission = async () => {
        const enabled = await messaging().requestPermission();
        
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    };

   
    getToken = async () => { 
        //console.log('getToken');
        let fcmToken = await AsyncStorage.getItem("FCM_TOCKEN");
        if (!fcmToken || fcmToken=="undefined") {      
            await messaging().registerDeviceForRemoteMessages();    
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem("FCM_TOCKEN", fcmToken);
            }
        }
    };

    requestPermission = async () => {
    	//console.log('requestPermission');
        try {
          await messaging().requestPermission();
          this.getToken();
        } catch (error) {
          console.log("permission rejected");
        }
    };


  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }

}

export default App;