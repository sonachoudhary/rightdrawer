import { combineReducers } from 'redux';
import newsfeed from './newsfeed';
import appointment from './appointment';


const trainer = combineReducers({
  newsfeed,
  appointment
});
export default trainer;
