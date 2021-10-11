import { Actions, ActionConst } from "react-native-router-flux";
import { Alert, AsyncStorage } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const REG_SET_USER_LOCATION = "REG_SET_USER_LOCATION";
export const DRIVER_REGISTER_SUCCESS = "DRIVER_REGISTER_SUCCESS";
export const CUSTOMER_REGISTER_SUCCESS = "CUSTOMER_REGISTER_SUCCESS";
export const SET_REG_NEAR_TRAINERS = "SET_REG_NEAR_TRAINERS";
export const DRIVER_REGISTER_ERROR = "DRIVER_REGISTER_ERROR";
export const REQUEST_REGISTERATION = "REQUEST_REGISTERATION";
export const REGISTRATION_RESPONSE_RECEIVED = "REGISTRATION_RESPONSE_RECEIVED";
export const CHANGE_REGISTER_ERROR_STATUS = "CHANGE_REGISTER_ERROR_STATUS";
export const REG_ROLE = "REG_ROLE";
export const SET_STATE_LIST = "SET_STATE_LIST";

const React = require('react-native');
const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;


export function driverRegisterSuccess(data) {
  return {
    type: DRIVER_REGISTER_SUCCESS,
    payload: data
  };
}

export const CLEAR_ENTRY_PAGE = "CLEAR_ENTRY_PAGE";
export function clearEntryPage() {
  return {
    type: CLEAR_ENTRY_PAGE,
  };
}

export function customerRegisterSuccess(data) {
  return {
    type: CUSTOMER_REGISTER_SUCCESS,
    payload: data
  };
}

export function customerNearByTrainers(data) {
  return {
    type: SET_REG_NEAR_TRAINERS,
    payload: data
  };
}

export function setStateList(data) {
  return {
    type: SET_STATE_LIST,
    payload: data
  };
}

export function driverRegisterError(error) {
  return {
    type: DRIVER_REGISTER_ERROR,
    payload: error
  };
}

function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}

export function selectRoleProps(role) {
  return {
    type: REG_ROLE,
    payload: role
  };
}

export function selectRole(role) { 
  return (dispatch, getState) => {
    dispatch(selectRoleProps(role))
    Actions.customersignup();
  }
}

export function setUserLocation(position) {
  return {
    type: REG_SET_USER_LOCATION,
    payload: position.coords
  };
}

export function currentLocationUser() {
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        
        dispatch(setUserLocation(position));
      },
      () => console.log('not found'),
      { }
    );

    // navigator.geolocation.watchPosition(
    //   position => {
    //     
    //     dispatch(setUserLocation(position));
    //   },
    //   error => {
        
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 1000,
    //     distanceFilter: 10
    //   }
    // );
  };
}

export function registerAsync(obj,uscitizen,stateValue) {
  const userCredentials = obj;
  userCredentials.uscitizen = uscitizen;
  userCredentials.state = stateValue;
  
  return (dispatch, getState) => {
    dispatch(currentLocationUser());
    var bodyData = {};
    bodyData = jsonConcat(bodyData, userCredentials);
    bodyData.lat = (getState().driver.user.latitude) ? getState().driver.user.latitude : null;
    bodyData.lng = (getState().driver.user.longitude) ? getState().driver.user.longitude : null;
    bodyData.userType = getState().all.reg_role;
    
    
    dispatch({ type: REQUEST_REGISTERATION });
    fetch(`${config.serverSideUrl}/index.php/devnewregister`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        

        if (data.status === 200 && data.userDetail.userType == 'barber') {
          dispatch(Actions.regsuccess());          
        }

        if (data.status === 200 && data.userDetail.userType == 'customer') {
          //dispatch(customerRegisterSuccess(data));
          dispatch(Actions.regsuccess())
        }

        // if (data.success === true && userCredentials.userType === "customer") {
        //   dispatch(driverRegisterSuccess(data));
        //   dispatch(Actions.customerStartupService());
        // }

        if (data.status === 400) {
          Toast.show({
            text: data.message,
            position: "bottom",
            duration: 1500,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          });
        }
      })
      .catch(e => {
        
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      });
  };
}



export function registerAsyncSocial(obj,social) {
  const userCredentials = obj;
  
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.email = obj.email;
    bodyData.name = obj.name;
    bodyData.socialId = obj.id;
    bodyData.socialSource = social;
    bodyData.latitude = getState().driver.user.gpsLoc[1];
    bodyData.longitude = getState().driver.user.gpsLoc[0];
    bodyData.userType = getState().all.reg_role;
    
    
    
    fetch(`${config.serverSideUrl}/index.php/apifbsignup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        

        if (data.status === 200 && data.userDetail.userType == 'barber') {
          dispatch(Actions.socialregsuccess());          
        }

        if (data.status === 200 && data.userDetail.userType == 'customer') {
          dispatch(Actions.socialregsuccess())
        }

        if (data.status === 400) {
          Toast.show({
            text: data.message,
            position: "bottom",
            duration: 1500,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          });
        }
      })
      .catch(e => {
              
      });
  };
}

export function getStateList() {
  return (dispatch, getState) => {    
    var bodyData = {};
    

    

    fetch(`${config.serverSideUrl}/index.php/statelist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setStateList(data.userDetail))        
      })
      .catch(e => {
        
      });
    }
}
