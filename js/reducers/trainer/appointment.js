import { INDIVIDUAL_APPOINTMENT_DATA, GROUP_APPOINTMENT_DATA } from '../../actions/common/booking';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
	individualAppointment: [],
	groupAppointment: []
};
const appointment = (state = initialState, action) => {
	switch (action.type) {
		case INDIVIDUAL_APPOINTMENT_DATA: 
			
			return { ...state, individualAppointment: action.payload, loadSpinner: false };
		case GROUP_APPOINTMENT_DATA:
			return {
				...state,
				groupAppointment: action.payload
			}
		default:
			return state;
	}
};
export default appointment;
