import { REHYDRATE } from 'redux-persist//lib/constants';
import { DRIVER_LOGIN_SUCCESS, CUSTOMER_LOGIN_SUCCESS, LOGOUT_USER, SET_NEAR_TRAINERS,SET_TRAINERS_TRANSACTION } from '../../actions/common/signin';
import { DRIVER_REGISTER_SUCCESS, CUSTOMER_REGISTER_SUCCESS, SET_REG_NEAR_TRAINERS } from '../../actions/common/register';
import { SET_USER_LOCATION, SET_INITIAL_USER_LOCATION, SET_TRAINER_PROFILE_ID } from '../../actions/driver/home';
import { PROFILE_UPDATED, SET_HOME_ADDRESS, PROFILE_PROGRESS } from '../../actions/driver/settings';
import { TRAINER_PROFILE_INFO, TRAINER_BANK_INFO,SET_CLASS_DATA,SET_REMAINING_TIMER,SET_LIST_ORDER,SET_GENDER_CHOICE } from '../../actions/common/checkUser';
import { SET_TRAINER_AVAILAVILITY } from '../../actions/common/booking';
import { UPDATE_CARD_ID } from '../../actions/payment/riderCardPayment';
import {
  CLEAR_ENTRY_PAGE_FIELDS,  
} from "../../actions/common/entrypage";

const initialState = {
	_id: undefined,
	email: undefined,
	password: undefined,
	userType: undefined,
	fname: undefined,
	lname: undefined,
	tfname: undefined,
	tbio:undefined,
	tlname: undefined,
	dob: undefined,
	address: undefined,
	city: undefined,
	country:undefined,
	state: undefined,
	country: undefined,
	emergencyDetails: {
		phone: undefined,
		name: undefined,
		imgUrl: undefined,
	},
	insuranceUrl: undefined,
	vechilePaperUrl: undefined,
	rcBookUrl: undefined,
	licenceDetails: {},
	licenceUrl: undefined,
	carDetails: {},
	recoveryEmail: undefined,
	latitudeDelta: undefined,
	longitudeDelta: undefined,
	individual:undefined,
	gpsLoc: [],
	userRating: undefined,
	rating:undefined,
	phoneNo: undefined,
	profileUrl: undefined,
	currTripId: undefined,
	isAvailable: false,
	currTripState: undefined,
	loginStatus: undefined,
	createdAt: undefined,
	profileUpdating: false,
	homeAddress: undefined,
	trainerProfileId: undefined,
	favorite: undefined,
	
	userCardId: undefined,
	Experience:undefined,
	certification:undefined,
	speaciality:undefined,
	nearbyTrainers:{},
	contact:undefined,
	transactionDataList:[],
	
	classfeedbackData:undefined,
	isNotification: true,
	fratienty: undefined,
	extra: undefined,
	major: undefined,
	unveristy: undefined,
	about: undefined,
	remaining_time:0,
	setlistorder:{},
	setgenderchoice:undefined
	
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

const user = (state = initialState, action) => {
	switch (action.type) {
		case DRIVER_LOGIN_SUCCESS:
			return action.payload.data.user;

		case CUSTOMER_LOGIN_SUCCESS:
			
			return action.payload.data.user;

		case DRIVER_REGISTER_SUCCESS:
			return action.payload.data.user;

		case CUSTOMER_REGISTER_SUCCESS:
			return action.payload.data.user;
			
		case SET_TRAINER_PROFILE_ID: 
			return {
				...state,
				trainerProfileId: action.payload,
			};
		case SET_TRAINER_AVAILAVILITY:
			return {
				...state,
				isAvailable: action.payload,
			};
		case LOGOUT_USER:
			return initialState;
		case CLEAR_ENTRY_PAGE_FIELDS:
      		return initialState;

      	case SET_CLASS_DATA: 
			return { ...state, classfeedbackData: action.payload, loadSpinner: false };

		case PROFILE_UPDATED:
			return {
				...state,
				fname: action.payload.data.fname,
				lname: action.payload.data.lname,
				phoneNo: action.payload.data.phoneNo,
				contact: action.payload.data.contact,
				city: action.payload.data.city,
				state: action.payload.data.state,
				country: action.payload.data.country,
				bio: action.payload.data.bio,
				profileUrl:action.payload.data.profileUrl,
				age: action.payload.data.age,
				gender: action.payload.data.gender,
				isNotification: action.payload.data.isNotification,
				fratienty: action.payload.data.fratienty,
				extra: action.payload.data.extra,
				major: action.payload.data.major,
				unveristy: action.payload.data.unveristy,
				about: action.payload.data.about,
				profileUpdating: false,
			};

		case TRAINER_PROFILE_INFO:
			return {
				...state,
				trainerProfileId: action.payload.data._id,
				tfname: action.payload.data.fname,
				tlname: action.payload.data.lname,
				tprofileUrl: action.payload.data.profileUrl,
				favorite: action.payload.favorite,
				tExperience: action.payload.data.Experience,
				tAddress: action.payload.data.state,
				tHoursRate: action.payload.data.individual,
				tSpeaciality: action.payload.data.speaciality,
				tCertification:action.payload.data.certification,
				tGender:action.payload.data.gender,
				tWeight:action.payload.data.weight,
				tHeight:action.payload.data.height,
				tWeight1:action.payload.data.weight1,
				tHeight1:action.payload.data.height1,
				tAge:action.payload.data.age,
				tMobile:action.payload.data.contact,
				tFacebook:action.payload.data.facebook,
				tInstagram:action.payload.data.instagram,
				tTwitter:action.payload.data.twitter,
				tbio:action.payload.data.bio,
				rating:action.payload.rating,
				tgymweekday: action.payload.data.gymweekday,
				tgymlocation: action.payload.data.gymlocation,
				tgymstarttime: action.payload.data.gymstarttime,
				tgymendtime: action.payload.data.gymendtime,			
			};

		
		case TRAINER_BANK_INFO:
			
			return {
				...state,
				trainerBankInfo: action.payload.data.cardDetails
			};

		case SET_INITIAL_USER_LOCATION:
			return {
				...state,
				gpsLoc: [action.payload.longitude, action.payload.latitude],
			};

		case SET_USER_LOCATION:
			return {
				...state,
				gpsLoc: [action.payload.longitude, action.payload.latitude],
			};

		case SET_NEAR_TRAINERS: 
			return {
				...state,
				nearbyTrainers: action.payload
			};
		case SET_REMAINING_TIMER:
			return { ...state, remaining_time: action.payload };

		case SET_LIST_ORDER:
			return { ...state, setlistorder: action.payload };
		
		case SET_GENDER_CHOICE:
		return { ...state, setgenderchoice: action.payload };

		case SET_TRAINERS_TRANSACTION:
		    
			return {
				...state,
				transactionDataList: action.payload
			};
		case SET_REG_NEAR_TRAINERS:
			return {
				...state,
				nearbyTrainers: action.payload
			};
		case PROFILE_PROGRESS:
			return { ...state, profileUpdating: true };

		case SET_HOME_ADDRESS:
			return { ...state, homeAddress: action.payload };

		case UPDATE_CARD_ID:
			return { ...state, carDetails: action.payload.data.cardDetails, userCardId: action.payload.data.userCardId }

		default:
			return state;
	}
};
export default user;
