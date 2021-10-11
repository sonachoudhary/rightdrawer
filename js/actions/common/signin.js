import { Actions, ActionConst } from "react-native-router-flux";

import config from "../../../config.js";
import { Toast } from "native-base";
import _ from "lodash"
//import { setEmailExist } from "../../components/common/flow/nameform";

export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const DRIVER_LOGIN_SUCCESS = "DRIVER_LOGIN_SUCCESS";
export const CUSTOMER_LOGIN_SUCCESS = "CUSTOMER_LOGIN_SUCCESS";
export const SET_NEAR_TRAINERS = "SET_NEAR_TRAINERS";
export const DRIVER_LOGIN_ERROR = "DRIVER_LOGIN_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_RESPONSE_RECEIVED = "LOGIN_RESPONSE_RECEIVED";
export const CHANGE_LOGIN_ERROR_STATUS = "CHANGE_LOGIN_ERROR_STATUS";
export const SET_TRAINERS_TRANSACTION = "SET_TRAINERS_TRANSACTION";


const React = require('react-native');
const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;

export function setUserLocation(position) {
  return {
    type: SET_USER_LOCATION,
    payload: position.coords
  };
}

export function driverSigninSuccess(data) {
  return {
    type: DRIVER_LOGIN_SUCCESS,
    payload: data
  };
}

export function customerSigninSuccess(data) {
  return {
    type: CUSTOMER_LOGIN_SUCCESS,
    payload: data
  };
}

export function customerNearByTrainers(data) {
  
  return {
    type: SET_NEAR_TRAINERS,
    payload: data
  };
}

export function trainertransctionlist(data) {
  
  return {
    type: SET_TRAINERS_TRANSACTION,
    payload: data
  };
}

export function driverSigninError(error) {
  return {
    type: DRIVER_LOGIN_ERROR,
    payload: error
  };
}
export function logOutUser() {
  return {
    type: LOGOUT_USER
  };
}
export function logOutUserAsync(jwtAccessToken) {

  return dispatch => {

    fetch(`${config.serverSideUrl}:${config.port}/api/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success === true) {
          dispatch(logOutUser());
          Actions.login({ type: ActionConst.RESET });
        }
      })
      .catch(e => e);
    dispatch(logOutUser());
    Actions.login({ type: ActionConst.RESET });
  };
}

function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}

export function currentLocationUser() {
  return (dispatch, getState) => {
    navigator.geolocation.watchPosition(
      position => {
        dispatch(setUserLocation(position));
      },
      error => {
        
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  };
}

export function signinAsync(obj,coords,fcmtoken) {
  const userCredentials = obj;
  
  return (dispatch,getState) => {
    //dispatch(currentLocationUser());
    dispatch({ type: REQUEST_LOGIN });

    var bodyData = {};
    bodyData = jsonConcat(bodyData, obj);
    bodyData.latitude = getState().driver.user.gpsLoc[1];
    bodyData.longitude = getState().driver.user.gpsLoc[0];
    bodyData.fcmtoken = fcmtoken;
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
        console.log('data',data);
        if (data.success === true) {
           dispatch(customerSigninSuccess(data));
           Actions.profile();
        }else{
          //Actions.profile()
          alert('Email/Password is not correct');
        }
        

      })
      .catch(e => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
      });
  };
}

export function signinAsyncFb(obj) {
  const userCredentials = obj;
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
        if (data.success === true && userCredentials.userType === "rider") {
          alert('User already exists');
          Toast.show({
            text: "User already exists",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === true && userCredentials.userType === "driver") {
          dispatch(driverSigninSuccess(data));
          dispatch(Actions.driverStartupService());
        }
        if (data.success === false && userCredentials.userType === "rider") {
          alert('User already exists');
          Toast.show({
            text: "User already exists",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === false && userCredentials.userType === "driver") {
          dispatch(driverSigninError(data));
        }
      })
      .catch(e => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
      });
  };
}
export function forgotMail() {
  return (dispatch, getState) => {
    const obj = {
      email: _.get(getState().form.loginForm.values, "email", null)
    };
    
    if (obj.email === null) {
      alert('Email is required');
      /*Toast.show({
        text: "Email is required.",
        position: "bottom",
        duration: 1500
      });*/
    } else {
      
      fetch(`${config.serverSideUrl}:${config.port}/api/config/forgot`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then(resp => resp.json())
        .then(data => {
          alert(data.message);
          /*Toast.show({
            text: data.message,
            position: "bottom",
            duration: 1500
          });*/
        })
        .catch(e => {
          alert("User doesn't exists");
          /*Toast.show({
            text: "User doesn't Exists.",
            position: "bottom",
            duration: 1500
          });*/
        });
    }
  };
}

// export function checkEmailExist (email) {
//   return (dispatch, getState) => {
//     navigator.geolocation.getCurrentPosition(location => {
//       setEmailExist();
//     });    
//   };
// }