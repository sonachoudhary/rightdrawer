import { Actions, ActionConst } from "react-native-router-flux";
import { Alert, AsyncStorage } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const DRIVER_REGISTER_SUCCESS = "DRIVER_REGISTER_SUCCESS";
export const CUSTOMER_REGISTER_SUCCESS = "CUSTOMER_REGISTER_SUCCESS";
export const SET_REG_NEAR_TRAINERS = "SET_REG_NEAR_TRAINERS";
export const DRIVER_REGISTER_ERROR = "DRIVER_REGISTER_ERROR";
export const REQUEST_REGISTERATION = "REQUEST_REGISTERATION";
export const REGISTRATION_RESPONSE_RECEIVED = "REGISTRATION_RESPONSE_RECEIVED";
export const CHANGE_REGISTER_ERROR_STATUS = "CHANGE_REGISTER_ERROR_STATUS";

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

export function registerAsync(obj,userType) {
  const userCredentials = obj;
  userCredentials.userType = userType;
  
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData = jsonConcat(bodyData, userCredentials);
    bodyData.latitude = getState().driver.user.gpsLoc[1];
    bodyData.longitude = getState().driver.user.gpsLoc[0];
    
    
    dispatch({ type: REQUEST_REGISTERATION });
    fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
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
        if (data.success === true) {
           Actions.profile()
        }else{
          alert('Email already exists');
        }
       
      })
      .catch(e => {
        // alert(e);
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      });
  };
}

//
// Registration using fb
//
export function registerAsyncFb(obj) {
  const userCredentialsFb = obj;
  userCredentialsFb.phoneNo = `+${userCredentialsFb.callingCode}${
    userCredentialsFb.phoneNo
  }`;
  return (dispatch, getState) => {
    const state = getState();
    userCredentialsFb.password = state.entrypage.socialLogin.id;

    var bodyData = {};
    bodyData = jsonConcat(bodyData, userCredentialsFb);
    bodyData.latitude = getState().driver.user.gpsLoc[1];
    bodyData.longitude = getState().driver.user.gpsLoc[0];
    
    if (!userCredentialsFb.message) {


      dispatch({ type: REQUEST_REGISTERATION });
      fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentialsFb)
      })
        .then(resp => {
          resp.json().then(data => {
           
            dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
            dispatch(clearEntryPage());
            if (data.success === true && data.userType == 'trainer') {
              dispatch(driverRegisterSuccess(data));
              dispatch(Actions.driverStartupService());
            }

            if (data.success === true && data.userType == 'customer') {
              
              dispatch(customerRegisterSuccess(data));
              //dispatch(customerNearByTrainers(data.nearbytrainer));
              dispatch(Actions.customerStartupServices());
            }

            // if (
            //   data.success === true &&
            //   userCredentialsFb.userType === "rider"
            // ) {
            //   Toast.show({
            //     text: "Already Registered as Rider",
            //     position: "bottom",
            //     duration: 1500
            //   });
            // }
            // if (
            //   data.success === true &&
            //   userCredentialsFb.userType === "driver"
            // ) {
            //   if (data.data.user.isApproved) {
            //     dispatch(driverRegisterSuccess(data));
            //     // dispatch(Actions.driverStartupService());
            //     dispatch(Actions.documents());
            //   } else {
            //     Alert.alert(
            //       "Registration Approval",
            //       "Your account will be updated in next 24Hrs."
            //     );
            //     dispatch(Actions.login({ type: ActionConst.RESET }));
            //   }
            // }
            if (
              data.success === false
            ) {
              if (data.message === "user already exist") {
                dispatch(driverRegisterSuccess(data));
                dispatch(Actions.driverStartupService());
              } else {
                dispatch(driverRegisterError(data));
              }
            }
          });
        })
        .catch(e => {
          // alert(e);
          dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        });
    } else {
      

      dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      dispatch(clearEntryPage());
      if (obj.success === true && obj.data.user.userType === "customer") {
        Toast.show({
          text: "Already registered as rider",
          position: "bottom",
          duration: 1500
        });
      }
      if (obj.success === true && obj.data.user.userType === "trainer") {
        dispatch(driverRegisterSuccess(obj));
        dispatch(Actions.driverStartupService());
      }

      if (obj.success === true && obj.data.user.userType === 'customer') {
        dispatch(customerRegisterSuccess(obj));
        //dispatch(customerNearByTrainers(obj.nearbytrainer));
        dispatch(Actions.customerStartupServices());
      }
    }
  };
}
