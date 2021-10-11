import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";
const React = require('react-native');
const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;


export function inviteMail(emails) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    bodyData.emails = emails;
   

    fetch(`${config.serverSideUrl}/index.php/shareemails`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => {
     
      Toast.show({
        text: data.message,
        position: "bottom",
        duration: 1500,
        textStyle: { textAlign: "center", width: deviceWidth - 50}
      });
      (getState().driver.appState.userType=='Teacher') ? Actions.BarberHome() : Actions.CustomerHome();
    })
    .catch(e => {
             
    });
  }
}

export function checkSubscription() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    bodyData.current_date = today;
    

    fetch(`${config.serverSideUrl}/index.php/getSubscription`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => {
      
      if(data.status == 200) {
        if(data.subsciptionStatus == 'inactive') {
          Actions.SubscriptionPanel()  
        }
      }
      if(data.status == 400) {
        Actions.SubscriptionSelection()
      }
    })
    .catch(e => {
               
    });
  }
}

export function confirmfreetrial() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    bodyData.current_date = today;
    

    fetch(`${config.serverSideUrl}/index.php/confirmfreetrial`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => {
      
      if(data.status == 200) {
        Toast.show({
          text: data.message,
          position: "bottom",
          duration: 1500,
          textStyle: { textAlign: "center", width: deviceWidth - 50}
        });
        Actions.ConfirmFreeTrial()
      }
      if(data.status == 400) {
        Toast.show({
          text: data.message,
          position: "bottom",
          duration: 1500,
          textStyle: { textAlign: "center", width: deviceWidth - 50}
        });
        Actions.SubscriptionSelection()
      }
    })
    .catch(e => {
              
    });
  }
}

export function updateSubscription(data) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (dispatch, getState) => {    
    var bodyData = data;
    bodyData.user_id = getState().driver.user._id;
    bodyData.current_date = today;
    
    
    fetch(`${config.serverSideUrl}/index.php/updateSubscription`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => {
      

      if(data.status == 200) {
        Toast.show({
          text: data.message,
          position: "bottom",
          duration: 3000,
          textStyle: { textAlign: "center", width: deviceWidth - 50}
        });
        (getState().driver.appState.userType=='barber') ? Actions.CustomerHome() : Actions.CustomerHome();
      } else {
        Toast.show({
          text: data.message,
          position: "bottom",
          duration: 3000,
          textStyle: { textAlign: "center", width: deviceWidth - 50}
        });
      }
      
    })
    .catch(e => {
            
    });
  }
}
