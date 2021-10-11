import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const NOTIFICATION_LIST = "NOTIFICATION_LIST";
export const ABOUT_DATA = "ABOUT_DATA";
export const CHAT_WINDOW = "CHAT_WINDOW";
export const CHAT_LIST = "CHAT_LIST";
export const CHAT_HISTORY = "CHAT_HISTORY";

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

function jsonConcat(o1, o2) {
   for (var key in o2) {
    o1[key] = o2[key];
   }
   return o1;
}


export function fetchChatListAsync (text) { 
  return (dispatch, getState) => {
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
      dispatch(getChatList(data)) 
    })
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
export function openChatWindow2 (chat_user_id) {
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
      Actions.Teacherchat(); 
    })
    .catch(e => {
               
    });
  }    
}

export function saveChat(jwtAccessToken,data) {
 
  return (dispatch, getState) => {
     
    fetch(`${config.serverSideUrl}/saveteacherchathistory`, {
      method: "POST",
       headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
              user_id:data.to,
              msg:data.message,
              created_at:data.time,
              sender_id:data.from
        })
    })
      .then(resp => resp.json())
      .then(data => {
        
        const userEmail = { message:data.message,
        token: data.token};
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



        
        //dispatch(setNotificationList(data))  
        return true;
      })
      .catch(e => {
                
      });
  }
}

export function savestudentChat(jwtAccessToken,data) {
 
  return (dispatch, getState) => {
     
    fetch(`${config.serverSideUrl}/savechathistory`, {
      method: "POST",
       headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Cookie:'token='+jwtAccessToken
      },
      body: JSON.stringify({
              user_id:data.to,
              msg:data.message,
              created_at:data.time,
              sender_id:data.from
        })
    })
      .then(resp => resp.json())
      .then(data => {
        
        const userEmail = { message:data.message,
        token: data.token};
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



       
        //dispatch(setNotificationList(data))  
        return true;
      })
      .catch(e => {
               
      });
  }
}
export function fetchHistory(jwtAccessToken,user_id) { 
    
    return (dispatch, getState) => {
      fetch(`${config.serverSideUrl}/get_chathistory/${user_id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
             Cookie:'token='+jwtAccessToken
          }

        })
        .then(resp => resp.json())
        .then(data => {
          
          if(data!=null){
              dispatch(setChatHistory(data));
            } 
        })
        .catch(e => {
               //alert('something went wrong')
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
