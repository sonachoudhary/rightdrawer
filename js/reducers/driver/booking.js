import { REHYDRATE } from 'redux-persist//lib/constants';
import { SET_CONFIRMED_BOOKING, REMOVE_BOOKING_NOTIFICATION } from '../../actions/common/booking';


const initialState = {
	_id: undefined,
	confirmBookingTrainerName: undefined,		
};

export const getUserType = state => {
	const rider = state.driver.user.userType;
	const driver = state.driver.user.userType;
	if (!rider && !driver) {
		return null;
	} else if (!driver) {
		return rider;
	}
	return driver;
};

const booking = (state = initialState, action) => {
	switch (action.type) {
		case SET_CONFIRMED_BOOKING:
			return {
				...state,
				confirmBookingTrainerName: 'name'
			};
		case REMOVE_BOOKING_NOTIFICATION:
			return {
				...state,
				confirmBookingTrainerName: null
			};

		default:
			return state;
	}
};
export default booking;
