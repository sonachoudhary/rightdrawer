import config from "../../../config.js";



export const TRIP_HISTORY_FETCHED = "TRIP_HISTORY_FETCHED";
export const APPOINTMENT_LIST_FETCHED = "APPOINTMENT_LIST_FETCHED";
export const SHOW_SPINNER = "SHOW_SPINNER";
export function tripHistoryFetched(dataObj) {
  return {
    type: TRIP_HISTORY_FETCHED,
    payload: dataObj.data
  };
}

export function appointmentFetched(dataObj) {
  return {
    type: APPOINTMENT_LIST_FETCHED,
    payload: dataObj
  };
}

export function fetchTripHistoryAsync(jwtAccessToken) {
  return dispatch => {
    dispatch({ type: SHOW_SPINNER });
    fetch(`${config.serverSideUrl}:${config.port}/api/trips/history`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      }
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(tripHistoryFetched(data));
      })
      .catch(e => e);
  };
}

export function fetchAppointmentListAsync(user_id) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  var bodyData = {};
  bodyData.trainer_id = user_id;
  bodyData.time = today;
  

  return dispatch => {
    dispatch({ type: SHOW_SPINNER });
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/appoinmentlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(appointmentFetched(data));
      })
      .catch(e => e);
  };
}

export function fetchCustAppointListAsync(user_id) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  var bodyData = {};
  bodyData.customer_id = user_id;
  bodyData.time = today;
  

  return dispatch => {
    dispatch({ type: SHOW_SPINNER });
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/customerappoinmentlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(appointmentFetched(data));
      })
      .catch(e => e);
  };
}