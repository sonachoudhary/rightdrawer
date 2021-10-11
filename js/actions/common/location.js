import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";



function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}


export function addLocation(data) {
  return (dispatch, getState) => {
    
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    bodyData.address = data.address;
    bodyData.landmark = data.landmark;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/addlocation`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        Actions.locations();
               
      })
      .catch(e => {
               
      });
  }
}
