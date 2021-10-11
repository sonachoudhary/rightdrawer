import { SET_NEWS_FEED_TRAINER } from '../../actions/common/newsfeed';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
	trips: [],
	newslist: [],
	loadSpinner: false,
};
const newsfeed = (state = initialState, action) => {
	switch (action.type) {
		case SET_NEWS_FEED_TRAINER: 
			return { ...state, newslist: action.payload.data.user, loadSpinner: false };
		default:
			return state;
	}
};
export default newsfeed;
