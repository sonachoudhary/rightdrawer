import { Actions } from "react-native-router-flux";
import { socailSignupSuccess } from "./entrypage";
import { registerAsyncFb } from "./register";
import { signinAsyncFb, signinAsync } from "./signin";
import config from "../../../config.js";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_RESPONSE = "USER_LOGIN_RESPONSE";
export const TRAINER_PROFILE_INFO = "TRAINER_PROFILE_INFO";
export const SET_TRAINER_PROFILE_ID = "SET_TRAINER_PROFILE_ID";
export const SET_NEAR_TRAINERS = "SET_NEAR_TRAINERS";
export const SET_TRAINERS_TRANSACTION = "SET_TRAINERS_TRANSACTION";
export const TRAINER_BANK_INFO = "TRAINER_BANK_INFO";
export const SET_CLASS_DATA = "SET_CLASS_DATA";
export const SET_REMAINING_TIMER = "SET_REMAINING_TIMER";
export const SET_LIST_ORDER= "SET_LIST_ORDER";
export const SET_GENDER_CHOICE = "SET_GENDER_CHOICE";

export function userLoginRequest() {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST });
  };
}

export function userLoginResponse() {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_RESPONSE });
  };
}

export function setTrainerProfileId(trainerId) {
  
  return {
    type: SET_TRAINER_PROFILE_ID,
    payload: trainerId
  };
}

export function trainerProfileInfo(data) {
  
  return {
    type: TRAINER_PROFILE_INFO,
    payload: data
  };
}

export function trainerBankInfo(data) {
  
  return {
    type: TRAINER_BANK_INFO,
    payload: data
  };
}

export function checkUser(obj, signInData) {
  const userCredentialsFb = obj;
  
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/checkUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentialsFb)
    })
      .then(resp => {        
        resp.json().then(data => {
         
          if (obj.request === "Register") {
            if (data.message === "User Exist") {
              dispatch(registerAsyncFb(data));
            } else {
              dispatch(socailSignupSuccess(signInData));
              dispatch(userLoginResponse());
            }
          } else if (obj.request === "Login") {
            if (data.message === "User Exist") {
              const userInfo = {
                email: data.data.user.email,
                password: signInData.id ? signInData.id : signInData.userID,
                userType: data.data.user.userType
              };
              dispatch(signinAsyncFb(userInfo));
            } else {
              dispatch(socailSignupSuccess(signInData));
              dispatch(userLoginResponse());
            }
          }
        });
      })
      .catch(e => {
        
      });
  };
}

export function getProfileData(user_id) {
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.customerId = getState().driver.user._id;
    bodyData.user_id = user_id;    

    fetch(`${config.serverSideUrl}:${config.port}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => {
        resp.json().then(data => {
          //dispatch(setTrainerProfileId(user_id));
          dispatch(trainerProfileInfo(data));
          Actions.trainerDetails();
        });
      })
      .catch(e => {
        
      });
  };
}

export function getProfileInfoData(user_id) {
  
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.customerId = getState().driver.user._id;
    bodyData.user_id = user_id;    

    fetch(`${config.serverSideUrl}:${config.port}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => {
        resp.json().then(data => {
         
          //dispatch(setTrainerProfileId(user_id));
          dispatch(trainerProfileInfo(data));
          dispatch(trainerBankInfo(data));
          //dispatch(Actions.trainerDetails());
        });
      })
      .catch(e => {
        
      });
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

export function getremaningtimer(data) {
  return {
    type: SET_REMAINING_TIMER,
    payload: data
  };
}
export function setlistorder(data) {
  return {
    type: SET_LIST_ORDER,
    payload: data
  };
}
export function setgenderchoice(data) {
  return {
    type: SET_GENDER_CHOICE,
    payload: data
  };
}


export function getNearByTrainers(latitude,longitude) {
  const data = { user_id : '', latitude : latitude, longitude : longitude };
  
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}:${config.port}/api/users/searchnearmatch`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        resp.json().then(data => { console.log('data',data);
          dispatch(customerNearByTrainers(data.data));
          //dispatch(setNearByTrainer(data.data));
          //dispatch(Actions.trainerDetails());
        });
      })
      .catch(e => {
        
      });
  };
}

export function gettransactionDataList(user_id) {
  const data = { user_id : user_id };
  
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}:${config.port}/api/users/transactionDataList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        resp.json().then(data => {
          dispatch(trainertransctionlist(data.data));
          //dispatch(setNearByTrainer(data.data));
          //dispatch(Actions.trainerDetails());
        });
      })
      .catch(e => {
        
      });
  };
}

export function withdrawTransaction(user_id) {
  const data = { user_id : user_id };
  
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}:${config.port}/api/users/withdrawTransactionData`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        resp.json().then(data => {
          
         //dispatch(trainertransctionlist(data.data));
          
        });
      })
      .catch(e => {
        
      });
  };
}

export function setClassProps(data) {
   
    return {
      type: SET_CLASS_DATA,
      payload: data
    };
}


export function setclassData(id,name) {
    const data = { id : id, name: name };
    return (dispatch, getState) => {
        dispatch(setClassProps(data));
        Actions.profilematch();
      }
  }



export function sortNearByTrainers(sortby,sorttype,latitude,longitude) {
  const data = { user_id : '', sortby: sortby, sorttype:sorttype, latitude : latitude, longitude : longitude };
    
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}:${config.port}/api/users/searchnearbytrainer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        resp.json().then(data => {
         
          dispatch(customerNearByTrainers(data.data));
          //dispatch(setNearByTrainer(data.data));
          //dispatch(Actions.trainerDetails());
        });
      })
      .catch(e => {
        
      });
  };
}

