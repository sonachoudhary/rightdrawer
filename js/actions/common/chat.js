import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const NOTIFICATION_LIST = "NOTIFICATION_LIST";
export const ABOUT_DATA = "ABOUT_DATA";
export const CHAT_WINDOW = "CHAT_WINDOW";
export const CHAT_LIST = "CHAT_LIST";
export const CLEARCHAT_LIST = "CLEARCHAT_LIST";
export const CHAT_HISTORY = "CHAT_HISTORY";
export const CLEARCHAT_HISTORY = "CLEARCHAT_HISTORY";


export function setAboutData(data) {
  return {
    type: ABOUT_DATA,
    payload: data
  };
}

export function getChatList(data) {
  return {
    type: CHAT_LIST,
    payload: data
  };
}
export function clearChatListReducer(){
  return {
    type: CLEARCHAT_LIST,
    payload: null
  };
}
export function setChatWindowData(data) {
  return {
    type: CHAT_WINDOW,
    payload: data
  };
}

export function setChatHistory(data) {
  return {
    type: CHAT_HISTORY,
    payload: data
  };
}
export function clearChatHistoryReducer(){
  return {
    type: CLEARCHAT_HISTORY,
    payload: null
  };
}

function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}


export function fetchChatListAsync (text) { 
  return (dispatch, getState) => {
    //dispatch(clearChatListReducer()) 
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id; 
    if(text!='') {
      bodyData.search = text;
    }
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/chat_list`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('data',data);
      dispatch(getChatList(data)) 
    })
    .catch(e => {
               
    });
  }    
} 

export function updatelastseen () {
  return (dispatch, getState) => {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

  
    if(dd<10) { dd='0'+dd; } 
    if(mm<10) { mm='0'+mm; } 
    today = yyyy + '-' + mm + '-' + dd + ' ' + time ;

    var bodyData = {};
    bodyData.user_id = getState().driver.user._id; 
    bodyData.last_seen = today; 
  
    fetch(`${config.serverSideUrl}:${config.port}/api/users/updateplastseen`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(data => { })
    .catch(e => {
               
    });
  }    
}

export function openChatWindow (chat_user_id) {
  return (dispatch, getState) => {
    var bodyData = {};
    bodyData.user_id = chat_user_id;

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
      dispatch(setChatWindowData(data)) 
      Actions.chat(); 
    })
    .catch(e => {
               
    });
  }    
}

export function saveChat(data) {
 
  return (dispatch, getState) => {
    // var bodyData = {};
    // bodyData.user_id = getState().driver.user._id;
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/save_chat_history`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => {
        //dispatch(setNotificationList(data))  
        return true;
      })
      .catch(e => {
              
      });
  }
} 

export function fetchHistory() {  
  updatelastseen();
  return (dispatch, getState) => {
    dispatch(clearChatHistoryReducer()) 
    var bodyData = {};
    bodyData.user_id = getState().driver.user._id;
    bodyData.other_user_id = getState().chat.contact_user&&getState().chat.contact_user._id;
    bodyData.receiver_id = getState().chat.contact_user&&getState().chat.contact_user._id;
    
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/get_chat_history`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
    .then(respomse => {
      console.log('fetchdataprimt',respomse);
      dispatch(setChatHistory(respomse));
      //Actions.chat(); 
    })
    .catch(e => {
             
    });
  }
}

export function jhanduHistory() {  
  return (dispatch, getState) => {
     dispatch(clearChatHistoryReducer()) 
    var jhandudata = {};
    jhandudata.user_id = getState().driver.user._id;
    jhandudata.other_user_id = getState().chat.contact_user._id;
    jhandudata.receiver_id = getState().chat.contact_user._id;
    
    
    fetch(`${config.serverSideUrl}:${config.port}/api/users/get_chat_history`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      },
     
      body: JSON.stringify(jhandudata)
    })
    .then(resp => resp.json())
    .then(data => {
      
      dispatch(setChatHistory(data));
      //Actions.chat(); 
    })
    .catch(e => {
             
    });
  }
}

export function updateReadStatus(data) {  
  return (dispatch, getState) => {  
    fetch(`${config.serverSideUrl}:${config.port}/api/users/read_message_data`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
                 
      return true;    
    })
    .catch(e => {
                 
    });
  }
}
