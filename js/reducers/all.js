import { NOTIFICATION_LIST, ABOUT_DATA, LOCATION_LIST,SETLOCATION_LIST } from '../actions/common/all';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  trips: [],
  notification_list: [],
  location_list: [],
  aboutus: undefined,
  loadSpinner: false,
};
const all = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_LIST: 
      return { ...state, notification_list: action.payload.notificationdatalist, loadSpinner: false };
    case LOCATION_LIST: 
      return { ...state, location_list: action.payload.locationdatalist, loadSpinner: false };
    case SETLOCATION_LIST: 
      return { ...state, location_list: [], loadSpinner: false };
    case ABOUT_DATA:
      return { ...state, aboutus: action.payload.content, loadSpinner: false };
    default:
      return state;
  }
};
export default all;