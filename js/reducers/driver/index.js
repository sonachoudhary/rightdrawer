import { combineReducers } from 'redux';

import appState from './appState';
import user from './user';
import tripRequest from './tripRequest';
import history from './history';
import trip from './trip';
import booking from './booking';

const driver = combineReducers({
  appState,
  user,
  history,
  trip,
  tripRequest,
  booking
});
export default driver;
