import { SET_FEEDBACK_DATA, SET_TRAINER_REVIEW, FAVORITE_TRAINER_LIST, NEAR_BARBER_LIST, NEAR_CUSTOMER_LIST } from '../../actions/common/booking';

const initialState = {
	trainerReviewList:[],
	trainerFeedbackData: [],
	favoriteTrainerList: [],
	loadSpinner: false,
	nearby_barber: [],
	nearby_customer: []
};
const common = (state = initialState, action) => {
	switch (action.type) {
		case SET_FEEDBACK_DATA: 
			return { ...state, trainerFeedbackData: action.payload, loadSpinner: false };
		case SET_TRAINER_REVIEW:
			return { ...state, trainerReviewList: action.payload.reviewdatalist, loadSpinner: false };
		case FAVORITE_TRAINER_LIST:
			return { ...state, favoriteTrainerList: action.payload.data, loadSpinner: false };
		case NEAR_BARBER_LIST:
			return { ...state, nearby_barber: action.payload, loadSpinner: false };
		case NEAR_CUSTOMER_LIST:
			return { ...state, nearby_customer: action.payload, loadSpinner: false };
		default:
			return state;
	}
};
export default common;
