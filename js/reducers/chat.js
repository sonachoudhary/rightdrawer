import { CHAT_WINDOW, CHAT_LIST, CHAT_HISTORY } from '../actions/common/chat';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  contact_user: [],
  loadSpinner: false,
  chatUserId: undefined,
  chatlist:[],
  chat_history:[]
};
const chat = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_WINDOW: 
      	
        return { ...state, contact_user: action.payload.data, loadSpinner: false };
    case CHAT_LIST:    	
    	return { ...state, chatlist: action.payload.data, loadSpinner: false };
    case CHAT_HISTORY:
    	return { ...state, chat_history: action.payload.data.reverse(), loadSpinner: false };
    default:
      return state;
  }
};
export default chat;