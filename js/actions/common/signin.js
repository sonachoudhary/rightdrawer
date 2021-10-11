import { Actions, ActionConst } from "react-native-router-flux";

import config from "../../../config.js";
import { Toast } from "native-base";
import _ from "lodash"
//import firebase from '@react-native-firebase/app';
//import messaging from '@react-native-firebase/messaging';
//import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const DRIVER_LOGIN_SUCCESS = "DRIVER_LOGIN_SUCCESS";
export const DRIVER_LOGIN = "DRIVER_LOGIN";
export const CUSTOMER_LOGIN_SUCCESS = "CUSTOMER_LOGIN_SUCCESS";
export const SCHOOL_LOGIN_SUCCESS = "SCHOOL_LOGIN_SUCCESS";
export const DELETEHOMEWORK="DELETEHOMEWORK";
export const SET_NEAR_TRAINERS = "SET_NEAR_TRAINERS";
export const DRIVER_LOGIN_ERROR = "DRIVER_LOGIN_ERROR";
export const SET_APPOINTMENT_LIST = "SET_APPOINTMENT_LIST";
export const LOGOUT_USER = "LOGOUT_USER";  
 export const CREATE_HOMEWORK = "CREATE_HOMEWORK";  
export const EDITHOMEWORK="EDITHOMEWORK";
export const PROFILE_DATA = "PROFILE_DATA";
export const STUDENT_PROFILE_DATA = "STUDENT_PROFILE_DATA";
export const TEACHER_BOARD_CASTE = "TEACHER_BOARD_CASTE";
export const STUDENT_HOMEWORK="STUDENT_HOMEWORK";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_RESPONSE_RECEIVED = "LOGIN_RESPONSE_RECEIVED";
export const CHANGE_LOGIN_ERROR_STATUS = "CHANGE_LOGIN_ERROR_STATUS";
export const SET_TRAINERS_TRANSACTION = "SET_TRAINERS_TRANSACTION";
export const SET_FORGOT_EMAIL = "SET_FORGOT_EMAIL";
export const SET_FORGOT_EMAIL_ERROR = "SET_FORGOT_EMAIL_ERROR";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_PHOTO_UPDATE_SUCCESS = "PROFILE_PHOTO_UPDATE_SUCCESS";
export const UPDATE_CUSTOMER_TRACKING_COORDS = "UPDATE_CUSTOMER_TRACKING_COORDS";
export const UPDATE_BARBER_TRACKING_COORDS = "UPDATE_BARBER_TRACKING_COORDS";
export const PUSH_TOKEN = "PUSH_TOKEN";
export const ACCESS_JWTTOKEN = "ACCESS_JWTTOKEN";
export const SCHOOL_BOARD_CASTE = "SCHOOL_BOARD_CASTE";
export const HOMEWORK = "HOMEWORK";
export const TEACHALLBOARDCASTS="TEACHALLBOARDCASTS";
export const HOMEWORK_LIST="HOMEWORK_LIST";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const SET_SERVED_APPOINTMENT = "SET_SERVED_APPOINTMENT";
export const SET_CANCLE_APPOINTMENT = "SET_CANCLE_APPOINTMENT";
export const LIST_CLASS="LIST_CLASS";
export const SUBJECT_LIST="SUBJECT_LIST";
export const ASSIGNMENTS="ASSIGNMENTS";
export const SUBJECT_ASSIGNMENTS_LIST="SUBJECT_ASSIGNMENTS_LIST";
export const SUBMIT_HOME_WORK="SUBMIT_HOME_WORK";
export const QUIZ_CREATE="QUIZ_CREATE";
export const PASS_CHANGE="PASS_CHANGE";
export const CHAPTER="CHAPTER";
export const OBJECTIVE="OBJECTIVE";
export const LOGIN_FAIL="LOGIN_FAIL";
export const CREATE_PAPER="CREATE_PAPER";
export const EDIT_OBJECTIVE="EDIT_OBJECTIVE";
export const DELETE_PAPER="DELETE_PAPER";
export const EDIT_PAPAER="EDIT_PAPAER";
import AsyncStorage from '@react-native-community/async-storage';
const React = require('react-native');
const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;
var jwtDecode = require('jwt-decode');


export function setAppointmentList(data) {
  return {
    type: SET_APPOINTMENT_LIST,
    payload: data
  };
}

export function setCancledAppointment(count) {
  return {
    type: SET_CANCLE_APPOINTMENT,
    payload: count
  };
}
export function loginfail(data) {
  return {
    type: LOGIN_FAIL,
    payload: data
  };
}

export function setServedAppointment(count) {
  return {
    type: SET_SERVED_APPOINTMENT,
    payload: count
  };
}

export function setForgotEmailError(message) {
  return {
    type: SET_FORGOT_EMAIL_ERROR,
    payload: message
  };
}

export function setForgotEmail(email) {
  return {
    type: SET_FORGOT_EMAIL,
    payload: email
  };
}
export function createpaperbyteacher(){
  return {
    type: CREATE_PAPER,
    payload: email
  };
}

export function setUserLocation(position) {
  return {
    type: SET_USER_LOCATION,
    payload: position.coords
  };
}

 export function editchapterobjective(data){
    return {
    type: EDIT_OBJECTIVE,
    payload: position.coords
  };
 }

export function driverSigninSuccess(data) {
  return {
    type: DRIVER_LOGIN_SUCCESS,
    payload: data
  };
}
export function DriverSignin(data) {
  return {
    type: DRIVER_LOGIN,
    payload: data
  };
}
export function AccesstokenSuccess(data) {
  return {
    type: ACCESS_JWTTOKEN,
    payload: data
  };
}
export function NewaccesstokenSuccess(data) {
  return {
    type: PASS_CHANGE,
    payload: data
  };
}
  export function createchapterobjectivedata(data){
    return {
    type: OBJECTIVE,
    payload: data
  };
  }

export function profileUpdateSuccess(data) {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    payload: data
  };
}
export function editpaperbyteacher(data){
   return {
    type: EDIT_PAPAER,
    payload: data
  };
}


export function profileUpdateSuccessPhoto(data) {
  return {
    type: PROFILE_PHOTO_UPDATE_SUCCESS,
    payload: data
  };
}
export function homeworkslist(data) {
  return {
    type: HOMEWORK_LIST,
    payload: data
  };
}

export function classlist(data) {
  return {
    type: LIST_CLASS,
    payload: data
  };
}
export function getchapterlist(data) {
  return {
    type: ASSIGNMENTS,
    payload: data
  };
}
export function submithomeworks(data) {
  return {
    type: SUBMIT_HOME_WORK,
    payload: data
  };
}


export function deletepaperr(data){
   return {
    type: DELETE_PAPER,
    payload: data
  };
}


export function createquiz(data) {
  
  return {
    type: QUIZ_CREATE,
    payload: data
  };
}

export function customerSigninSuccess(data) {
  return {
    type: CUSTOMER_LOGIN_SUCCESS,
    payload: data
  };
}
export function SchoolSigninSuccess(data) {
  
  return {
    type: SCHOOL_LOGIN_SUCCESS,
    payload: data
  };
}


export function createchapterbyteacher(data){
  return {
    type: CHAPTER,
    payload: data
  };
}

export function logOutUser() {
  return {
    type: LOGOUT_USER
  };
}
export function createhomeworks(){
  return {
    type:CREATE_HOMEWORK
  };
}
export function getprofiledata(data) {
  return {
    type: PROFILE_DATA,
    payload: data
  };
}
export function getstudentdata(data) {
  return {
    type: STUDENT_PROFILE_DATA,
    payload: data
  };
}
export function getschoolboardcaste(data) {
  return {
    type: SCHOOL_BOARD_CASTE,
    payload: data
  };
}
export function getteacherboardcaste(data) {
  return {
    type: TEACHER_BOARD_CASTE,
    payload: data
  };
}
export function editchapter(data){
   return {
    type: EDIT_CHAPTER,
    payload: data
  };
}

export function getteacherhomeworks(data) {
  return {
    type: HOMEWORK,
    payload: data
  };
}
export function deletechapterrr(data){
  return {
    type: DELETE_CHAPTER,
    payload: data
  };
}
export function teacherAllbroadcasts(data) {
  return {
    type: TEACHALLBOARDCASTS,
    payload: data
  };
}
 export function edithomeworks(data){
  return {
    type: EDITHOMEWORK,
    payload: data
  };
 }
 export function deletehomeworks(data){
  return {
    type: DELETEHOMEWORK,
    payload: data
  };
 }
 export function getstudenthomeworks(data){
  return {
    type: STUDENT_HOMEWORK,
    payload: data
  };
 }
 export function subjectlist(data){
  return {
    type: SUBJECT_LIST,
    payload: data
  };
 }
 export function subjectassignmentslist(data){
  return {
    type: SUBJECT_ASSIGNMENTS_LIST,
    payload: data
  };
 }
 
 
 
 

export function logOutUserAsync(jwtAccessToken) {

  return dispatch => {
    // this.deleteToken().then((data) => {
    // })
    fetch(`${config.serverSideUrl}:${config.port}/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      }
    })
      .then(resp => resp.json())
      .then(data => {
        
         dispatch(logOutUser());
          Actions.login({ type: ActionConst.RESET });
        //
        
      })
      .catch(e => e);
    dispatch(logOutUser());
    Actions.login({ type: ActionConst.RESET });
  };
}

function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}

export function currentLocationUser() {
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        //alert(position.coords.latitude+'=='+position.coords.longitude);
        dispatch(setUserLocation(position));
      },
      () => console.log('not found'),
      { }
    );

    
  };
}

function setTokan(token) {
  return {
    type: PUSH_TOKEN,
    payload: token
  }
}
// function setCookie(token) {
//   return {
//     type: ACCESS_TOKEN,
//     payload: token
//   }
// }

getToken = async () => {
  const fcmToken = await AsyncStorage.getItem("FCM_TOCKEN_HTC");  
  if (fcmToken) {
        
    setTokan(fcmToken);  
    return (fcmToken);                 
  }  
}

 

deleteToken = async () => {
 // await messaging().deleteToken();
  return (true);  
}



export function signinAsync(obj) {

  const userCredentials = obj;
  
  return (dispatch,getState) => {
    dispatch(currentLocationUser());
    dispatch({ type: REQUEST_LOGIN });


      var bodyData = {};
      bodyData = jsonConcat(bodyData, obj);
     
     

      fetch(`${config.serverSideUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
         body: JSON.stringify(bodyData)
      })
        .then(resp => resp.json())

        .then(data => {
          if(data!=null){
          // dispatch({ type: LOGIN_RESPONSE_RECEIVED });
            var Cookie=data.access_token;
            
            var decoded = jwtDecode(data.access_token);
             var api_resp=decoded
             var userType=decoded.role
             
           dispatch(AccesstokenSuccess(Cookie));
           
          //alert(userType)
          if ( userType == "Teacher") {
                dispatch(customerSigninSuccess(decoded)); 
              Actions.CustomerHome();
            
            
          } else if( userType == "Student"){
             dispatch(driverSigninSuccess(decoded));
             Actions.BarberHome();
          } else if(userType == "School"){
             dispatch(SchoolSigninSuccess(decoded));     
             Actions.SchoolHome();
          }else if(userType=="Driver"){
            dispatch(DriverSignin(decoded));     
             Actions.CustomerGeoFence();
          }

         }else{
          alert('Something went wrong')
         }
        })
        .catch(e => {
          alert("Email or password went wrong")
         
          dispatch({ type: LOGIN_RESPONSE_RECEIVED });
        });
     
    
    
  };
}


export function getprofileteacherdata(jwtAccessToken,id) {
  // var userid = 1;
  //
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}/teacherinfo/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Cookie:'token='+jwtAccessToken
      }

    })
      .then(resp => resp.json())
      .then(data => {

        if(data.error && data.error.message=="Token Expired"){
           dispatch(loginfail(data))
          
            
        }else if(data){
          
           dispatch(getprofiledata(data))
        }
      })
      .catch(e => {
              alert(e)
      });
    
}
}
export function getprofilestudentdata(jwtAccessToken,id) { 
 
  
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}/studentinfo/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Cookie:'token='+jwtAccessToken
      }

    })
      .then(resp => resp.json())
      .then(data => {
        
        if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
             dispatch(getstudentdata(data)) 
        }
      })
      .catch(e => {
             alert('something went wrong')
      });
    
}
}



export function schoolboardcaste(jwtAccessToken,schoolid) {
  
  return (dispatch, getState) => {    
   
   fetch(`${config.serverSideUrl}/schoolbroadcasts/${schoolid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
     
    })
    .then(resp => resp.json())
    .then(data => { 
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
            dispatch(getschoolboardcaste(data)) 
        }
     
    })
    .catch(e => {
              
    });
  }
}
export function teacherboardcaste(jwtAccessToken,userid,schoolid) {
 
  return (dispatch, getState) => {    
   
   fetch(`${config.serverSideUrl}/teacherbroadcasts/${schoolid}/${userid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
     
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
           dispatch(getteacherboardcaste(data))
        }
    })
    .catch(e => {
            
    });
  }
}
export function teacherhomeworks(jwtAccessToken,userid) {
  
  return (dispatch, getState) => {    
   
   fetch(`${config.serverSideUrl}/teacherhomeworks/${userid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
     
    })
    .then(resp => resp.json())
    .then(data => { 
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
           dispatch(getteacherhomeworks(data))
        }
      
      
     })
    .catch(e => {
             
    });
  }
}




export function teacherAllboardcaste(jwtAccessToken,schoolid,teacherid) {
  
  return (dispatch, getState) => {    
   
   fetch(`${config.serverSideUrl}/teacherAllbroadcasts/${schoolid}/${teacherid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
     
    })
    .then(resp => resp.json())
    .then(data => {
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
            dispatch(teacherAllbroadcasts(data)) 
        }
      
     })
    .catch(e => {
              
    });
  }
}



export function createhomeworksbyteacher(jwtAccessToken,data) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/homeworkcreate`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
              date:data.date,
              schoolid:data.schoolid,
              teacherid:data.teacherid,
              classid:data.classid,
              subjectid:data.subjectid,
              submitable:data.checked,
              title:data.title,
              description:data.description,
              filedata:data.filedata
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
       var   tokenData=data.token;
      

      for(var i=0; i<tokenData.length; i++){

         const userEmail = { message:data.message,
          token: tokenData[i]};
        
          fetch(`http://54.160.96.88:13678/callpushNotification`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmail)
        })
          .then(response => response.json())
          .then(data => {
            
          })
          .catch(error => {
            // alert('fa')
          });
      }
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
          
            dispatch(createhomeworks(data)) 
        }
      
    })
    .catch(e => {

             
    });
  }
}
export function createpaper(jwtAccessToken,data) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/paper/create`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
              title:data.title,
              start:data.starttime,
              end:data.endtime,
              schoolid:data.schoolid,
              teacherid:data.teacherid,
              classid:data.classid,
              subjectid:data.subjectid,
              questions:data.newarr.questions,
              
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      
       var   tokenData=data.token;
      

      for(var i=0; i<tokenData.length; i++){

         const userEmail = { message:data.message,
          token: tokenData[i]};
          
          fetch(`http://54.160.96.88:13678/callpushNotification`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmail)
        })
          .then(response => response.json())
          .then(data => {
            
          })
          .catch(error => {
            // alert('fa')
          });
      }
      if(data.error){
        alert('Something went wrong')
           dispatch(loginfail(data))
          
            
        }else if(data){
          alert('Paper created successfully');
          
            dispatch(createpaperbyteacher(data)) 
        }
      
    })
    .catch(e => {
      
             
    });
  }
}

export function editpaper(jwtAccessToken,data) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/paper/edit`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
              id:data.id,
              title:data.title,
              start:data.starttime,
              end:data.endtime,
              schoolid:data.schoolid,
              teacherid:data.teacherid,
              classid:data.classid,
              subjectid:data.subjectid,
              questions:data.newarr.questions,
              
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
          
            dispatch(editpaperbyteacher(data)) 
        }
      
    })
    .catch(e => {

            
    });
  }
}
export function edithomeworksbyteacher(jwtAccessToken,data) {
 
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/homework/edit`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
               id:data.id,
              schoolid:data.schoolid,
              teacherid:data.teacherid,
              classid:data.classid,
              subjectid:data.subjectid,
              submitable:data.submitable,
              title:data.title,
              description:data.description,
              
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
             dispatch(edithomeworks(data)) 
        }
     
    })
    .catch(e => {

             
    });
  }
}
export function deletehomeworksbyteacher(jwtAccessToken,id) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/homework/delete`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
                id:id,
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
             dispatch(deletehomeworks(data))
        }
      
    })
    .catch(e => {

             
    });
  }
}
export function homeworksbystudent(jwtAccessToken,userid) {
 
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/student/homeworks/${userid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      
    })
    .then(resp => resp.json())
    .then(data => {
      
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
             dispatch(getstudenthomeworks(data))
        }
     
    })
    .catch(e => {

               
    });
  }
}
export function homeworksliststudent(jwtAccessToken,userid,homeworkid) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/student/homework/${userid}/${homeworkid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
              dispatch(homeworkslist(data))
        }
      
    })
    .catch(e => {

            
    });
  }
}
export function TeacherClassesList(jwtAccessToken,userid) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/TeacherClassesList/${userid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
          
            dispatch(classlist(data))
        }
      
    })
    .catch(e => {

             
    });
  }
}
export function TeachersubjectList(jwtAccessToken,userid,classid) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/homework/TeacherSubjectByClass/${userid}/${classid}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
           dispatch(subjectlist(data))
        }
     
      })
    .catch(e => {

            
    });
  }
}
export function chapterlist(jwtAccessToken) {
   
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/papers`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
           dispatch(getchapterlist(data))
        }
       
      })
    .catch(e => {

             
    });
  }
}
export function bysubjectassignmentslist(jwtAccessToken,id) {
  
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/paper/${id}`, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
          
            dispatch(subjectassignmentslist(data))
        }
      })
        .catch(e => {

             
    });
  }
}

export function homeworksubmitbystudent(jwtAccessToken,data) {
  console.log(data,'check submitted')
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/student/homework/submit`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
           homeworkid:data.homeworkid,
           studentid:data.studentid,
           homework:data.title,
           filedata:data.filedata,
        })
    })
    .then(resp => resp.json())
    .then(data => {
       if(data.error){
           dispatch(loginfail(data))
         
            
        }else if(data){
           
           dispatch(submithomeworks(data))
        }
      
    })
    .catch(e => {
            
    });
  }
}


export function createchapter(jwtAccessToken,data){

  return()=>{
     fetch(`${config.serverSideUrl}/questions/subjectivecreate`, {
           method: "POST",
           headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Cookie:'token='+jwtAccessToken
        },
           body: JSON.stringify({
               schoolid:data.schoolid,
               teacherid:data.teacherid,
               classid:data.classid,
               chapter:data.Chapter,
               question:data.questions,
               type:0,
               marks:data.marks,
               subjectid:data.subjectid,
               filedata:data.filedata
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
            dispatch(createchapterbyteacher(data)) 
        }
      
    })
    .catch(e => {
             
    });
  }
}
export function createchapterobjective(jwtAccessToken,data){

  return()=>{
     fetch(`${config.serverSideUrl}/questions/create`, {
           method: "POST",
           headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Cookie:'token='+jwtAccessToken
        },
           body: JSON.stringify({
               schoolid:data.schoolid,
               teacherid:data.teacherid,
               classid:data.classid,
               chapter:data.Chapter,
               question:data.questions,
               type:1,
               marks:data.marks,
               subjectid:data.subjectid,
               options:data.options,
               
              
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
            dispatch(createchapterobjectivedata(data)) 
        }
      
    })
    .catch(e => {
      
    });
  }
}

export function editSubjective(jwtAccessToken,data) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/question/editSubjective`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
              id:data.id,
              question:data.questions,
              type:data.type,
              marks:data.marks,
              
              
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
           dispatch(editchapter(data)) 
        }
     
    })
    .catch(e => {

             
    });
  }
}
export function editObjective(jwtAccessToken,data) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/question/editObjective`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
              id:data.id,
              question:data.questions,
              type:data.type,
              marks:data.marks,
              options:data.options,
              
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      
       if(data.error){
           dispatch(loginfail(data))
          
            
        }else if(data){
           dispatch(editchapterobjective(data)) 
        }
     
    })
    .catch(e => {

             
    });
  }
}
export function deletechapter(jwtAccessToken,id) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/question/delete`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
                id:id,
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      if(data!=null){
          
          dispatch(deletechapterrr(data))
       } else {
            dispatch(loginfail(data))
        }
    })
    .catch(e => {

              
    });
  }
}

export function deletepaper(jwtAccessToken,id) {
  
  return (dispatch, getState) => {    
     
   fetch(`${config.serverSideUrl}/paper/delete`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
                id:id,
        })
     
    })
    .then(resp => resp.json())
    .then(data => {
      if(data!=null){
          
          dispatch(deletepaperr(data))
       } else {
            dispatch(loginfail(data))
        }
    })
    .catch(e => {

              
    });
  }
}



