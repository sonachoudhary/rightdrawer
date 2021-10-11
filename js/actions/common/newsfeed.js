import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const SET_NEWS_FEED_TRAINER = "SET_NEWS_FEED_TRAINER";
export const SET_NEWS_FEED_CUSTOMER = "SET_NEWS_FEED_CUSTOMER";

export function newsFetched(data) {
  return {
    type: SET_NEWS_FEED_TRAINER,
    payload: data
  };
}

export function newsFetchedCustomer(data) {
  return {
    type: SET_NEWS_FEED_CUSTOMER,
    payload: data
  };
}


function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}

export function fetchNewsListAsync(user_id) {
  var bodyData = {};
  bodyData.trainerId = user_id;
  
  return dispatch => {
    fetch(`${config.serverSideUrl}:${config.port}/api/users/trainernewsfeed`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(newsFetched(data));
      })
      .catch(e => e);
  };
}


export function fetchNewsListCustomerAsync(user_id) {
  var bodyData = {};
  bodyData.customer_id = user_id;
  
  return dispatch => {
    fetch(`${config.serverSideUrl}:${config.port}/api/users/getfavoritenewsfeed`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(newsFetchedCustomer(data));
      })
      .catch(e => e);
  };
}