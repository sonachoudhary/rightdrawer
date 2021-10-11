import { TRIP_HISTORY_FETCHED, SHOW_SPINNER, APPOINTMENT_LIST_FETCHED } from '../../actions/driver/history';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
	trips: [],
	appointmentlist: [],
	loadSpinner: false,
};
const history = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_SPINNER:
			return { ...state, loadSpinner: true };
		case TRIP_HISTORY_FETCHED:
			return { ...state, trips: action.payload, loadSpinner: false };
		case APPOINTMENT_LIST_FETCHED: 
			return { ...state, appointmentlist: action.payload.appoinmentlist, archive_appointment: action.payload.archive_appointment, pending_appointment: action.payload.pending_appointment, loadSpinner: false };
		// case REHYDRATE:
		//   if (Object.keys(action.payload).length !== 0) {
		//     return action.payload.driver.history;
		//   } else {
		//     return state;
		//   }
		default:
			return state;
	}
};
export default history;
