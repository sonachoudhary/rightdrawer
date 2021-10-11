import { REHYDRATE } from 'redux-persist//lib/constants';
import { DRIVER_LOGIN_SUCCESS, PUSH_TOKEN, CUSTOMER_LOGIN_SUCCESS,DRIVER_LOGIN,
        LOGOUT_USER, SET_NEAR_TRAINERS,SET_TRAINERS_TRANSACTION,
        SET_FORGOT_EMAIL, SET_FORGOT_EMAIL_ERROR, USER_LOGIN_SUCCESS, 
        PROFILE_UPDATE_SUCCESS, PROFILE_PHOTO_UPDATE_SUCCESS ,
        ACCESS_JWTTOKEN,PROFILE_DATA,STUDENT_PROFILE_DATA,
        SCHOOL_BOARD_CASTE,HOMEWORK,TEACHER_BOARD_CASTE,SCHOOL_LOGIN_SUCCESS,
        CREATE_HOMEWORK,TEACHALLBOARDCASTS,EDITHOMEWORK,DELETEHOMEWORK,STUDENT_HOMEWORK,HOMEWORK_LIST,LIST_CLASS,
        SUBJECT_LIST,ASSIGNMENTS,SUBJECT_ASSIGNMENTS_LIST,SUBMIT_HOME_WORK,QUIZ_CREATE,PASS_CHANGE,CHAPTER,EDIT_CHAPTER,
       DELETE_CHAPTER,OBJECTIVE,LOGIN_FAIL,EDIT_OBJECTIVE,CREATE_PAPER,DELETE_PAPER,EDIT_PAPAER

    } from '../../actions/common/signin';
import { DRIVER_REGISTER_SUCCESS, CUSTOMER_REGISTER_SUCCESS, SET_REG_NEAR_TRAINERS, REG_SET_USER_LOCATION } from '../../actions/common/register';
import { SET_USER_LOCATION, SET_INITIAL_USER_LOCATION, SET_TRAINER_PROFILE_ID } from '../../actions/driver/home';
import { PROFILE_UPDATED, SET_HOME_ADDRESS, PROFILE_PROGRESS } from '../../actions/driver/settings';
import { TRAINER_PROFILE_INFO, TRAINER_BANK_INFO } from '../../actions/common/checkUser';
import { SET_TRAINER_AVAILAVILITY, BOOK_SET_USER_LOCATION } from '../../actions/common/booking';
import { UPDATE_CARD_ID } from '../../actions/payment/riderCardPayment';
import {
  CLEAR_ENTRY_PAGE_FIELDS,  
} from "../../actions/common/entrypage";


const initialState = {
	_id: undefined,
	email: undefined,
	password: undefined,
	userType: undefined,
	name: undefined,
	fname: undefined,
	lname: undefined,
	tfname: undefined,
	tlname: undefined,
	dob: undefined,
	address: undefined,
	city: undefined,
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
	latitudeDelta: 0.022,
	longitudeDelta: undefined,
	gpsLoc: [],
	userRating: undefined,
	rating:undefined,
	phoneNo: undefined,
	profileUrl: undefined,
	tprofileUrl: undefined,
	currTripId: undefined,
	isAvailable: false,
	currTripState: undefined,
	loginStatus: undefined,
	createdAt: undefined,
	profileUpdating: false,
	homeAddress: undefined,
	trainerProfileId: undefined,
	favorite: undefined,
	tExperience: undefined,
	tAddress: undefined,
	tHoursRate: undefined,
	tSpeaciality: undefined,
	userCardId: undefined,
	nearbyTrainers:{},
	transactionDataList:[],
	trainerBankInfo:[],
	setForgotEmail:null,
	setForgotEmailError: null,
	latitude: null,
	longitude: null,
	pushToken: undefined
};

export const getUserType = state => {
	alert(state.driver)
	const Teacher = state.driver.user.userType;
	const Student = state.driver.user.userType;
	if (!Teacher && !Student) {
		return null;
	} else if (!Teacher) {
		return Student;
	}
	return Student;
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case PUSH_TOKEN: 
			
			return {
				...state,
				pushToken: action.payload 
			};
		case DRIVER_LOGIN_SUCCESS:
		 
			return {
			        ...state,
			        isLoggedIn: true,
			        studentlogin:action.payload,
			        // jwtAccessToken: action.payload,

			        userType: action.payload.role[0],
			      };
	    case DRIVER_LOGIN:
		    return {
			        ...state,
			        isLoggedIn: true,
			        driverlogin:action.payload,
			        // jwtAccessToken: action.payload,

			        userType: action.payload.role[0],
			      };
	      case SCHOOL_LOGIN_SUCCESS:
			      
			         return {
			        ...state,
			        isLoggedIn: true,
			        schoollogin:action.payload,
			        userType: action.payload.role[0],
			      };
	    case ACCESS_JWTTOKEN:
			  
			//return action.payload.data.user;
			 return {
			        
			        jwtAccessToken: action.payload,
			        
			      };
          case OBJECTIVE:

		 return {
			         ...state,
			        isLoggedIn: true,
			        objective: action.payload,
			        // jwtAccessToken: action.payload,
			        
			      };
		case CUSTOMER_LOGIN_SUCCESS:
		 return {
			        ...state,
			        isLoggedIn: true,
			         teacherlogin:action.payload,
			         userType: action.payload.role[0],
			      };
			      case LOGIN_FAIL:
		 return {
			        ...state,
			        isLoggedIn: false,
			        userType: '',
			      };
        case CREATE_HOMEWORK:
			 return {
			        ...state,
			        isLoggedIn: true,

			        // jwtAccessToken: action.payload,
			        userType: action.payload,
			      };
		case DELETE_PAPER:
		return {
			        ...state,
			        isLoggedIn: true,

			        // jwtAccessToken: action.payload,
			        deletepaper: action.payload,
			      };

      case HOMEWORK:
      
			 return {
			        ...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        homework: action.payload
			      };
	 case QUIZ_CREATE:
			 return {
			        ...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        createquiz: action.payload
			      };
	 case CREATE_PAPER:
	          return{
	          	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        createpaper: action.payload
	          }
	   case EDIT_PAPAER:
	   return{
	          	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        editpaper: action.payload
	          }
	case EDITHOMEWORK:
				return {
						        ...state,
						        isLoggedIn: true,
						        // jwtAccessToken: action.payload,
						        edithomework: action.payload
						      };

		case DELETEHOMEWORK:
				return {
						        ...state,
						        isLoggedIn: true,
						        // jwtAccessToken: action.payload,
						        // edithomework: action.payload
						      };
						      
	 case TEACHALLBOARDCASTS:
	          return {
			        ...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        Allboardcaste: action.payload
			      };
     case EDIT_CHAPTER:
     return {
			        ...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        editchapter: action.payload
			      };
	 case EDIT_OBJECTIVE:
	 return{
	 	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        editobjective: action.payload
	 }
      case DELETE_CHAPTER:
      return {
			        ...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        deletechapter: action.payload
			      };

      case PROFILE_DATA:
            
            return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        teacherinfo: action.payload,
            }
      case TEACHER_BOARD_CASTE:
          
          return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        teacherboardcaste: action.payload,
            }
      case STUDENT_PROFILE_DATA:
          
           return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        student: action.payload,
            }
       case HOMEWORK_LIST:
       return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        hoeworklist: action.payload,
            }
      case SCHOOL_BOARD_CASTE:
            return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        schooldata: action.payload,
            }
       case STUDENT_HOMEWORK:
              return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        studenthomework: action.payload,
            }
          case  LIST_CLASS:
          return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        classlist: action.payload,
            }

            case ASSIGNMENTS:
             return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        assignments: action.payload,
            }
            case  SUBJECT_LIST:
          return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        subjectlist: action.payload,
            }
            case SUBJECT_ASSIGNMENTS_LIST:
            return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        renderassignments: action.payload,
            }
            case SUBMIT_HOME_WORK:
            return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        submithomeworks: action.payload,
            }
            case PASS_CHANGE:
           return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        change_pass: action.payload,
            }
            case CHAPTER:
            return{
            	...state,
			        isLoggedIn: true,
			        // jwtAccessToken: action.payload,
			        chapter_create: action.payload,
            }

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

		case PROFILE_UPDATED:
			return {
				...state,
				fname: action.payload.data.fname,
				lname: action.payload.data.lname,
				phoneNo: action.payload.data.phoneNo,
				city: action.payload.data.city,
				state: action.payload.data.state,
				bio: action.payload.data.bio,
				age: action.payload.data.age,
				gender: action.payload.data.gender,
				weight: action.payload.data.weight,
				height: action.payload.data.height,
				facebook: action.payload.data.facebook,
				instagram: action.payload.data.instagram,
				twitter: action.payload.data.twitter,
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
				tAddress: action.payload.data.state +", "+ action.payload.data.country,
				tHoursRate: action.payload.data.individual,
				tSpeaciality: action.payload.data.speaciality,
				rating:action.payload.rating,			
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
				latitude: action.payload.latitude,
				longitude: action.payload.longitude,
			};

		case SET_USER_LOCATION:
			return {
				...state,
				gpsLoc: [action.payload.longitude, action.payload.latitude],
				latitude: action.payload.latitude,
				longitude: action.payload.longitude,
			};
		case REG_SET_USER_LOCATION:
			return {
				...state,
				gpsLoc: [action.payload.longitude, action.payload.latitude],
				latitude: action.payload.latitude,
				longitude: action.payload.longitude,
			};
		case BOOK_SET_USER_LOCATION:
			
			return {
				...state,
				gpsLoc: [action.payload.longitude, action.payload.latitude],
				latitude: action.payload.latitude,
				longitude: action.payload.longitude,
			};		
		case SET_NEAR_TRAINERS: 
			return {
				...state,
				nearbyTrainers: action.payload
			};
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

		case SET_FORGOT_EMAIL:
			return { ...state, setForgotEmail: action.payload }

		case SET_FORGOT_EMAIL_ERROR:
			return { ...state, setForgotEmailError: action.payload }
		case USER_LOGIN_SUCCESS:
			
			return { 
				...state,
				_id: action.payload._id,
				email: action.payload.email,
				name: action.payload.name,
				userType: action.payload.customer,
			}
		case PROFILE_UPDATE_SUCCESS:
			return {
				...state,
				email: action.payload.email,
				fname: action.payload.fname,
				lname: action.payload.lname,
				name: action.payload.fname + " " + action.payload.lname,
			}
		case PROFILE_PHOTO_UPDATE_SUCCESS:
			return {
				...state,
				profileUrl: action.payload.profile_url
			}
		default:
			return state;
	}
};
export default user;
