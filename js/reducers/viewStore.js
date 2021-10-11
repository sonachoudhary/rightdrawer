import {PREDICTION_RESPONSE_RECEIVED,RANDOM_POOL_DATA} from '../actions/driver/home';

const initialState = {
  predictionArray: [],
  randompoolarr:[]
};

const viewStore = (state = initialState, action) => {
  switch (action.type) {
    case PREDICTION_RESPONSE_RECEIVED:
      return {...state, predictionArray: action.payload};
    case RANDOM_POOL_DATA:
      return {...state, randompoolarr: action.payload};
    default:
      return state;
  }
};
export const pickupButtonVisibility = state =>
  (state.viewStore.predictionArray.length === 0 ? true : false);

export default viewStore;
