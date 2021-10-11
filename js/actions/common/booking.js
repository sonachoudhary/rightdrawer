import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

const React = require('react-native');
const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;

export const BARBER_BOOKING_DATE = "BARBER_BOOKING_DATE";
export const BARBER_BOOKING_DATE_SLOT = "BARBER_BOOKING_DATE_SLOT";
export const BARBER_BOOKING_TIME = "BARBER_BOOKING_TIME";
export const BARBER_BOOKING_TIME_SLOT = "BARBER_BOOKING_TIME_SLOT";
export const BARBER_BOOKING_BARBER_ID = "BARBER_BOOKING_BARBER_ID";
export const BARBER_BOOKING_BARBER_NAME = "BARBER_BOOKING_BARBER_NAME";
export const BARBER_BOOKING_SERVICE_PRICE = "BARBER_BOOKING_SERVICE_PRICE";
export const BARBER_BOOKING_SERVICE_ID = "BARBER_BOOKING_SERVICE_ID";
export const BARBER_BOOKING_SERVICE_NAME = "BARBER_BOOKING_SERVICE_NAME";
export const BARBER_BOOKING_TIMESLOT = "BARBER_BOOKING_TIMESLOT";
export const BARBER_LIST = "BARBER_LIST";
export const APPONMENT_LIST = "APPONMENT_LIST";

export const BARBER_SERVICE = "BARBER_SERVICE";
export const SET_UPCOMING_APPOINTMENT_LIST = "SET_UPCOMING_APPOINTMENT_LIST";
export const BARBER_MONTH_EARNING = "BARBER_MONTH_EARNING";
export const SET_NOTIFICATION_LIST = "SET_NOTIFICATION_LIST";
export const NEAR_BARBER_LIST = "NEAR_BARBER_LIST";
export const NEAR_CUSTOMER_LIST = "NEAR_CUSTOMER_LIST";
export const BOOK_SET_USER_LOCATION = "BOOK_SET_USER_LOCATION";
export const ACCEPTED_CUSTOMER_NAME = "ACCEPTED_CUSTOMER_NAME";
export const BARBER_BOOKING_PAYMENT_METHOD = "BARBER_BOOKING_PAYMENT_METHOD";
export const BARBER_SPECIFIC_SERVICE = "BARBER_SPECIFIC_SERVICE";
export const TIME_SLOTS = "TIME_SLOTS";
export const SET_BARBER_POSITION = "SET_BARBER_POSITION";
export const EDIT_SERVICE_DATA = "EDIT_SERVICE_DATA";
export const SET_TRACK_APPOINTMENT = "SET_TRACK_APPOINTMENT";
export const SCHOOL_BOARD_CASTE = "SCHOOL_BOARD_CASTE";


export function schoolboardcaste(data) {
  return {
    type: SCHOOL_BOARD_CASTE,
    payload: data
  };
}
export function setNearbyBarber(data) {
  return {
    type: NEAR_BARBER_LIST,
    payload: data
  };
}


export function setTimeSolts(data) {
  return {
    type: TIME_SLOTS,
    payload: data
  };
}

export function setNearbyCustomer(data) {
  return {
    type: NEAR_CUSTOMER_LIST,
    payload: data
  };
}

export function setMonthlyEarning(data) {
  return {
    type: BARBER_MONTH_EARNING,
    payload: data
  };
}

export function setBookingDate(data) {
  return {
    type: BARBER_BOOKING_DATE_SLOT,
    payload: data
  };
}

export function setBookingDateRedu(data) {
  return {
    type: BARBER_BOOKING_DATE,
    payload: data
  };
}

export function setBookingAcceptedData(data) {
  return {
    type: ACCEPTED_CUSTOMER_NAME,
    payload: data
  };
}

export function setTrackAppointment(data) {
  return {
    type: SET_TRACK_APPOINTMENT,
    payload: data
  };
}

export function setBookingTime(time) {
  return {
    type: BARBER_BOOKING_TIME,
    payload: time
  };
}

export function setBookingTimeSlot(timeSlot) {
  return {
    type: BARBER_BOOKING_TIME_SLOT,
    payload: timeSlot
  };
}

export function setBookingBarberId(barber_id) {
  return {
    type: BARBER_BOOKING_BARBER_ID,
    payload: barber_id
  };
}

export function setBookingBarberName(barberName) {
  return {
    type: BARBER_BOOKING_BARBER_NAME,
    payload: barberName
  };
}

export function setBookingServiceId(service_id) {
  return {
    type: BARBER_BOOKING_SERVICE_ID,
    payload: service_id
  };
}

export function setBookingServiceName(service_name) {
  return {
    type: BARBER_BOOKING_SERVICE_NAME,
    payload: service_name
  };
}

export function setBookingPayMethod(paymethod) {
  return {
    type: BARBER_BOOKING_PAYMENT_METHOD,
    payload: paymethod
  };
}

export function setEditServiceData(data) {
  return {
    type: EDIT_SERVICE_DATA,
    payload: data
  };
}

export function setBookingServicePrice(service_price) {
  return {
    type: BARBER_BOOKING_SERVICE_PRICE,
    payload: service_price
  };
}

export function setBookingTimeSlots(data) {
  return {
    type: BARBER_BOOKING_TIMESLOT,
    payload: data
  };
}

export function setBookingBarberList(data) {
  return {
    type: BARBER_LIST,
    payload: data
  };
}
export function setAponmentBarberList(data) {
  return {
    type: APPONMENT_LIST,
    payload: data
  };
}

export function setBookingBarberService(data) {
  return {
    type: BARBER_SERVICE,
    payload: data
  };
}

export function setBarberService(data) {
  return {
    type: BARBER_SPECIFIC_SERVICE,
    payload: data
  };
}

export function setUpAppointmentList(data) {
  return {
    type: SET_UPCOMING_APPOINTMENT_LIST,
    payload: data
  };
}

export function setNotificationList(data) {
  return {
    type: SET_NOTIFICATION_LIST,
    payload: data
  };
}


export function setBarberPosition(data) {
  return {
    type: SET_BARBER_POSITION,
    payload: data
  };
}




export function bookingCompleted(id) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.appointment_id = id;
    bodyData.current_date = today;
    
    fetch(`${config.serverSideUrl}/index.php/completeappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.status === 200){
          dispatch(setUpAppointmentList(null))  
             
          dispatch(upcomingBooking(getState().driver.user._id));   
          Actions.BarberUpcoming();
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
    }
}

export function getTearms() {
  return (dispatch, getState) => {
    Actions.tearms();
  }
}

export function getPrivacy() {
  return (dispatch, getState) => {
    Actions.privacy();
  }
}

export function loadUpcommingList() {
  return (dispatch, getState) => {
    dispatch(setUpAppointmentList(null))  
    dispatch(upcomingBooking(getState().driver.user._id));   
    Actions.BarberUpcoming();
  }
}

export function getschoolboardcaste() {
  return (dispatch, getState) => {    
    fetch(`${config.serverSideUrl}/schoolbroadcasts/47`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setBookingBarberList(data.barberlist))        
        Actions.BookingSelect();
      })
      .catch(e => {
        
      });
    }
}

export function upcomingBooking(barber_id) {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.barber_id = barber_id;
    bodyData.current_date = today;
    
    fetch(`${config.serverSideUrl}/index.php/upcomingappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.status === 200){
          dispatch(setUpAppointmentList(data.appointment))  
        }
        Actions.BarberUpcoming();
      })
      .catch(e => {
             
      });
    }
}


export function setBookingStep1(barber_id, barberName) {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
    dispatch(setBookingBarberId(barber_id))
    dispatch(setBookingBarberName(barberName))

    var bodyData = {};
    bodyData.barber_id = barber_id;
    
    
    fetch(`${config.serverSideUrl}/index.php/getDate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setBookingDate(data.datelots))
        Actions.BookingDate() 
      })
      .catch(e => {
             
      });
    }
}

export function getBarberList() {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;

    

    fetch(`${config.serverSideUrl}/index.php/findBarbers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setBookingBarberList(data.barberlist))        
        Actions.BookingSelect();
      })
      .catch(e => {
        
      });
    }
}
export function getApponmentList() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  
  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd  ;

  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.barber_id = getState().driver.user._id;
    bodyData.today = today;

    

    fetch(`${config.serverSideUrl}/index.php/getbarberAvailbility`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setAponmentBarberList(data.timeslots))        
         //Actions.Availabilty();
      })
      .catch(e => {
        
      });
    }
}

export function setBookingStep3(time,timeSelectedSlot) {
  return (dispatch, getState) => {
    dispatch(setBookingTime(time))
    dispatch(setBookingTimeSlot(timeSelectedSlot))
    
    var bodyData = {};
    //bodyData.user_id = getState().driver.user._id;
    bodyData.user_id = getState().booking.bookingBarberId;
    

    fetch(`${config.serverSideUrl}/index.php/servicelist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
       
        dispatch(setBookingBarberService(data.services))
        Actions.BookingService()
      })
      .catch(e => {
             
      });
  }
}


export function setBookingStep2(date) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
    dispatch(setBookingDateRedu(date))
    
    var bodyData = {};
    bodyData.user_id = getState().booking.bookingBarberId;
    bodyData.current_time = today;
    bodyData.current_date = date;

    
        fetch(`${config.serverSideUrl}/index.php/getbarberAvailbileDatetime`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyData)
        })
        .then(resp => resp.json())
        .then(data => {
          
          dispatch(setBookingTimeSlots(data.timeslots))
          Actions.BookingTime() 
        })
        .catch(e => {
               
        });
    }
}

export function addBarberServices(data) {
  return (dispatch, getState) => {    
      var bodyData = {};
      bodyData.service_type = data.servicename;
      bodyData.price = data.serviceprice;
      bodyData.barber_id = getState().driver.user._id;
      

      fetch(`${config.serverSideUrl}/index.php/servicesadd`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })
      .then(resp => resp.json())
      .then(data => {
        
        Actions.ServiceList();
      })
      .catch(e => {
        
      });
    }
}

export function updateBarberServices(id,data) {
  return (dispatch, getState) => {    
    
    var bodyData = {};
    bodyData.service_id = id;
    bodyData.service_type = data.servicename;
    bodyData.price = data.serviceprice;
    bodyData.barber_id = getState().driver.user._id;
    

    fetch(`${config.serverSideUrl}/index.php/servicesupdate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => {
      
      Actions.ServiceList();
    })
    .catch(e => {
      
    });
  }
}

export function delBarberServices(id) {
  return (dispatch, getState) => {    
    var bodyData = {};
    bodyData.service_id = id;
    

    fetch(`${config.serverSideUrl}/index.php/servicesdelete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => {
      
      Actions.ServiceList();
    })
    .catch(e => {
      
    });
  }
}


export function editService(data) {
  return (dispatch, getState) => {    
    
    dispatch(setEditServiceData(data));
    Actions.EditService();
  }
}

export function getBarberServices() {
  return (dispatch, getState) => {    
      var bodyData = {};
      bodyData.user_id = getState().driver.user._id;
        
      fetch(`${config.serverSideUrl}/index.php/servicelist`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setBarberService(data.services));
      })
      .catch(e => {
        
      });
    }
}

export function setBookingStep4(service_id, service_name, service_price) {
  return (dispatch, getState) => {
    dispatch(setBookingServiceId(service_id));
    dispatch(setBookingServiceName(service_name));
    dispatch(setBookingServicePrice(service_price));
    Actions.BookingPayMethod()
  }
}

export function setBookingStep5(paymethod) {
  return (dispatch, getState) => {
    dispatch(setBookingPayMethod(paymethod));
    Actions.BookingDetail()
  }
}

export function setBookingStepFinal(user_id) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.customer_id = getState().driver.user._id;
    bodyData.barber_id = getState().booking.bookingBarberId;
    bodyData.service_type = getState().booking.bookingServiceId;
    bodyData.date = getState().booking.bookingDate;
    bodyData.slot = getState().booking.bookingTime;
    bodyData.paymentMethod = getState().booking.bookingBarberPayMethod;
    bodyData.current_date = today;
    

    fetch(`${config.serverSideUrl}/index.php/bookappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.status === 200) {
          
          Toast.show({
            text: data.message,
            position: "top",
            duration: 1500,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          });
          Actions.BookingSuccess()  
        }        

        if(data.status === 400) {
          
          if(data.code == "LIMIT_EXCEEDED") {
            
            Toast.show({
              text: data.message,
              position: "top",
              duration: 5000,
              textStyle: { textAlign: "center", width: deviceWidth - 50}
            });
            Actions.SubscriptionPanel();
          }
        }

      })
      .catch(e => {
             
      });
    }
}

export function acceptAppointment(id) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.appointment_id = id;
    bodyData.current_date = today;
          
    fetch(`${config.serverSideUrl}/index.php/confirmappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.status === 200) {
          
          Toast.show({
            text: "You successfully accepted a booking",
            position: "top",
            duration: 1500,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          });
          dispatch(setBookingAcceptedData(data.customerName));  
          Actions.BarberAcceptSuccess()
          //Actions.BarberHome();
        }   

        if(data.status === 400) {
          
          if(data.code == "LIMIT_EXCEEDED") {
            
            Toast.show({
              text: data.message,
              position: "top",
              duration: 5000,
              textStyle: { textAlign: "center", width: deviceWidth - 50}
            });
            Actions.SubscriptionPanel();
          }
        }

      })
      .catch(e => {
             
      });
    }
}

export function rejectAppointment(id) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.appointment_id = id;
    bodyData.current_date = today;
          
    fetch(`${config.serverSideUrl}/index.php/declineappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
                
          Toast.show({
            text: data.message,
            position: "top",
            duration: 1500,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          }); 
      })
      .catch(e => {
             
      });
    }
}

export function deleteAppointment(id) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  if(dd<10) { dd='0'+dd; } 
  if(mm<10) { mm='0'+mm; } 
  today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

  return (dispatch, getState) => {
      var bodyData = {};
      bodyData.appointment_id = id;
      bodyData.current_date = today;
             
      fetch(`${config.serverSideUrl}/index.php/deleteappointment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })
      .then(resp => resp.json())
      .then(data => {
          
          Toast.show({
            text: data.message,
            position: "top",
            duration: 1500,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          }); 
      })
      .catch(e => {
             
      });
    }
}

export function getMonthEarning(date) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.barber_id = getState().driver.user._id;
    
    if(date){
      bodyData.current_date = date;
    } else {
      bodyData.current_date = today;
    }
    
    fetch(`${config.serverSideUrl}/index.php/monthappointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        dispatch(setMonthlyEarning(data));
        
      })
      .catch(e => {
             
      });
    }
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


export function getNotificationList() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (dispatch, getState) => {
    dispatch(setNotificationList(null))

    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    bodyData.user_type = getState().driver.appState.userType;
    bodyData.current_date = today;

    
    fetch(`${config.serverSideUrl}/index.php/notificationlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.status === 200){
          
          dispatch(setNotificationList(data.notification))
          Actions.notifications()
        }        
      })
      .catch(e => {
             
      });
  }
}



export function getNearbyBarber() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (dispatch, getState) => {
    //currentLocationUser().then(
      //position => {
        //dispatch(setUserLocation(position));

        var bodyData = {};
        bodyData.lat = (getState().driver.user.latitude) ? getState().driver.user.latitude : null;
        bodyData.lng = (getState().driver.user.longitude) ? getState().driver.user.longitude : null;
        bodyData.user_id = getState().driver.user._id;
        bodyData.user_type = getState().driver.appState.userType;
        bodyData.current_date = today;

        

        fetch(`${config.serverSideUrl}/index.php/getnearbybarber`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyData)
        })
          .then(resp => resp.json())
          .then(data => {
            
            if(data.status === 200) {          
              dispatch(setNearbyBarber(data.userDetail))
              Actions.CustomerGeoFence();
            }        
            if(data.status === 400) {     
              // currentLocationUser().then(
              //   position => {
              //     dispatch(setUserLocation(position));
              // });
              Toast.show({
                text: data.message,
                position: "bottom",
                duration: 3000,
                textStyle: { textAlign: "center", width: deviceWidth - 50}
              });
            }        
          })
          .catch(e => {
                 
          });
    //});


    
  }
}

export function setUserLocation(position) {
  return {
    type: BOOK_SET_USER_LOCATION,
    payload: position.coords
  };
}

export function setUserLocationNew(position) {
  return {
    type: BOOK_SET_USER_LOCATION,
    payload: position
  };
}


export function currentLocationUser() {
  return new Promise((resolve, reject) => {
  //return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        
        resolve(position);
      },
      () => console.log('not found'),
      { }
    );

    navigator.geolocation.watchPosition(
      position => {
        
        resolve(position);
      },
      error => {
        
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  //};
  });
}

export function getNearbyCustomer() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (dispatch, getState) => {

    //currentLocationUser().then(
      //position => {
        //dispatch(setUserLocation(position));

        var bodyData = {};
        bodyData.lat = (getState().driver.user.latitude) ? getState().driver.user.latitude : null;
        bodyData.lng = (getState().driver.user.longitude) ? getState().driver.user.longitude : null;
        bodyData.user_id = getState().driver.user._id;
        bodyData.user_type = getState().driver.appState.userType;
        bodyData.current_date = today;

        

        fetch(`${config.serverSideUrl}/index.php/getnearbycustomer`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyData)
        })
          .then(resp => resp.json())
          .then(data => {
            
            if(data.status === 200){
              
              dispatch(setNearbyCustomer(data.userDetail))
              Actions.TrainerGeoFence();
            }       
            if(data.status === 400) {  
              // currentLocationUser().then(
              //   position => {
              //     dispatch(setUserLocation(position));
              // });        
              Toast.show({
                text: data.message,
                position: "bottom",
                duration: 3000,
                textStyle: { textAlign: "center", width: deviceWidth - 50}
              });
            }         
          })
          .catch(e => {
                 
          });
    //});

    
  }
}


export function getTimeSlotsBarber() {
  return (dispatch, getState) => {
    var bodyData = {};
    
    fetch(`${config.serverSideUrl}/index.php/getTime`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
          
          dispatch(setTimeSolts(data.timeslots)) 
      })
      .catch(e => {
             
      });
    }
}

export function setAvailabilityBarber(selectedDay, repeat, startTime, endTime,bookingType) {
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.barber_id = getState().driver.user._id;
    bodyData.day = selectedDay;
    bodyData.repeat = repeat;
    bodyData.bookingType = bookingType;
    bodyData.start_time = startTime;
    bodyData.end_time = endTime;
        
    fetch(`${config.serverSideUrl}/index.php/setAvailbility`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
              
          Toast.show({
            text: data.message,
            position: "bottom",
            duration: 3000,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          });
          Actions.BarberHome();
      })
      .catch(e => {
             
      });
    }
}

export function startWalkForAppointment(appointment_id) {
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.barber_id = getState().driver.user._id;
    bodyData.appointment_id = appointment_id;
    dispatch(setTrackAppointment(appointment_id));
    

    fetch(`${config.serverSideUrl}/index.php/sessionstart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
               
          Toast.show({
            text: data.message,
            position: "bottom",
            duration: 3000,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          });
            dispatch(setBarberPosition(data.barber_position)) 
          Actions.CustomerWalk();
      })
      .catch(e => {
             
      });
    }
}


export function trackForAppointment(appointment_id) {
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.barber_id = getState().driver.user._id;
    bodyData.appointment_id = appointment_id;
    dispatch(setTrackAppointment(appointment_id));
    

    fetch(`${config.serverSideUrl}/index.php/sessionstart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
      .then(resp => resp.json())
      .then(data => {
              
          Toast.show({
            text: data.message,
            position: "bottom",
            duration: 3000,
            textStyle: { textAlign: "center", width: deviceWidth - 50}
          });
            dispatch(setBarberPosition(data.barber_position)) 
          Actions.BarberWalk();
      })
      .catch(e => {
             
      });
    }
}