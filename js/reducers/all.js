import { NOTIFICATION_LIST, ABOUT_DATA, LOCATION_LIST } from '../actions/common/all';
import { REG_ROLE, SET_STATE_LIST } from '../actions/common/register';

import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  trips: [],
  notification_list: [],
  location_list: [],
  aboutus: undefined,
  loadSpinner: false,
  reg_role:undefined,
  state_list:[]
};
const all = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_LIST: 
      return { ...state, notification_list: action.payload.notificationdatalist, loadSpinner: false };
    case LOCATION_LIST: 
      return { ...state, location_list: action.payload.locationdatalist, loadSpinner: false };
    case ABOUT_DATA:
      return { ...state, aboutus: action.payload.content, loadSpinner: false };
    case REG_ROLE:
      return { ...state, reg_role: action.payload, loadSpinner: false };
    case SET_STATE_LIST:
      return { ...state, state_list: action.payload, loadSpinner: false };
    default:
      return state;
  }
};
export default all;