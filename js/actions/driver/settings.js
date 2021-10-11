import { Toast } from "native-base";
import config from "../../../config.js";
import { updateIsAvailable } from "../../services/driversocket";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
export const SET_HOME_ADDRESS = "SET_HOME_ADDRESS";
export const PROFILE_PROGRESS = "PROFILE_PROGRESS";
export const UPDATE_PROFILE_SPEACIALITY = "UPDATE_PROFILE_SPEACIALITY";
import { Actions } from "react-native-router-flux";

export function profileUpdated(data) {
  return {
    type: PROFILE_UPDATED,
    payload: data
  };
}

export function profileProgress() {
  return {
    type: PROFILE_PROGRESS
  };
}

export function setHomeAddress(address) {
  return {
    type: SET_HOME_ADDRESS,
    payload: address
  };
}

export function updateProfileArray(address) {
  return {
    type: UPDATE_PROFILE_SPEACIALITY,
    payload: address
  };
}

export function updateAvailable(userDetails) {
  return (dispatch, getState) => {
    updateIsAvailable(userDetails);
  };
}

export function updateUserProfileAsync(userDetails) {
  return (dispatch, getState) => {
    
    //dispatch(updateProfileArray(getState().selectedSpecialty));
    userDetails.user_id = getState().driver.user._id;
    //userDetails.jwtAccessToken = getState().driver.appState.jwtAccessToken;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/updatebio`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: '',//userDetails.jwtAccessToken
      },
      body: JSON.stringify(userDetails)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(profileUpdated(data));
        Actions.pop();
        Toast.show({
          text: "Profile Updated",
          position: "bottom",
          duration: 1500
        });
      })
      .catch(e => {
        
        Toast.show({
          text: "Error while updating profile",
          position: "bottom",
          duration: 1500
        });
      });
  };
}

export function updateUserFormsDetails(userDetails) {
  return (dispatch, getState) => {
    //userDetails.jwtAccessToken = getState().driver.appState.jwtAccessToken;
    fetch(`${config.serverSideUrl}:${config.port}/api/payment/addBankdetail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ''//userDetails.jwtAccessToken
      },
      body: JSON.stringify(userDetails)
    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.message!=""){ 
          Toast.show({
              text: data.message,
              position: "bottom",
              duration: 3500
            });
          
        }else {
          Toast.show({
            text: "Bank Detail Updated",
            position: "bottom",
            duration: 3500
          });
        }
        
      })
      .catch(e => {
       
        Toast.show({
          text: "Incorrect Bank Detail",
          position: "bottom",
          duration: 3500
        });
      });

      //Actions.pop();
  };
}

export function updateUserProfilePicAsync(userDetails, type) {
  return (dispatch, getState) => {
    dispatch(profileProgress());
    //userDetails.jwtAccessToken = getState().driver.appState.jwtAccessToken;
    const imageData = new FormData();
    imageData.append("image", {
      uri: userDetails.localUrl,
      name: `${userDetails.fname}.jpg`,
      type: "image/jpg"
    });
    imageData.append(userDetails);
    imageData.append("updateType", type);
    fetch(`${config.serverSideUrl}:${config.port}/api/users/upload`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: '',//userDetails.jwtAccessToken,
        updateType: type
      },
      body: imageData
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          dispatch(profileUpdated(data));
          Toast.show({
            text: "Updated",
            position: "bottom",
            duration: 1500
          });
          type === "profile" ? null : Actions.pop();
        } else {
          Toast.show({
            text: "Error while updating profile",
            position: "bottom",
            duration: 1500
          });
        }
      })
      .catch(e => e);
  };
}
