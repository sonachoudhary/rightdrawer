import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const NOTIFICATION_LIST = "NOTIFICATION_LIST";

export const LOCATION_LIST = "LOCATION_LIST";

export const SETLOCATION_LIST = "SETLOCATION_LIST";

export const ABOUT_DATA = "ABOUT_DATA";

export function setAboutData(data) {
  return {
    type: ABOUT_DATA,
    payload: data
  };
}

export function setNotificationList(data) {
  return {
    type: NOTIFICATION_LIST,
    payload: data
  };
}

export function setLocationList(data) {
  return {
    type: LOCATION_LIST,
    payload: data
  };
}

export function setremoveLocationList(data) {
  return {
    type: SETLOCATION_LIST,
    payload: NULL
  };
}


function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}


export function fetchNotification() {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/getnotification`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(setNotificationList(data))  
      })
      .catch(e => {
                 
      });
  }
}

export function fetchLocation(user_id) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.user_id = user_id
     dispatch(setremoveLocationList())  

    fetch(`${config.serverSideUrl}:${config.port}/api/users/getlocation`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setLocationList(data))  
      })
      .catch(e => {
               
      });
  }
}

export function deleteNotification(notification_id) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.notification_id = notification_id;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/deletenotification`, {
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
          text: "Notification Deleted",
          position: "bottom",
          duration: 1500
        });
      })
      .catch(e => {
             Toast.show({
              text: "Error while deleting",
              position: "bottom",
              duration: 1500
            }); 
      });
  }
}


export function readNotification(notification_id) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.notification_id = notification_id;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/readNotification`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
       
      })
      .catch(e => {
             
      });
  }
}

export function confirmNotification(booking_id,trainerProfileId) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.trainerprofileid = trainerProfileId;
    bodyData.appointment_id = booking_id;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/bookingaccepted`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
      })
      .catch(e => {
                
      });
  }
}

export function confirmBooking(booking_id,status) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.status = status;
    bodyData.appointment_id = booking_id;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/bookingconfirmed`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
      })
      .catch(e => {
              
      });
  }
}




export function fetchAbout(user_id) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.title = 'aboutus';
    fetch(`${config.serverSideUrl}:${config.port}/api/users/pages`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(setAboutData(data))  
      })
      .catch(e => {
                
      });
  }
}

export function getProfile(user_id) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.user_id = user_id;
    fetch(`${config.serverSideUrl}:${config.port}/api/users/getbio`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {

        
        dispatch(setAboutData(data))  
      })
      .catch(e => {
              
      });
  }
}
