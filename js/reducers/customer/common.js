import { SET_FEEDBACK_DATA, SET_TRAINER_REVIEW, FAVORITE_TRAINER_LIST } from '../../actions/common/booking';

const initialState = {
	trainerReviewList:[],
	trainerFeedbackData: [],
	favoriteTrainerList: [],
	loadSpinner: false,
};
const common = (state = initialState, action) => {
	switch (action.type) {
		case SET_FEEDBACK_DATA: 
			return { ...state, trainerFeedbackData: action.payload, loadSpinner: false };
		case SET_TRAINER_REVIEW:
			return { ...state, trainerReviewList: action.payload.reviewdatalist, loadSpinner: false };
		case FAVORITE_TRAINER_LIST:
			
			return { ...state, favoriteTrainerList: action.payload.data, loadSpinner: false };
		default:
			return state;
	}
};
export default common;
