import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const SET_CONFIRMED_BOOKING = "SET_CONFIRMED_BOOKING";
export const REMOVE_BOOKING_NOTIFICATION = "REMOVE_BOOKING_NOTIFICATION";
export const SET_TRAINER_AVAILAVILITY = "SET_TRAINER_AVAILAVILITY";
export const SET_FEEDBACK_DATA = "SET_FEEDBACK_DATA";
export const SET_TRAINER_REVIEW = "SET_TRAINER_REVIEW";
export const FAVORITE_TRAINER_LIST = "FAVORITE_TRAINER_LIST";
export const GROUP_APPOINTMENT_DATA = "GROUP_APPOINTMENT_DATA";
export const INDIVIDUAL_APPOINTMENT_DATA = "INDIVIDUAL_APPOINTMENT_DATA";

export function setFavriteTrainerList(data) {
  
  return {
    type: FAVORITE_TRAINER_LIST,
    payload: data
  };
}

export function setTrainerReview(data) {
  
  return {
    type: SET_TRAINER_REVIEW,
    payload: data
  };
}

export function callFeedbackData(data) {
 
  return {
    type: SET_FEEDBACK_DATA,
    payload: data
  };
}

export function setFeedbackData(data) {
  return (dispatch, getState) => {
    dispatch(callFeedbackData(data));
    Actions.feedback();
  }
}

export function setTrainerBookingConfirmed(data) {
  return {
    type: SET_CONFIRMED_BOOKING,
    payload: data
  };
}

export function removeTrainerBookingNotification() {
  return {
    type: REMOVE_BOOKING_NOTIFICATION,
    payload: null
  };
}

export function setAvailabilityProps (mode) {
  return {
    type: SET_TRAINER_AVAILAVILITY,
    payload: mode
  }; 
}


function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}


export function setAvailability(mode) {
  return (dispatch, getState) => {
    dispatch(setAvailabilityProps(mode));
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    bodyData.isAvailable = mode;

    fetch(`${config.serverSideUrl}:${config.port}/api/users/userstatus`, {
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
             
      });
    }
}

export function postTrainerReview(message,data,rating) {
  return (dispatch, getState) => {
    
    var bodyData = {};
    bodyData.review = message.message;
    bodyData.customer_id = data.customer_id;
    bodyData.trainer_id = data.trainer_id;
    bodyData.appointment_id = data.appointment_id;
    bodyData.rating = rating;

    fetch(`${config.serverSideUrl}:${config.port}/api/users/addreview`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        Actions.pop();
        Toast.show({
          text: "Thanks for the review",
          position: "bottom",
          duration: 4000,
        });        
      })
      .catch(e => {
               
      });
  }
}

export function getTrainerReview(trainer_id) {
  return (dispatch, getState) => {
    
    var bodyData = {};
    bodyData.trainer_id = trainer_id;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/getreview`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
              
        dispatch(setTrainerReview(data))  
      })
      .catch(e => {
                 
      });
  }
}


export function fetchFavorite() {
  return (dispatch, getState) => {
    
    var bodyData = {};
    bodyData.customer_id = getState().driver.user._id;
    

    fetch(`${config.serverSideUrl}:${config.port}/api/users/getfavoritetrainerlist`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
             
        dispatch(setFavriteTrainerList(data))  
      })
      .catch(e => {
               
      });
  }
}


export function confirmAppointmentCall(appointment_id) {
  const data = {};
  data.appointment_id = appointment_id;
  data.status = 'Confirm';
  
  return (dispatch, getState) => {
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/bookingconfirmed`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
               
      })
      .catch(e => {
         alert(e);        
      });
  };
}

export function completeAppointmentCall(appointment_id) {
  const data = {};
  data.appointment_id = appointment_id;
  data.status = 'Complete';
  
  return (dispatch, getState) => {
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/serviceCompleted`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
      
          Toast.show({
            text: "Session Complete",
            position: "bottom",
            duration: 4000,
            
          }); 
               
      })
      .catch(e => {
         alert(e);        
      });
  };
}

export function startSessionCall(appointment_id) {
  const data = {};
  data.appointment_id = appointment_id;
  data.status = 'Complete';
  
  return (dispatch, getState) => {
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/sessionInitited`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
      
          Toast.show({
            text: "Session Initite",
            position: "bottom",
            duration: 4000,
            
          }); 
               
      })
      .catch(e => {
         alert(e);        
      });
  };
}

export function startCustomerSessionCall(appointment_id) {
  const data = {};
  data.appointment_id = appointment_id;
  data.status = 'Complete';
  
  return (dispatch, getState) => {
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/sessionstarted`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
      
          Toast.show({
            text: "In Session",
            position: "bottom",
            duration: 4000,
            
          }); 
               
      })
      .catch(e => {
         alert(e);        
      });
  };
}
export function cancelCustomerSessionCall(appointment_id) {
  const data = {};
  data.appointment_id = appointment_id;
  data.status = 'Archive';
  
  return (dispatch, getState) => {
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/sessiondeclined`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {

      
          Toast.show({
            text: "Session Declined",
            position: "bottom",
            duration: 4000,
            
          }); 
               
      })
      .catch(e => {
         alert(e);        
      });
  };
}

export function declineAppointmentCall(appointment_id) {
  const data = {};
  data.appointment_id = appointment_id;
  data.status = 'Archive';
  
  return (dispatch, getState) => {
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/bookingconfirmed`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
               
      })
      .catch(e => {
         alert(e);        
      });
  };
}



export function setAppointmentDataStep1(data) {

  return {
    type: GROUP_APPOINTMENT_DATA,
    payload: data
  };
}

export function setAppointmentData(data) {
  return (dispatch, getState) => {  
    
    dispatch(setAppointmentDataStep1(data))  
    Actions.book2()      
  }
}

export function setIndividalAppointmentDataStep1(data) {
  return {
    type: INDIVIDUAL_APPOINTMENT_DATA,
    payload: data
  };
}

export function setIndividalAppointmentData(data) {
  return (dispatch, getState) => {    
    dispatch(setIndividalAppointmentDataStep1(data))  
    Actions.offerServiceStep2()      
  }
}

export function indvidualaAppointmentRequest(obj) {
  return (dispatch, getState) => {
    const data = obj;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    if(dd<10) { dd='0'+dd; } 
    if(mm<10) { mm='0'+mm; } 
    today = yyyy + '-' + mm + '-' + dd + ' ' + time ;
    
    data.status = 'Pending';
    data.latitude = getState().driver.user.gpsLoc[1];
    data.longitude = getState().driver.user.gpsLoc[0];
    data.bookingtype = "single";
    data.name='test';
    data.savetime = today;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/bookingappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(setTrainerBookingConfirmed(data))
        Actions.customerStartupServices();
            Toast.show({
                text: "Request Sent",
                position: "bottom",
                duration: 1500
            });

      })
      .catch(e => {
         alert(e);        
      });
  };
}

export function groupAppointmentRequest(obj) {  
  return (dispatch, getState) => {
    const data = obj;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    if(dd<10) { dd='0'+dd; } 
    if(mm<10) { mm='0'+mm; } 
    today = yyyy + '-' + mm + '-' + dd + ' ' + time ;
    
    data.status = 'Pending';
    data.latitude = getState().driver.user.gpsLoc[1];
    data.longitude = getState().driver.user.gpsLoc[0];
    data.bookingtype = "group";
    data.savetime = today;

     

    fetch(`${config.serverSideUrl}:${config.port}/api/users/bookinggroupappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setTrainerBookingConfirmed(data))
        Actions.customerStartupServices();
        Toast.show({
                text: "Request Sent",
                position: "bottom",
                duration: 1500
        });
      })
      .catch(e => {
         alert(e);        
      });
  };
}
