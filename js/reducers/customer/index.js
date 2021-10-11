import { combineReducers } from 'redux';
import newsfeed from './newsfeed';
import common from './common';
import riderCardPayment from './rideCardPayment';
import paymentOption from './paymentOption';

const customer = combineReducers({
  newsfeed,
  common,
  riderCardPayment,
  paymentOption
});
export default customer;
