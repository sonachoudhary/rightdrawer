import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const SET_TRAINER_AVAILAVILITY = "SET_TRAINER_AVAILAVILITY";

export function setAvailabilityProps (mode) {
  return {
    type: SET_TRAINER_AVAILAVILITY,
    payload: mode
  }; 
}

export function setFevorite(trainerId, favoriteStatus) {
  return (dispatch, getState) => {
    //dispatch(setAvailabilityProps(mode));
    var bodyData = {};
    bodyData.customerId = getState().driver.user._id;
    bodyData.trainerId = trainerId;
    bodyData.favoriteStatus = favoriteStatus;    

    fetch(`${config.serverSideUrl}:${config.port}/api/users/savefavorite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
              
      })
      .catch(e => {
         alert(e);        
      });
  }
}

export function postFeed(data) {
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.trainerId = getState().driver.user._id;
    bodyData.feed = data.message;
    

    fetch(`${config.serverSideUrl}:${config.port}/api/users/addnewsfeed`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
               
        Actions.newsFeed();
      })
      .catch(e => {
         alert(e);        
      });
  }
}